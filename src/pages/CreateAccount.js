import CreateAccountForm from "../components/CreateAccountForm";
import { motion } from "framer-motion";
function CreateAccount() {
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
      <CreateAccountForm></CreateAccountForm>
    </motion.div>
  );
}
export default CreateAccount;
