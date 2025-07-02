// podcast details page
import React from "react";
import { notFound } from "next/navigation";

import { getCachedEpisode } from "@/services/episodes";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const epi = await getCachedEpisode(id);
  if (!epi) {
    notFound();
  }
  return (
    <div className="container mx-auto p-4 flex justify-between gap-5">
      <Image
        src={epi.artworkUrl600}
        alt={epi.collectionName || "Podcast artwork"}
        className="rounded-lg mb-4 size-40"
        width={100}
        height={100}
      />
      <div>
        <h1 className="text-2xl font-bold mb-4">{epi.trackName}</h1>
        <p className="text-gray-600 mb-2">{epi.description}</p>

        <PlayButton episodeUrl={epi.previewUrl} />
      </div>
    </div>
  );
};

export default Page;
