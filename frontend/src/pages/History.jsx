import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/History.css';

function History() {

    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {

        const showHistory = async () => {
        const player = JSON.parse(localStorage.getItem("player"));
        try {
            const response = await fetch(
                `http://localhost:5000/api/history?playerId=${player.id}`
            );
            const data = await response.json();
            console.log(data.message);
            console.log(data.history);
            setGames(data.history);


        } catch (error) {
            console.error("Leaderboard error:", error);
        } 
        };

            showHistory();
    },[]);





  return (
    
<div className="history-container">
    <button className="register_back_button" onClick={() => navigate('/ViewPoints')}>
                    Back
    </button>

    <h1>Game History</h1>

    {games.length === 0 ? (
        <p>No games found.</p>
    ) : (
        
        <table className="history-table">
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Points (+/-)</th>
                    <th>Result</th>
                </tr>
            </thead>

            <tbody>
                {games
                    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                    .map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.game_name}</td>
                            <td>{transaction.points_change}</td>
                            <td>{transaction.result}</td>
                        </tr>
                    ))}
            </tbody>
        </table>

    )}

</div>

  );
}

export default History;