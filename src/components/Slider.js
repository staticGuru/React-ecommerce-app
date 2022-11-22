import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
function Slider({ items }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {items?.map((image, index) => (
        <Carousel.Item key={index}>
          <img style={{height:'80vh'}} className="d-block w-100" src={image} alt="First slide" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
