import React from "react";
import { useNavigate } from "react-router-dom";
import DayView from "./DayView";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const WeekView = () => {
  let habitsState=useSelector((state)=>state.habits);
  let habit={}
  for(let i=0;i<habitsState.length;i++){
    if(habitsState[i].id===Number(localStorage.getItem("id"))){
      habit=habitsState[i];
    }
  }
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar name="Week View" />
      <h1 className="text-center" style={{ textTransform: "capitalize" }}>
        {habit.name}
      </h1>
      <div className="days-container">
        {habit.weekLog.map((day, index) => (
          <DayView day={day} key={index} />
        ))}
      </div>
      <div className="back-button-container" onClick={handleGoBack}>
        <i className="fas fa-arrow-left"></i>
      </div>
    </>
  );
};

export default WeekView;