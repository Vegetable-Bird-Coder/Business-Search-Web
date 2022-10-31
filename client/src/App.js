import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Bookings from "./pages/Bookings";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <main className="container-fluid">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/search" />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/bookings" element={<Bookings />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    )
}

export default App;