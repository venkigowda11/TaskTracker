import { useEffect } from "react";

export default function Task({ tasks, setTasks }) {
  useEffect(() => {
    fetchTasks();
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:4000/deleteTask/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setTasks((prev) => prev.filter((task) => task._id !== id));
      });
  }

  function fetchTasks() {
    fetch("http://localhost:4000/getTask", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setTasks(data));
  }

  function handleToggle(id, currentMarked) {
    console.log("Clicked", id);
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, marked: !currentMarked } : task
      )
    );
    fetch(`http://localhost:4000/changeMarked/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ marked: !currentMarked }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => console.log(resp))
      .then(() => fetchTasks()) // Refresh tasks after update
      .catch((error) => console.error("Error updating task:", error));
  }
  return (
    <div>
      <p>Task Lists</p>
      {tasks.map((ele) => {
        return (
          <div
            key={ele._id} // Always use a key when mapping
            className="taskTable"
          >
            <div
              style={{ textDecoration: ele.marked ? "line-through" : "none" }}
              onClick={() => handleToggle(ele._id, ele.marked)}
            >
              {ele.task}
            </div>
            <div>
              <button onClick={() => handleDelete(ele._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
