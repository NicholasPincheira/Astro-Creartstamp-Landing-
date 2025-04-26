import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const sliderImages = [
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
];

export default function SwiperSliderSimple() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const multipleSlides = sliderImages.length > 1;

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setSwiperReady(true);
    }
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <div className="w-full bg-white py-0 px-0">
      <div className="w-full mx-auto relative overflow-hidden min-h-[400px]">
        {swiperReady && (
          <Swiper
            loop={multipleSlides}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={multipleSlides ? { clickable: true, el: '.swiper-pagination-custom' } : false}
            onSwiper={(swiper) => {
              if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
              setSwiperReady(true);
            }}
            className="w-full"
          >
            {sliderImages.map((img, i) => (
              <SwiperSlide key={i} className="relative">
                {!loadedImages[i] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse z-10"></div>
                )}
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className={`w-full h-[400px] object-cover transition-opacity duration-500 ${loadedImages[i] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={(e) => {
                    if (e.target.complete) handleImageLoad(i);
                  }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Flechas */}
        {multipleSlides && (
          <>
            <button
              ref={prevRef}
              className="swiper-button-prev-custom absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-md p-3 rounded-full cursor-pointer z-20 hover:bg-white hover:scale-110 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              ref={nextRef}
              className="swiper-button-next-custom absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 backdrop-blur-md shadow-md p-3 rounded-full cursor-pointer z-20 hover:bg-white hover:scale-110 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </>
        )}

        {/* Bullets */}
        {multipleSlides && (
          <div className="swiper-pagination-custom absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"></div>
        )}
      </div>
    </div>
  );
}
