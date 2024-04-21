import { Button, Navbar } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbarr() {
  let patt = location.pathname;
  const [path, setpath] = useState(patt);
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full sticky top-0 z-10 px-8 mob:px-0 border-b-2">
        <div className="w-full sticky top-0 z-10    ">
          <div className=" select-none ">
            <Navbar
              fluid
              className=" flex-col items-center py-4 pb-5 mob:py-3  "
            >
              <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white cursor-pointer">
                  BookSwap.
                </span>
              </Navbar.Brand>
              <div className="flex md:order-2 items-center">
                <Link to="/">
                  <button
                    className={
                      path == "/"
                        ? "mob:hidden font-medium text-cyan-600 cursor-pointer "
                        : "mob:hidden font-medium cursor-pointer"
                    }
                    onClick={() => setpath("/")}
                  >
                    Shop
                  </button>
                </Link>
                <Link to="/Cart">
                  <button
                    className={
                      path == "/Cart"
                        ? "mob:hidden ml-4 font-medium text-cyan-600 cursor-pointer"
                        : "mob:hidden ml-4 font-medium cursor-pointer"
                    }
                    onClick={() => setpath("/Cart")}
                  >
                    Cart
                  </button>
                </Link>
                <Link to="/Mybooks">
                  <button
                    className={
                      path == "/Mybooks"
                        ? "mob:hidden mx-4 font-medium text-cyan-600 cursor-pointer"
                        : "mob:hidden mx-4 font-medium cursor-pointer"
                    }
                    onClick={() => setpath("/Mybooks")}
                  >
                    MyBooks
                  </button>
                </Link>
                <Link to={user ? null : "/login"}>
                  <Button
                    className="mx-3 px-2 "
                    onClick={() => {
                      if (user) {
                        const ready = confirm("Do you want to logout?");
                        if (ready) {
                          localStorage.removeItem("user");
                          navigate("/login");
                        }
                      }
                      setpath("");
                    }}
                  >
                    {user ? "Logout" : "Login"}
                  </Button>
                </Link>

                <Navbar.Toggle className="hidden mob:block" />
              </div>
              <Navbar.Collapse>
                <Link to="/">
                  <Navbar.Link
                    className="text-center text-[16px] "
                    onClick={() => {
                      setpath("/");
                    }}
                    active={path === "/"}
                  >
                    Shop
                  </Navbar.Link>
                </Link>

                <Link to="/Cart">
                  <Navbar.Link
                    className="text-center text-[16px]"
                    onClick={() => {
                      setpath("/Cart");
                    }}
                    active={path === "/Cart"}
                  >
                    Cart
                  </Navbar.Link>
                </Link>

                <Link to="/Mybooks">
                  <Navbar.Link
                    className=" text-center text-[16px] "
                    onClick={() => {
                      setpath("/Mybooks");
                    }}
                    active={path === "/Mybooks"}
                  >
                    Mybooks
                  </Navbar.Link>
                </Link>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}
