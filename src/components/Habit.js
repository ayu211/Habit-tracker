import React from "react";
import { useDispatch } from "react-redux";
import { deleteHabit } from "../redux/features/habitSlice";
import { useNavigate } from "react-router-dom";

const Habit = ({ habit }) => {
  const today=new Date();
  const todayDay=today.getDay();
  let countDone=0;

  for (let i = 0; i < habit.weekLog.length; i++) {
    if(habit.weekLog[i].isDone===true){
      countDone++;
    }
  }
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteHabit(habit.id));
  };

  const setId = () => {
    localStorage.setItem("id", habit.id);
    navigate("/week-view");
  };

  return (
    <>
    <div className="habit-card"> 
      <div className="card-header">
        ➡️
        <h4 style={{ textTransform: "capitalize" }}>{habit.name}</h4>
      </div>
      <div className="card-body">
        <p className="day-complete">
          {countDone}/{todayDay + 1} days
        </p>
      </div>
      <div className="card-footer">
        <div className="log-btn" onClick={setId}>
          <i className="fa-solid fa-calendar-week"></i>
        </div>
        <i className="fa-solid fa-trash" onClick={handleDelete}></i>
      </div>
    </div>
    </>
  );
};

export default Habit;