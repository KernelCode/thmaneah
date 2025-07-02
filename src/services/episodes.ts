"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Episode = {
  trackId?: number;
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
  collectionId: string;
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
  trackTimeMillis?: number; // Optional, if not present in the API response
};

export async function getCachedEpisodes(query: string) {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const searchKeyword = await prisma.searchKeywords.findUnique({
      where: {
        keyword: query.trim(),
      },
      include: {
        episodes: true, // Fetch linked episodes
      },
    });

    return searchKeyword?.episodes || [];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
export async function getCachedEpisode(id: string) {
  try {
    if (!id || id.trim() === "") {
      return null;
    }
    const episode = await prisma.episode.findUnique({
      where: {
        id: String(id),
      },
    });
    console.log("Cached episode:", String(id));
    return episode;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
export async function storeEpisodes(episodeData: Episode[]) {
  const storedEpisodes = await Promise.all(
    episodeData.map(async (result) => {
      const existingCollection = await prisma.podcast.findUnique({
        where: { id: String(result.collectionId) },
      });

      const haveCollection = existingCollection !== null;

      return {
        id: String(result.id || result.trackId),
        previewUrl: result.previewUrl,
        episodeUrl: result.episodeUrl,
        episodeGuid: result.episodeGuid,
        genres: result.genres,
        feedUrl: result.feedUrl,
        trackName: result.trackName,
        shortDescription: result.shortDescription,
        releaseDate: new Date(result.releaseDate),
        closedCaptioning: result.closedCaptioning,
        collectionId: haveCollection ? String(result.collectionId) : null,
        collectionName: haveCollection ? result.collectionName : null,
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
        trackTimeMillis: result.trackTimeMillis || 0,
      };
    })
  );

  await prisma.episode.createMany({
    data: storedEpisodes,
    skipDuplicates: true,
  });

  return storedEpisodes;
}

export async function getPodcastEpisodesFromExternalAPIs(query: string) {
  const podcastEpisodeResponse = await fetch(
    `https://itunes.apple.com/search?media=podcast&term=${query}&entity=podcastEpisode`
  );
  const podcastEpisodeData: { results: Episode[] } = await podcastEpisodeResponse.json();

  const storedEpisodesData = podcastEpisodeData.results.map((result: Episode) => ({
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
    trackTimeMillis: result.trackTimeMillis || 0, // Optional, if not present in the API response
  }));
  return storedEpisodesData;
}
