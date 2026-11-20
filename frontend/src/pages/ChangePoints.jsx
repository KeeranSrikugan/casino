import React, { useEffect, useState } from 'react';
import io from "socket.io-client";



function ChangePoints() {

  const [player, setPlayer] = useState(JSON.parse(localStorage.getItem("selectedPlayer")));
  const [gameType, setGameType] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [finalResult, setFinalResult] = useState("");


  const handleGameResult = async(gameResult) => {

    if(betAmount === null || gameType === null ){
      setResult("Please enter a bet amount and select game type.");
    }else{
      setGameResult(gameResult);
      
      const selectedPlayer = JSON.parse(localStorage.getItem("selectedPlayer"));
      setPlayer(selectedPlayer);
      console.log(selectedPlayer);

       try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/GameTransactions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        playerId: player.id,
                        gameName: gameType,
                        betAmount: betAmount,
                        gameResult: gameResult
                    })
                }
            );

            const data = await response.json();

            
            console.log(data.message);
            setFinalResult(data.message);
            // Reset inputs
            setGameType("");
            setBetAmount("");

            io.emit("pointsUpdated", player.id);

        } catch (error) {
            console.error("Error:", "Unable to connect to server.");
        }
    }
  };




 
  return (
    <div>
            <h1>Change Points Here</h1>

            {player && (
                <h2>Player: {player.username}</h2>
            )}


            <div>
                <h3>1. Select Game</h3>
                <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
                  <option value="">-- Select a Game --</option>
                  <option value="Blackjack">Blackjack</option>
                  <option value="Poker">Poker</option>
                  <option value="Roulette">Roulette</option>
                  <option value="Slots">Slots</option>
                </select>
            </div>


            <div>
                <h3>2. Enter Bet Amount</h3>
                <input
                    type="number"
                    placeholder="Enter points to bet"
                    min="1"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                />
            </div>


            <div>
                <h3>3. Game Result</h3>

                <button onClick={() => handleGameResult("Lost")} >
                    Lost
                </button>

                <button onClick={() => handleGameResult("Win")} >
                    Won
                </button>
            </div>
           
           <p className="game_result">{finalResult}</p>
        </div>
  );
}

export default ChangePoints;