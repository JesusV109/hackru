// src/app/api/get-transit-route/route.ts

import { NextResponse } from 'next/server';

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
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&mode=transit&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch transit route, status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    if (!data.rows || !data.rows[0] || !data.rows[0].elements || data.rows[0].elements[0].status !== 'OK') {
      return NextResponse.json({
        error: 'No valid routes available for the specified origin and destination.'
      }, { status: 404 });
    }

    const element = data.rows[0].elements[0];
    const distance = element.distance.text;
    const duration = element.duration.text;

    return NextResponse.json({
      origin,
      destination,
      distance,
      duration,
    });
  } catch (error) {
    console.error('Error fetching transit route:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch transit route', details: (error as Error).message },
      { status: 500 }
    );
  }
}
