import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

export const Sidebar = (): JSX.Element => {
  return (
    <nav className="sidebar">
      <NavLink to={"/"}>Inventory</NavLink>
      <NavLink to={"sales"}>Sales</NavLink>
    </nav>
  );
};
