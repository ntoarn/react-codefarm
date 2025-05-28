import {AxiosError, type AxiosResponse} from "axios";

import React, {useCallback, useEffect} from "react";
import api from "../api";

type Methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type FetchParams = {
    path: string;
    method: Methods;
    body?: unknown;
    config?: import("axios").AxiosRequestConfig
}
type State<T> =
    | {data: null,  isLoading: boolean, error: null}
    | {data: null,  isLoading: boolean, error: AxiosError}
    | {data: T,  isLoading: boolean, error: null}
type Action<T> =
    | {type: "loading", error: undefined}
    | {type: "success", data: T}
    | {type: "error", error: AxiosError}

const fetch = async <T>(
    path: string,
    method: Methods,
    body? : unknown,
    config? : import("axios").AxiosRequestConfig
) : Promise<AxiosResponse<T>> => {
    switch (method) {
        case "GET":
            return await api.get(path, config)
        case "POST":
            return await api.post(path, body,  config)
        case "PUT":
            return await api.put(path, body, config)
        case "PATCH":
            return await api.patch(path, body, config)
        case "DELETE":
            return await api.delete(path, config)
        default:
            throw new Error("Method not supported")
    }
}
function reduce<T>(state: State<T>, action: Action<T>) {
    switch (action.type) {
        case "loading":
            return {...state, isLoading: true}
        case "success":
            return {data: action.data, isLoading: false, error: null}
        case "error":
            return {data: null, isLoading: false, error: action.error}
    }
}
const useFetch = <T>({path, method, body, config}: FetchParams) => {
    const [state, dispatch] = React.useReducer(reduce<T>,{
        data: null,
        isLoading: false,
        error: null
    })
    const fetchData = useCallback(async () => {
        let shouldCancel = false;
        dispatch({type: "loading", error: undefined });
        try {
            const { data } = await fetch<T>(path, method, body, config);
            if (shouldCancel) return;
            dispatch({ type: "success", data });
        } catch (error: unknown) {
            if (shouldCancel) return;
            const axiosError = error instanceof AxiosError ? error : new AxiosError("An unknown error occurred");
            dispatch({ type: "error", error: axiosError });
        }
        return () => {
            shouldCancel = true;
        };
    }, [path, method, body, config]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { state, refetch: fetchData };
};

export default useFetch;
