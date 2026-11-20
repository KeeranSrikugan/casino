import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style/login.css';




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


                //Based on the role of the player, save the information locally and direct them to the correct page
                if(data.player.role === "admin"){
                    localStorage.removeItem("player");
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
       <div className="login_container">
        <div className="login_box">

            <h1>♠ Welcome Back Player! ♦</h1>

            <p className="login_subtitle"> Please log back into your account </p>

            <div className="input_group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="input_group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <p className="login_result">{result}</p>

            <button className="login_button" onClick={handleLogin}>
                Login
            </button>

         </div>
        </div>
    );
}

export default Login;
