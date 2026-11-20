import React, { useEffect, useState } from 'react';
import './style/Leaderboard.css';

function Leaderboard() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/leaderboard"
                );
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error("Leaderboard error:", error);
            } 
        };
        fetchLeaderboard();
    }, []);


    return (
        <div className="leaderboard-container">

            <h1>Leaderboard</h1>

            {players.length === 0 ? (
                <p className="no-players">No players found.</p>
            ) : (

                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    <tbody>
                        {players.map((player, index) => (
                            <tr key={player.id}>
                                <td>{index + 1}</td>
                                <td>{player.username}</td>
                                <td>{player.total_points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}

        </div>
    );
}

export default Leaderboard;
