import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors"
import { application } from "../Application"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

//   function save(name, interviewer) {
//     const interview = {
//       student: name,
//       interviewer
//     }

//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     }

//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     }

//     setState({
//       ...state,
//       appointments
//     })

//     // props.bookInterview(props.id.interview) {
//     //   transition(SHOW)

//     // }
    
  
// }

    return (
      <article className="appointment">
      <Header time ={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      /> )}

        {mode === CREATE && (
      <Form
         interviewers={ props.interviewers}
         interviewer={props.interview.interviewer.id}
        
         onCancel={() => back(EMPTY)}
         //onSave={ save } 

         
         />
         
      )}
      </article>


    )};
