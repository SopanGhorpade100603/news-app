import "./App.css";
import React, { Component } from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  // totalNews=6;
   
  apiKey = process.env.REACT_APP_APIKEY_URL

  state ={    //to set top loading bar 
    progress :0
  }

  setProgress = (progress) => {  
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
        <Router>
          <Navbar  />
          <LoadingBar
          height={4}
          waitingTime={1500}
        color='#f11946'
        progress={this.state.progress}
        
      />
          {/* <Navbar <News setProgress={this.setProgress}  pageSize={5} category="general" /> /> */}
          <Routes>
            <Route exact path="/" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={this.totalNews} category="general" />} />
            <Route exact path="/home" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={this.totalNews} category="general" />} />
            <Route exact path="/business" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="business" pageSize={this.totalNews} category="business" />} />
            <Route exact path="/entertainment" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="entertainment" pageSize={this.totalNews} category="entertainment" />} />
            {/* <Route exact path="/general" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={this.totalNews} category="general" />} /> */}
            <Route exact path="/health" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="health" pageSize={this.totalNews} category="health" />} />
            <Route exact path="/science" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="science" pageSize={this.totalNews} category="science" />} />
            <Route exact path="/sport" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="sport" pageSize={this.totalNews} category="sport" />} />
            <Route exact path="/technology" element={<News apikey={this.apiKey} setProgress={this.setProgress}  key="technology" pageSize={this.totalNews} category="technology" />} />
          </Routes>
        </Router>
      </>
    );
  }
}
