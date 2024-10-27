// src/app/distance/page.tsx

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import Link from 'next/link';

export default function DistancePage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // Conversion factor for CO₂ per mile (if needed)
  const calculateScore = (miles: number) => miles * 0.404;

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: ["places"],
    });

    loader.load().then(() => {
      const google = window.google;

      if (originRef.current && destinationRef.current) {
        const originAutocomplete = new google.maps.places.Autocomplete(originRef.current);
        originAutocomplete.addListener("place_changed", () => {
          const place = originAutocomplete.getPlace();
          if (place.formatted_address) setOrigin(place.formatted_address);
        });

        const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current);
        destinationAutocomplete.addListener("place_changed", () => {
          const place = destinationAutocomplete.getPlace();
          if (place.formatted_address) setDestination(place.formatted_address);
        });
      }
    });
  }, []);

  const calculateDistance = async () => {
    if (!origin || !destination) {
      alert("Please enter both an origin and a destination.");
      return;
    }

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: ["places"],
    });

    loader.load().then(() => {
      const directionsService = new google.maps.DirectionsService();

      const request = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      };

      directionsService.route(request, (response, status) => {
        if (status === "OK" && response) {
          const route = response.routes[0].legs[0];
          const distanceText = route.distance?.text || '';
          const distanceInMiles = parseFloat(distanceText.split(' ')[0]);

          setDistance(`${distanceInMiles} miles`);
          const calculatedScore = calculateScore(distanceInMiles);
          setScore(calculatedScore);

          // Send the score data to the leaderboard API
          fetch('/api/submit-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "User", score: calculatedScore })
          });
        } else {
          setError("Could not find distance for the specified locations.");
          setDistance(null);
          setScore(null);
        }
      });
    });
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <div className="w-full max-w-md p-4 border border-gray-300 rounded-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Distance & Score Calculator</h2>
        
        <div className="mb-3">
          <label htmlFor="origin" className="block">Origin:</label>
          <input
            type="text"
            id="origin"
            ref={originRef}
            placeholder="Enter origin address"
            className="p-2 border border-gray-400 w-full rounded mt-1"
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="destination" className="block">Destination:</label>
          <input
            type="text"
            id="destination"
            ref={destinationRef}
            placeholder="Enter destination address"
            className="p-2 border border-gray-400 w-full rounded mt-1"
          />
        </div>
        
        <button
          onClick={calculateDistance}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
        >
          Calculate Distance and Score
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {distance && score !== null && (
          <div className="mt-4">
            <p><strong>Distance:</strong> {distance}</p>
            <p><strong>Calculated Score:</strong> {score.toFixed(2)}</p>
          </div>
        )}

        {/* Link to Leaderboard */}
        <Link href="/leaderboard">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6">
            Go to Leaderboard
          </button>
        </Link>
      </div>
    </main>
  );
}
