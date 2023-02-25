import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./pages/components/Navbar";
import Notfound404 from "./pages/components/Notfound404";
import Home from "./pages/Home";
import IndividualBook from "./pages/IndividualBook";

function App() {
  let REACT_APP_URI = process.env.REACT_BACKEND_URL;   // Set this in .env file
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
            <Route path="/" element={<Home />} />
            <Route path="/:bookid" element={<IndividualBook />} />
            <Route path="/*"  element={<Notfound404 REACT_APP_URI={REACT_APP_URI} />} />
          </Routes>
        </Router>
    
    </>
    
  );
}

export default App;
