import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  function getClassActiveLink({ isActive }) {
    return clsx(css.link, isActive && css.active);
  }
  return (
    <nav>
      <ul>
        <li className={css.headerLink}>
          <NavLink to="/" className={getClassActiveLink}>
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className={css.headerLink}>
            <NavLink to="/contacts" className={getClassActiveLink}>
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
