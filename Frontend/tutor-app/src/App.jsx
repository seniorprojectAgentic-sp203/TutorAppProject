import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import  HomePage from './pages/HomePage';
import  NewSession  from './pages/NewSession';
import  SessionHistory from './pages/SessionHistory';
import Layout from './Layout';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { selectUsers } from './database/userSlice';


function App() {
  const user = useSelector(selectUsers);

  return (
    <>
    {user.currentUser ? 
    <Router>
      <Routes>
        <Route element={<Layout/>}> 
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SessionHistory" element={<SessionHistory/>}/>
          <Route path="/NewSession" element={<NewSession/>}/>
        </Route>
      </Routes>
    </Router> 
    :
    <Login/>
    }
    </>
  );
}

export default App