import { CirclePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MenuClick from "../MenuClick";
import getTime from "@/lib/getTime";
import useAudioStore from "@/lib/store";

export type Episode = {
  id: string;
  title: string;
  podcast: string;
  image: string;
  description?: string;
  date: string;
  duration?: string;
  audioUrl?: string;
};
const EpisodeCard = ({
  episode,
  isGrid,
  isScroll,
  isCompact,
}: {
  episode: Episode;
  isGrid?: boolean;
  isScroll?: boolean;
  isCompact?: boolean;
}) => {
  const { setCurrentTrack } = useAudioStore();

  return (
    <div
      className={`flex gap-2 lg:gap-4  hover:bg-200 rounded-lg transition-colors group  items-center flex-nowrap ${
        isScroll && "w-fit "
      }`}
    >
      <div
        className={`rounded-lg ${
          isCompact ? "size-15 sm:size-20" : "size-25 sm:size-30"
        }  flex-shrink-0 flex items-center justify-center relative overflow-hidden group`}
      >
        <Image
          src={episode.image}
          alt={episode.title}
          width={isCompact ? 100 : 150}
          height={isCompact ? 100 : 150}
          className="rounded-lg object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/70 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
          <CirclePlay className="size-12 text-white hover:text-pink-400 transition-colors" />
        </div>
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <Link href={`/episode/${episode.id}`}>
          <h3 className="text-white font-medium text-base mb-1 hover:underline line-clamp-2 overflow-hidden">
            {episode.title}
          </h3>
        </Link>
        <Link href={`/podcast/${episode.id}`}>
          <h4 className="text-pink-400 text-sm font-medium mb-2 hover:underline">{episode.podcast}</h4>
        </Link>
        {!isCompact && (
          <div className="hidden sm:flex">
            <p className="text-gray-400 text-sm line-clamp-2 mb-3 leading-relaxed  overflow-hidden ">
              {episode.description}
            </p>
          </div>
        )}
        {!isCompact && (
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span>{episode.date}</span>
            {episode.duration && (
              <>
                <span>•</span>
                <span>{getTime(episode.duration)}</span>
              </>
            )}
          </div>
        )}
      </div>
      <div className={`flex-shrink-0 gap-3 flex items-start flex-col pt-2 relative ${isGrid && "self-baseline"}`}>
        <MenuClick
          items={[
            {
              label: "تشغيل الحلقة",
              onClick: () => {
                if (episode.audioUrl) setCurrentTrack(episode.audioUrl);
              },
            },
            {
              label: "الذهاب إلى البودكاست",
              href: `/podcast/${episode.id}`,
            },
            {
              label: "الذهاب إلى الحلقة",
              href: `/episode/${episode.id}`,
            },

            {
              label: "تنزيل الحلقة",
              onClick: () => {
                // download using previewurl
                if (episode.audioUrl) {
                  const link = document.createElement("a");
                  link.href = episode.audioUrl;
                  link.download = `${episode.title}.mp3`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              },
            },
          ]}
        />

        {!isGrid && (
          <button className="transition-opacity cursor-pointer">
            <CirclePlay className="w-8 h-8 text-white hover:text-pink-400 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};
export default EpisodeCard;
