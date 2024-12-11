import React, { useState } from 'react';
import FancodeMatches from './video/FancodeMatches';
import SonyLivMatches from './video/SonyLivMatches';
import SportsMatches from '../odds/Score'; // New Component
import IndiaMatches from '../scorecard/bgt/Match'; // New Component

const LiveMatches = () => {
  const [activeTab, setActiveTab] = useState('fancode');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('fancode')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'fancode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Fancode
        </button>
        <button
          onClick={() => setActiveTab('sonylive')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'sonylive'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          SonyLiv
        </button>
        <button
          onClick={() => setActiveTab('Scorecard')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'sports'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Scorecard
        </button>
        <button
          onClick={() => setActiveTab('BGT')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            activeTab === 'sports'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Loading...
        </button>
      </div>

      {activeTab === 'fancode' && <FancodeMatches />}
      {activeTab === 'sonylive' && <SonyLivMatches />}
      {activeTab === 'Scorecard' && <SportsMatches />}
      {activeTab === 'BGT' && <IndiaMatches/>}
    </div>
  );
};

export default LiveMatches;
