import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/index.css";
import Header from "./static/header.jsx";
import MainGame from "./game/mainGame.jsx";
import Footer from "./static/footer.jsx";
import Landing from "./components/landing.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow overflow-y-auto custom-scrollbar bg-black">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/maingame" element={<MainGame />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}
