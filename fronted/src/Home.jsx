import React, { useEffect, useState } from 'react';
import { getEvents } from './axios';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    loadEvents();
  }, []);

  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && selectedEvent) {
      window.open(selectedEvent.url, '_blank');
      setIsModalOpen(false);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#244856] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] mx-auto">
        <h1 className="text-4xl font-bold font-Helvetica text-center text-[#FCCD04] mb-12">Must-see events in Sydney</h1>

        {events.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No events found.</p>
        ) : (
          <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg gap-6">
            {events.map((event, idx) => (
              <div key={idx} className="break-inside-avoid mb-6 bg-[#FBE9D1] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={event.images[0].url}
                  alt={event.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#124E65] mb-2 line-clamp-2">{event.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(event.dates.start.localDate).toLocaleDateString('en-AU', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{event._embedded?.venues[0]?.name || 'Venue not specified'}</span>
                  </div>
                  <button
                    onClick={() => handleGetTickets(event)}
                    className="w-full bg-[#E74833] hover:bg-[#E57533] text-white  font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    Get Tickets
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Get Tickets</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E74833]"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E74833] text-white rounded-md hover:bg-[#E74833] focus:outline-none focus:ring-2 focus:ring-[#E74833]"
                >
                  Continue to Tickets
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;