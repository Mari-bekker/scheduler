import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

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
  }

  function remove(){
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    });
  }

  function confirm() {
    transition(CONFIRM);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message= "Saving"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = { confirm }
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
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}
    </article>
  );
}
