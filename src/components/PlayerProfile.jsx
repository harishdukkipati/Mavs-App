import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/intern_project_data.json';
import processPlayerMeasurements from '../utils/processPlayerMeasurments';
import PlayerStatistics from './PlayerStatistics';
import ScoutingReports from './ScoutingReport'; 
import { Button } from '@mui/material';
import './PlayerProfile.css';

function PlayerProfile() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const enrichedPlayer = processPlayerMeasurements(playerId, data.bio, data.measurements);
    setPlayer(enrichedPlayer);
  }, [playerId]);

  if (!player) return <div>Loading...</div>;

  const measurements = [
    { label: 'Height No Shoes',   value: player.measurements.heightNoShoes },
    { label: 'Height Shoes',      value: player.measurements.heightShoes },
    { label: 'Wingspan',          value: player.measurements.wingspan },
    { label: 'Reach',             value: player.measurements.reach },
    { label: 'Max Vertical',      value: player.measurements.maxVertical },
    { label: 'No Step Vertical',  value: player.measurements.noStepVertical },
    { label: 'Body Fat',          value: player.measurements.bodyFat ?? 'N/A' },
    { label: 'Hand Length',       value: player.measurements.handLength },
    { label: 'Hand Width',        value: player.measurements.handWidth },
    { label: 'Agility',           value: player.measurements.agility },
    { label: 'Sprint',            value: player.measurements.sprint },
    { label: 'Shuttle Left',      value: player.measurements.shuttleLeft  ?? 'N/A' },
    { label: 'Shuttle Right',     value: player.measurements.shuttleRight ?? 'N/A' },
    { label: 'Shuttle Best',      value: player.measurements.shuttleBest }
  ];

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="player-banner">
          <img src={player.photoUrl} alt={player.name} className="banner-image" />
          <div className="banner-info">
            <h1 className="player-name">
              <span className="first">{player.firstName}</span>{' '}
              <span className="last">{player.lastName}</span>
            </h1>
            <p><strong>Height:</strong> {player.height} inches</p>
            <p><strong>Weight:</strong> {player.weight} lbs</p>
            <p><strong>Team:</strong> {player.currentTeam}</p>
            <p><strong>League:</strong> {player.league}</p>
          </div>
        </div>

        <div className="measurements-grid">
          {measurements.map((m) => (
            <div key={m.label}>
              <strong>{m.label}:</strong> {m.value}
            </div>
          ))}
        </div>
      </div>

      {/* Tab buttons */}
      <div className="tab-buttons">
        <Button
          variant={activeTab === 'stats' ? 'contained' : 'outlined'}
          color="warning"
          onClick={() => setActiveTab('stats')}
        >
          Player Stats
        </Button>
        <Button
          variant={activeTab === 'reports' ? 'contained' : 'outlined'}
          color="warning"
          onClick={() => setActiveTab('reports')}
          sx={{ ml: 2 }}
        >
          Scouting Reports
        </Button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'stats' ? (
          <PlayerStatistics />
        ) : (
          <ScoutingReports />
        )}
      </div>
    </div>
  );
}

export default PlayerProfile;

