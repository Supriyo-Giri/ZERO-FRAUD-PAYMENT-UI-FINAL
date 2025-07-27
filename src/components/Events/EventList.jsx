import React from 'react';
import EventItem from './EventItem';

// Dummy event data
const dummyEvents = [
  {
    id: 'EVT001',
    name: 'Tech Conference 2023',
    date: '2023-06-15',
    fee: 100
  },
  {
    id: 'EVT002',
    name: 'Workshop on React',
    date: '2023-06-20',
    fee: 50
  },
  {
    id: 'EVT003',
    name: 'Career Fair',
    date: '2023-06-25',
    fee: 75
  },
  {
    id: 'EVT004',
    name: 'AI & Machine Learning Summit',
    date: '2023-07-01',
    fee: 150
  }
];

const EventList = () => {
  return (
    <div className="event-list">
      <div className="event-header">
        <h4 className="mb-0">Available Events</h4>
      </div>
      {dummyEvents.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;