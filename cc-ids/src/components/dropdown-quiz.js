import React, { useState, useEffect } from 'react';
import quotes from '../assets/quotes.json'
import './dropdownquiz.css'

function DropdownQuiz() {
    const [randomQuote, setRandomQuote] = useState("");
    const [randomQuoteId, setRandomQuoteId] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [titles, setTitles] = useState([]);

    // Function to select a random quote
    const selectRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex].quote);
        setRandomQuoteId(quotes[randomIndex].id); // Save the ID of the randomly selected quote
        setSelectedTitle(""); // Reset the dropdown selection
    };

    useEffect(() => {
        selectRandomQuote();

        // Populate the titles for the dropdown
        const loadedTitles = quotes.map(quote => quote.title);
        setTitles(loadedTitles);
    }, []);

    useEffect(() => {
        // Update the high score if the current score exceeds it
        if (score > highScore) {
            setHighScore(score);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);// This useEffect depends on the score, it runs every time the score changes

    const handleSelectChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    const handleSubmit = () => {
        // Find the quote object that matches the selected title
        const matchedQuote = quotes.find(quote => quote.title === selectedTitle);
        if (matchedQuote && matchedQuote.id === randomQuoteId) {
            setScore(score + 1); // Correct guess
            selectRandomQuote(); // Select a new random quote
        } else {
            setScore(0); // Incorrect guess, reset score
            selectRandomQuote();
        }
    };

    return (
        <div className='container'>
            <div className='scores'>
                <p>High Score: {highScore}</p> {/* Display the high score */}
                <p>Current Score: {score}</p>  {/* Display the current score */}
            </div>


            <div className="Content">

                <p className='quote'>"{randomQuote}"</p>  {/* Display the random quote */}
                <select onChange={handleSelectChange} value={selectedTitle}>
                    <option value="">Select a Title...</option> {/* Default option */}
                    {titles.map((title, index) => (
                        <option key={index} value={title}>{title}</option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default DropdownQuiz;