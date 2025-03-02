import { useState } from "react";
import Task from "./Task";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handlePost(ev) {
    ev.preventDefault();

    const tempId = Date.now().toString();
    const temptask = { _id: tempId, task, marked: false };
    setTasks((prev) => [...prev, temptask]);

    fetch("http://localhost:4000/postTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTasks((prev) => prev.map((t) => (t._id === tempId ? data : t)));
      });
    setTask("");
  }

  return (
    <div className="App">
      <h1>Add Tasks</h1>
      <input
        type="text"
        placeholder="Enter a Task"
        value={task}
        onChange={(ev) => setTask(ev.target.value)}
      />
      <input type="submit" onClick={(ev) => handlePost(ev)} />
      <Task tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
