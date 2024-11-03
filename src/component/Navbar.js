import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      setIsLoggedIn(false);
      setRedirectToLogin(true); // Set a state to indicate redirect
    }
  };

  if (redirectToLogin) {
    navigate("/", { replace: true }); // Use replace to prevent going back
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand text-white"> NewsMonkey </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white "
                  aria-current="page"
                  to="/dashboard/general"
                >
                  General{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/business"
                >
                  Business
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/entertainment"
                >
                  Entertainment
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/health"
                >
                  Health
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/science"
                >
                  Science
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/sport"
                >
                  Sport
                </NavLink>
              </li>
              <li className="nav-item">
                {" "}
                <NavLink
                  className="nav-link navbar-brand text-white"
                  to="/dashboard/technology"
                >
                  Technology
                </NavLink>
              </li>
            </ul>
            <button className="navbar-brand logout-btn" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
