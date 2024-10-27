// src/app/api/get-transit-route/route.ts

import { NextResponse } from 'next/server';
import { TransitStep } from '../../../types/transit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!origin || !destination) {
    return NextResponse.json({ error: 'Origin and destination are required.' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
        origin
      )}&destination=${encodeURIComponent(destination)}&mode=transit&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch transit route, status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      return NextResponse.json({
        error: 'No transit routes available for the specified origin and destination.'
      }, { status: 404 });
    }

    const route = data.routes[0];
    const legs = route.legs[0];
    const steps = legs.steps.map((step: TransitStep) => ({
      travelMode: step.travel_mode,
      instructions: step.html_instructions,
      distance: step.distance.text,
      duration: step.duration.text,
      transitDetails: step.transit_details
        ? {
            line: step.transit_details.line.short_name,
            vehicleType: step.transit_details.line.vehicle.type,
            departureStop: step.transit_details.departure_stop.name,
            arrivalStop: step.transit_details.arrival_stop.name,
          }
        : null,
    }));

    return NextResponse.json({
      origin,
      destination,
      duration: legs.duration.text,
      steps,
    });
  } catch (error) {
    // Cast `error` to `Error` to safely access `message`
    console.error('Error fetching transit route:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch transit route', details: (error as Error).message },
      { status: 500 }
    );
  }
}
