import logo from './logo.svg';
import './App.css';
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import Layout from './Components/Layout';
import Airports from './Pages/Airports';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Airport from './Pages/Airport';
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <BrowserRouter className="h-full">
      <Layout>
        <Routes>
          <Route path="/airports" element={<Airports />} />
          <Route path="/airports/:id" element={<Airport/>}/>
        </Routes>
      </Layout>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
