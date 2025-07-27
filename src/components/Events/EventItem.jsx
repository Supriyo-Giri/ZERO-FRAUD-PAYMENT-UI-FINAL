import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`/payment/${event.id}`);
  };

  return (
    <div className="event-item">
      <div className="event-info">
        <div className="event-name">{event.name}</div>
        <div className="event-meta">
          <span><i className="far fa-calendar-alt mr-1"></i> {event.date}</span>
          <span className="event-fee">${event.fee}</span>
        </div>
      </div>
      <div className="event-actions">
        <button 
          className="btn btn-primary btn-sm"
          onClick={handlePayment}
        >
          <i className="fas fa-credit-card mr-1"></i>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default EventItem;