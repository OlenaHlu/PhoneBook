import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  function getClassActiveLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }

  return (
    <div className={css.container}>
      <NavLink to="/register" className={getClassActiveLink}>
        Register
      </NavLink>
      <NavLink to="/login" className={getClassActiveLink}>
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;
