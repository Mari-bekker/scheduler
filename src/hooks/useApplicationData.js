import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  function bookInterview(id, interview) {
    const isEditing = state.appointments[id].interview !== null

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };


    // Update the number of spots when appointment is booked
    const days = state.days.map((day) =>
      day.appointments.includes(id) && !isEditing
        ? { ...day, spots: day.spots - 1 }
        : { ...day }
    );

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments, days: days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // Update the number of spots when appointment is cancelled
    const days = state.days.map((day) =>
      day.appointments.includes(id)
        ? { ...day, spots: day.spots + 1 }
        : { ...day }
    );

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({ ...state, appointments, days: days });
    });
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
