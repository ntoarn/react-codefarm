import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
        <Link to={"/admin/products"}>Bấm Vào Đây Để vào Todo</Link>
    </div>
  );
};

export default Home;
