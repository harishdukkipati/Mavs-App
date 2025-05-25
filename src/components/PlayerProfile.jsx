import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/intern_project_data.json';
import processPlayerMeasurements from '../utils/processPlayerMeasurments';
import PlayerStatistics from './PlayerStatistics';
import ScoutingReports from './ScoutingReport'; 
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './PlayerProfile.css';
import ScoutingReport  from './PlayerMeasurments';
import BigBoard from './BigBoard';

function PlayerProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null); 

  return (
    <div className="profile-page">
      <ScoutingReport />

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
        {activeTab === 'stats' && <PlayerStatistics />}
        {activeTab === 'reports' && <ScoutingReports />}
      </div>
    </div>
  );
}

export default PlayerProfile;

