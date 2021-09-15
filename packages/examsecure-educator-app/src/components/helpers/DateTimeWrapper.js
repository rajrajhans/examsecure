import React from 'react';
import DateTime from 'react-datetime';

const DateTimeWrapper = ({ name, onDateTimeChange, ...props }) => {
  const onChange = (moment) => {
    onDateTimeChange(moment, name);
  };

  return <DateTime onChange={onChange} {...props} />;
};

export default DateTimeWrapper;
