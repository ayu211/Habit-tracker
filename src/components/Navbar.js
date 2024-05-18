import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../redux/features/habitSlice";
import sunrise from '../assets/sunrise.png';
import sunset from '../assets/sunset.png';
import afternoon from '../assets/afternoon.png';
import night from '../assets/night.png';

const Navbar = ({ name }) => {
  const dispatch = useDispatch();

  const [hour, setHour] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const date = new Date();
    setHour(date.getHours());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getGreetingImage = (hour) => {
    if (hour <= 12) return sunrise;
    if (hour <= 17) return afternoon;
    if (hour <= 21) return sunset;
    return night;
  };

  const handleSave = () => {
    const habitName = document.getElementById("habitName").value;
    dispatch(addHabit(habitName));
    document.getElementById("habitName").value = "";
  };

  return (
    <>
      <div className="navbar">
        <img
          src={getGreetingImage(hour)}
          alt="Greeting"
          className="greeting-image"
        />
        
        <div className="date-display">
          {formattedDate}
        </div>

        <div className="right-nav">
          <button
            className="addhabit-btn"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >ADD HABITS
          </button>
        </div>
      </div>

       {/* adding new habit code */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add New Habit
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="habitName" className="form-label">
                  TYPE YOUR DAILY HABIT
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="habitName"
                  placeholder="ENTER HABIT NAME"
                  autoComplete="off"
                  rows={5}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;