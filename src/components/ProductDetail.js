import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import Slider from "./Slider";
import Rating from "./Rating";
import { CartState } from "../context/Context";

function ProductDetail() {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  // console.log(useLocation().pathname.split("/")[2])
  const [id, setId] = useState(useLocation().pathname.split("/")[2]);
  const [details, setDetails] = useState();
  useEffect(() => {
    async function fetchData() {
      await fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((response) => setDetails(response));
    }
    fetchData();
  }, []);
  console.log("details", details);
  return (
    <div
      style={{
        backgroundColor: "#ECEFF1",
        padding: 10,
        width: "100vw",
        height: "90vh",
      }}
    >
      {details ? (
        <div className="row">
          <div className="col-sm">
            <Slider items={details?.images} />
          </div>
          <div className="d-flex flex-column h-full m-10 col-sm justify-content-center">
            <div className="d-flex flex-row">
              <h8 class="font-weight-bold mr-2">{details?.brand}, </h8>
              <h8 class="font-weight-bold">{details?.category}</h8>
            </div>
            <div className="m-3">
              <h1 className="font-weight-bold">{details?.title}</h1>
              <Row className="ml-1">
                <Rating
                  rating={Math.floor(details?.rating)}
                  onClick={(i) => {}}
                  size="20px"
                  style={{ cursor: "pointer", color: "yellow", size: 20 }}
                />
                <p style={{ fontSize: 10, marginLeft: 2 }}>
                  ({details?.rating})
                </p>
              </Row>
              <Row className="priceRow">
                <h1 style={{ fontSize: 20, fontWeight: "600" }}>
                  ₹{details?.price}
                </h1>
                <p className="price">
                  <del>
                    {Math.floor(
                      details?.price +
                        (details?.price * details?.discountPercentage) / 100
                    )}
                  </del>
                </p>
                <div className="discountPrice">{`You Save ${
                  details?.discountPercentage
                }% ₹${Math.floor(
                  (details?.price * details?.discountPercentage) / 100
                )}`}</div>
              </Row>
              <p style={{ fontSize: 20 }}>{details?.description}</p>
              <Row className="ml-1 align-items-center">
                <p
                  style={{
                    fontSize: 20,
                    marginRight: 3,
                    textAlign: "center",
                    alignSelf: "center",
                  }}
                >
                  {details?.stock} items in stock.
                </p>
                <Button
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: details,
                    })
                  }
                >
                  Buy now
                </Button>
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <div style={{margin: "auto", width: "100%", height: "100%" }}>
          <Spinner style={{ margin: "auto" }} animation="grow" />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
