import React from "react";

export default function Item({ itemData, removeItem }) {
  return (
    <div className="item">
      <p>{itemData.title}</p>
      <input type="checkbox" onChange={() => removeItem(itemData)}></input>
    </div>
  );
}
