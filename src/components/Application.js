import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    //console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, { interview })
      .then  ( () => {
        setState({...state, appointments})

      })
  };


  const setDay = day => setState({ ...state, day });

  const interviewers = getInterviewersForDay(state, state.day)

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data
      const appointments = all[1].data
      const interviewers = all[2].data
      setState(prev => ({...prev, days, appointments, interviewers }));
    });
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointment = Object.values(dailyAppointments).map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers = {interviewers}
        bookInterview={bookInterview}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList days={state.days} value={state.day} onChange={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointment}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>

    </main>
  );
}
