  import React from "react";
import Login from "pages/Login";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notfound404 from "./pages/components/Notfound404";
import Home from "./pages/Home";
import IndividualBook from "./pages/IndividualBook";
import Books from "pages/Books";
import { useSelector, useDispatch } from 'react-redux'; 
import { setupUserInformation } from 'state/reducers/userInformationSlice';


function App() {
  let REACT_APP_BACKEND_URI = process.env.REACT_APP_BACKEND_URI;   // Set this in .env file  
  const userInformationStore = useSelector((state) => state.userInformationStore)
  const dispatch = useDispatch();

  React.useEffect(()=> {
    const temptoken = localStorage.getItem('token')
    const tempuserinfo = localStorage.getItem('userinfo')
    let userinfo = {
      token: temptoken,
      userinfo: JSON.parse(tempuserinfo)
    }
    dispatch(setupUserInformation(userinfo))
  }, [])
  console.log(userInformationStore)
  return (
    <>
      <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
          <style>
            {'body { background: linear-gradient(180deg, #000 20.12%, #1a84b8 400%); color: #e5e5e5; background-attachment: fixed; }'}
          </style>
        </Helmet>
          <Router>
            <Routes>
              <Route path="/" element={<Home REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI} />} />
              <Route path="/books" element={<Books REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI} />} />
              <Route path="/:bookid" element={<IndividualBook REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI} />} />
              <Route path="/login" element={<Login REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI} />} />
              <Route path="/*"  element={<Notfound404 REACT_APP_BACKEND_URI={REACT_APP_BACKEND_URI}/>} />
            </Routes>
          </Router>
    
    </>
    
  );
}

export default App;
