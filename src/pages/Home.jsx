import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoriesChip from "../components/CategoriesChip";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true); 
  const [cartItems, setCartIitems] = useState([])

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        console.log("category=>", res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true); 
    const URL =
      selectedCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${selectedCategory}`;
    console.log("Use Effect has been called");

    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
        setIsLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); 
      });
  }, [selectedCategory]);

  return (
    <>
    <div className="container px-5 py-24 mx-auto">
     
      <div className="flex flex-wrap -m-4 gap-3 cursor-pointer">
        <CategoriesChip
          category={{
            name: "All",
            slug: "All",
          }}
          isChosen={selectedCategory == "All"}
          onClick={() => setSelectedCategory("All")}
          key="all"
        />
        {categories.map((category) => (
          <CategoriesChip
            onClick={() => setSelectedCategory(category.slug)}
            category={category}
            key={category.slug}
            isChosen={category.slug == selectedCategory}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <Link to={`/productDetail`}>
          <div className="w-full h-fit flex-wrap flex py-5 my-5">
            {products.map((data) => (
              <div className="p-4 md:w-1/4" key={data.id}>
                <ProductCard items={data} />
              </div>
            ))}
          </div>
        </Link>
      )}
    </div>
    </>
  );
}

export default Home;
