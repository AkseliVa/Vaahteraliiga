import './App.css';
import { Route,Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Standings from './Standings';
import Games from './Games';

function App() {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Standings/>}/>
          <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </>
  )
}

export default App