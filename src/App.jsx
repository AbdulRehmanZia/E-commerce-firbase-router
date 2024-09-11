import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail.jsx";
import Header from "./components/Header";
import ThemeContextProvider from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignUp";
import Profile from "./pages/Profile";
// import ProductDetail from "./pages/productDetail";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SignIn />} path="/signin" />
          <Route element={<SignOut />} path="/signup" />
          {/* <Route element={<ProductCard/>} path="/products" /> */}
          <Route element={<ProductDetail />} path="/products/:id" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
