import { Outlet } from "react-router-dom";
import { Nav } from "./components/Nav/Nav";
import "./App.scss";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Nav />
      <Sidebar />
      <div className="outlet-wrapper">
        <Outlet />
      </div>
    </>
  );
}

export default App;
