import Cards from "./pages/Cards";
import AddCard from "./pages/AddCard";
import { Route, Routes} from "react-router";
import {Navigate } from 'react-router-dom'
import { getRandomUser } from './components/userSlice'
import { useEffect } from "react";
import {useDispatch } from "react-redux";
import {initializeCard} from './components/cardsSlice'
import "./style/style.scss";

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getRandomUser())
    .then(something =>{
      const [{name:{first, last}}] = something.payload.results
      dispatch(initializeCard((first + ' ' + last).toUpperCase()))});
    console.log('useEffect fired')
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Navigate replace to="/cards" />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/addcard" element={<AddCard />} />
      </Routes>
    </div>
  );
}

export default App;
