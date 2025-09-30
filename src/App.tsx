import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Order from "./pages/order";
import Design from "./pages/design";
import About from "./pages/about";
import Other from "./pages/other";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/design" element={<Design />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Other />} />
            </Routes>
        </Router>
    )
}
