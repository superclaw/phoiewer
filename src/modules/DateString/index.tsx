import React from "react";

type PropsType = {
  date: string;
  short: boolean;
  className?: string;
};

const DateString = ({ date, short, className = '' }: PropsType) => {
  const newDate = new Date(date);
  const options = short ? {day: 'numeric', month: '2-digit', year: '2-digit'} : {day: 'numeric', month: 'long', year: 'numeric'};

  return <time className={className} dateTime={date}>{newDate.toLocaleDateString('ru-RU', options)}</time>;
}

export default DateString;
