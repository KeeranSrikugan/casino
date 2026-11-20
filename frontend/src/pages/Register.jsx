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

        // Send HTTP POST request to Node.js with registration info
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/register`,
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

        const data = await response.json();


        if(data.success === true){
        //If the registration is successful, remove the local storage player and register new player to remember who is accessing the webpage and go to points page.
        //If there is an issue with registation, output the error.
          console.log(data.player);
          localStorage.removeItem("player");
          localStorage.setItem(
            "player", JSON.stringify(data.player)
          );
          setResult(data.message);
          navigate('/ViewPoints');

        }
        else{
            setResult(data.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };


  return (
    <div className="register_container">
    <div className="register_box">

        <button className="register_back_button" onClick={() => navigate(-1)}>
            Back
        </button>

        <h1>Create Account</h1>

        <p className="register_subtitle">
            Enter your information to create an account
        </p>

        <div className="register_form">

            <div className="register_input_group">
                <label>First Name</label>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="register_input_group">
                <label>Last Name</label>
                <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="register_input_group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Create a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="register_input_group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

        </div>

        <p className="register_result">{result}</p>

        <button
            className="register_button"
            onClick={handleRegister}
        >
            Register
        </button>

    </div>
</div>
  );
}

export default Register;