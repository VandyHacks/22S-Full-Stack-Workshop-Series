import React, { useState, useEffect } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {database} from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function List() {
  const [user] = useAuthState(auth);
  let [title, setTitle] = useState("");
  let [date, setDate] = useState(new Date());
  let [todo, setTodo] = useState([]);
  console.log(user);

  const collectionName = `users/${user.uid}/tasks`;

  function removeItem(data) {
    const result = todo.filter((item) => item.id !== data.id);
    setTodo(result);
    deleteDoc(doc(database, collectionName, data.id));
  }

  function onSubmit() {
    console.log(todo);
    const newObj = { title: title, date: date, id: uuidv4() };
    setDoc(doc(database, collectionName, newObj.id), newObj);
    setTodo([...todo, newObj]);
    setTitle("");
    setDate(new Date());
  }

  useEffect(() => {
    getDocs(collection(database, collectionName)).then((tasks) => {
      console.log(tasks);
      let newArr = [];
      tasks.forEach((task) => newArr.push({
        title: task.data().title,
        date: new Date(task.data().date.seconds * 1000),
        id: task.data().id,
      }));
      setTodo(newArr);
    })
  }, [])

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
