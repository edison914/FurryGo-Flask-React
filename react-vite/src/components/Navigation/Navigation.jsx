import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>

        <NavLink className='navbarNewPlace' to="/spots/new">Create Place</NavLink>
    </ul>
  );
}

export default Navigation;
