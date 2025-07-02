import React from "react";

import Podcasts from "@/components/Podcasts";
import Episodes from "@/components/Episodes";

type Iprops = {
  params: Promise<{ query: string }>;
};

export default async function Page(props: Iprops) {
  const params = await props.params;

  const { query } = await params;
  console.log("Search query:", `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`);
  const { podcasts, episodes } = await response.json();
  console.log("Podcasts:", podcasts);
  return (
    <>
      <Podcasts podcasts={podcasts} />
      <Episodes episodes={episodes} />
    </>
  );
}
