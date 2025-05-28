
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/headerAdmin/HeaderAdmin.tsx";

const LayoutsAdmin = () => {
  return (
    <div >
        <HeaderAdmin/>
        <Outlet/>
    </div>
  );
};

export default LayoutsAdmin;
