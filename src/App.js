import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/navbar/Navbar';
import TodoList from './pages/task-list/TodoList';
import '../src/styles/TaskList.css';
import Footer from './component/footer/Footer';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './pages/not-found/PageNotFound';
import '../src/styles/Theme.css';
import SignIn from './pages/login/SignIn';
import SignUp from './pages/login/SignUp';

function App() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <Router>
      <Box>
        <ConditionalNavbarFooter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/all-task" element={<TodoList selectedFilter="all-task" />} />
          <Route path="/pending" element={<TodoList selectedFilter="pending" />} />
          <Route path="/completed" element={<TodoList selectedFilter="completed" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Box>
    </Router>
  );
}

function ConditionalNavbarFooter({ selectedFilter, setSelectedFilter }) {
  const location = useLocation();

  const authPages = ['/signin', '/signup', '/'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
