import React, { useState, useEffect } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { database } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function List() {
  const [user] = useAuthState(auth);
  let [title, setTitle] = useState("");
  let [date, setDate] = useState(new Date());
  let [todo, setTodo] = useState([]);
  let [openModal, setOpenModal] = useState(false);
  let [calLink, setCalLink] = useState("");

  const collectionName = `users/${user.uid}/tasks`;

  function removeItem(data) {
    const result = todo.filter((item) => item.id !== data.id);
    setTodo(result);
    deleteDoc(doc(database, collectionName, data.id));
  }

  function onSubmit() {
    const newObj = { title: title, date: date, id: uuidv4() };
    setDoc(doc(database, collectionName, newObj.id), newObj);
    setTodo([...todo, newObj]);
    setTitle("");
    setDate(new Date());
  }

  async function saveCalLink() {
    console.log(calLink);
    await setDoc(doc(database, "users", user.uid), {
      calendaruri: calLink,
    });
    setOpenModal(false);
  }

  async function syncCalendar() {
    const brightSpaceArr = await fetch(
      "https://us-central1-automation-nk.cloudfunctions.net/ical?url=" + calLink
    ).then((res) => res.json());
    let updatedArr = todo;
    brightSpaceArr.forEach((task) => {
      if (!todo.filter((item) => item.title === task.name).length) {
        const newObj = {
          title: task.name,
          date: new Date(task.time),
          id: uuidv4(),
        };
        setDoc(doc(database, collectionName, newObj.id), newObj);
        updatedArr.push(newObj);
      }
    });
    setTodo([...updatedArr]);
    setOpenModal(false);
  }

  useEffect(() => {
    getDocs(collection(database, collectionName)).then((tasks) => {
      let newArr = [];
      tasks.forEach((task) =>
        newArr.push({
          title: task.data().title,
          date: new Date(task.data().date.seconds * 1000),
          id: task.data().id,
        })
      );
      setTodo(newArr);
    });

    getDoc(doc(database, "users", user.uid)).then((user) => {
      setCalLink(user.data().calendaruri || "");
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
        <input
          type="button"
          value="Set Calendar Link"
          onClick={() => setOpenModal(true)}
        />
        <input
          type="button"
          value="Sync with Brightspace"
          onClick={syncCalendar}
          disabled={!calLink}
        />
        {todo.map((data) => (
          <Item key={data.id} itemData={data} removeItem={removeItem} />
        ))}
      </div>

      <Modal open={openModal} onClose={saveCalLink} center>
        <h2>Please input the link to your calendar feed</h2>
        <input
          type="text"
          value={calLink}
          onChange={(event) => setCalLink(event.target.value)}
        />
      </Modal>
    </div>
  );
}

export default List;
