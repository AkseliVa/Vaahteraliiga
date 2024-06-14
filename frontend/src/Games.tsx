import React, { ReactElement, useEffect, useState } from 'react';
import "./App.css";

interface Game {
    _id: number,
    home_team: string,
    away_team: string,
    home_score: number,
    away_score: number,
    week: 1
}

function Games(): ReactElement | null {
    const [games, setGames] = useState<Game[]>([]);
    const url: string = "http://localhost:3001";

    useEffect(() => {
        fetch(`${url}/api/games`)
        .then((res) => res.json())
        .then((data) => {
            setGames(data)
        })
    }, []);

    return (
        <>
            <h1>Games</h1>
            <p>{!games ? "API might not be working" : null}</p>
            {games ? 
                games.map((game) => 
                    <div key={game._id}>
                        <p>Week : {game.week} - {game.home_team} {game.home_score} - {game.away_score} {game.away_team}</p>
                    </div>
                )
            : null}
        </>
    )
}

export default Games