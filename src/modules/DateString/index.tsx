import React from "react";

type PropsType = {
  date: string;
};

const DateString = ({ date }: PropsType) => {
  const newDate = new Date(date);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  return <time dateTime={date}>{newDate.toLocaleDateString('ru-RU', options)}</time>;
}

export default DateString;
