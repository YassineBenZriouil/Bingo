// components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../components/htp";
import { useNavigate } from "react-router-dom";

export default function Header({ theme, setTheme }) {
    const navigate = useNavigate();
    const [showNavMenu, setShowNavMenu] = useState(false);
    const [showPopup, setShowPopup] = useState(false); // State for the popup visibility

    const toggleNavMenu = () => setShowNavMenu(!showNavMenu);
    const closeNavMenu = () => setShowNavMenu(false);

    const togglePopup = () => setShowPopup(!showPopup); // Toggle popup visibility
    const closePopup = () => setShowPopup(false); // Close popup

    const handleWinReload = () => {
        window.location.reload(); // Reload the current page
    };

    return (
        <>
            <div className="flex justify-between items-center bg-black text-white py-2 px-8 border-b-2 border-gray-500 shadow-md">
                <Link
                    to="/"
                    className="flex items-center text-xl font-semibold hover:text-rose-400 transition duration-200 cursor-pointer"
                >
                    BINGO
                </Link>
                {/* Desktop Menu (Icons) */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        {/* Clicking on the ? icon opens the popup */}
                        <i
                            className="fa-solid fa-circle-question text-xl cursor-pointer"
                            onClick={togglePopup}
                        ></i>
                    </li>

                    <li>
                        <i
                            class="fa-solid fa-rotate-right text-xl cursor-pointer"
                            onClick={handleWinReload}
                        ></i>
                    </li>
                </ul>

                {/* Mobile Nav Menu Button */}
                <button
                    onClick={toggleNavMenu}
                    className="md:hidden text-2xl text-gray-100 hover:text-rose-400 transition duration-200 cursor-pointer"
                >
                    <i
                        className={`fa-solid ${
                            showNavMenu ? "fa-times" : "fa-bars"
                        }`}
                    ></i>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {showNavMenu && (
                <div className="md:hidden flex flex-col items-center p-4 text-center bg-black text-white border-b-2 border-gray-500 shadow-lg">
                    {/* Add your mobile menu items here */}
                    <ul>
                        <li>
                            {/* Clicking on the ? icon opens the popup */}
                            <i
                                className="fa-solid fa-circle-question text-xl cursor-pointer"
                                onClick={togglePopup}
                            ></i>
                        </li>

                        <li>
                            <i class="fa-solid fa-rotate-right text-xl cursor-pointer"></i>
                        </li>
                    </ul>
                </div>
            )}

            <Popup isVisible={showPopup} closePopup={closePopup} />
        </>
    );
}
