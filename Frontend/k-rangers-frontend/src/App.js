import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';
import MainPage from './page/MainPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
