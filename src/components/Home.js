import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import Spinner from 'react-bootstrap/Spinner';
const Home = () => {
  // const [sortedProducts,setSortedProducts]=useState();
  const {
    state: { products },
    dispatch,
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery,category },
  } = CartState();
  useEffect(() => {
    async function fetchData() {
      await fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((response) =>dispatch({
          type: "SET_PRODUCT",
          payload: response.products,
        }));
    }
    fetchData();
  }, []);

  const transformProducts =() => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.stock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.rating >= byRating
      );
    }
    // if(category.value!=-1){
    //   sortedProducts = getCategorizedProducts();
    // }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts()?.length>0?transformProducts()?.map((prod) => (
          <SingleProduct prod={prod} key={prod.id} />
        )):<Spinner style={{margin:'auto'}} animation="grow" />}
      </div>
    </div>
  );
};

export default Home;
