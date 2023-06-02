import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CreateAccountPage from "./pages/CreateAccount";
import MainNavigation from "./components/layout/MainNavigation";
import classes from "./index.css";
import SearchResults from "./pages/SearchResults";
import OrdersPage from "./pages/OrdersPage";
import BasketPage from "./pages/Basket";
import AdminPage from "./pages/Admin";
import background from "./components/layout/images/Background.png";
import { createContext } from "react";
import { Helmet } from "react-helmet";
import userContext from "./contexts/userContext";
import { useState } from "react";

export const NetworkContext = createContext();
export const UserContext = createContext();
function App() {
  const location = useLocation();
  let test = [{ testData: "test" }];
  const [userData, setUserData] = useState({
    order: "No order",
    ordertitle: "N/A",
    query: "N/A",
    updatebasket: false,
    page: location.pathname,
    admin: false,
  });
  //20.58.0.170
  return (
    <div>
      <NetworkContext.Provider value={"http://20.58.0.170:8080/"}>
        <userContext.Provider value={{ userData, setUserData }}>
          <MainNavigation />
          <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/CreateAccount" element={<CreateAccountPage />} />
              <Route path="/Results" element={<SearchResults />} />
              <Route path="/Orders" element={<OrdersPage />}></Route>
              <Route path="/Basket" element={<BasketPage />}></Route>
              <Route path="/Admin" element={<AdminPage />}></Route>
            </Routes>
          </AnimatePresence>
        </userContext.Provider>
      </NetworkContext.Provider>
    </div>
  );
}

export default App;
