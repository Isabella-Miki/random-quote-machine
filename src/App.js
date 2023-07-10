import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function App() {
  const [quote, setQuote] = useState("Click to generate a random quote");

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNumData = Math.floor(Math.random() * data.length);
        setQuote(data[randomNumData]);
        console.log(quote)
      });
  };

  const colors = [
    "#D35269",
    "#7F557D",
    "#22AAA1",
    "#58641D",
    "#470024",
    "#1E3F20",
    "#355834",
    "#111D4A",
    "#360A14",
    "#6153CC"
  ];

  const [currentColor, setCurrentColor] = useState("#1E3F20");

  const getColor = () => {
    let randomNum = Math.floor(Math.random() * colors.length);
    if(currentColor === colors[randomNum]) {
      randomNum = Math.floor(Math.random() * colors.length);
    } else {
      setCurrentColor(colors[randomNum]);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    getColor();
  }, []);

  const getQuoteAndColor = () => {
    getColor();
    getQuote();
  };

  const Wrapper = styled.div`
    background-color: ${currentColor};
    color: ${currentColor};
  `;

  const Button = styled.button`
    background-color: ${currentColor};
    color: white;
    padding: .5rem 1rem;
    border-radius: .5rem;
    font-size: 1rem;
    transition: 0.4s;

      &:hover {
        transform: scale(1.1, 1.1);
        transition: 0.4s;
      }

  `;

  return (
    <Wrapper className={`grid content-center justify-center h-screen text-2xl`}>
      <div className="p-8 rounded bg-white max-w-md">
        <div>
          <p className="text-justify">{quote.text}</p>
          <p className="mt-3 text-right text-xl">- {quote.author !== null ? quote.author : 'Pipoca'}</p>
        </div>
        <div className="flex justify-between mt-5">
          <Button>
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.text}`}
            >
              Tweet
            </a>
          </Button>
          <Button
            onClick={getQuoteAndColor}
          >
            New quote
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
