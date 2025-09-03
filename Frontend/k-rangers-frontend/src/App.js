import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './page/MainPage';
import AllPostPage from './page/AllPostPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/all" element={<AllPostPage />} />
      </Routes>
    </>
  );
}

export default App;
