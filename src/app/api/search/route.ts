import { NextRequest } from "next/server";

import { getCachedPodcasts, getPodcastFromExternalAPIs, storePodcasts } from "@/services/podcasts";
import { getCachedEpisodes, getPodcastEpisodesFromExternalAPIs, storeEpisodes } from "@/services/episodes";
import { prisma } from "@/lib/prisma";

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
    console.log("Returning cached results for query:", query);
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
      await storePodcasts(storedPodcastsData);

      // Then, insert episodes
      await storeEpisodes(storedEpisodesData);

      // Store search keyword and its relations
      await prisma.searchKeywords.upsert({
        where: { keyword: query },
        create: {
          keyword: query,
          podcasts: {
            connect: storedPodcastsData.map((podcast) => ({ id: podcast.id })),
          },
          episodes: {
            connect: storedEpisodesData.map((episode) => ({ id: episode.id })),
          },
        },
        update: {
          podcasts: {
            connect: storedPodcastsData.map((podcast) => ({ id: podcast.id })),
          },
          episodes: {
            connect: storedEpisodesData.map((episode) => ({ id: episode.id })),
          },
        },
      });
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
