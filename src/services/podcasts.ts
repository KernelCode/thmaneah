import { prisma } from "@/lib/prisma";

export async function getCachedPodcasts(query: string) {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const searchKeyword = await prisma.searchKeyword.findUnique({
      where: {
        keyword: query.trim(),
      },
      include: {
        podcasts: true, // Fetch linked podcasts
      },
    });

    return searchKeyword?.podcasts || [];
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export type Podcast = {
  id: string;
  wrapperType: string;
  kind: string;
  collectionId?: number;
  trackId?: number;
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

export async function storePodcasts(podcastData: Podcast[], query: string) {
  const storedPodcasts = podcastData.map((result) => ({
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

  await prisma.podcast.createMany({
    data: storedPodcasts,
    skipDuplicates: true,
  });

  return storedPodcasts;
}

export async function getExistingPodcastIds() {
  const existingPodcastIds = await prisma.podcast.findMany({
    select: { id: true },
  });
  return new Set(existingPodcastIds.map((p) => Number(p.id)));
}

export async function getPodcastFromExternalAPIs(query: string) {
  const podcastResponse = await fetch(`https://itunes.apple.com/search?media=podcast&term=${query}&entity=podcast`);
  const podcastData: { results: Podcast[] } = await podcastResponse.json();

  const storedPodcastsData = podcastData.results.map((result: Podcast) => ({
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
  return storedPodcastsData;
}
