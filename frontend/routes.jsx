import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import Chat from "./src/pages/Chat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
      <Route path="/" element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path="/chat" element={<Chat />} />
    </>
  )
);

export default router;
