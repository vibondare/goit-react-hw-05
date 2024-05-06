import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from 'clsx';

const buildNavLinkClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.navLinkIsActive);
  };
  

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={buildNavLinkClass}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={buildNavLinkClass}
      >
        Movies
      </NavLink>
    </nav>
  );
}
