import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Podcast = {
  id: string;
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  releaseDate: Date;
  country: string;
  primaryGenreName: string;
  artworkUrl600: string;
  searchedKeywords: string[];
};

type Episode = {
  trackId: number;
  id: string;
  previewUrl: string;
  episodeUrl: string;
  episodeGuid: string;
  genres: { name: string; id: string }[];
  feedUrl: string;
  trackName: string;
  shortDescription: string;
  releaseDate: Date;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  kind: string;
  wrapperType: string;
  description: string;
  country: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  artworkUrl60: string;
  artworkUrl600: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  searchedKeywords: string[];
};

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
  const cachedPodcasts = await prisma.podcast.findMany({
    where: {
      searchedKeywords: {
        has: query,
      },
    },
  });

  // Check local database for cached episode results
  const cachedEpisodes = await prisma.episode.findMany({
    where: {
      searchedKeywords: {
        has: query,
      },
    },
  });

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
  const podcastEpisodeResponse = await fetch(
    `https://itunes.apple.com/search?media=podcast&term=${query}&entity=podcastEpisode`
  );
  const podcastResponse = await fetch(`https://itunes.apple.com/search?media=podcast&term=${query}&entity=podcast`);

  const podcastEpisodeData = await podcastEpisodeResponse.json();
  const podcastData = await podcastResponse.json();

  // Store podcast and episode results in the database in bulk
  const storedPodcasts = podcastData.results.map((result: Podcast) => ({
    id: String(result.collectionId),
    wrapperType: result.wrapperType,
    kind: result.kind,
    artistName: result.artistName,
    collectionName: result.collectionName,
    trackName: result.trackName,
    collectionCensoredName: result.collectionCensoredName,
    collectionViewUrl: result.collectionViewUrl,
    feedUrl: result.feedUrl,
    trackViewUrl: result.trackViewUrl,
    artworkUrl30: result.artworkUrl30,
    artworkUrl60: result.artworkUrl60,
    artworkUrl100: result.artworkUrl100,

    releaseDate: new Date(result.releaseDate),
    country: result.country,
    primaryGenreName: result.primaryGenreName,
    artworkUrl600: result.artworkUrl600,
    searchedKeywords: [query],
  }));

  const storedEpisodes = podcastEpisodeData.results.map((result: Episode) => ({
    id: String(result.trackId),
    previewUrl: result.previewUrl,
    episodeUrl: result.episodeUrl,
    episodeGuid: result.episodeGuid,
    genres: result.genres,
    feedUrl: result.feedUrl,
    trackName: result.trackName,
    shortDescription: result.shortDescription,
    releaseDate: new Date(result.releaseDate),
    closedCaptioning: result.closedCaptioning,
    collectionId: String(result.collectionId),
    collectionName: result.collectionName,
    kind: result.kind,
    wrapperType: result.wrapperType,
    description: result.description,
    country: result.country,
    artistViewUrl: result.artistViewUrl,
    collectionViewUrl: result.collectionViewUrl,
    trackViewUrl: result.trackViewUrl,
    artworkUrl60: result.artworkUrl60,
    artworkUrl600: result.artworkUrl600,
    artworkUrl160: result.artworkUrl160,
    episodeFileExtension: result.episodeFileExtension,
    episodeContentType: result.episodeContentType,
    searchedKeywords: [query],
  }));

  // Perform database operations in the background with proper sequencing
  (async () => {
    try {
      // First, insert podcasts
      await prisma.podcast.createMany({
        data: storedPodcasts,
        skipDuplicates: true,
      });

      // Get existing podcast IDs to filter episodes
      const existingPodcastIds = await prisma.podcast.findMany({
        select: { id: true },
      });
      const existingIds = new Set(existingPodcastIds.map((p) => Number(p.id)));

      // Filter episodes to only include those with valid collectionId or null
      const validEpisodes = storedEpisodes.map((episode: Episode) => ({
        ...episode,
        // Set collectionId to null if the podcast doesn't exist
        collectionId: existingIds.has(episode.collectionId) ? episode.collectionId : null,
      }));

      // Then, insert episodes
      await prisma.episode.createMany({
        data: validEpisodes,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error("Error storing data in database:", error);
    }
  })();

  return new Response(
    JSON.stringify({
      podcasts: storedPodcasts,
      episodes: storedEpisodes,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
