import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Fragment>
            <Routes>
            <Route exact path="/" element={<News pageSize={5} country="in" category="general" />}></Route>
            <Route path="/business" element={<News pageSize={5} country="in" category="business" />}></Route>
            <Route path="/entertainment"element={<News pageSize={5} country="in" category="entertainment" />} ></Route>
            <Route path="/health" element={<News pageSize={5} country="in" category="health" />}></Route>
            <Route path="/science"element={<News pageSize={5} country="in" category="science" />} ></Route>
            <Route path="/sports"element={<News pageSize={5} country="in" category="sports" />} ></Route>
            <Route path="/technology"element={<News pageSize={5} country="in" category="technology" />} ></Route>
            </Routes>
          </Fragment>
        </Router>
      </div>
    );
  }
}