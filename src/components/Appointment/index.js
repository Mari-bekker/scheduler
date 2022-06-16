import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);
    props.bookInterview (props.id, interview)
    .then (()=> {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));
  }

  function remove(){
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(error => transition(ERROR_DELETE, true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function edit() {
    console.log (props.interview)
    transition(EDIT);
  }



  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message= "Saving"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = { confirm }
          onEdit = { edit }
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={ save }
        />
      )}

      {mode === DELETING && (
        <Status message="Deleting" />
      )}

      {mode === CONFIRM && (
        <Confirm
          onConfirm={() => remove()}
          onCancel={ back }
          message="Are you sure you would like to delete?"
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={ save }
          onCancel={ back }
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={ back }
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={ back }
        />
      )}
    </article>
  );
}
