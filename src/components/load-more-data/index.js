import React, { useEffect, useState } from "react";
import "./style.css";

const LoadMoreData = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();
      console.log(result);
      if (result && result.products?.length) {
        setProducts((prev) => {
            const newProduts = result.products.filter((item) => !prev.some(prevItem => prevItem.id === item.id))
            return [...prev, ...newProduts];
        });
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);
  useEffect(() => {
    if (products.length === 100) setDisableBtn(true);
  }, [products]);

  if (loading) return <div>Loading data</div>;

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products?.length &&
          products.map((item) => {
            return (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            );
          })}
      </div>
      <div className="button-container">
        <button disabled={disableBtn} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
        {disableBtn ? "You have reached to 100 products" : null}
      </div>
    </div>
  );
};

export default LoadMoreData;
