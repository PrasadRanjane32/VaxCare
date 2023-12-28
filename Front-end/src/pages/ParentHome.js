import { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { notifyToast } from "../functions/notifyToast";
import { Logout } from "../functions/Logout";

import { UserContext } from "../App";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

function ParentHome() {
  let { state, dispatch } = useContext(UserContext);

  const getAgeInDays = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    const diffMilliseconds = Math.abs(today - birthDate);
    const days = Math.floor(diffMilliseconds / 86400000);
    const weeks = Math.floor(diffMilliseconds / 86400000 / 7);

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return days;
  };

  function getAgeReadable(dob1) {
    const Input = getAgeInDays(dob1);
    const years = Math.floor(Input / 365);

    const months = Input % Math.floor(365 / 30);
    const weeks = (Input % 365) % Math.floor(30 / 7);
    const days = ((Input % 365) % 30) % 7;

    const output =
      years > 0
        ? `${years} years`
        : "" + months > 0
        ? `${months} months`
        : "" + weeks > 0
        ? `${weeks} weeks`
        : "" + days > 0
        ? `${days} days`
        : "0 days";
    // const output=`${years} years${months} months ${weeks} weeks ${days} days`

    return output;
  }
  const readableDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString(undefined, options);
  };
  
  const navigate = useNavigate();

  const [selectValue, setSelectValue] = useState("");

  function handleSelectChange(event) {
    setSelectValue(event.target.value);
  }

  const [userData, setUserData] = useState();
  const [Vdetails, setVdetails] = useState();
  const [childVDetails, setChildVDetails] = useState();
  const [loading, setLoading] = useState(true);

  const searchChild = (arr, id) => {
    for (const ele of arr) {
      if (ele._id === id) {
        return ele;
      }
    }
  };

  const childperVD = (arr = "000", id) => {
    if (arr === "000") return "p";
    for (const ele of arr) {
      let item = ele["vid"];
      if (item.vid === id) {
        return item.aStatus;
      }
    }
    return "p";
  };

  const cancelAppointment = (pid, cid, vid) => {
    if (!window.confirm("Do you want to proceed?")) return false;

    fetch("/cancelAppointment", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ pid: pid, cid: cid, vid: vid }),
    }).then((res) => {
      if (res.status === 200) {
      
        notifyToast("Appointment Cancelled", "success");
        
      }
    });
  };

  const pageParentHome = () => {
    fetch("/ParentHome", {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 201) {
        res.json().then((json) => {
          setUserData(json);
          localStorage.setItem("Email", json.Email);
          Appointmentsperchild(json._id);
          dispatch({ type: "USER", payload: false });
        });
      }
      if (res.status === 401) {
        localStorage.setItem("userType", "UNKNOWN");
        Logout();
        navigate("/login");
      }
    });
  };

  const Appointmentsperchild = (pid) => {
    fetch("/Appointmentsperchild", {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ pid: pid }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((json) => {
          setVdetails(json.astati);
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "p") {
      switch (userType) {
        case "v":
        case "vr":
        case "vrr":
        case "vu":
          notifyToast("Unauthorised", "error");
          navigate("/vcdash");
          break;
        case "a":
          notifyToast("Unauthorised", "error");
          navigate("/Admin");
          break;
        default:
          notifyToast("Login First", "error");
          localStorage.setItem("userType", "UNKNOWN");
          navigate("/login");
          break;
      }
    }

    pageParentHome();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const x = searchChild(userData.children, selectValue) || userData.children[0];

  const selectedChild = searchChild(userData.children, selectValue) || userData.children[0];
  let childVD = Vdetails[selectedChild._id];

  return (
    <div>
      <div className="Parentcontainer">
        <div className="Nbackground ">
          <div className="belowNav">
            <h1 className="h1">Vaccination Tracker</h1>
            <div className="childSelector">
              <div className="child-select">
                Hello, <b>{userData.parentName} </b> <br />
                Select a child:
              </div>
              <div>
                <select
                  onChange={handleSelectChange}
                  defaultValue={userData.children[0]}
                  placeholder="Select Child"
                  className="child-select"
                >
                  {userData.children.map((child) => (
                    <option
                      className="child-option"
                      key={child._id}
                      value={child._id}
                    >
                      {child.childName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br />
            <table className="child-details-table">
              <tbody>
                <tr>
                  <th>Name:</th>
                  <td>{selectedChild.childName}</td>
                  <th>Date of Birth:</th>
                  <td>{readableDate(selectedChild.childDOB)}</td>
                  <th>Age:</th>
                  <td>{getAgeReadable(selectedChild.childDOB)}</td>
                  <th>Gender:</th>
                  <td>{selectedChild.childGender}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <div className="tracker">
              <div className="vMgmntActions Margin5">
                <div className="Note">
                  --Collapse each vaccine tab to show details and Get an
                  appointment.--
                  <br />
                  --Green indicates that the vaccine is administered.--
                </div>

                <div className="vaccine-list">
                  {selectedChild.Vaccines.map((item, index) => {
                    const vaccineAgeRange = item.vStartRangeNumber + " " + item.vStartRangePost;
                    const childDOB = selectedChild.childDOB;
                    const childAgeInDays = getAgeInDays(childDOB);
                    const isVaccineVisible = childAgeInDays >= item.vSortVar;

                    return (
                      isVaccineVisible && (
                        <Accordion key={item._id} allowZeroExpanded>
                          <AccordionItem>
                            <AccordionItemHeading>
                              <AccordionItemButton className="accordion__button">
                                {index + 1} - {vaccineAgeRange} - {item.vShortName} - {item.vName} -{" "}
                                {childperVD(childVD, item._id) === "a"
                                  ? "Appointment Booked"
                                  : childperVD(childVD, item._id) === "d"
                                  ? "Completed"
                                  : childperVD(childVD, item._id) === "p"
                                  ? "Pending"
                                  : childperVD(childVD, item._id) === "c"
                                  ? "Appointment Canceled"
                                  : ""}
                              </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                              <b className="v-accordion-key">Disease Prevented:</b>
                              <div className="v-accordion-value">{item.vDiseasePrevented}</div>
                              <b className="v-accordion-key">Medium:</b>
                              <div className="v-accordion-value">{item.medium}</div>
                              <b className="v-accordion-key">Side Effects:</b>
                              <div className="v-accordion-value">
                                <ul>
                                  {item.vSideEffects.map((se) => (
                                    <li key={se}>{se}</li>
                                  ))}
                                </ul>
                              </div>
                              <b className="v-accordion-key">Description:</b>
                              <div className="v-accordion-value text-justify">{item.vDesc}</div>
                              {
                            getAgeInDays(x.childDOB)<=item.vSortVar?
                            <div className="btn bGrey fGreen">Book Appointment</div>:
                            
                            
                            childperVD(childVD, item._id) == "a"
                                ?(<button
                                className="button btn2 bGrey fWhite"
                                onClick={() =>
                                  
                                  cancelAppointment(userData._id,x._id,item._id)
                                }
                              >
                                Cancel appointment?
                                
                              </button>)
                                : childperVD(childVD, item._id) == "d"
                                ? "Completed"
                                : childperVD(childVD, item._id) == "p"
                                ? (
                                  <button
                                    className="button btn2 bGreen fWhite"
                                    onClick={() =>
                                      navigate("/VCChooser", {
                                        state: {
                                          userData: userData,
                                          vid: item._id,
                                          pid: userData._id,
                                          child: x,
                                          vaccine: item,
                                        },
                                      })
                                    }
                                  >
                                    Book Appointment{" >>"}
                                  </button>
                                )
                                : childperVD(childVD, item._id) == "c"
                                ? (
                                  <button
                                    className="button btn2"
                                    onClick={() =>
                                      navigate("/VCChooser", {
                                        state: {
                                          userData: userData,
                                          vid: item._id,
                                          pid: userData._id,
                                          child: x,
                                          vaccine: item,
                                        },
                                      })
                                    }
                                  >
                                    Canceled appointment!Reschedule?
                                    
                                  </button>
                                )
                                : ""
                                  } 
                            </AccordionItemPanel>
                          </AccordionItem>
                        </Accordion>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentHome;
