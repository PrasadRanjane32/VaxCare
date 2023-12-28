

import { Link } from "react-router-dom";
import { useState } from "react";
import FormInput from "../components/FormInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";

import logo from "../logo.svg"; 

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    parentDOB: "",
    address: "",
    childName: "",
    childDOB: "",
    childGender: "",
    password: "",
    cpassword: "",

  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      parentName,
      parentEmail,
      parentPhone,
      parentDOB,
      address,
      childName,
      childDOB,
      childGender,
      password,
      cpassword,
    } = values;

    if (password !== cpassword) {
      notifyToast("The passwords do not match");
      return;
    }
    const response = fetch("/register", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentName,
        parentEmail,
        parentPhone,
        parentDOB,
        address,
        childName,
        childDOB,
        childGender,
        password,
        cpassword,
      }),
    });

    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Friday hai!....");
          break;
        }
        case 400: {
          res.json().then((json) => {
            json.error.forEach((error) => {
              notifyToast(error.msg);
            });
          });
          break;
        }
        case 500: {
          notifyToast("Monday hai");
          break;
        }
        default:
          break;
      }
    });
  };
  return (
    <div className="auth-background fWhite">
    
    <div className="signup-container">
    <nav class="nav-bar row top navbar-expand-lg">

<div className=" col-8">

  <div className="logo">

    <img
      src={logo}
      className=" logo-large navbar-brand"
      alt="Child Vaccination Tracker"
      width={75}
    />
    <b className="px-3">| For Every Child </b>
  </div>
  <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon">

    </span>
  </button>

</div>

<div class="collapse navbar-collapse col-2" id="navbarTogglerDemo02">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Vaccines</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">FAQ</a>
    </li>
  </ul>
</div>




<div className="top-item col-3">

  <input
    type="button"
    className="btn btn-shadow btn-outline-success"
    value=" Login "
    onClick={() => {
      navigate("/login");
    }}
  />
  <p className="login-text">Already have an account?</p>
</div>

</nav>

        
     

      <div className="regform">
        <form className="reg-form" onSubmit={handleSubmit}>
          <div className="formparts-container">
          <div className="left">
            <h1 className="primary title">Registration</h1>
            <h2 className="st fAccent">Parent's Details</h2>
            <FormInput
              type="text"
              name="parentName"
              placeholder="Parent's Name"
              labeltext="Full Name:"
              inputIcon="escalator_warning"
              handleChange={handleChange}
              value={values.parentName}
            />

            <br />
            <FormInput
              type="text"
              name="parentEmail"
              labeltext="Email:"
              inputIcon="mail"
              placeholder="Enter your email"
              handleChange={handleChange}
              value={values.parentEmail}
            />
            <br />
            <FormInput
              type="text"
              name="parentPhone"
              labeltext="Phone:"
              inputIcon="call"
              placeholder="Parent's Contact Number"
              handleChange={handleChange}
              value={values.parentPhone}
            />

            <br />
            <FormInput
              type="date"
              labeltext="Parent's Date of Birth:"
              name="parentDOB"
              placeholder="Date"
              handleChange={handleChange}
              value={values.parentDOB}
            />
            <br />
            <FormInput
              type="text"
              name="address"
              labeltext="Address:"
              placeholder="Address"
              inputIcon="home"
              handleChange={handleChange}
              value={values.address}
            />
          </div>
          <div className="right">
            <h2 className="st fAccent">Child's Details</h2>
            <FormInput
              type="text"
              name="childName"
              labeltext="Name:"
              inputIcon="child_care"
              placeholder="Child's Name"
              handleChange={handleChange}
              value={values.childName}
            />
            <br />
            <FormInput
              type="date"
              labeltext="Child's Date of Birth:"
              name="childDOB"
              placeholder="Child's Date of Birth"
              handleChange={handleChange}
              value={values.childDOB}
            />
            <br />
            <label className="primary">
              Gender:
              <br />
              <br />
              <input
                type="radio"
                value="male"
                name="childGender"
                onChange={handleChange}
              />
              Male
              <input
                type="radio"
                value="female"
                name="childGender"
                onChange={handleChange}
              />
              Female
            </label>
            <br />
            <h2 className="st fAccent">Password Creation</h2>
            {/* <p className="fAccent justify-text">Create a strong password.<br/>
             It must be at least 6 character long.<br/>
             A password must contain symbols,<br/>
              upper case letters, lowercase letters and numbers.</p> */}
            <FormInput
              labeltext="Password"
              type="password"
              name="password"
              inputIcon="lock"
              value={values.password}
              handleChange={handleChange}
              placeholder="Set a Password"
            />
            <br />
            <FormInput
              labeltext="Confirm Password"
              type="password"
              name="cpassword"
              inputIcon="lock"
              value={values.cpassword}
              handleChange={handleChange}
              placeholder="Enter the password again"
            />
            <input
            className="submitButton btn primary"
            type="submit"
            value="Sign Up >>"
          />

          </div>
          </div>
          <br />

          
        </form>
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}

export default SignUp;
