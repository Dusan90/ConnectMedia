import './App.css';
import { Router } from "react-router-dom";
import Routes from "../src/routes/Routes";
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import history from './routes/History'


function App() {
  return (
    <div className="App">
      <Router history={history}>
        {history.location.pathname !== '/login' && <Header />}
        {Routes}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
