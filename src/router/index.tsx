import LayoutsAdmin from "../layouts/LayoutsAdmin.tsx";
import DashBoard from "../pages/admin/DashBoard.tsx";
import ListProduct from "../pages/admin/ListProduct.tsx";
import ListCategories from "../pages/admin/ListCategories.tsx";
import AddProduct from "../pages/admin/AddProduct.tsx";
import UpdateProduct from "../pages/admin/UpdateProduct.tsx";
import ProductDetail from "../pages/admin/ProductDetail.tsx";
import Home from "../pages/Home.tsx";

export const PrivateRouter = [
    {
        path: "/admin",
        element: <LayoutsAdmin/>,
        children: [
            { index: true, element: <DashBoard /> },
            { path: "products", element: <ListProduct /> },
            { path: "categories", element: <ListCategories /> },
            { path: "products/add", element: <AddProduct /> },
            { path: "products/edit/:id", element: <UpdateProduct /> },
            { path: "products/detail/:id", element: <ProductDetail /> },
            // { path: "orders", element: <OrderListPage /> },
            // { path: "blogs", element: <BlogListPage /> },
            // { path: "users", element: <UserListPage /> },
            // { path: "settings", element: <SettingsPage /> },
        ],
    }
]
export const PublicRouter = [
    {
        path: "/",
        element: <Home/>,

    }
]