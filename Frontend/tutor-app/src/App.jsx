import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewSession from './pages/NewSession';
import SessionHistory from './pages/SessionHistory';
import Layout from './Layout';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { selectUsers } from './database/userSlice';
import SideBar from './components/SideBar';


function App() {
  const user = useSelector(selectUsers);
  
  return (
    <>
      {user.currentUser ?
        <Router>
          <SideBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sessionhistory" element={<SessionHistory />} />
            <Route path="/newsession" element={<NewSession />} />
          </Routes>
        </Router>
        :
        <Login />
      }
    </>
  );
}

export default App


/*
<Route element={<Layout/>}> 
</Route>
*/