import React from 'react';
import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className="single_footer">
                <h4>Services</h4>
                <ul>
                  <li><a href="#">Child Vaccination Tracking</a></li>
                  <li><a href="#">Vaccine Scheduling</a></li>
                  <li><a href="#">Vaccine Reminders</a></li>
                  <li><a href="/VCReg" onClick={() => {
                  navigate("/VCReg");
                }}>Vaccination Center Registration</a></li>
                 
                  <li><a href="#">Healthcare Providers</a></li>
                  <li><a href="#">FAQs</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="single_footer single_footer_address">
                <h4>Useful Links</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-xs-12">
              <p className="copyright">
                &copy; {new Date().getFullYear()} VaxCare (Child Vaccination Tracking System.) All rights reserved.
                <br/>Made In India ❤
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;
