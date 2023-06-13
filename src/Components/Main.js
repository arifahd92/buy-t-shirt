import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
export default function Main() {
  const [input, setInput] = useState({
    name: "",
    desc: "",
    price: "",
  });
  const [available, setAvailable] = useState({
    large: 100,
    medium: 100,
    small: 100,
  });
  const handleChange = (e) => {
    let name = e.target.name;
    let inptVal = e.target.value;
    setInput({ ...input, [name]: inptVal });
  };
  const handleAddProduct = () => {
    let empty = Object.values(input).includes("");
    console.log(empty);
    if (empty) {
      alert("please fill all the details");
      return;
    }
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-between align-items-center border bg-light">
        <div className="col-sm-2">
          <input
            className="form-control"
            name="name"
            onChange={handleChange}
            value={input.name}
            type="text"
            placeholder="T shirt Name"
          />
        </div>
        <div className="col-sm-2">
          <input
            className="form-control"
            name="desc"
            onChange={handleChange}
            value={input.desc}
            type="text"
            placeholder="description"
          />
        </div>
        <div className="col-sm-1">
          <input
            className="form-control"
            name="price"
            onChange={handleChange}
            value={input.price}
            type="number"
            min={0}
            placeholder="price"
          />
        </div>
        <div className="col-sm-1">
          <label htmlFor="">l</label>{" "}
          <div className="border">{available.large}</div>
        </div>
        <div className="col-sm-1">
          <label htmlFor="">m</label>{" "}
          <div className="border">{available.medium}</div>
        </div>
        <div className="col-sm-1">
          <label htmlFor="">s</label>
          <div className="border">{available.small}</div>
        </div>
        <div className="col-sm-1">
          <button
            className="btn  btn-sm btn-outline-info"
            onClick={handleAddProduct}
          >
            add product
          </button>
        </div>
      </div>
    </div>
  );
}
