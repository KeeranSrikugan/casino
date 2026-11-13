import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';




function Login() {
    const navigate = useNavigate();
    
    //Here I am declaring all the variables needed for a successful login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");


    //Handles the login functionality
    const handleLogin = async () => {
        try {

            // Send HTTP POST request to Node.js
            const response = await fetch(
                "http://localhost:5000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            // Convert the response into JSON
            const data = await response.json();

            //Here is the code that runs based on if the results returned true or false
            if(data.success === true){


                if(data.player.role === "admin"){
                    
                    localStorage.removeItem("player");

                    console.log(data.player);
                    localStorage.setItem(
                        "player", JSON.stringify(data.player)
                    );


                    navigate('/ViewPlayersAdmin')
                }else{
                    //Clear the previous player info
                    localStorage.removeItem("player");

                    console.log(data.player);
                    localStorage.setItem(
                        "player", JSON.stringify(data.player)
                    );

                    setResult("Success!")
                    navigate('/ViewPoints')
                }

            
            }
            else{
                setResult("Incorrect passweord or username entered. Please try again.")
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };


    return (
       <div className="login-container">

            <div className="login-box">

                <h1>Welcome Back Player!</h1>

                <p className="login-subtitle">
                    Please log back into your account
                </p>

                {/* Username */}
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Backend Result */}
                <p className="login-result">{result}</p>

                {/* Login Button */}
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>
            </div>

        </div>
    );
}

export default Login;
