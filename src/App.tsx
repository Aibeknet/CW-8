import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuotesList from './components/QuotesList/QuotesList.tsx';
import AddQuote from './components/AddQuote/AddQuote.tsx';
import Navbar from './components/NavBar/NavBar.tsx';

import EditQuote from './components/EditQuote/EditQuote.tsx';
import Sidebar from './components/SIdeBar/SideBar.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <Routes>
                <Route path="/" element={<QuotesList />} />
                <Route path="/add-quote" element={<AddQuote />} />
                <Route path="/quotes/:category" element={<QuotesList />} />
                <Route path="/edit-quote/:id" element={<EditQuote />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
