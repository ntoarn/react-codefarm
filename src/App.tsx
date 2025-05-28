import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PrivateRouter, PublicRouter} from "./router";
import {ToastContainer} from "react-toastify";

function App() {
    const router = createBrowserRouter([...PrivateRouter, ...PublicRouter])
  return (
   <>
       <RouterProvider router={router}/>
       <ToastContainer />
   </>
  )
}

export default App
