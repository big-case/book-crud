import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Create from './components/CreatePage';
import View from './components/View';
import Edit from './components/EditPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RQView from './rqcomponents/RQView';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <div>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<View />} />
            <Route path="/view" element={<RQView />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
