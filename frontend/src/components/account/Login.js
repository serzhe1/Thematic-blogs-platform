import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../store/actions/auth";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignup = (e) => {
    let path = `/signup`; 
    navigate(path);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(login(username, password))
      .then(() => {
        props.history.push("/profile");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form className="col-md-4">
          <fieldset>
            <div
              className="card border-info mb-3 mw-10 mt-5"
              alt="Max-width 10%"
            >
              <div className="card-header">LogIn</div>
              <div className="card-body">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Email address or username
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email or username"
                    onChange={onChangeUsername}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label mt-4"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={onChangePassword}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mw-50"
                onClick={handleLogin}
              >
                LogIn
              </button>
              <p className="mt-3">or</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignup}
              >
                SignUp
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default Login;
