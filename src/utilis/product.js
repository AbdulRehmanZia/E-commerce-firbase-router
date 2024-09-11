import axios from "axios";

function getAllProducts() {
  axios
    .get("https://dummyjson.com/products")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export default getAllProducts