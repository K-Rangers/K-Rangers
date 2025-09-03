import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './page/MainPage';
import AllPostPage from './page/AllPostPage';
import Map from "./page/Map";
import MyPage from "./page/MyPage";



const App = () => {
  return (
    <>
    <main className = "content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </main>

      
    </>
  );
}

export default App;
