
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyToast } from "../functions/notifyToast";
import { useNavigate } from "react-router-dom";

import logo from "../logo.png";
import RegStep1 from "../components/RegStep1";
import RegStep2 from "../components/RegStep2";
import RegStep3 from "../components/RegStep3";
import RegStep4 from "../components/RegStep4";
import RegStep5 from "../components/RegStep5";
function SignUp2() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [values, setValues] = useState({
    parentName: "",
    Email: "",
    cEmail:"",
    parentPhone: "",
    parentDOB: "",
    userType:"p",
    addrHouseNo: "",
    addrLocality: "",
    addrRoad: "",
    addrCity: "",
    addrTaluka: "",
    addrDistrict: "",
    addrState: "",
    addrCountry: "India",
    addrPinCode: "",
    locationLat:"",
    locationLon:"",
    childName: "",
    childDOB: "",
    childGender: "male",
    password: "",
    cpassword: "",

  });
  const[locationLat,setLocationLat]=useState(null);
  const[locationLon,setLocationLon]=useState(null);
  let name, value;
  const validate = (e) => {
    switch (step) {
      case 1: { // Parent Details
        if (values.parentName.length < 1) {
          notifyToast("Parent's Name cannot be Empty", "error");
          return false;
        } else if (values.parentName.length < 3) {
          notifyToast("Parent's Name is too short", "error");
          return false;
        } else if (values.parentPhone.length < 1) {
          notifyToast("Phone number is required.", "error");
          return false;
        } else if (!values.parentPhone.match(/^\d{10,10}$/)) {
          notifyToast("Phone number is invalid", "error");
          return false;
        } else if (!values.parentDOB) {
          notifyToast("Parent DOB is required", "error");
          return false;
        } else {
          const currentDate = new Date();
          const parentDOB = new Date(values.parentDOB);
          const diffInMilliseconds = currentDate - parentDOB;
          const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    
          if (diffInYears < 19) {
            notifyToast("Parent must be at least 19 years old", "error");
            return false;
          }
        }
    
        return true;
      }    

      case 2: {//Address

        if (values.addrHouseNo.length < 1) {
          notifyToast("House No. cannot be Empty", "error");
          return false;
        } else if (values.addrLocality.length < 3) {
          notifyToast("Locality is too short", "error");
          return false;
        } 
        else if (values.addrCity.length < 3) {
          notifyToast("City/Town is too short", "error");
          return false;
        } 
        else if (values.addrTaluka.length < 3) {
          notifyToast("Taluka/Tehsil is too short", "error");
          return false;
        } 
        else if (values.addrDistrict.length < 3) {
          notifyToast("District is too short", "error");
          return false;
        } 
        else if (values.addrState.length < 3) {
          notifyToast("State is too short", "error");
          return false;
        } 
        else if (values.addrCountry.length < 1) {
          notifyToast("Country is too short", "error");
          return false;
        } 
        else if (values.addrPinCode.length < 1) {
          notifyToast("Pin Code is required ", "error");
          return false;
        }
        else if(!values.addrPinCode.match(/^\d{6,6}$/)){
          notifyToast("Pin Code is invalid", "error");
          return false;
        }
        else if(locationLat==null){
          notifyToast("Please provide your location", "error");
          handleGetLocation();
          return false;
        }
        
        else return true;
       
      }

      case 3:{//Child Details
        if (values.childName.length < 3) {
          notifyToast("Child's Name is required", "error");
          return false;
        } else if (!values.childDOB) {
          notifyToast("Child DOB is required", "error");
          return false;
        } else {
          const dob = new Date(values.childDOB);
          const currentDate = new Date();
          const ageInYears = (currentDate - dob) / (1000 * 60 * 60 * 24 * 365.25);
        
          if (ageInYears >= 16) {
            notifyToast("Child must be less than 16 years old", "error");
            return false;
          }
          
          return true;
      }
    }
        

      case 4:{//Password
        if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          notifyToast("Please set a strong password", "error");
          return false;
        }else if (!values.password.match(values.cpassword)){
          notifyToast("Passwords do not match", "error");
          return false;
        }
        else return true;
      }
      case 5:{//Password
          if (!values.Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            notifyToast("Please enter a valid Email", "error");
            return false;
          }else if (!values.Email.match(values.cEmail)){
            notifyToast("Emails do not match", "error");
            return false;
          }
          else return true;
        }
      default:
        return false;
    }
  };
  const handleNext = (e) => {
    console.log(step);

    if (step === 1) {
      if (validate()) {
        // disablePrevButton()
        setStep(2);
      }
    }
    if (step === 2) {
      if (validate()) {
        setStep(3);
      }
    }
    if (step === 3) {
      if (validate()) {
        setStep(4);
      }
    }
    if (step === 4) {
      if (validate()) {
        setStep(5);
        //disableNextButton()
      }
    }
    if (step === 5) {
      if (validate()) {
        
        handleSubmit(e);
        //disableNextButton()
      }
      
    }
  };
  const handlePrev = (e) => {
    if (step > 1) {
      setStep(step - 1);
      if (step >= 5) {
      }
    }
  };
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  function handleGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocationLat(position.coords.latitude);
          setLocationLon(position.coords.longitude);
          console.log(locationLat)
        },
        error => {
          console.log(error);
          if(error.code===1){
            alert("Please allow location permission")
          }
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      parentName,
      Email,
      parentPhone,
      parentDOB,
      userType,
      addrHouseNo,
      addrLocality,
      addrRoad,
      addrCity,
      addrTaluka,
      addrDistrict,
      addrState,
      addrCountry,
      addrPinCode,
  
      childName,
      childDOB,
      childGender,
      password,
    } = values;

    
    const response = fetch("/parentRegister", {
      method: "POST",

      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentName,
        Email,
        parentPhone,
        parentDOB,
        userType,
        address:{
          addrHouseNo,
      addrLocality,
      addrRoad,
      addrCity,
      addrTaluka,
      addrDistrict,
      addrState,
      addrCountry,
      addrPinCode,
        },
                locationLat:locationLat,
        locationLon:locationLon,
        childName,
        childDOB,
        childGender,
        password,
        
      }),
    });

    response.then((res) => {
      switch (res.status) {
        case 201: {
          notifyToast("Registred Successfully","success");
          navigate("/login");
          break;
        }
        case 400: {
          res.json().then((json) => {
            json.error.forEach((error) => {
              notifyToast(error.msg,"error");
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
  const StepRender = (values, handleChange) => {
    switch (step) {
      case 1:
        return <RegStep1 values={values} handleChange={handleChange} />;

      case 2:
        return <RegStep2 values={values} handleChange={handleChange} handleGetLocation={handleGetLocation}/>;

      case 3:
        return <RegStep3 values={values} handleChange={handleChange} />;

      case 4:
        return <RegStep4 values={values} handleChange={handleChange} />;
      case 5:
        return <RegStep5 values={values} handleChange={handleChange} />;
      default:
        return <RegStep1 values={values} handleChange={handleChange} />;
    }
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
          <div className="RegStep">
             {StepRender(values, handleChange)}
             </div>
          </form>
          <div className="stepButtons">
            <button
              className="btn"
              disabled={step === 1 ? true : false}
              onClick={handlePrev}
              
            >
              {"<< Back"}
            </button>
            <button
              className="btn Nbtn"
              disabled={step > 5 ? true : false}
              onClick={handleNext}
            >
              {step === 5 ? "Sign Up >>" : "Next >>"}
            </button>
          </div>

        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default SignUp2;
