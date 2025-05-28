  import React, {useState} from 'react';
  import {Button, Space} from 'antd';
  import {Link} from "react-router-dom";
  import useQueryParams from "../../hooks/useQueryParams.ts";
  import useDebounce from "../../hooks/useDebounce.ts";

  import {toast} from "react-toastify";
  import useFetch from "../../hooks/useFetch.ts";
  import api from "../../api";
  import {ArrowDown, ArrowUp, Check, X} from "lucide-react";

  interface IStudents {
    id: number;
    title: string;
    completed: boolean;
    description: string;
    priority: string;
    createAt: string;
  }



  const ListProduct: React.FC = () => {
    const { setQueryParams, getQueryParams } = useQueryParams()
    const [page, setPage] = useState<number>(parseInt(getQueryParams("page=") || "1"))
    const [limit, setLimit] = useState<number>(parseInt(getQueryParams("limit=") || "12"))
    const [search, setSearch] = useState<string>(getQueryParams("?q=") || "")
    const [sortBy, setSortBy] = useState<string>(getQueryParams("sortBy=") || "")
    const [order, setOrder] = useState<string>(getQueryParams("order=") || "")
    const [priority, setPriority] = useState<string>(getQueryParams("priority=") || "")
    const path = "/students"

    const debounce: string = useDebounce<string>(search, 500);

    let pathQuery =`/students?q=${debounce}&_limit=${limit}&_page=${page}&_sort=${sortBy}&_order=${order}`
    if (priority) {
      pathQuery +=`
        &priority=${priority}
      `
    }
    const  { state, refetch}  = useFetch(
        {
          path: pathQuery,
          method: "GET"
        }
    )
    const students = state.data as IStudents[] | undefined

    // console.log(data)

    const handleRemove = async (id: number)=> {
      try {
        if (window.confirm("Are you sure?")) {
          await api.delete(`${path}/${id}`, {method: "DELETE"})
          toast.success("Xóa thành công")
          refetch()
        }

      } catch (error) {
          console.error(error);
      }
    }

    const updateAsyncComplete = async (students: IStudents) => {
      try {
        const update = !students.completed
        await api.patch(`/students/${students.id}`, { completed: update });
        toast.success(`Cap nhap trạng thái: ${update ? "Completed" : "Pending" } thành công`)
        refetch()
      } catch (error) {
          console.error(error);
      }

    }

    return (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">

            </div>
            <input type="search" id="search"
                  className="block w-1/4 p-4 ps-10 text-sm   rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search" value={search}
                    onChange={(e) => {
                        setSearch(e.target.value); setPage(1);
                        setQueryParams('page=', '1');
                        setQueryParams('search/q=', e.target.value);}}
            />

          </div>
          <Space className="flex justify-end" style={{marginBottom: 16}}>

            <Link to="/admin/products/add">
              <Button type="primary">Thêm sản phẩm</Button>
            </Link>
          </Space>


          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left ">
              <thead className="text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                  <ArrowUp
                  className={"cursor-pointer"}
                  onClick={() => {
                    setSortBy("title");
                    setOrder("asc");
                    setQueryParams("sortBy", "title");
                    setQueryParams("order", "asc");
                  }}
                  />
                  <ArrowDown
                      className={"cursor-pointer"}
                      onClick={() => {
                        setSortBy("title");
                        setOrder("desc");
                        setQueryParams("sortBy", "title");
                        setQueryParams("order", "desc");
                      }}
                  />

                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Priority
                  <ArrowUp
                      className={"cursor-pointer"}
                      onClick={() => {
                        setSortBy("priority");
                        setOrder("asc");
                        setQueryParams("sortBy", "priority");
                        setQueryParams("order", "asc");
                      }}
                  />
                  <ArrowDown
                      className={"cursor-pointer"}
                      onClick={() => {
                        setSortBy("priority");
                        setOrder("desc");
                        setQueryParams("sortBy", "priority");
                        setQueryParams("order", "desc");
                      }}
                  />
                  <div>
                    <label htmlFor="Headline">
                      <select
                          name="Headline"
                          id="Headline"
                          className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
                          onChange={(e) => {
                            setPriority(e.target.value);
                            setQueryParams("priority", e.target.value);
                            setPage(1);
                          }}
                      >
                        <option value={""} >Please select</option>
                        <option value="low">Low</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>

                      </select>
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Completed
                </th>
                <th scope="col" className="px-6 py-3">
                  CreateAt
                  <ArrowUp
                      className={"cursor-pointer"}
                      onClick={() => {
                        setSortBy("createAt");
                        setOrder("asc");
                        setQueryParams("sortBy", "createAt");
                        setQueryParams("order", "asc");
                      }}
                  />
                  <ArrowDown
                      className={"cursor-pointer"}
                      onClick={() => {
                        setSortBy("createAt");
                        setOrder("desc");
                        setQueryParams("sortBy", "createAt");
                        setQueryParams("order", "desc");
                      }}
                  />
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              {students?.map((task: IStudents) => (
                  <tr key={task.id} className="">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      <Link to={`/admin/products/detail/${task.id}`}>{task.title}</Link>
                    </th>
                    <td className="px-6 py-4">
                      {task.description}
                    </td>
                    <td className="px-6 py-4">
                      {task.priority}
                    </td>
                    <td onClick={() => updateAsyncComplete(task)} className="px-6 py-4">
                      {task.completed ? <Check className="text-green-500" /> : <X className="text-red-500" />}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(task.createAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Button
                            danger
                            className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                            onClick={() => handleRemove(task.id)}
                        >
                          Xoá
                        </Button>

                        <Link
                            to={`/admin/products/edit/${task.id}`}
                            className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                        >
                          Sửa
                        </Link>
                      </div>

                    </td>
                  </tr>

              ))}
              </tbody>
            </table>

            <div className={"flex items-center gap-3"}>
              <div className="pagination">
                <button onClick={() => {
                  setPage(page - 1);
                  setQueryParams('page=', (page - 1).toString());
                }} disabled={page === 1}>
                  ⬅️ Prev
                </button>
                <span>
                      Page {page} / {limit}
                  </span>
                <button
                    onClick={() => {
                      setPage(page + 1);
                      setQueryParams('page=', (page + 1).toString());
                    }}
                    disabled={(students?.length ?? 0) < limit}
                >
                  Next ➡️
                </button>
              </div>

              <div className="col-auto">
                <select
                    className="form-select form-select-sm"
                    value={limit}
                    onChange={(e) => {setLimit(parseInt(e.target.value)); setPage(1); setQueryParams("limit", e.target.value)}}
                >
                  <option disabled>Chọn số sản phẩm/trang</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="36">36</option>
                  <option value="48">48</option>
                </select>
              </div>
            </div>

            </div>
        </>
    );
  };

  export default ListProduct;
