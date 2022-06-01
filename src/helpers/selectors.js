export function getAppointmentsForDay(state, day) {
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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
 } 
  const interviewData = {};
  interviewData.student = interview.student;
  interviewData.interviewer=state.interviewers[interview.interviewer]
  return interviewData;
}