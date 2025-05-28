import React from 'react';
import { Button, Space } from 'antd';
import { useForm } from "react-hook-form";
import { createProduct } from "../../api/apiProduct.ts";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AddProduct: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data: any) => {
        try {
            const newData = {
                ...data,
                completed: false,
                createAt: new Date(),
            }
            const res = await createProduct(newData);
            reset();
            toast.success("Thêm task học tập thành công");
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Space className="flex justify-end" style={{ marginBottom: 16 }}>
                <Link to="/admin/products">
                    <Button type="primary">Quay về</Button>
                </Link>
            </Space>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ maxWidth: 600 }}
                autoComplete="off"
            >
                {/* Title */}
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="title"
                        {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                    />
                    {errors.title && (
                        <p className="text-red-500">{errors.title.message as string}</p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="description"
                        {...register("description", { required: "Vui lòng nhập mô tả" })}
                    />
                    {errors.description && (
                        <p className="text-red-500">{errors.description.message as string}</p>
                    )}
                </div>

                {/* Priority */}
                <div className="mb-4">
                    <label
                        htmlFor="priority"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Độ ưu tiên
                    </label>
                    <select
                        id="priority"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue=""
                        {...register("priority", { required: "Vui lòng chọn độ ưu tiên" })}
                    >
                        <option value="" disabled>Chọn độ ưu tiên</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors.priority && (
                        <p className="text-red-500">{errors.priority.message as string}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Thêm task
                </button>
            </form>
        </>
    );
};

export default AddProduct;
