import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import React, { useRef, useState } from "react";
import Select from 'react-select';
const Filters = () => {
  const [categories, setCategories] = useState();
  const [selectedCategory,setSelectedCategory] = useState();
  const categoryRef =useRef();
  const {
    productDispatch,
    dispatch,
    productState: { byStock, byFastDelivery, sort, byRating,category },
  } = CartState();

  // make state for rating
  React.useEffect(() => {
    async function fetchData() {
      await fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((response) => {
          setCategories([{value:'-1',label:'select the category'},...response?.map((item,index)=>({value:index,label:item}))]);
          setSelectedCategory(category)
        });
    }
    fetchData();
  }, []);
  const customStyles = {
    singleValue:(provided) => ({
      ...provided,
      height:'100%',
      color:'#08699B',
      paddingTop:'3px',
    }),
    option: provided => ({
      ...provided,
      color: 'black'
    }),
  }
  const getCategorizedProducts=async(e)=>{
    await fetch(e.value==-1?'https://dummyjson.com/products/':`https://dummyjson.com/products/category/${e.label}`)
   .then(res => res.json())
   .then((response)=>{
     dispatch({type:'SET_PRODUCT',payload:response.products})
   });
}
  const HandleCategory=async (e)=>{
setSelectedCategory(e);
await getCategorizedProducts(e);
productDispatch({
  type: "SORT_BY_CATEGORY",
  payload: e,
});
  }
  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span className="categoryFilter">
        <label style={{ paddingRight: 10 }}>Category: </label>
        <Select
        className="basic-single"
        classNamePrefix="select"
        name="color"
        value={selectedCategory}
        onChange={HandleCategory}
        styles={customStyles}
        options={categories}
      />
       
      </span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>

      <Button
        variant="light"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
