import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";


function Navigation() {
  const userId = useSelector((state) => state.session?.user?.id);
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container">

      <NavLink className="navbar-logo container" to="/">
          <img className="navbar-logo" src="/FurryGo.png" alt="Home" />
        </NavLink>

        <NavLink className="navbarHome" to="/">Home</NavLink>


      <NavLink className="navbarNewPlace" to="/spots/new">
        Create
      </NavLink>

        {userId && (
          <NavLink className="navbarMyPlaces" to="/spots/current">
            My Places
          </NavLink>
        )}


        <div className="navbarProfileContainer">
          {currentUser && (
              <div className="navbarProfileName">Hello! {currentUser.nickname}</div>
          )}
          <ProfileButton/>
        </div>


    </div>
  );
}

export default Navigation;
