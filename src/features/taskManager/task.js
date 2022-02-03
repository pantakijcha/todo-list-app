import React from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

import { useDispatch } from "react-redux";
import { deleteTodo, addNewComplete, deleteComplete } from "./taskManagerSlice";

function Task(props) {
  const dispatch = useDispatch();

  const footer = (
    <div className="flex justify-content-between">
      {props.taskType === "todo" ? (
        <Button
          label="Complete"
          icon="pi pi-check"
          className="p-button-success p-button-sm"
          onClick={() => {
            dispatch(deleteTodo(props.task));
            dispatch(addNewComplete(props.task));
          }}
        />
      ) : null}
      <Button
        icon="pi pi-times"
        className="p-button-danger p-button-text p-button-sm"
        onClick={() => {
          switch (props.taskType) {
            case "todo":
              dispatch(deleteTodo(props.task));
              break;
            case "complete":
              dispatch(deleteComplete(props.task));
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );

  return (
    <Card
      title={props.task.name}
      footer={footer}
      style={{ marginBottom: "2em" }}
    />
  );
}

export default Task;
