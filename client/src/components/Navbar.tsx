import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import auth from "../utils/auth";

const Navbar = () => {
  const currentPage = useLocation().pathname;
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className="display-flex align-center py-2 px-5 header ">
      <div className ="macroMunch">
        <h1 id="macroMunch">Macro-Munch</h1>
      </div>
      <div>
        {!loginCheck ? (
          <>
            <Link to="/signup" className="btn" style={{ marginRight: "10px" }}>
              Signup
            </Link>

            <Link to="/login" className="btn" style={{ marginRight: "10px" }}>
              Login
            </Link>
          </>
        ) : (
          <div>
            <button
              id="logout"
              className="btn"
              type="button"
              onClick={() => {
                auth.logout();
              }}
            >
              Logout
              </button>
            <div className="Links">
              
              <Link
                style={{ marginRight: "10px" }}
                id="nav-item"
                to="/recipeFinder"
                className={
                  currentPage === "/recipeFinder" ? "active" : "nav-link"
                }
              >
                Find Recipe
              </Link>

              <Link
                style={{ marginRight: "10px" }}
                id="nav-item"
                to="/savedRecipe"
                className={
                  currentPage === "/savedRecipe" ? "active" : "nav-link"
                }
              >
                Saved Recipes
              </Link>

              <Link
                style={{ marginRight: "10px" }}
                id="nav-item"
                to="/Nutrients"
                className={currentPage === "/Nutrients" ? "active" : "nav-link"}
              >
                Nutrition Facts
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
