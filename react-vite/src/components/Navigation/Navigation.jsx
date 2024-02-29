import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {

  const userId = useSelector((state) => state.session?.user?.id)

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>

        <NavLink className='navbarNewPlace' to="/spots/new">Create Place</NavLink>
        <div>{userId && <NavLink className='navbarMyPlaces' to="/spots/current">My Places</NavLink>}</div>
    </ul>
  );
}

export default Navigation;
