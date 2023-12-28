import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifyToast } from "../functions/notifyToast";
import logo from "../logo.png";
import chome from "../images/childhome.jpg";
import vaccin from "../images/vaccines.png";
import vnotfound from "../images/cart.svg";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  const [Vdetails, setVdetails] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);

  // Toggle the state of a card (expanded or collapsed)
  const handleReadMoreClick = (index) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.includes(index)
        ? prevExpandedCards.filter((item) => item !== index)
        : [...prevExpandedCards, index]
    );
  };

  const getVaccinedata = () => {
    fetch("/GetVaccines", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((json) => {
            if (json && Array.isArray(json.Vaccines)) {
              setVdetails(json.Vaccines);
            } else {
              setVdetails([]);
            }
          });
        } else {
          console.error("Failed to fetch vaccination data");
        }
      })
      .catch((error) => {
        console.error("Error fetching vaccination data:", error);
      });
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    switch (userType) {
      case "v":
        notifyToast("Unauthorised", "error");
        navigate("/vcdash");
        break;
      case "p":
        notifyToast("Unauthorised", "error");
        navigate("/parentHome");
        break;
      case "a":
        notifyToast("Unauthorised", "error");
        navigate("/AdminDash");
        break;
      default:
        break;
    }

    getVaccinedata();
  }, []);

  return (
    <>

      <div className="fWhite">
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

        {/* <div className="top">
        <div className="top-item logo">
          <img
            src={logo}
            className=" logo-large "
            alt="Child Vaccination Tracker"
          />
        </div>
        <div className="top-item">
          <p>Already have an account?</p>

          <input
            type="button"
            className="btn btn-shadow"
            value="Login >>"
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      </div> */}

        {/* <div className="empty-col"><h1>Child Vaccination Tracker</h1>
        <div className="empty-row-by-2"></div>
        </div>
        <div className="home-division">
          <div className="left">
            <div>
              <h2>Parent's Registration</h2>
              <p>
                Welcome to Child Vaccination Tracker.
                
                Timely vaccinations are neccessary for every child's health.
                
                CVT lets you track your child's vaccine.
              
                Ensure your child's vaccines are administered at the correct
             
                Register now!
              </p>
              <br/>
              <input
                type="button"
                className="btn btn-shadow"
                value="Register Now >>"
                onClick={() => {
                  navigate("/signup");
                }}
              />
            </div>
          </div>

          <div className="right">
            <div>
              <h2>Vaccination Center's Registration </h2>
              <p>
                Welcome to Child Vaccination Tracker.
                
                Timely vaccinations are neccessary for every child's health.
                
                CVT lets you track your child's vaccine.
             
                Ensure your child's vaccines are administered at the correct
                time.
             
                Register now!
              </p>
              <br/>
              <input
                type="button"
                className="btn wraap btn-shadow"
                value="Register Now >>"
                onClick={() => {
                  navigate("/VCReg");
                }}
              />
            </div>
          </div>
        </div> */}
        
      </div>

      <div className="home-container row">

        <div className="col-6">
          <h1 className="h1 ">
            Know your child's vaccination schedule
          </h1>
          <b>#LongLifeForAll</b>

          <h3 className="sub-title center ">
            Which vaccines do children need to be given before they turn 16?
          </h3>
        </div>
        <div className="col-6">
          <img src={chome} className=" chome col-8" alt="Kids" draggable="false" />
        </div>
      </div>

      <div className="VaccineCard">
        <h2 className="vcard-title">Vaccines To Preserve Smiles.</h2>
        {/* <b className="login-text b">"Protecting Lives, Preserving Smiles."</b> */}
        <b className="login-text b">"A Stronger Tomorrow Starts with Vaccines Today."</b>
        <div className="VaccineD ">
          {Vdetails.length > 0 ? (
            <>
              {Vdetails.map((vaccine, index) => (
                index <= 7 && (
                  <div className="card VHcard" key={index}>
                    <div className="card-body">
                      <div className=" ">
                        <img src={vaccin} className="vaccinlogo" alt="" />
                        <br />
                        <strong className="card-title">{vaccine.vName}</strong>
                        <br />
                        <hr />
                        <br />

                        <strong className="card-subtitle mb-2 text-muted">
                          ShortName:
                        </strong>{" "}
                        {vaccine.vShortName}
                        <br />
                        <strong className="card-description">SideEffects:</strong> {vaccine.vSideEffects}
                        <br />
                        <strong className="card-description">
                          DiseasePrevented:
                        </strong>{" "}
                        {vaccine.vDiseasePrevented}
                        <br />
                        {/*  Conditional rendering of content */}
                        {expandedCards.includes(index) ? (
                          <>


                            <strong className="card-description">
                              Description:
                            </strong>{" "}
                            <br />
                            {vaccine.vDesc}
                            <br />
                            <strong>Range Between:</strong>{" "}
                            {vaccine.vStartRange} - {vaccine.vEndRange}
                            <br />
                            <button
                              className="btn btn-link btn-read-more btn-shadow"
                              onClick={() => handleReadMoreClick(index)}
                            >
                              Read Less
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-link btn-read-more btn-shadow"
                            onClick={() => handleReadMoreClick(index)}  >
                            Read Description
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </>
          ) : (
            <b>
              <img src={vnotfound} className="vnotfound" alt="" />
              No vaccination details available.
            </b>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home