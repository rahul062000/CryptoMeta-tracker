import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <Typography variant="h6" style={{ fontFamily: 'Montserrat', color: 'white',textAlign: 'center',gap:'10px' }}>
      {formattedTime}
    </Typography>
  );
};

export default DigitalClock;