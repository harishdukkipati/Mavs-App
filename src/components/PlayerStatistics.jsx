import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/intern_project_data.json';
import { processPlayerStatistic, processSeasonStatistics } from '../utils/processPlayerStatistics';
import SeasonStats from './SeasonStats';
import './PlayerProfile.css';
import GameLogs from './GameLogs';

function PlayerStatistics() {
  const { playerId } = useParams();
  const [viewMode, setViewMode] = useState('game_logs');
  const [season_stats, setStaties] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const dinkyPlayer = processPlayerStatistic(playerId, data.bio, data.game_logs);
    setStats(dinkyPlayer);
  }, [playerId]);

  useEffect(() => {
    const donkeyPlayer = processSeasonStatistics(playerId, data.bio, data.seasonLogs);
    console.log(donkeyPlayer);
    setStaties(donkeyPlayer);
  }, [playerId]);

  return (
    <>
      <div className="tab-content">
          <>
            <div className="season-header">
              <label htmlFor="viewMode">Stat View: </label>
              <select
                id="viewMode"
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
              >
                <option value="game_logs">Game Logs</option>
                <option value="season_logs">Season Stats</option>
              </select>

            </div>
            {(() => {
        console.log("viewMode:", viewMode);
        console.log("stats:", stats);
        console.log("season_stats:", season_stats);
        console.log("season_stats.season_logs:", season_stats?.season_logs);
          })()}
            {viewMode === 'game_logs' && stats?.game_logs?.length > 0 ? (
              <>
                <GameLogs gameLogs={stats.game_logs} />
              </>
            ) : viewMode === 'season_logs' ? (
              <SeasonStats seasonStats={season_stats?.season_logs || []} />
            ) : (
              <p>No statistics found.</p>
            )}
          </>
      </div>
    </>
  );
}

export default PlayerStatistics;