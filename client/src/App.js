import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                        <Route path="/search" element={<Search />} />
                        <Route path="/bookings" element={<Bookings />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    )
}

export default App;