import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import processPlayerRankings from '../utils/processPlayerRankings';
import data from '../data/intern_project_data.json';
import './BigBoard.css';
import MavsLogo from '../assets/Dallas_Mavericks_logo.svg.png';

function BigBoard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const finalPlayers = processPlayerRankings(data.bio, data.scoutRankings);
    setPlayers(finalPlayers);
    console.log("Processed and sorted players:", finalPlayers); 
  }, []);

  return (
    <div className='draft-hub-container'>
      <h1 className='title'>
        <img src={MavsLogo} alt="Mavs Logo" className="mavs-logo" /> 
        NBA Draft Hub
        </h1>
      <div className='player-list'>
        {players.map(p => (
          <Link
            to={`/player/${p.playerId}`}
            key={p.playerId}
            className='player-card'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <img src={p.photoUrl} alt={p.name} className='player-photo' />
            <div className='player-info'>
              <h2>{p.rank}. {p.name}</h2>
              <p><strong>Team:</strong> {p.currentTeam}</p>
              <div>
                <strong>Scout Ranks:</strong>
                <ul>
                {Object.entries(p.scoutRanks).map(([scout, rank]) => {
                  const displayRank = rank ?? "N/A";
                   const shouldBold = rank !== null && rank !== undefined && rank < p.rank;

                  return (
                    <li key={scout}>
                      {shouldBold ? (
                    <strong>{scout}: {displayRank}</strong>
                    ) : (
        `${scout}: ${displayRank}`
      )}
    </li>
  );
})}
                </ul>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BigBoard;
