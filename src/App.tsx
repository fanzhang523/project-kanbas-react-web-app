import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
//import Kanbas from "./Kanbas";
function App() {
  
  axios.interceptors.response.use(
    response => response,
    error => {
      console.error('Error intercepted:', error);
      return Promise.reject(error);
    }
  );
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Labs" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
