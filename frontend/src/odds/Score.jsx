import { useEffect, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import SportSection from './components/SportSection';
import EventCard from './components/EventCard';

export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const Baseurl ="https://3.110.27.69:5000";

  const fetchEvents = () => {
    fetch(`${Baseurl}/api/events`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const eventsWithTeams = data.map((event) => ({
          ...event,
          team1: event.event_name?.split(/ vs\.| v /)[0]?.trim() || "Team 1",
          team2: event.event_name?.split(/ vs\.| v /)[1]?.trim() || "Team 2"
        }));
        setEvents(eventsWithTeams);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <LoadingSpinner />;

  const handleEventClick = (sportRadarId) => {
    if (sportRadarId) {
      fetch(`${Baseurl}/api/get_odds/${sportRadarId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Event odds:', data);
          // Handle the odds data as needed
        })
        .catch(error => {
          console.error('Error fetching odds:', error);
        });
    }
  };

  const renderEvents = (filteredEvents) => {
    return filteredEvents.map((event) => (
      <EventCard
        key={event.id}
        event={event}
        onClick={handleEventClick}
      />
    ));
  };

  const cricketEvents = events.filter((event) => event.sport_id === 4);
  const footballEvents = events.filter((event) => event.sport_id === 1);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Live Sports Score & Odds
        </h1>

        <div className="space-y-12">
          <SportSection
            title="Cricket"
            liveEvents={renderEvents(cricketEvents.filter(e => e.data?.inplay))}
            upcomingEvents={renderEvents(cricketEvents.filter(e => !e.data?.inplay))}
          />

          <SportSection
            title="Football"
            liveEvents={renderEvents(footballEvents.filter(e => e.data?.inplay))}
            upcomingEvents={renderEvents(footballEvents.filter(e => !e.data?.inplay))}
          />
        </div>
      </div>
    </div>
  );
}
