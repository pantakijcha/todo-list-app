import React, { Fragment, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useDispatch } from "react-redux";
import { addNewTodo } from "./taskManagerSlice";

function NewTask(props) {
  const dispatch = useDispatch();

  const [newTask, setNewTask] = useState("");
  const [newTaskId, setNewTaskId] = useState(3);

  const AddTask = () => {
    dispatch(addNewTodo({ id: newTaskId, name: newTask }));
    setNewTaskId(newTaskId + 1);
    setNewTask("");
  };

  return (
    <Fragment>
      <div
        class="flex align-content-center"
        style={{ marginBottom: "2em", marginTop: ".5em" }}
      >
        <div class="flex flex-none">
          <span className="p-input-icon-right">
            {props.loading ? <i className="pi pi-spin pi-spinner" /> : null}
            <InputText
              id="new-task-input-text"
              className="p-inputtext-sm"
              style={{ width: "270px" }}
              value={newTask}
              disabled={props.loading}
              placeholder="Task name"
              onChange={(e) => setNewTask(e.target.value)}
            />
          </span>
        </div>
        <div class="flex flex-grow-1">
          <Button
            label="Add Task"
            className="p-button-sm"
            onClick={AddTask}
            style={{ marginLeft: "1em", width: "100%" }}
            loading={props.loading}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default NewTask;
