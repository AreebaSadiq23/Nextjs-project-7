"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface JokeResponse {
  setup: string;
  punchline: string;
}

export default function RandomJoke() {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Center the joke card within the screen */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          😂 Random Joke 👇
        </h1>
        {/* Display the joke or a loading message */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6 text-gray-700 text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-gradient-to-r from-[#f9a8d4] to-[#f472b6] hover:from-[#f472b6] hover:to-[#ec4899] text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          🤣 Get New Joke 🤣
        </Button>
      </div>
    </div>
  );
}