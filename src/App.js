import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Details from "./pages/Details";

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Main/>}/>
            <Route exact path="/details/:cityName" element={<Details/>}/>
        </Routes>
    );
}

export default App;
