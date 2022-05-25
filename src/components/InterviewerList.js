import React from "react";

import classNames from "classnames";

import "components/InterviewerList.scss";

import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map( interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setinterviewer={props.setDay}
        interviewer={interviewer.id === props.interviewer}
        />
    );
  })

return ( <ul> {interviewers } </ul>
// {/* <section className="interviewers">
//   <h4 className="interviewers__header text--light">Interviewer</h4>
//   <ul className="interviewers__list"></ul>
// </section> */}
// );
);
}