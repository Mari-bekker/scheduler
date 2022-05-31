export default function getAppointmentsForDay(state, name) {
  const filteredDays = state.days.filter(day => day.name === name);
  if(state.days.length===0 || filteredDays.length===0){
    return [];
  }
  const dayAppointments = filteredDays[0].appointments;
 
  let filteredAppointments = [];
 
  for(let appointment of dayAppointments) {
    filteredAppointments.push(state.appointments[appointment]);
  }
  return filteredAppointments;
}
