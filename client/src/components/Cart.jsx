import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Mybooks = () => {
  const user = localStorage.getItem("user");
  const [data, setdata] = useState([]);
  const [a, seta] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    axios
      .get("https://wt-project-backend-9uhv.onrender.com/getcart", {
        params: {
          user: user,
        },
      })
      .then((response) => {
        setdata(response.data);
        console.log(data);
      });
  }, [a]);

  function remove_cart(name) {
    const user = localStorage.getItem("user");
    axios
      .post("https://wt-project-backend-9uhv.onrender.com/removecart", {
        name,
        user,
      })
      .then((result) => {
        console.log(result.data);

        console.log("removed from cart");
        toast.success("Added to cart!!!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        seta(a + 1);
      });
  }

  var sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum = sum + data[i].Price;
  }

  function buyyed() {
    data.map((arr) => {
      const name = arr.name;
      const price = arr.Price;
      const img = arr.img;
      const user = localStorage.getItem("user");
      axios
        .post("https://wt-project-backend-9uhv.onrender.com/checkout", {
          user,
          name,
          img,
          price,
        })
        .then((result) => {
          console.log(result.data);
          toast.success("buyed the books", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          if (result.data === "success") {
            console.log("buyed");
            seta(a + 1);
          }
        });
    });
  }

  if (user) {
    if (data.length == 0) {
      return (
        <>
          <div className="w-full h-screen mx-auto">
            <div className="mx-auto">
              <p className=" text-center">Nothing in the cart</p>
              <Link to="/">
                <div className=" bg-slate-500 w-20 text-center px-5 py-2 mx-auto mt-8 rounded-md text-white hover:bg-slate-600 ">
                  Shop
                </div>
              </Link>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="flex flex-wrap ">
          <div className=" w-[65%] h-screen mob:h-auto mob:w-full px-10 py-10 mob:px-2 ">
            {data.map((arr) => {
              return (
                <div className=" w-full h-[14rem]  bg-[#e4dfdfaa] border-[#635f5faa] bottom-2 shadow-xl rounded-2xl mb-8">
                  <div className="flex">
                    <div>
                      <img
                        src={arr.img}
                        alt="https://m.media-amazon.com/images/I/71YxsXL5wjL._AC_UF1000,1000_QL80_.jpg"
                        className="h-[14rem] border-2 w-[11rem] rounded-l-2xl  "
                      />
                    </div>
                    <div className="py-6 ml-[3.5rem] mob:ml-3">
                      <p className="font-bold text-[24px] mb-[3px] mob:text-[18px]">
                        {arr.name}
                      </p>
                      <p className="font-semibold mb-9 text-[20px] mob:text-[16px]">
                        Price- ${arr.Price}
                      </p>
                      <button
                        className="bg-red-500 px-6 py-3 rounded-md text-white hover:bg-red-600 duration-300"
                        onClick={() => {
                          remove_cart(arr.name);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className=" w-[35%]  mob:w-full border-l-2 border-black flex justify-center px-10 py-1">
            <div className="mt-9 w-[550px] h-auto   text-center bg-[#e4dfdfaa] rounded-xl px-20  mob:px-5 py-8">
              <p className=" font-bold text-3xl">Checkout</p>
              <div className="mt-12">
                {data.map((arr) => {
                  return (
                    <div className="flex text-lg font-semibold justify-between">
                      <div>{arr.name}</div>
                      <div>${arr.Price}</div>
                    </div>
                  );
                })}
                <div className="flex text-lg font-semibold justify-between mt-20">
                  <div className="text-2xl font-bold">Total</div>
                  <div className="text-2xl font-bold">${sum.toFixed(2)}</div>
                </div>
                <div
                  className="bg-cyan-700 py-3 text-white rounded-md text-xl mt-6 cursor-pointer duration-300 hover:bg-cyan-800"
                  onClick={() => {
                    let ready = confirm("Are you ready to pay the amount?");
                    if (ready) {
                      buyyed();
                    }
                  }}
                >
                  Proceed for payment
                </div>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
                transition:Bounce
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full h-screen mx-auto">
          <div className="mx-auto">
            <p className=" text-center">You haven't logged in!!</p>
            <Link to="/login">
              <div className=" bg-slate-500 w-20 text-center px-5 py-2 mx-auto mt-8 rounded-md text-white hover:bg-slate-600 ">
                Login
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  }
};

export default Mybooks;
