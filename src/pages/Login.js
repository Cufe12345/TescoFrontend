import { useContext, useState } from "react";
import LoginForm from "../components/LoginForm";
import Loading from "../components/layout/Loading";
import classes from "./Login.module.css";
import { motion } from "framer-motion";
import { NetworkContext } from "../App";
function LoginPage() {
  const ip = useContext(NetworkContext);

  console.log(ip);

  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{
        opacity: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      }}
      animate={{
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      }}
      exit={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
      transition={{ duration: 0.75 }}
    >
      <LoginForm></LoginForm>
    </motion.div>
  );
}

export default LoginPage;
