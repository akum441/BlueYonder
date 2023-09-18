import logo from './logo.svg';
import './App.css';
import Virtualization from './Components/Virtualization';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../src/Redux/store';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

import NavBar from './Components/NavBar';
import Pagination from './Components/Pagination';
import Classicway from './Components/Classicway';

function App() {
  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <NavBar />
          <Routes>
          <Route path="/" element={<Virtualization />} />
            <Route path="/Virtu" element={<Virtualization />} />
            <Route path="/Pagination" element={<Pagination />} />
            <Route path="/Scroll" element={<Classicway />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
