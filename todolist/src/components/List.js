import React, { useState } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function List() {
  let [title, setTitle] = useState("");
  let taskList = [
    {
      title: "task1",
      date: new Date(),
      id: uuidv4(),
    },
    {
      title: "task2",
      date: new Date(),
      id: uuidv4(),
    },
  ];
  let [todo, setTodo] = useState(taskList);
  let [date, setDate] = useState(new Date());

  function removeItem(data) {
    const result = todo.filter((item) => item.id !== data.id);
    setTodo(result);
  }

  function onSubmit() {
    setTodo([...todo, { title: title, date: date, id: uuidv4() }]);
    setTitle("");
    setDate(new Date());
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
        <DatePicker selected={date} onChange={setDate} />
        <input type="button" value="Add" onClick={onSubmit} />
        {todo.map((data) => (
          <Item key={data.id} itemData={data} removeItem={removeItem} />
        ))}
      </div>
    </div>
  );
}

export default List;
