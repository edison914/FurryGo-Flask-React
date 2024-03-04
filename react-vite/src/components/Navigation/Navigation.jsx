import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";


function Navigation() {
  const userId = useSelector((state) => state.session?.user?.id);
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="navbarContainer">

        <NavLink className="navbarHome" to="/">Home</NavLink>


      <NavLink className="navbarNewPlace" to="/spots/new">
        Create Place
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
