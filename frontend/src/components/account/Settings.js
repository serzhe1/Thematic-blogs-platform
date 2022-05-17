import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { editUser } from "../../store/actions/auth";

export default function ProfileSettings(props) {
  const [name, setName] = useState("");
  const [accordion, setAccordion] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeMatchPassword = (e) => {
    const matchPassword = e.target.value;
    setMatchPassword(matchPassword);
  };
  const changeStateAccordion = () => {
    setAccordion(!accordion);
  };

  const handleCancel = () => {
    const path = "/profile";
    navigate(path);
  };
  const handleEdit = (e) => {
    if (password != matchPassword) password = "";
    
    e.preventDefault();
    dispatch(
      editUser(currentUser.user.id, name, username, email, password)
    ).then(() => {
      const path = "/profile";
      navigate(path);
    });
  };

  const showNoMatchPasswordsError = () => {
    if (password != matchPassword) {
      return "alert alert-dismissible alert-danger";
    }

    return "alert alert-dismissible alert-danger d-none";
  };

  const showPasswords = () => {
    if (accordion) return "accordion-collapse collapse show";
    else return "accordion-collapse collapse";
  };
  if (!currentUser) {
    return <Navigate to="/login" />;
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
              <div className="card-header">Edit Profile</div>
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
                    defaultValue={currentUser.user.name}
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
                    defaultValue={currentUser.user.username}
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
                    defaultValue={currentUser.user.email}
                    onChange={onChangeEmail}
                  />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-11">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded={accordion}
                          aria-controls="collapseOne"
                          onClick={changeStateAccordion}
                        >
                          Change Password
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className={showPasswords()}
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div className={showNoMatchPasswordsError()}>
                          <strong>Incorrect password!</strong> Passwords do not
                          match!
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
                            placeholder="New Password"
                            onChange={onChangePassword}
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label mt-4"
                          >
                            Repeat Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Repeat Password"
                            onChange={onChangeMatchPassword}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mw-50 mt-3"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-primary mw-50 mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
