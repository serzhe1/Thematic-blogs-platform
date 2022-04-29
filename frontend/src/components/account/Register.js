import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    dispatch(register(name, username, email, password))
      .then(() => {
        setSuccessful(true);
        let path = `/login`;
        navigate(path);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const handleLogin = (e) => {
    let path = `/login`;
    navigate(path);
  };
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <form className="col-md-4">
          <fieldset>
            <div
              className="card border-info mb-3 mw-10 mt-5"
              alt="Max-width 10%"
            >
              <div className="card-header">Registration</div>
              <div className="card-body">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Name Surname"
                    onChange={onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                    onChange={onChangeUsername}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="emailaddress@email.com"
                    onChange={onChangeEmail}
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
                onClick={handleRegister}
              >
                SignUp
              </button>
              <p className="mt-3">or</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                LogIn
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};
export default Register;
