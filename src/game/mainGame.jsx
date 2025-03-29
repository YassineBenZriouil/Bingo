import React, { useState, useEffect } from "react";
import { showToast } from "../utility/showToast";
import { ToastContainer } from "react-toastify";
import Animations from "../utility/animations";

const Wordle = () => {
    const [SOLUTION, setSolution] = useState("");

    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    localStorage.setItem("GN", parseInt(localStorage.getItem("GN") || "0") + 1);

    const generateConfetti = () => {
        const colors = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
            "#FFFFFF",
        ];
        return Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -(Math.random() * 20 + 10),
            size: Math.random() * 8 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            speed: Math.random() * 2 + 1,
        }));
    };

    const [confetti, setConfetti] = useState(generateConfetti());

    const calculateLetterStates = () => {
        const letterStates = {};
        guesses.forEach((guess) => {
            if (guess) {
                [...guess].forEach((letter, i) => {
                    letterStates[letter] = "bg-gray-700"; // Default color
                    if (SOLUTION.includes(letter))
                        letterStates[letter] = "bg-yellow-600"; // Letter exists
                    if (SOLUTION[i] === letter)
                        letterStates[letter] = "bg-green-600"; // Correct position
                });
            }
        });
        return letterStates;
    };

    const fetchRandomWord = async () => {
        const response = await fetch(
            "https://random-word-api.herokuapp.com/word?length=5&number=1"
        );
        const word = await response.json();
        setSolution(word[0].toUpperCase());
        localStorage.setItem("Solution", word[0].toUpperCase());
    };

    useEffect(() => {
        fetchRandomWord();
    }, []);

    useEffect(() => {
        if (!showConfetti) return;
        const interval = setInterval(() => {
            setConfetti((prev) =>
                prev
                    .map((piece) => ({
                        ...piece,
                        y: piece.y + piece.speed,
                        rotation: piece.rotation + 2,
                    }))
                    .filter((piece) => piece.y < 100)
            );
        }, 50);
        return () => clearInterval(interval);
    }, [showConfetti]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameOver) return;

            if (e.key === "Enter") {
                if (currentGuess.length !== 5) {
                    showToast("Word must be 5 letters");
                    return;
                }

                const newGuesses = [...guesses];
                const currentIndex = guesses.findIndex(
                    (guess) => guess === null
                );

                if (currentIndex !== -1) {
                    newGuesses[currentIndex] = currentGuess;
                    setGuesses(newGuesses);
                    setCurrentGuess("");

                    if (currentGuess === SOLUTION) {
                        setGameOver(true);
                        showToast("You win!");
                        setShowConfetti(true);
                    } else if (currentIndex === 5) {
                        setGameOver(true);
                        showToast(`Game Over ! The word was ${SOLUTION}`);
                    }
                }
            } else if (e.key === "Backspace") {
                setCurrentGuess((prev) => prev.slice(0, -1));
            } else if (/^[A-Za-z]$/.test(e.key) && currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + e.key.toUpperCase());
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentGuess, gameOver, guesses]);

    const handleKeyClick = (key) => {
        if (gameOver) return;

        if (key === "ENTER") {
            if (currentGuess.length !== 5) {
                showToast("Word must be 5 letters");
                return;
            }

            const newGuesses = [...guesses];
            const currentIndex = guesses.findIndex((guess) => guess === null);

            if (currentIndex !== -1) {
                newGuesses[currentIndex] = currentGuess;
                setGuesses(newGuesses);
                setCurrentGuess("");

                if (currentGuess === SOLUTION) {
                    setGameOver(true);
                    showToast("You win!");
                    setShowConfetti(true);
                } else if (currentIndex === 5) {
                    setGameOver(true);
                    showToast(`Game over! The word was ${SOLUTION}`);
                }
            }
        } else if (key === "DELETE") {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (currentGuess.length < 5) {
            setCurrentGuess((prev) => prev + key.toUpperCase());
        }
    };

    const resetGame = () => {
        setGuesses(Array(6).fill(null));
        setCurrentGuess("");
        setGameOver(false);
        setShowConfetti(false);
        setConfetti(generateConfetti());
        fetchRandomWord(); // Fetch a new word after resetting the game
    };

    const keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
    ];

    const letterStates = calculateLetterStates();

    return (
        <div className="bg-black text-white">
            <Animations>
                <div className="flex flex-col items-center min-h-screen  py-4">
                    <ToastContainer />
                    <div className="mb-8">
                        {guesses.map((guess, i) => {
                            const isCurrentRow =
                                guess === null &&
                                guesses.findIndex((g) => g === null) === i;

                            return (
                                <div key={i} className="flex mb-2">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, j) => {
                                            let letter = "";
                                            let bgColor =
                                                "bg-gray-900 border-gray-700";

                                            if (guess) {
                                                letter = guess[j] || "";
                                                if (letter === SOLUTION[j])
                                                    bgColor =
                                                        "bg-green-600 border-green-500";
                                                else if (
                                                    SOLUTION.includes(letter)
                                                )
                                                    bgColor =
                                                        "bg-yellow-600 border-yellow-500";
                                                else
                                                    bgColor =
                                                        "bg-gray-700 border-gray-600";
                                            } else if (isCurrentRow) {
                                                letter = currentGuess[j] || "";
                                            }

                                            return (
                                                <div
                                                    key={j}
                                                    className={`w-12 h-12 border-2 flex items-center justify-center mx-1 text-2xl font-bold ${bgColor}`}
                                                >
                                                    {letter}
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mb-4">
                        {keyboard.map((row, i) => (
                            <div key={i} className="flex justify-center mb-2">
                                {row.map((key) => {
                                    const width =
                                        key === "ENTER" || key === "DELETE"
                                            ? "w-15"
                                            : "w-10";
                                    const bgColor =
                                        letterStates[key] || "bg-gray-800";

                                    return (
                                        <button
                                            key={key}
                                            onClick={() => handleKeyClick(key)}
                                            className={`${width} h-12 mx-1 text-sm font-bold rounded ${bgColor} hover:opacity-80`}
                                        >
                                            {key === "DELETE" ? "⌫" : key}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {gameOver && (
                        <button
                            onClick={resetGame}
                            className="bg-white text-black px-8 py-2 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            PLAY AGAIN
                        </button>
                    )}

                    {showConfetti && (
                        <div className="fixed inset-0 pointer-events-none overflow-hidden">
                            {confetti.map((piece) => (
                                <div
                                    key={piece.id}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${piece.x}%`,
                                        top: `${piece.y}%`,
                                        width: `${piece.size}px`,
                                        height: `${piece.size}px`,
                                        backgroundColor: piece.color,
                                        transform: `rotate(${piece.rotation}deg)`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Animations>
        </div>
    );
};

export default Wordle;
