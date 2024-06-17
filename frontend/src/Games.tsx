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
   
    const [chosenWeek, setChosenWeek] = useState<string>("All");
    const weeks = ["All", "1", "2", "3", "4"];

    const [chosenTeam, setChosenTeam] = useState<string>("All");
    const teams = ["All", "Roosters", "Wolverines", "Royals", "Steelers", "Crocodiles", "Crusaders"]
    
    const url: string = "http://localhost:3001";

    useEffect(() => {
        fetch(`${url}/api/games`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched games", data)
            setGames(data)
        })
    }, []);

    const handleWeekChange = (option: any) => {
        setChosenWeek(option.value);
    }

    const handleTeamChange = (option: any) => {
        setChosenTeam(option.value);
    }

    const filteredGames = games.filter(game => {
        return (chosenWeek === "All" || game.week === chosenWeek) &&
                (chosenTeam === "All" || game.home_team === chosenTeam || game.away_team === chosenTeam)
    })

    return (
        <>
            <h1>Games</h1>
            <div className='dropdown-container'>
                <div className='dropdown-wrapper'>
                    <p>Choose a week</p>
                        <Dropdown 
                            options={weeks} 
                            onChange={handleWeekChange} 
                            value={chosenWeek} 
                            placeholder="Select a week" 
                        />
                </div>
                <div className='dropdown-wrapper'>
                    <p>Choose a team</p>
                    <Dropdown 
                        options={teams} 
                        onChange={handleTeamChange} 
                        value={chosenTeam} 
                        placeholder="Select a team" 
                    />
                </div>
            </div>
            <p>{!games ? "API might not be working" : null}</p>
            {filteredGames.length > 0 ?
                filteredGames.map((game) => (
                    <div key={game._id}>
                         <p>Week {game.week} : {game.home_team} {game.home_score} - {game.away_score} {game.away_team}</p>
                    </div>
                ))
            : <p>No games available for the selected filters</p>}
        </>
    )
}

export default Games