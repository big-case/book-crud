import React from 'react';
import { BrowserRouter as Router, Routes, Route,
  //  Link
  } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Create from './components/CreatePage';
import View from './components/View';
import Edit from './components/EditPage';
// import { AppBar, Button, Toolbar } from '@mui/material';

function App() {
  return (
    <div>
      <div>
      {/* <AppBar position='static'>
        <Toolbar>
          <Link to="/">
            <Button variant='contained' color='success'>
              Home
            </Button>
          </Link>
          <Link to="/view">
            <Button variant='contained' color='success'>
              View
            </Button>
          </Link>
          <Link to="/create">
            <Button variant='contained' color='success'>
              Create
            </Button>
          </Link>
        </Toolbar>
      </AppBar> */}
      </div>
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/view" element={<View />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
      </div>
    </div>
  );
};

export default App;
