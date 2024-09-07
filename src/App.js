import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//COMPONENTS:
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
function App() {
  return (<>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/' element={<SignUp/>}/>

  </Routes>
  </BrowserRouter>

</>);
}

export default App;
