import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.TMDB_API_SECRET;
    if (!apiKey) throw new Error("Missing TMDB_API_SECRET");

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching genres:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
