import { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import Spinner from "react-bootstrap/Spinner";
const Home = () => {
  const [total, setTotal] = useState(0);
  var LIMIT = 9;
  const {
    state: { products },
    dispatch,
    productDispatch,
    productState: {
      sort,
      pagination,
      byRating,
      searchQuery,
      category,
    },
  } = CartState();
  useEffect(() => {
    async function fetchData() {
      if(category.value == -1 ){
        dispatch({
          type: "SET_PAGINATION",
          payload: { skip: 0, total: 0 },
        });
        setTimeout(async () => await getProducts(0), 1000);
      }
     
    }
    fetchData();
  }, [searchQuery]);
  async function getProducts(skip) {
    await fetch(
      searchQuery != ""
        ? `https://dummyjson.com/products/search?q=${searchQuery}&limit=9&skip=${
            skip * 9
          }`
        : `https://dummyjson.com/products?limit=9&skip=${skip * 9}`
    )
      .then((res) => res.json())
      .then((response) => {
        productDispatch({
          type: "SET_PAGINATION",
          payload: { skip: skip, total: response.total },
        });
        dispatch({
          type: "SET_PRODUCT",
          payload: response.products,
        });
        setTotal(Math.round(response.total / LIMIT));
      });
  }
  const handlePagination = async (skip) => {
    await getProducts(skip);
  };
  const transformProducts = () => {
    let sortedProducts = products;
    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }


    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating);
    }
    // if(category.value!=-1){
    //   sortedProducts = getCategorizedProducts();
    // }

    // if (searchQuery) {
    //   sortedProducts = sortedProducts.filter((prod) =>
    //     prod.title.toLowerCase().includes(searchQuery)
    //   );
    // }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts()?.length > 0 ? (
          transformProducts()?.map((prod) => (
            <SingleProduct prod={prod} key={prod.id} />
          ))
        ) : (
          <Spinner style={{ margin: "auto" }} animation="grow" />
        )}
        {products.length >= 9 && (
          <nav aria-label="Page navigation example  justify-content-end">
            <ul className="pagination">
              {Array.from({ length: total }, (_, i) => i + 1).map(
                (page, index) => {
                  return (
                    <li
                      key={index}
                      className="page-item"
                      onClick={(e) => handlePagination(index)}
                    >
                      <a
                        className="page-link"
                        style={{
                          backgroundColor:
                            pagination.skip == index ? "green" : "transparent",
                        }}
                      >
                        {page}
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Home;
