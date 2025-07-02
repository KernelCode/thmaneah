"use client";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Scrollbar } from "swiper/modules";
import MenuClick from "../MenuClick";
import type { Podcast } from "../PodcastCard";
import PodcastCard from "../PodcastCard";

const Podcasts = ({ podcasts }: { podcasts: Podcast[] }) => {
  const [showType, setShowType] = useState("scroll");
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
    <section className="mb-12 block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          أفضل البودكاست لـ <span>فنجان</span>
        </h2>
        <div className="flex items-center gap-2">
          {showType === "scroll" && (
            <>
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
            </>
          )}

          <MenuClick
            items={[
              {
                label: showType === "grid" ? "عرض التمرير" : "عرض الشبكة",
                onClick: () => {
                  setShowType(showType === "grid" ? "scroll" : "grid");
                },
              },
            ]}
          />
        </div>
      </div>
      {showType === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}
      {showType === "scroll" && (
        <div className="space-y-4 relative">
          <Swiper
            ref={swiperRef}
            modules={[Scrollbar]}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            initialSlide={0}
            spaceBetween={6}
            scrollbar={{
              hide: true,
              draggable: true,
            }}
          >
            {podcasts.map((podcast) => (
              <SwiperSlide key={podcast.id}>
                <PodcastCard podcast={podcast} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
};

export default Podcasts;
