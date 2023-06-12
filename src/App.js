import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBook from "./components/AddBook";
import Book from "./components/Book";
import BooksList from "./components/BookList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/books" className="navbar-brand">
          Books
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Book List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<BooksList/>} />
          <Route path="/books" element={<BooksList/>} />
          <Route path="/add" element={<AddBook/>} />
          <Route path="/books/:id" element={<Book/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;