import useFetch from "../../hooks/useFetch.ts";
import {Link, useParams} from "react-router-dom";
import {Button, Space} from "antd";

interface IStudents {
    id: number;
    title: string;
    completed: boolean;
    description: string;
    priority: string;
    createAt: string;
}
const ProductDetail = () => {
    const { id } = useParams()
    const path = "/students"
    const { state } = useFetch({
        path: `${path}/${id}`,
        method: "GET",
    })
    const dataDetail = state?.data as IStudents | undefined
    console.log(dataDetail)
  return (
      <div>
          <h1>Todo Detail</h1>
          <Space className="flex justify-end" style={{ marginBottom: 16 }}>

              <Link to="/admin/products">
                  <Button type="primary">Quay về</Button>
              </Link>
          </Space>
          <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
              <div className="bg-white p-4 sm:p-6">
                  <p>
                      <h3 className="mt-0.5 text-lg text-gray-900">Title: {dataDetail?.title}</h3>
                  </p>

                  <p>
                      <h3 className="mt-0.5 text-lg text-gray-900">Description: {dataDetail?.description}</h3>
                  </p>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                     Priority: {dataDetail?.priority}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                     Completed: {dataDetail?.completed ? "Completed" : "Pending"}
                  </p>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                      <time dateTime="2022-10-10" className="block text-xs text-gray-500">CreateAt: {dataDetail?.createAt ? new Date(dataDetail.createAt).toLocaleString() : ''}</time>

                  </p>
              </div>
          </article>
      </div>
  );
};

export default ProductDetail;
