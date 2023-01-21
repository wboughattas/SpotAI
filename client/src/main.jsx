import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LandingPage from './pages/landingPage'
import RecommenderPage from './pages/recommenderPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <Router>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recommender" element={<RecommenderPage />} />
         </Routes>
      </Router>
   </React.StrictMode>
)
