import { NextRequest } from "next/server";

import { getCachedPodcasts, getPodcastFromExternalAPIs, storePodcasts } from "@/services/podcasts";
import { getCachedEpisodes, getPodcastEpisodesFromExternalAPIs, storeEpisodes } from "@/services/episodes";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Check local database for cached podcast results
  const cachedPodcasts = await getCachedPodcasts(query);

  // Check local database for cached episode results
  const cachedEpisodes = await getCachedEpisodes(query);

  // If cached results exist, return them
  if (cachedPodcasts.length > 0 && cachedEpisodes.length > 0) {
    return new Response(
      JSON.stringify({
        podcasts: cachedPodcasts,
        episodes: cachedEpisodes,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Fetch results from external APIs

  const storedPodcastsData = await getPodcastFromExternalAPIs(query);

  const storedEpisodesData = await getPodcastEpisodesFromExternalAPIs(query);
  // Perform database operations in the background with proper sequencing
  (async () => {
    try {
      // First, insert podcasts
      await storePodcasts(storedPodcastsData, query);

      // Then, insert episodes
      await storeEpisodes(storedEpisodesData, query);
    } catch (error) {
      console.error("Error storing data in database:", error);
    }
  })();

  return new Response(
    JSON.stringify({
      podcasts: storedPodcastsData,
      episodes: storedEpisodesData,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
