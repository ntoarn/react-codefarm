import api from "./index.ts";

export const createProduct = (data: any) => api.post("/students", data);
export const getProducts = () => api.get(`/students`);
export const getProduct = (id: any) => api.get(`/students/${id}`);
export const updateProduct = (id: any, data: any) => api.patch(`/students/${id}`, data)
export const deleteProduct = (id: number) => api.delete(`/students/${id}`)
export const updateCompleted = (id: number, completed: boolean) => api.patch(`/students/${id}`, {completed})
// path: `${path}?q=${debounce}&_limit=${limit}&_page=${page}&_sort=${sortBy}&_order=${order}`
