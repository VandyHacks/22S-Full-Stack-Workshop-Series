import React from "react";

export default function Item({ itemData, removeItem }) {
  return (
    <div className="item">
      <p className="title">{itemData.title}</p>
      <p className="date">{itemData.date.toDateString()}</p>
      <input type="checkbox" onChange={() => removeItem(itemData)}></input>
    </div>
  );
}
