import { useState, useEffect } from 'react';
import axios from 'axios';

export function OddsSection({ matchId }) {
  const [oddsData, setOddsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const Baseurl ="https://3.110.27.69:5000/api"

  // Function to fetch odds data from the API
  const fetchOdds = async () => {
    if (!matchId) return; // Don't run if matchId is not provided

    setLoading(true); // Start loading when fetching starts
    setError(null); // Reset previous error state

    try {
      const response = await axios.get(`${Baseurl}/get_odds/${matchId}`);
      setOddsData(response.data); // Update state with fetched odds data
    } catch (err) {
      setError('Failed to fetch odds data.');
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  // Trigger initial fetch and polling every second
  useEffect(() => {
    fetchOdds(); // Initial fetch when the component mounts

    // Set interval to fetch odds data every second (1000ms)
    const intervalId = setInterval(fetchOdds, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [matchId]); // Dependency on matchId ensures the fetch happens when matchId changes

  // Display loading, error, or no odds data
  if (loading) {
    return <div>Loading odds...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!oddsData) {
    return <div>No odds data available.</div>;
  }

  // Display the odds data once fetched
  return (
    <div className="odds-section p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Odds</h3>
      <div className="grid grid-cols-2 gap-4">
        {oddsData.map((team, index) => (
          <div key={index} className="odds-card p-2 bg-gray-100 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium">{team.teamName}</h4>
            <p>Odds: {team.odds.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OddsSection;
