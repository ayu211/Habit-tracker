import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { habitDone, habitUnDone } from "../redux/features/habitSlice";

const DayView = ({ day }) => {
  const today = new Date();
  const todayDay = today.getDay();
  const [isDone, setIsDone] = useState(day.isDone === true);
  const dispatch = useDispatch();
  const date = new Date(day.yyyy, day.mm, day.dd);

  const handleToggle = () => {
    if (day.id > todayDay) {
      return;
    }
    setIsDone(!isDone);
    dispatch(isDone ? habitUnDone(day.id) : habitDone(day.id));
  };

  return (
    <div className="day-container">
      <h5 className="text-center">{day.day}</h5>
      <p className="text-center">
        {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
      </p>
      <div className="icon-container" onClick={handleToggle}>
      {day.id <= todayDay && (
          isDone ? (
            <span className="heavy-check-mark">&#10003;</span> 
          ) : (
            <span className="heavy-ballot-x">&#10007;</span>
          )
        )}
      </div>
    </div>
  );
};

export default DayView;
