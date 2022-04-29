import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/auth";
const Profile = () => {
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  const handleButton = () => {
    const path = "/";
    navigate(path);
  };
  const handleButtonSettings = () => {
    const path="/profile/settings"
    navigate(path)
  }
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container mt-5">
      <div className="mt-5">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-md-7 mt-5">
            <div className="card p-3 py-4">
              <div className="text-center">
                {" "}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckiJRIUHSPAShHXrxFrmJsadwwcDmdcqS6w&usqp=CAU"
                  width="100"
                  className="rounded-circle"
                />{" "}
              </div>
              <div className="text-center mt-3">
                {" "}
                <span className="bg-secondary p-1 px-4 rounded text-black">
                  Profile
                </span>
                <h5 className="mt-2 mb-0">{currentUser.user.name}</h5>{" "}
                <span>{currentUser.user.username}</span>
                <br></br>
                <span>{currentUser.user.email}</span>
                <div className="px-4 mt-1"></div>
                <div className="buttons">
                  {" "}
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={handleButton}
                  >
                    New Article
                  </button>{" "}
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={handleButton}
                  >
                    Saved Atricles
                  </button>{" "}
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={handleButtonSettings}
                  >
                    Settings
                  </button>{" "}
                </div>
                <button
                    className="btn btn-outline-primary px-4 mt-2"
                    onClick={logOut}
                  >
                    LogOut
                  </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
