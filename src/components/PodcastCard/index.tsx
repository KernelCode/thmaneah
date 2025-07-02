import Image from "next/image";
import MenuClick from "../MenuClick";
import Link from "next/link";

export type Podcast = {
  id: string;
  title: string;
  host: string;
  image: string;
};
const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <Link href={`/podcast/${podcast.id}`} prefetch={false} className="group cursor-pointer bg-100 hover:bg-200 p-2">
    <div className="bg-teal-600 rounded-xl  mb-3 aspect-square flex items-center justify-center relative overflow-hidden  transition-transform duration-200">
      <Image
        src={podcast.image}
        alt={podcast.title}
        width={200}
        height={200}
        className="rounded-lg object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
      />
    </div>
    <div className="flex justify-between overflow-hidden">
      <div>
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 hover:underline">{podcast.title}</h3>
        <p className="text-gray-400 text-xs">{podcast.host}</p>
      </div>
      <MenuClick />
    </div>
  </Link>
);

export default PodcastCard;
