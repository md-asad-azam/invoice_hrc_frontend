import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Body from './comonents/Body';

import Header from './comonents/Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
