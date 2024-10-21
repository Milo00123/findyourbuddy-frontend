import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

//COMPONENTS:
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import Chat from './components/Chat/chat';
import Profile from './components/Profile/Profile';
import ProfileSettings from './components/Profile-settings/ProfileSettings';
import NotFound from './components/Not-found/NotFound';
import Pool from './components/Pool/Pool';
import Password from './components/Password/Password';
import Header from './components/Header/Header';



const isAuthenticated = () => {
  return !!localStorage.getItem('userId'); 
};

const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/" />;
};

function App() {
  return (<>
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route path="/pool/:userId" element={<ProtectedRoute element={<Pool />} />} />
    <Route path='/profile/:userId' element={<ProtectedRoute element={<Profile />} />} />
    <Route path='/profile/:userId/Profile-settings' element={<ProtectedRoute element={<ProfileSettings />} />} />
    <Route path="/profile/:userId/Profile-settings/update-password" element={<ProtectedRoute element={<Password />} />} />
    <Route path="/chat/:userId/:postId" element={<ProtectedRoute element={<Chat />} />} />
    <Route path='*' element={<NotFound/>}/>


  </Routes>
  </BrowserRouter>

</>);
}

export default App;
