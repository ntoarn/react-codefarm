import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const useQueryParams = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] =  useSearchParams()
    const [allQueryParams, setAllQueryParams] = useState(Object.fromEntries(searchParams))
    useEffect(() => {
        setAllQueryParams(Object.fromEntries(searchParams))
    }, [searchParams]);

    //get
    const getQueryParams = (key: string) => {
        const params = new URLSearchParams(location.search)
        return params.get(key)
    }

    //set
    const setQueryParams = (key: string, value: string) => {
        const params = new URLSearchParams(location.search)
        if (value){
            params.set(key,  value)
        }else {
            params.delete(key)
        }
        setSearchParams(params)
    }

    //remove
    const removeQueryParams = (key: string) => {
        const params = new URLSearchParams(location.search)
        params.delete(key)
        setSearchParams(params)
    }
    return {
        allQueryParams,
        getQueryParams,
        setQueryParams,
        removeQueryParams,
    }
 };

export default useQueryParams;
