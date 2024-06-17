import { ReactElement, useEffect, useState } from 'react';
import "./App.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Game {
    _id: number,
    home_team: string,
    away_team: string,
    home_score: number,
    away_score: number,
    week: string
}

function Games(): ReactElement | null {
    const [games, setGames] = useState<Game[]>([]);
    const [chosenWeek, setChosenWeek] = useState<string>("All")
    const weeks = ["All", "1", "2", "3", "4"]
    const defaultOption = weeks[0]
    const url: string = "http://localhost:3001";

    useEffect(() => {
        fetch(`${url}/api/games`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched games", data)
            setGames(data)
        })
    }, []);

    return (
        <>
            <h1>Games</h1>
            <Dropdown 
                options={weeks} 
                onChange={(option) => setChosenWeek(option.value)} 
                value={defaultOption} 
                placeholder="Select a week" 
            />
            <p>{!games ? "API might not be working" : null}</p>
            {games && 
                games
                    .filter(game => game.week === chosenWeek || chosenWeek === "All")
                    .map((game) => (
                        <div key={game._id}>
                            <p>Week : {game.week} - {game.home_team} {game.home_score} - {game.away_score} {game.away_team}</p>
                        </div>
                    ))
            }
        </>
    )
}

export default Games