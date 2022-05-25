import React from "react";

import "components/InterviewerListItem.scss";

import classNames from "classnames";

export default function InterviewerListItem(props) {
  
  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const imageClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })

  return (
  <li className ={interviewerListItemClass} selected={props.selected}  onClick={props.setInterviewer}>
      <img
        className={imageClass}
        src={props.avatar}
        alt={props.name}
      />
    {props.selected && props.name}
  </li>
  );
}