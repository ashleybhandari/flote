import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landing";
import SignIn from "../components/SignIn";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}
