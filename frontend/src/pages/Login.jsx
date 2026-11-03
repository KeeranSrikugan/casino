import React from 'react';
import { useState } from "react";



function Login() {
    
    //Here I am declaring all the variables needed for a successful login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");


    const handleLogin = async () => {
        try {

            // Send HTTP POST request to Node.js
            const response = await fetch(
                "http://localhost:5000/api/process-word",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        word: username
                    })
                }
            );

            // Convert the response into JSON
            const data = await response.json();

            // Display the returned message
            setResult(data.message);

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

                {/* Login Button */}
                <button className="login-button" onClick={handleLogin}>
                    Login
                </button>

                {/* Backend Result */}
                <p className="login-result">{result}</p>

            </div>

        </div>
    );
}

export default Login;
