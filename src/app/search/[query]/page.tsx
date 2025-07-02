import React from "react";

import Podcasts from "@/components/Podcasts";
import Episodes from "@/components/Episodes";
import { Podcast } from "@/services/podcasts";
import { Episode } from "@/services/episodes";
import AudioPlayer from "@/components/AudioPlayer";

type Iprops = {
  params: Promise<{ query: string }>;
};

export default async function Page(props: Iprops) {
  const params = await props.params;

  const { query } = await params;
  console.log("Search query:", `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
  const { podcasts, episodes } = await response.json();

  return (
    <>
      <Podcasts
        podcasts={podcasts.map((podcast: Podcast) => {
          return {
            id: podcast.id,
            image: podcast.artworkUrl600,
            host: podcast.artistName,
            title: podcast.collectionName,
          };
        })}
      />
      <Episodes
        episodes={episodes.map((episode: Episode) => {
          return {
            id: episode.id,
            image: episode.artworkUrl600,
            title: episode.trackName,
            description: episode.shortDescription,
            date: new Date(episode.releaseDate).toLocaleDateString("ar-SA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            duration: episode.trackTimeMillis,
            podcastId: episode.collectionId,
            audioUrl: episode.previewUrl,
          };
        })}
      />
      <AudioPlayer />
    </>
  );
}
