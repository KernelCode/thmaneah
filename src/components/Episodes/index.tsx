"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import type { Episode } from "../EpisodeCard";
import EpisodeCard from "../EpisodeCard";
import MenuClick from "../MenuClick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Scrollbar } from "swiper/modules";

const Episodes = ({ episodes }: { episodes: Episode[] }) => {
  const [showType, setShowType] = useState("grid");
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleSlideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          افضل الحلقات لـ <span>فنجان</span>
        </h2>
        <div className="flex gap-2">
          {showType === "scroll" && (
            <div>
              <button
                onClick={handleSlidePrev}
                className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight className="size-5 min-w-5 text-gray-400" />
              </button>
              <button
                onClick={handleSlideNext}
                className="p-2 hover:bg-200 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-5 min-w-5 text-gray-400" />
              </button>
            </div>
          )}
          <MenuClick
            items={[
              {
                label: "عرض الشبكة",
                onClick: () => {
                  setShowType("grid");
                },
              },
              {
                label: "عرض القائمة",
                onClick: () => {
                  setShowType("list");
                },
              },
              {
                label: "عرض التمرير",
                onClick: () => {
                  setShowType("scroll");
                },
              },

              {
                label: "عرض مضغوط",
                onClick: () => {
                  setShowType("compact");
                },
              },
            ]}
          />
        </div>
      </div>

      <div className="space-y-2 ">
        {showType === "list" && (
          <>
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} isGrid />
            ))}
          </>
        )}
        {showType === "grid" && (
          <div
            className={`grid ${
              episodes.length > 2
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2"
            } gap-4`}
          >
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} isGrid />
            ))}
          </div>
        )}
        {showType === "scroll" && (
          <div className="space-y-4">
            <Swiper
              ref={swiperRef}
              modules={[Scrollbar]}
              initialSlide={0}
              spaceBetween={6}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1.5,
                },
                1024: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              scrollbar={{
                hide: true,
                draggable: true,
              }}
            >
              {episodes.map((episode) => (
                <SwiperSlide key={episode.id}>
                  <EpisodeCard episode={episode} isGrid />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        {showType === "compact" && (
          <div
            className={`grid ${
              episodes.length > 2
                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
                : "grid-cols-1 sm:grid-cols-2"
            } gap-4`}
          >
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} isGrid isCompact />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Episodes;
