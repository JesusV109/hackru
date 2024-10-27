// src/types/transit.ts

export interface TransitStep {
  travel_mode: string;
  html_instructions: string;
  distance: { text: string; value: number };
  duration: { text: string; value: number };
  transit_details?: {
    line: { short_name: string; vehicle: { type: string } };
    departure_stop: { name: string };
    arrival_stop: { name: string };
  };
}
