import database from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

const addTask = (item) => {
  try {
    setDoc(doc(database, "tasks", item.title), item);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const priorityToNum = (prio) => {
  if (prio === "High") {
    console.log(3);
    return 3;
  } else if (prio === "Medium") {
    return 2;
  } else if (prio === "Low") {
    return 1;
  } else {
    return 0;
  }
};

const sortFun = (a, b) => {
  if (b.due.toDateString() === a.due.toDateString()) {
    return priorityToNum(b.priority) - priorityToNum(a.priority);
  } else {
    return a.due - b.due;
  }
};

const readData = async () => {
  const arr = await getDocs(collection(database, "tasks"));
  let dataArr = [];
  arr.forEach((doc) => {
    const object = {
      title: doc.data().title,
      priority: doc.data().priority,
      due: new Date(doc.data().due.seconds * 1000),
      done: doc.data().done,
    };
    dataArr.push(object);
  });
  return await dataArr.slice().sort(sortFun);
};

const deleteItem = async (taskName) => {
  await deleteDoc(doc(database, "tasks", taskName))
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addTask, readData, deleteItem };