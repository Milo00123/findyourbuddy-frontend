import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//COMPONENTS:
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Chat from './components/Chat/chat';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import ProfileSettings from './components/Profile-settings/ProfileSettings';
import NotFound from './components/Not-found/NotFound';
import Pool from './components/Pool/Pool';
import PoolPost from './components/Pool-post/PoolPost';
import Header from './components/Header/Header';

function App() {
  return (<>
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path='/pool' element={ < Pool />}/>

  </Routes>
  </BrowserRouter>

</>);
}

export default App;
