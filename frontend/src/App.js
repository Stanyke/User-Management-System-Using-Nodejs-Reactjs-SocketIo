import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
// import Dashboard from './pages/Dashboard';
// import ViewPost from './pages/ViewPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/users/:id" exact component={ViewPost} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
