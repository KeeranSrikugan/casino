import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/ViewPoints.css';
import { io } from 'socket.io-client';


function ViewPoints() {

  const navigate = useNavigate();
  const player = JSON.parse(localStorage.getItem("player"));
  const [totalPoints, setTotalPoints] = useState();

  useEffect(() => {

        if (!player?.id) return;

        // Retrieve latest points
        const fetchPoints = async () => {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/player/${player.id}/points`);
            const data = await response.json();

            if (data.success === true) {
                setTotalPoints(data.total_points);
            }
        };

        // Initial points retrieval
        fetchPoints();

        // Here we open a socket and keep listening for any changes the admin makes to the points.
        const socket = io(import.meta.env.VITE_API_URL);
        socket.on("pointsUpdated", (playerId) => {
            if (String(playerId) === String(player.id)) {
                fetchPoints();
            }

        });

        const disconnectSocket = () => { socket.disconnect(); };
        return disconnectSocket;

    }, []);

  return (
     <div className="viewpoints-container">

            <div className="points-box">
                <button className="register_back_button" onClick={() => navigate(-1)}>
                    Back
                </button>

                <h1>Total Points</h1>

                <div className="points-number">
                    {totalPoints}
                </div>

                <p className="points-subtitle">
                    Keep playing to earn more points!
                </p>

                <div className="points-buttons">
                    <button onClick={() => navigate("/leaderboard")}>
                        Leaderboard
                    </button>

                    <button onClick={() => navigate("/history")}>
                        History
                    </button>

                </div>
            </div>

        </div>
  );
}

export default ViewPoints;