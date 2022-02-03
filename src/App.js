import { useEffect, useState } from "react";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css"; //flex
import { Panel } from "primereact/panel";

import NewTask from "./features/taskManager/newTask";
import Task from "./features/taskManager/task";

import { useSelector, useDispatch } from "react-redux";
import {
  getTodoList,
  getCompleteList,
  initialTodoList,
  initialCompleteList,
  getTodoListIsLoading,
  getCompleteListIsLoading,
} from "./features/taskManager/taskManagerSlice";

function App() {
  // state
  const [todoPanelCollapsed, setTodoPanelCollapsed] = useState(false);
  const [completePanelCollapsed, setCompletePanelCollapsed] = useState(false);

  // redux state
  const todoList = useSelector(getTodoList);
  const completeList = useSelector(getCompleteList);
  const todoListIsLoading = useSelector(getTodoListIsLoading);
  const completeListIsLoading = useSelector(getCompleteListIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialTodoList());
    dispatch(initialCompleteList());
  }, []);

  return (
    <div className="flex justify-content-around" style={{ paddingTop: "2em" }}>
      <Panel
        header={`Todo (${todoList.length})`}
        toggleable
        style={{ width: "450px" }}
        collapsed={todoPanelCollapsed}
        onToggle={(e) => setTodoPanelCollapsed(e.value)}
      >
        <NewTask loading={todoListIsLoading} />
        <div class="flex flex-column">
          {todoList.length > 0
            ? todoList.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    taskType="todo"
                    loading={todoListIsLoading}
                  />
                );
              })
            : "No todo task."}
        </div>
      </Panel>

      <Panel
        header={`Complete (${completeList.length})`}
        toggleable
        style={{ width: "450px" }}
        collapsed={completePanelCollapsed}
        onToggle={(e) => setCompletePanelCollapsed(e.value)}
      >
        <div class="flex flex-column">
          {completeList.length > 0
            ? completeList.map((task) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    taskType="complete"
                    loading={completeListIsLoading}
                  />
                );
              })
            : "No complete task."}
        </div>
      </Panel>
    </div>
  );
}

export default App;
