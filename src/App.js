import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Forecast from './pages/forecast';
import About from './pages/about';
import Header from './components/header/header';


function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/forecast" element={<Forecast/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
  );
}

export default App;
