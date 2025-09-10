import { Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './page/MainPage';
import MapPage from "./page/MapPage"
import AllPostPage from './page/AllPostPage';
import LoginPage from './page/LoginPage';

const App = () => {
  return (
    <>
    <main className = "content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/all" element={<AllPostPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
