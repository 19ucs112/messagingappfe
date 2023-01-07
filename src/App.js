import logo from './logo.svg';
import {Routes, Route} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import Homepage from "./components/Homepage"
import Pickup from "./components/Pickup"
import './App.css';

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route exact path = "/" element={<><Homepage></Homepage></>}></Route>
      <Route exact path = "/pickup" element={<><Pickup></Pickup></>}></Route>
    </Routes>
    </Router>
    </>
  );
}

export default App;
