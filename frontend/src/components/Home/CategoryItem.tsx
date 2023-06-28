import { Link } from "react-router-dom";
const CategoryItem = () => {
  return (
    <>
      <div className="h-[200px] w-full bg-main-gray hover:shadow hover:shadow-cyan-300 transition-all ">
        <Link to="/" className="h-full w-full block">
          <div className="bg-[url('https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn')] bg-center bg-cover bg-no-repeat h-4/6"></div>
          <p className="w-full text-center text-sm overflow-hidden">Customer Electronics</p>
        </Link>
      </div>
    </>
  );
};

export default CategoryItem;
