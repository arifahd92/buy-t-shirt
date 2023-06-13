import React from "react";

export default function Cart({ cart, showCart, setShowCart }) {
  let saveddata = JSON.parse(localStorage.getItem("buy"));
  console.log("saveddata");
  console.log(saveddata);
  let totalPrice = 0;
  if (saveddata) {
    totalPrice = 0;
    saveddata.forEach((element) => {
      totalPrice += +element.price;
    });
    console.log(totalPrice);
  }
  return (
    <>
      <div className="container-fluid mt-3 bg-info">
        <div className="row">
          <div className=" col display-4 text-center">cart</div>
        </div>
        <div className="row">
          <div className=" col border-bottom"></div>
        </div>
        {cart.map((item, index) => {
          return (
            <>
              <div className="row justify-content-between">
                <div className="col">
                  <p>{item.name}</p>
                </div>
                <div className="col">
                  <p>{item.desc}</p>
                </div>
                <div className="col">
                  <p>{item.price}$</p>
                </div>
              </div>
            </>
          );
        })}
        <div className="row border p-3">
          <div className="col-4">total amount</div>
          <div className="col-4"></div>
          <div className="col-4 ">{totalPrice}$</div>
        </div>
        <div className="row ">
          <div className="col-4"></div>
          <button className="col-4" onClick={() => setShowCart(!showCart)}>
            cancel
          </button>
          <button className="col-4  btn " disabled>
            place order
          </button>
        </div>
      </div>
    </>
  );
}
