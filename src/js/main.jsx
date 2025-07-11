import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// index.css'
import '../styles/index.css'



import TodoList from './components/TodoList';
import CountryResearch from "./components/CountryResearch"
import MovieFinder from './components/MovieFinder';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MovieFinder/>
  </React.StrictMode>,
)
