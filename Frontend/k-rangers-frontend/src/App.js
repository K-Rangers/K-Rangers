import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </>
  );
}

export default App;
