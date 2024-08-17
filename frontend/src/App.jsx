import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="w-full h-[100vh] max-h-screen">
        <Header />
        <main className="pt-20 bg-slate-200 w-full h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
