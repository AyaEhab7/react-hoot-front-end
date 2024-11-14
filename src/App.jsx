import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

//components 
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails';


//services
import * as authService from '../src/services/authService'; // import the authservice
import * as hootService from './services/hootService';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const [hoots, setHoots] = useState([]);

useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      console.log('hootsData:', hootsData);
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
}, [user]); 
  
  
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  }; 

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route path="/hoots/:hootId" element={<HootDetails />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;