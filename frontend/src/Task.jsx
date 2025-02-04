import { useState, useEffect } from "react";

export default function Task({ tasks, setTasks }) {
  function fetchTasks() {
    fetch("http://localhost:4000/getTask", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => setTasks(data));
  }
  useEffect(() => {
    fetchTasks();
  }, []);

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
      .then((resp) => resp.json())
      .then(() => fetchTasks()) // Refresh tasks after update
      .catch((error) => console.error("Error updating task:", error));
  }

  return (
    <div>
      <p>Task Lists</p>
      {tasks.map((ele) => {
        return (
          <h1
            style={{ textDecoration: ele.marked ? "line-through" : "none" }}
            onClick={() => handleToggle(ele._id, ele.marked)}
          >
            {ele.task}
          </h1>
        );
      })}
    </div>
  );
}
