import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import AppRoutes from "./AppRoutes"
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
