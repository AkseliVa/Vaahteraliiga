import { useEffect, useState, ReactElement } from "react";
import "./App.css";

interface Score {
  made_points: number,
  let_points: number
}

interface Team {
  _id: number,
  name: string,
  city: string,
  wins: number,
  losses: number,
  scores: Score[],
  link: string
}


function App(): ReactElement | null {
  const [teams, setTeams] = useState<Team[]>([])
  const url: string = "http://localhost:3001";
  const [showPoints, setShowPoints] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetch(`${url}/api/teams`)
      .then((res) => res.json())
      .then((data) => {
        const teamsSorted = data.sort((a: Team, b: Team) => b.wins - a.wins);
        setTeams(teamsSorted)
        const showPointsInitial: { [key: number]: boolean } = {};
        teamsSorted.forEach((team: Team) => {
          showPointsInitial[team._id] = false;
        });
        setShowPoints(showPointsInitial);
      })
      }, []);

      const toggleShowPoints = (teamId: number) => {
        setShowPoints((prevShowPoints) => ({
          ...prevShowPoints,
          [teamId]: !prevShowPoints[teamId],
        }));
      };

  return (
    <>
      <h1>Vaahteraliiga</h1>
      <h2>Standings (Week 4)</h2>
      <div className="card">
        <p>{!teams ? "API might not be working" : null}</p>
        {teams ? 
          teams.map((team) =>
            <div key={team._id}>
              <button onClick={() => toggleShowPoints(team._id)}>
                {showPoints[team._id] ? "Hide Score" : "Show Score"}
              </button>
              <a href={team.link}><p>{team.city} {team.name} {team.wins} - {team.losses}</p></a>
              {showPoints[team._id] &&
                team.scores.map((score, index) => (
                  <p key={index}>
                    Score: {score.made_points} - {score.let_points}
                  </p>
                ))}           
            </div>
          )  
      : null}
      </div>
    </>
  );
}

export default App;