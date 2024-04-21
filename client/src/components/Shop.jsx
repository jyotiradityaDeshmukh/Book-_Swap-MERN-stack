import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import data from "./data.json";
import axios from "axios";

export default function Shop() {
  const [search, setsearch] = useState("");
  const [dataaa, setdataa] = useState([]); //duplicate data
  const [dataa, setdata] = useState([]);
  const user = localStorage.getItem("user");
  const [cartdata, secarttdata] = useState([]);
  const [buyed, setbuyed] = useState([]);
  const [a, seta] = useState(0);

  useEffect(() => {
    setdata(data.data);
    setdataa(data.data);
    console.log(dataa);
  }, []);

  function filtersearch(e) {
    e.preventDefault();
    const ndew = dataaa.filter((arr) => {
      const lowercase_name = String(arr.book_name).toLowerCase();
      let lowercase_search = search.toLocaleLowerCase();
      return lowercase_name.includes(lowercase_search);
    });
    setdata(ndew);
  }

  function add_cart(name, price, img) {
    const user = localStorage.getItem("user");
    const book_names = cartdata.map((arr) => arr.name);

    if (user) {
      if (book_names.includes(name)) {
        toast.warn("Already added to cart!!!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        axios
          .post("https://wt-project-backend-9uhv.onrender.com/addcart", {
            name,
            price,
            img,
            user,
          })
          .then((result) => {
            console.log(result.data);
            if (result.data === "success") {
              console.log("Added to cart");
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
            }
          });
      }
    } else {
      toast.warn("Please Login first!!!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    axios
      .get("https://wt-project-backend-9uhv.onrender.com/getcart", {
        params: {
          user: user,
        },
      })
      .then((response) => {
        secarttdata(response.data);

        dataa.map((arr) => {});
        var cart_bname = cartdata.map((arr) => arr[1]);
        console.log(cart_bname);
      });
  }, [a]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    axios
      .get("https://wt-project-backend-9uhv.onrender.com/getbuyed", {
        params: {
          user: user,
        },
      })
      .then((response) => {
        setbuyed(response.data);
        console.log(buyed_bname);
      });
  }, [a]);
  var buyed_bname = buyed.map((arr) => arr.name);

  return (
    <>
      <form onSubmit={filtersearch}>
        <div className="flex items-center justify-center my-6 px-6">
          <input
            type="text"
            placeholder="Enter book name...."
            className=" w-[20rem]   h-[3rem]  border-stone-500 rounded-s-md"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button
            className=" bg-cyan-600  h-[3rem] px-5 rounded-e-md text-white hover:bg-cyan-800 duration-300  "
            onClick={() => filtersearch()}
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-x-16 mob:px-3 mob:py-0 px-12 mt-10 gap-y-16 ">
        {dataa.map((arr) => {
          if (buyed_bname.includes(arr.book_name)) {
            console.log(buyed_bname);
            return (
              <div
                className=" w-[345px] bg-[#f2f2f2aa]  rounded-xl text-center duration-300 shadow-xl "
                key="1"
              >
                <img
                  src={arr.book_cover_image}
                  alt="none"
                  className=" rounded-t-2xl w-[345px] h-[12rem] object-contain mb-[6px]  "
                />
                <p className=" font-bold text-[18px] mb-[3px]">
                  {arr.book_name}
                </p>
                <p className=" text-[12px] px-3">{arr.book_description}</p>
                <div className="flex justify-between px-7 py-6 items-center ">
                  <p className="font-semibold">Price- ${arr.book_price}</p>
                  <button className=" rounded-md h-[2.8rem]  px-[10px] py-[7px] text-white bg-gray-500 duration-300">
                    Already Buyed
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className=" w-[345px] bg-[#f2f2f2aa]  rounded-xl text-center hover:scale-[105%] duration-300 shadow-xl "
                key="1"
              >
                <img
                  src={arr.book_cover_image}
                  alt="none"
                  className=" rounded-t-2xl w-[345px] h-[12rem] object-contain mb-[6px] "
                />
                <p className=" font-bold text-[18px] mb-[3px]">
                  {arr.book_name}
                </p>
                <p className=" text-[12px] px-3">{arr.book_description}</p>
                <div className="flex justify-between px-7 py-6 items-center ">
                  <p className="font-semibold">Price- ${arr.book_price}</p>
                  <button
                    className="bg-cyan-600 rounded-md h-[2.8rem]  px-[10px] py-[7px] hover:text-white hover:bg-gray-500 duration-300"
                    onClick={() => {
                      add_cart(
                        arr.book_name,
                        arr.book_price,
                        arr.book_cover_image
                      );
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          }
        })}
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
    </>
  );
}
