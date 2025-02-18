import React, { useEffect, useState } from 'react';
import './RandomQuotes.css';

function RandomQuotes() {
    debugger
    const [show, setShow] = useState("");
    const [quotes, setQuotes] = useState({ author: "", quote: "" });
    const [loading, setLoading] = useState(false);
    const apiKey = "ETfTYKL0-2-OKDtVvzj36NM8tNT8msiqi0Gom4xaP-Y";
    const apiUrl = 'https://api.unsplash.com/photos/random';
    const apiurlQuotes = "https://qapi.vercel.app/api/random";

    const Generator = async () => {
        setLoading(true);
        try {
            const [imageResponse, quoteResponse] = await Promise.all([
                fetch(`${apiUrl}?client_id=${apiKey}`),
                fetch(apiurlQuotes)
            ]);
            
            const imageData = await imageResponse.json();
            const quoteData = await quoteResponse.json();
            
            setShow(imageData.urls.regular);
            setQuotes({
                author: quoteData.author,
                quote: quoteData.quote
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Generator();
    }, []);

    return (
        <div className="container">
            <img src={show} alt="Random from Unsplash" className="background-img" />
            
            <div className="overlay">
                <div className="content-wrapper">
                    <div className="quote-container">
                        <p className="quote">{quotes.quote}</p>
                        <p className="author">— {quotes.author}</p>
                    </div>
                    <button 
                        onClick={Generator} 
                        className="btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            <>
                                <span>New Inspiration</span>
                                <svg className="refresh-icon" viewBox="0 0 24 24">
                                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RandomQuotes;