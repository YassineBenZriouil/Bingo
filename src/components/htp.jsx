// components/Popup.js
import React from "react";

export default function Popup({ isVisible, closePopup, children }) {
    if (!isVisible) return null; // Don't render the popup if it's not visible

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-transparent text-white rounded-lg p-6 w-full max-w-md relative border border-[#4a4e69]">
                <button
                    onClick={closePopup}
                    className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 cursor-pointer"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">
                    How To Play
                </h2>
                <p className="mb-4">Guess the Wordle in 6 tries.</p>

                <ul className="list-disc pl-5 mb-4">
                    <li>Each guess must be a valid word.</li>
                    <li>
                        The color of the tiles will change to show how close
                        your guess was to the word.
                    </li>
                </ul>

                <h3 className="text-xl font-semibold mb-4">Example</h3>

                <div className="flex flex-col justify-center space-y-2 mb-4 ">
                    <div className="flex  space-x-1">
                        <LetterTile letter="B" state="correct" />
                        <LetterTile letter="I" state="default" />
                        <LetterTile letter="N" state="default" />
                        <LetterTile letter="G" state="default" />
                        <LetterTile letter="O" state="default" />
                    </div>
                    <p className="">
                        B is in the word and in the correct spot.
                    </p>

                    <div className="flex  space-x-1">
                        <LetterTile letter="L" state="default" />
                        <LetterTile letter="I" state="present" />
                        <LetterTile letter="G" state="default" />
                        <LetterTile letter="H" state="default" />
                        <LetterTile letter="T" state="default" />
                    </div>
                    <p className="">I is in the word but in the wrong spot.</p>

                    <div className="flex  space-x-1">
                        <LetterTile letter="R" state="default" />
                        <LetterTile letter="O" state="default" />
                        <LetterTile letter="G" state="default" />
                        <LetterTile letter="U" state="absent" />
                        <LetterTile letter="E" state="default" />
                    </div>
                    <p className="">U is not in the word in any spot.</p>
                </div>
            </div>
        </div>
    );
}

const LetterTile = ({ letter, state }) => {
    const stateStyles = {
        default: "bg-[#9ba4b5] text-white",
        correct: "bg-[#538d4e] text-white",
        present: "bg-[#b59f3b] text-white",
        absent: "bg-[#3a3a3c] text-white",
    };

    return (
        <div
            className={`w-12 h-12 flex items-center justify-center font-bold text-2xl uppercase 
            border rounded ${stateStyles[state]}`}
        >
            {letter}
        </div>
    );
};
