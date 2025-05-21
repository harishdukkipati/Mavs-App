import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/intern_project_data.json';
import { processPlayerStatistic, processSeasonStatistics } from '../utils/processPlayerStatistics';
import SeasonStats from './SeasonStats';
import './PlayerProfile.css';

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
                {Array.from(new Set(stats.game_logs.map(g => g.season))).map(season => {
                  const seasonGames = stats.game_logs.filter(g => g.season === season);

                  const totals = seasonGames.reduce((acc, game) => {
                    acc.fgm += game.fgm || 0;
                    acc.fga += game.fga || 0;
                    acc.ftm += game.ftm || 0;
                    acc.fta += game.fta || 0;
                    acc.reb += game.reb || 0;
                    acc.ast += game.ast || 0;
                    acc.stl += game.stl || 0;
                    acc.blk += game.blk || 0;
                    acc.tov += game.tov || 0;
                    acc.pf += game.pf || 0;
                    acc.plusMinus += game.plusMinus || 0;
                    acc.pts += game.pts || 0;
                    return acc;
                  }, {
                    fgm: 0, fga: 0, ftm: 0, fta: 0,
                    reb: 0, ast: 0, stl: 0, blk: 0,
                    tov: 0, pf: 0, plusMinus: 0, pts: 0
                  });
                  const fgPct = totals.fga > 0 ? ((totals.fgm / totals.fga) * 100).toFixed(1) + '%' : 'N/A';
                  const ftPct = totals.fta > 0 ? ((totals.ftm / totals.fta) * 100).toFixed(1) + '%' : 'N/A';
                  const plusMinus = totals.plusMinus > 0 ? '+' + totals.plusMinus : totals.plusMinus;
                  return (
                    <div key={season} className="season-block">
                      <h3>{season} Season</h3>
                      <table className="stats-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            <th>MIN</th>
                            <th>FG</th>
                            <th>FG%</th>
                            <th>FT</th>
                            <th>FT%</th>
                            <th>REB</th>
                            <th>AST</th>
                            <th>STL</th>
                            <th>BLK</th>
                            <th>TO</th>
                            <th>PF</th>
                            <th>+/-</th>
                            <th>PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {seasonGames.map((game, idx) => {
                            const pMinus = game.plusMinus > 0 ? '+' + game.plusMinus : game.plusMinus;
                            return (
                            <tr key={idx}>
                              <td>{new Date(game.date).toLocaleDateString()}</td>
                              <td>{game.opponent}</td>
                              <td>{game.timePlayed}</td>
                              <td>{game.fgm}/{game.fga}</td>
                              <td>{game["fg%"] ?? 'N/A'}</td>
                              <td>{game.ftm}/{game.fta}</td>
                              <td>{game.fta ? ((game.ftm / game.fta) * 100).toFixed(1) : 'N/A'}</td>
                              <td>{game.reb}</td>
                              <td>{game.ast}</td>
                              <td>{game.stl}</td>
                              <td>{game.blk}</td>
                              <td>{game.tov}</td>
                              <td>{game.pf}</td>
                              <td>{pMinus}</td>
                              <td>{game.pts}</td>
                            </tr>
                );
                })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3}><strong>Totals</strong></td>
                            <td><strong>{totals.fgm}/{totals.fga}</strong></td>
                            <td><strong>{fgPct}</strong></td>
                            <td><strong>{totals.ftm}/{totals.fta}</strong></td>
                            <td><strong>{ftPct} </strong> </td>
                            <td><strong>{totals.reb}</strong></td>
                            <td><strong>{totals.ast}</strong></td>
                            <td><strong>{totals.stl}</strong></td>
                            <td><strong>{totals.blk}</strong></td>
                            <td><strong>{totals.tov}</strong></td>
                            <td><strong>{totals.pf}</strong></td>
                            <td><strong>{plusMinus}</strong></td>
                            <td><strong>{totals.pts}</strong></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  );
                })}
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