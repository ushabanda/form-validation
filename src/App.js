import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./form.style.css";

function App() {
  const initialValue = { firstname: "", email: "", phone: "", password: "" };
  const [formValue, setFormValue] = useState(initialValue);
  const [formerrors, setFormerrors] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    //setFormerrors(validate(formValue));
    setFormerrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValue);
    //setFormerrors(validate(formValue));
    setFormerrors(errors);
    setIssubmit(true);
  };

  useEffect(() => {
    // console.log(formerrors);
    if (Object.keys(formerrors).length === 0 && issubmit) {
      // console.log(formValue);
    }
  }, [formerrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "Please enter Firstname";
    }
    if (!values.email) {
      errors.email = "Please enter your Email";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.phone) {
      errors.phone = "Please enter phone number";
    }
    if (!values.password) {
      errors.password = "Please enter password";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };
  return (
    <div>
      {Object.keys(formerrors).length === 0 && issubmit ? (
        <div className="ui message success"><h1>Registration successfull</h1></div>
      ) : (
        <div>
          {/* <pre>{JSON.stringify(formValue, undefined, 2)}</pre>
          <pre>{JSON.stringify(formerrors, undefined, 2)}</pre> */}
        </div>
      )}

      <div className="container">
        <form>
          <h3>Form validation</h3>
          <TextField
            id="filled-basic"
            label="FirstName"
            name="firstname"
            value={formValue.firstname}
            onChange={handlechange}
            // onSelect={handlechange}
            error={!!formerrors.firstname}
            
          />
          <p>{formerrors.firstname}</p>
          <br />
          <br />
          <TextField
            id="filled-basic"
            label="LastName"
            name="lastname"
            value={formValue.lastname}
          />

          <br />
          <br />
          <TextField
            id="filled-basic"
            label="Email"
            name="email"
            value={formValue.email}
            onChange={handlechange}
             onSelect={handlechange}
             error={!!formerrors.firstname}
          />
          <p>{formerrors.email}</p>
          <br />
          <br />
          <TextField
            id="filled-basic"
            label="Phone"
            name="phone"
            type="tel"
            value={formValue.phone}
            onChange={handlechange}
            onSelect={handlechange}
            error={!!formerrors.firstname}
          />
          <p>{formerrors.phone}</p>
          <br />
          <br />
          <TextField
            id="filled-basic"
            label="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handlechange}
            onSelect={handlechange}
            error={!!formerrors.firstname}
          />
          <p>{formerrors.password}</p>

          <br />
          <br />
          <button type="button" onClick={handlesubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
