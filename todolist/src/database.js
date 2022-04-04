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
    setDoc(doc(database, "tasks", item.id), item);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const readData = async () => {
  const arr = await getDocs(collection(database, "tasks"));
  let dataArr = [];
  arr.forEach((doc) => {
    console.log(doc.data().date);
    const object = {
      title: doc.data().title,
      date: new Date(doc.data().date.seconds * 1000),
      id: doc.data().id,
    };
    dataArr.push(object);
  });
  return await dataArr;
};

const deleteTask = async (taskName) => {
  await deleteDoc(doc(database, "tasks", taskName))
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addTask, readData, deleteTask };
