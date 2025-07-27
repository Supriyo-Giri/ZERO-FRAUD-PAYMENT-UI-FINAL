import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeComponent = ({ eventId }) => {
  const qrValue = `EVENT_PAYMENT:${eventId}:${Date.now()}`;

  return (
    <div className="qr-container">
      <QRCodeSVG 
        value={qrValue} 
        size={200} 
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default QRCodeComponent;