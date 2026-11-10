import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/ViewPoints.css';


function ViewPoints() {

  const navigate = useNavigate();

    // Retrieve logged-in player's information
  const player = JSON.parse(localStorage.getItem("player"));

    // Get player's total points
  const totalPoints = player?.total_points ?? 0;

  return (
     <div className="viewpoints-container">

            <div className="points-box">

                <h1>Total Points</h1>

                <div className="points-number">
                    {totalPoints}
                </div>

                <p className="points-subtitle">
                    Keep playing to earn more points!
                </p>

                <div className="points-buttons">

                    <button
                        onClick={() => navigate("/leaderboard")}
                    >
                        Leaderboard
                    </button>

                    <button
                        onClick={() => navigate("/history")}
                    >
                        History
                    </button>

                </div>

            </div>

        </div>
  );
}

export default ViewPoints;