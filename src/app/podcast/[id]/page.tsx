// podcast details page
import React from "react";
import { notFound } from "next/navigation";
import { getCachedPodcast } from "@/services/podcasts";
import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const podcast = await getCachedPodcast(id);
  if (!podcast) {
    notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{podcast.collectionName}</h1>
      <p className="text-gray-600 mb-2"> {podcast.artistName}</p>
      <Image
        src={podcast.artworkUrl600}
        alt={podcast.collectionName || "Podcast artwork"}
        className="rounded-lg mb-4"
      />
    </div>
  );
};

export default Page;
