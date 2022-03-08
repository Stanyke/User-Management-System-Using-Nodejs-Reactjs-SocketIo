import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from './pages/Dashboard';
// import ViewPost from './pages/ViewPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        {/* <Route path="/users/:id" exact component={ViewPost} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
