import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";

const  RegStep2 = ({ handleChange, values, handleGetLocation }) => {
  const [cities, setCities] = useState([]);

  const handleStateChange = (event) => {
    switch (event.target.value) {
      case "Andhra Pradesh":
        setCities(["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur"]);
        break;
      case "Arunachal Pradesh":
        setCities(["Itanagar", "Tawang", "Namsai", "Changlang"]);
        break;
      case "Assam":
        setCities(["Guwahati", "Dispur", "Tezpur", "Jorhat"]);
        break;
      case "Bihar":
        setCities(["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"]);
        break;
      case "Chhattisgarh":
        setCities(["Raipur", "Bhilai", "Bilaspur", "Korba"]);
        break;
      case "Goa":
        setCities(["Panaji", "Margao", "Vasco da Gama", "Mapusa"]);
        break;
      case "Gujarat":
        setCities(["Ahmedabad", "Surat", "Vadodara", "Rajkot"]);
        break;
      case "Haryana":
        setCities(["Chandigarh", "Faridabad", "Gurgaon", "Hisar"]);
        break;
      case "Himachal Pradesh":
        setCities(["Shimla", "Mandi", "Dharamshala", "Solan"]);
        break;
      case "Jharkhand":
        setCities(["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City"]);
        break;
      case "Karnataka":
        setCities(["Bangalore", "Mysore", "Hubli", "Mangalore"]);
        break;
      case "Kerala":
        setCities(["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam"]);
        break;
      case "Maharashtra":
        setCities(["Mumbai", "Pune", "Nagpur", "Thane"]);
        break;
      case "Madhya Pradesh":
        setCities(["Indore", "Bhopal", "Jabalpur", "Gwalior"]);
        break;
      case "Manipur":
        setCities(["Imphal", "Thoubal", "Bishnupur", "Churachandpur"]);
        break;
      case "Meghalaya":
        setCities(["Shillong", "Tura", "Nongstoin", "Baghmara"]);
        break;
      case "Mizoram":
        setCities(["Aizawl", "Lunglei", "Champhai", "Serchhip"]);
        break;
      case "Nagaland":
        setCities(["Kohima", "Dimapur", "Mokokchung", "Tuensang"]);
        break;
      case "Odisha":
        setCities(["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"]);
        break;
      case "Punjab":
        setCities(["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"]);
        break;
      case "Rajasthan":
        setCities(["Jaipur", "Jodhpur", "Udaipur", "Ajmer"]);
        break;
      case "Sikkim":
        setCities(["Gangtok", "Namchi", "Rangpo", "Mangan"]);
        break;
      case "Tamil Nadu":
        setCities(["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"]);
        break;
      case "Tripura":
        setCities(["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"]);
        break;
      case "Telangana":
        setCities(["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"]);
        break;
      case "Uttar Pradesh":
        setCities(["Lucknow", "Kanpur", "Varanasi", "Agra"]);
        break;
      case "Uttarakhand":
        setCities(["Dehradun", "Haridwar", "Roorkee", "Haldwani"]);
        break;
      case "West Bengal":
        setCities(["Kolkata", "Asansol", "Siliguri", "Durgapur"]);
        break;
      case "Andaman and Nicobar Islands":
        setCities(["Port Blair", "Havelock Island", "Neil Island"]);
        break;
      case "Chandigarh":
        setCities(["Chandigarh"]);
        break;
      case "DNHDD":
        setCities(["Daman", "Diu", "Silvassa", "Kavaratti"]);
        break;
      case "Delhi":
        setCities(["New Delhi", "North Delhi", "South Delhi", "West Delhi"]);
        break;
      case "Jammu and Kashmir":
        setCities(["Srinagar", "Jammu", "Anantnag", "Baramulla"]);
        break;
      case "Ladakh":
        setCities(["Leh", "Kargil", "Nubra Valley"]);
        break;
      case "Lakshadweep":
        setCities(["Kavaratti", "Agatti", "Andrott", "Amini"]);
        break;
      case "Puducherry":
        setCities(["Pondicherry", "Karaikal", "Mahe", "Yanam"]);
        break;
      default:
        setCities([]);
        break;
    }
  };
  useEffect(() => {
   handleGetLocation();
  })

  return (
    <>
      <h2 className="st">Enter your Address</h2>
      <div className="reg-container">
        <div className="flex-row">
          <FormInput
            name="addrHouseNo"
            type="text"
            labeltext="House No:"
            placeholder="House No."
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrHouseNo}
          />

          <FormInput
            name="addrLocality"
            type="text"
            labeltext="Locality:"
            placeholder="Locality"
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrLocality}
          />

          <FormInput
            name="addrRoad"
            type="text"
            labeltext="Road/Street:"
            placeholder="Road/Street"
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrRoad}
          />
        </div>
     
        <div className="flex-row">
        <div className="flex-item">
            <label className="secondary" htmlFor="vDesc">
              State:
              <div className="SelectContainer">
                <select
                  name="addrState"
                  onChange={(event) => {
                    handleChange(event);
                    handleStateChange(event);
                  }}
                  value={values.addrState}
                  className="Form-input name form-select SelectContainer"
                >
                  <option value="" disabled>
                    --Select State--
                  </option>
                  <optgroup label="States">
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
  </optgroup>
  <optgroup label="Union Territories">
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="DNHDD">DNHDD</option>
    <option value="Delhi">Delhi</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </optgroup>
                </select>
              </div>
            </label>
          </div>
          {cities.length > 0 && (
            <div className="flex-item col-sm-3">
              <label htmlFor="city">Select City:</label>
              <div className="SelectContainer">
              <select
                id="city"
                name="addrCity"
                onChange={handleChange}
                value={values.addrCity}
                className="Form-input name form-select SelectContainer "
              >
                <option value="" disabled>
                  --Select City--
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              </div>
            </div>
          )}

          <FormInput
            type="text"
            name="addrTaluka"
            labeltext="Taluka/Tehsil:"
            placeholder="Taluka/Tehsil"
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrTaluka}
          />

          
        </div>
        <div className="flex-row">
      
        <FormInput
            type="text"
            name="addrDistrict"
            labeltext="District:"
            placeholder="District"
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrDistrict}
          />
          <FormInput
            type="text"
            name="addrCountry"
            labeltext="Country:"
            placeholder="Country"
            inputIcon="home"
            disable="true"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrCountry}
          />

          <FormInput
            type="text"
            name="addrPinCode"
            labeltext="Pin Code:"
            placeholder="Pin Code"
            inputIcon="home"
            labelClassName="flex-item"
            handleChange={handleChange}
            value={values.addrPinCode}
          />
        </div>
        
      </div>
    </>
  );
};

export default  RegStep2;
