import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import chilli from "../assets/Chilli.jpg";
import pizza from "../assets/pizza.jpg";
import mojito from "../assets/mojito.jpg";

import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    //console.log(response[0],response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []); //no dependency means on first load

  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="bg-light fs-5 fst-italic text-dark w-10 text-center rounded-full ">
              Place Your Order, 30minutes Before You Come for Dining, And We'll Keep Your Food Ready...
            </div>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />

                <button
                  className="btn btn-outline-success text-white"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={chilli}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={pizza}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={mojito}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          //nested loop for rendering food acc to catergory
          foodCat !== []
            ? foodCat.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {foodItem !== [] ? (
                      foodItem
                        .filter(
                          (item) =>
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div key={filterItems._id} className="col-md-4">
                              <Card
                                foodItem={filterItems}
                                // foodName={filterItems.name}
                                options={filterItems.options[0]}
                                // imgsrc={filterItems.img}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div> No Such Data exists</div>
                    )}
                  </div>
                );
              })
            : ""
        }
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
