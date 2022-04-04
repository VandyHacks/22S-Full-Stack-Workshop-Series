import React, { useState, useEffect } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addTask, readData, deleteTask } from "../database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function List() {
  const [user] = useAuthState(auth);
  let [title, setTitle] = useState("");
  let [date, setDate] = useState(new Date());
  let [todo, setTodo] = useState([]);

  function removeItem(data) {
    const result = todo.filter((item) => item.id !== data.id);
    setTodo(result);
    deleteTask(data);
  }

  function onSubmit() {
    console.log(todo);
    const newObj = { title: title, date: date, id: uuidv4() };
    addTask(newObj);
    setTodo([...todo, newObj]);
    setTitle("");
    setDate(new Date());
  }

  useEffect(() => {
    console.log(readData());
    readData().then((tasks) => {
      setTodo(tasks);
    });
  }, []);

  return (
    <div>
      <marquee>
        Signed in: {user.displayName}, {user.email}
      </marquee>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        Sign Out
      </button>
      <h1>Todo List</h1>
      <div className="inputs">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <DatePicker selected={date} onChange={setDate} />
        <input type="button" value="Add" onClick={onSubmit} />
        {todo.map((data) => {
          console.log(data);
          return <Item key={data.id} itemData={data} removeItem={removeItem} />;
        })}
      </div>
    </div>
  );
}

export default List;
