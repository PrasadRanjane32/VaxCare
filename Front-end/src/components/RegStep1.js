import React from "react";
import FormInput from "./FormInput";
import moment from "moment";

const year = moment().year();
const RegStep1 = ({ values, handleChange }) => {
  const today = moment();
  const maxYear = today.year() - 20;
  const minYear = today.year();

  const year = moment().year();
  return (
    <>
      <h2 className="st">Parent's Details</h2>
      <FormInput
        type="text"
        name="parentName"
        placeholder="Parent's Name"
        labeltext="Full Name:"
        inputIcon="escalator_warning"
        handleChange={handleChange}
        value={values.parentName}
      />

      <FormInput
        type="number"
        name="parentPhone"
        labeltext="Phone:"
        inputIcon="call"
        placeholder="Parent's Contact Number"
        handleChange={handleChange}
        value={values.parentPhone}
      />

<FormInput
        type="date"
        labeltext="Parent's Date of Birth:"
        name="parentDOB"
        placeholder="Date"
        handleChange={handleChange}
        value={values.parentDOB}
        max={maxYear}
        min={minYear}
        maxDate={moment().toDate()}
      />
    </>
  );
};
export default RegStep1;
