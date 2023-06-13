import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import Cart from "./Cart";
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
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const handleChange = (e) => {
    let name = e.target.name;
    let inptVal = e.target.value;
    setInput({ ...input, [name]: inptVal });
  };
  useEffect(() => {
    let obj = {
      medium: 0,
      small: 0,
      large: 0,
    };
    localStorage.setItem("size", JSON.stringify(obj));
    let storedData = JSON.parse(localStorage.getItem("store"));

    if (storedData) {
      setList(storedData);
    }
    let buyData = JSON.parse(localStorage.getItem("buy"));
    if (buyData) {
      setCart(buyData);
      setCartCount(buyData.length);
    } else {
      setCartCount(0);
    }
  }, []);
  const handleAddProduct = () => {
    let empty = Object.values(input).includes("");
    console.log(empty);
    if (empty) {
      alert("please fill all the details");
      return;
    }
    console.log("object");
    // going to mix input and available object
    let individualItem = { ...input, ...available };
    console.log(individualItem);
    let storedData = JSON.parse(localStorage.getItem("store"));
    if (storedData != null) {
      let newData = [...storedData, individualItem];
      console.log(newData);
      localStorage.setItem("store", JSON.stringify(newData));
      setList(newData);
    } else {
      localStorage.setItem("store", JSON.stringify([individualItem]));
      setList([individualItem]);
    }
    setInput({
      name: "",
      desc: "",
      price: "",
    });
  };
  function updatAvailable(size) {
    if (size == "m") {
      console.log("selected m");
      console.log({
        ...available,
        medium: +available.medium - 1,
      });
      setAvailable({
        ...available,
        medium: +available.medium - 1,
      });
    } else if (size == "l") {
      console.log("selected l");
      setAvailable({
        ...available,
        large: +available.large - 1,
      });
    } else if (size == "s") {
      console.log("size s selected");
      setAvailable({
        ...available,
        small: +available.small - 1,
      });
    }
    alert("item added to cart");
  }
  const handleBuy = (size, index) => {
    console.log(size + "inside handle buy");
    updatAvailable(size);
    let bought = list.filter((item, ind) => ind === index);
    console.log(bought);
    let buyData = JSON.parse(localStorage.getItem("buy"));
    if (buyData == null) {
      localStorage.setItem("buy", JSON.stringify(bought));
      setCart(bought);
      setCartCount(bought.length);
    } else {
      let savedBuyData = JSON.parse(localStorage.getItem("buy"));
      let dataToBeSaved = [...savedBuyData, bought[0]];
      localStorage.setItem("buy", JSON.stringify(dataToBeSaved));

      setCart(dataToBeSaved);
      console.log(cart);
      setCartCount(dataToBeSaved.length);
    }
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-1 ml-auto ">
            <button
              className="btn btn-outline-success text-center"
              onClick={() => setShowCart(!showCart)}
            >{`cart ${cartCount}`}</button>
          </div>
        </div>
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
      <div className="container-fluid border bg-light">
        {list.length >= 0 &&
          list.map((item, index) => {
            return (
              <>
                <div className="row border text-center mt-3">
                  <div className="col">
                    <p>{item.name}</p>
                  </div>
                  <div className="col">
                    <p>{item.desc}</p>
                  </div>
                  <div className="col">
                    <p>{item.price}$</p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-info col"
                    onClick={() => handleBuy("l", index)}
                  >
                    {`buy large (${available.large})`}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-info col"
                    onClick={() => handleBuy("m", index)}
                  >{`buy medium (${available.medium})`}</button>
                  <button
                    className="btn btn-sm btn-outline-info col"
                    onClick={() => handleBuy("s", index)}
                  >{` buy small (${available.small})`}</button>
                </div>
              </>
            );
          })}
      </div>
      {showCart && (
        <Cart cart={cart} showCart={showCart} setShowCart={setShowCart} />
      )}
    </>
  );
}
