import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewPlayersAdmin() {

  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [userGetresult, setUserGetResult] = useState("");


  const navigate = useNavigate();

  useEffect(() => {

        //I am putting fetchPlayers 
        const fetchPlayers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/playerlist`);
                const data = await response.json();

                if (data.success === true) {
                    setPlayers(data.players);
                } 

            } catch (error) {
                console.error("Error fetching players:", error);
            } 
        };
        fetchPlayers();
    }, []);

    const selectedUser = async () => {
        localStorage.removeItem("selectedPlayer");
        localStorage.setItem(
            "selectedPlayer", JSON.stringify(selectedPlayer)
        );
        navigate('/ChangePoints')


        if(selectedPlayer === null){
            setUserGetResult("Please Select a user!");
        }

    }


  return (
     <div>

        <h1>View All Players</h1>
        <div>
            {players.map((player) => (
                <div
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    style={{
                        border: selectedPlayer?.id === player.id
                            ? "2px solid blue"
                            : "1px solid black",
                        padding: "15px",
                        margin: "10px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        backgroundColor: selectedPlayer?.id === player.id
                            ? "#e6f0ff"
                            : "white"
                    }}
                >

                    <h3>{player.first_name} {player.last_name}</h3>
                    <p>Username: {player.username}</p>
                    <p>Points: {player.total_points}</p>
                </div>
            ))}
        </div>
     
        <p className="user-select">{userGetresult}</p>
        <button className="select-user-button" onClick={selectedUser}>
                Select User
        </button>
    </div>
  );
}

export default ViewPlayersAdmin;