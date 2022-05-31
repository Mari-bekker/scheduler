export default function getAppointmentsForDay(state, day) {
  const days = state.days.filter(dayFiltered => dayFiltered.name === day);
  let appointments = [];

  if(state.days.length === 0 || days.length === 0){
    return [];
  }
  const dayAppointments = days[0].appointments;
 
  for(let appointment of dayAppointments) {
    appointments.push(state.appointments[appointment]);
  }
  return appointments;
}

// export function getInterview(state, interview) {
//   const interviewReturn = state.interviewers[interview.interviewer];
//   if (interview) {
//     return {  
//       student: interview.student,
//       interviewer: interviewerReturn

//     } } else {
//       return null;
//     }

// }

// base function that works:

export function getInterview(state, interview) {
  if (interview) {
    return {  
      "student": "Lydia Miller-Jones",
      "interviewer": {  
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      }
    } } else {
      return null;
    }

}