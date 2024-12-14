import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LiveMatch from './Live';
import ScoreCard from './Live2';

const App = () => {
  const { matchId } = useParams(); // Get the matchId from the route
  const [scoreAvailable, setScoreAvailable] = useState(false);

  // Check if scorecard data is available
  const checkScoreAvailability = async () => {
    try {
      const response = await fetch(`http://3.110.27.69/api/api/get_scorecard/53500637`);
      const data = await response.json();

      // Check if valid scorecard data is returned
      if (data?.doc?.[0]?.data?.score?.innings) {
        setScoreAvailable(true);
      } else {
        setScoreAvailable(false);
      }
    } catch (err) {
      console.error('Error checking score availability:', err);
      setScoreAvailable(false);
    }
  };

  useEffect(() => {
    checkScoreAvailability();
  }, [matchId]);

  return (
    <div>
     <h2>Ind Vs Aus</h2>
      <LiveMatch />

      
      {scoreAvailable ? (
        <ScoreCard />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
          Scorecard data is currently unavailable. Showing the live match video only.
        </div>
      )}
    </div>
  );
};

export default App;
