import React from "react";
import { Link } from "react-router-dom";
import Animations from "../utility/animations";

const BingoStartScreen = () => {
    const dateTime = new Date().toLocaleString(); // Display formatted date-time
    const gameNumber = localStorage.getItem("GN") || "Not available"; // Fallback value for game number

    return (
        <div className=" bg-black text-white">
            <Animations>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex flex-col text-center gap-10">
                        <h1 className="text-5xl font-bold mb-20">BINGO</h1>

                        <p className="text-xl mb-8">
                            Get 6 chances to guess The 5 letters Random Word
                        </p>
                        <Link to="/maingame">
                            <button className="bg-white text-black px-8 py-2 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer">
                                PLAY
                            </button>
                        </Link>
                        <div className="flex flex-col mt-8 text-sm gap-5">
                            <p>{dateTime}</p>

                            <p>
                                Edited by{" "}
                                <a
                                    className="text-blue-500 underline"
                                    href="https://ybz.vercel.app/"
                                >
                                    YBZ
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </Animations>
        </div>
    );
};

export default BingoStartScreen;
