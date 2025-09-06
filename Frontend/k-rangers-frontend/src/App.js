import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './page/MainPage';
import MapPage from "./page/MapPage"
import MyPage from "./page/MyPage";
import AllPostPage from './page/AllPostPage';

const App = () => {
  return (
    <>
    <main className = "content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/all" element={<AllPostPage />} />
        </Routes>
      </main>

      
    </>
  );
}

export default App;
