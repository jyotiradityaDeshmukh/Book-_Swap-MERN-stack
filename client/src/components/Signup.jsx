import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  function handle_register(e) {
    e.preventDefault();
    axios
      .post("https://wt-project-backend-9uhv.onrender.com/register", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          console.log("Account Created");
          toast.success("Account Created!!!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          toast.warn("Already exists!!!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div className=" w-full h-[100vh] mob:h-[90vh] flex items-center xs:px-0 xs:items-end xs:pb-[180px] ">
        <div className="w-[380px]  z-10 bg-black/70 mx-auto lg:w-[430px] rounded-md px-8 pt-16 pb-20 xs:pt-9 shadow-[B6C4B6] shadow-sm border-stone-900 text-white">
          <h1 className="text-white font-semibold text-3xl">Register</h1>
          <form className=" mt-[40px]" onSubmit={handle_register}>
            <input
              className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm  bg-[#333333] border-b-[3px] border-gray-300 focus:border-green-500 focus:outline-none p-2"
              placeholder="  Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="w-full h-[8vh] xs:h-[6.5vh] rounded-sm mt-[25px] bg-[#333333] border-b-[3px] border-t-0 border-l-0 border-r-0 outline-none focus:ring-0 border-gray-300  focus:border-green-500 ppp p-2 "
                placeholder="  Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="email"
                required
              />
              <label
                onClick={() => setshow(!show)}
                className="text-gray-400 absolute top-[44.5px] right-[17px] cursor-pointer select-none"
              >
                {show ? "Hide" : "Show"}
              </label>
            </div>
            <button className=" w-full h-[7vh] bg-green-800 rounded-sm  text-xl font-medium mt-[25px]">
              Signup
            </button>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2 mt-4">
                <Link to="/Login" className="flex gap-2 items-center mt-1">
                  <p className=" font-light">{"Already Have Account?"}</p>
                  <p className=" font-medium text-gray-300 cursor-pointer duration-150 text-lg hover:text-white">
                    Sign In
                  </p>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
      </div>
    </>
  );
}
