import { Card, Button } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="products">
      <Card>
      <Link className="img-wrapper" style={{cursor: "pointer" }} to={`/product/${prod.id}`}>
        <Card.Img variant="top" src={prod?.thumbnail} className="hover-zoom productImage" alt={prod.name} />
        </Link>
        <Card.Body>
          <Card.Title>{prod?.title}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>₹ {prod?.price}</span>
            
            <Rating rating={Math.floor(prod.rating)} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prod.id) ? (
            <Button
              variant="danger"
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prod,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prod,
                })
              }
              disabled={prod.stock==0}
            >
              {prod.stock ==0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
