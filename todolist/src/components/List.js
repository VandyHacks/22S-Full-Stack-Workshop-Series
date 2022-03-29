import React, { useState } from "react";
import Item from "./Item";

function List() {
  let [title, setTitle] = useState("");
  let taskList = [
    {
      title: "task1",
    },
    {
      title: "task2",
    },
  ];
  let [todo, setTodo] = useState(taskList);

  function removeItem(data) {
    const result = todo.filter((item) => item.title !== data.title);
    setTodo(result);
  }

  function onSubmit() {
    setTodo([...todo, { title: title }]);
    setTitle("");
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div className="inputs">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input type="button" value="Add" onClick={onSubmit} />
        {todo.map((data) => (
          <Item
            key={JSON.stringify(data)}
            itemData={data}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
}

export default List;
