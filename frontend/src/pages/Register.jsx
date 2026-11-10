import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style/Register.css';

function Register() {
  const navigate = useNavigate();

  //Here are all the fields we collected that are required for the database 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //This field is used to tell the user if they have successfully registered or if there are any issues.
  const [result, setResult] = useState("");

  const handleRegister = async () => {
    //First I will check if all fields are filled
    if (!firstName){
      setResult("Please enter your first name.");
    }

    if (!firstName){
      setResult("Please enter your first name.");
      return;
    }else if (!lastName){
      setResult("Please enter your last name.");
      return;
    }else if (!username){
      setResult("Please enter a username.");
      return;
    }else if (!password){
      setResult("Please enter a password.");
      return;
    }

    try {

        // Send HTTP POST request to Node.js
        const response = await fetch(
            "http://localhost:5000/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                  firstName: firstName,
                  lastName: lastName,  
                  username: username,
                  password: password
                })
            }
        );

        // Convert the response into JSON
        const data = await response.json();

        //Here is the code that runs based on if the results returned true or false
        if(data.success === true){
          setResult(data.message);


          
        }
        else{
            setResult(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };


  return (
    <div className="register-container">

            <div className="register-box">

                {/* Back Button */}
                <button
                    className="register-back-button" onClick={() => navigate(-1)}>
                      Back
                </button>

                <h1>Create Account</h1>

                <p className="register-subtitle">
                    Enter your information to create an account
                </p>

                {/* First Name */}
                <div className="register-input-group">
                    <label>First Name</label>

                    <input
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>

                {/* Last Name */}
                <div className="register-input-group">
                    <label>Last Name</label>

                    <input
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                {/* Username */}
                <div className="register-input-group">
                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Create a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="register-input-group">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Registration Result */}
                <p className="register-result">{result}</p>

                {/* Register Button */}
                <button
                    className="register-button"
                    onClick={handleRegister}
                >
                    Register
                </button>

            </div>

        </div>

  );
}

export default Register;