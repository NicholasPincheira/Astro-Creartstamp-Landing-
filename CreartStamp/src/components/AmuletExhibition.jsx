// src/components/AmuletExhibition.jsx
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';

import background from "../assets/background.svg";
import "../styles/components/AmuletExhibition.css";

// gsap.registerPlugin(ScrollTrigger);

// Importar imágenes locales
import polera1 from '../assets/img/index/poleras/poleranegra.png';
import polera2 from '../assets/img/index/poleras/poleraverde.png';
import polera3 from '../assets/img/index/poleras/poleranegra.png';
import polera4 from '../assets/img/index/poleras/poleraverde.png';
import polera5 from '../assets/img/index/poleras/poleranegra.png';

// Lista de imágenes
const amulets = [polera1, polera2, polera3, polera4, polera5];

export function AmuletExhibition() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);



  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1) Underline animation: play once when title enters
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'right' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2) Prepare all items
      const items = gsap.utils.toArray('.amulet-item');
      // set them slightly below & invisible
      gsap.set(items, { y: 80, opacity: 0 });

      // 3) Timeline for items: plays once when section scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        }
      });

      tl.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // 4) Force a refresh after hydration/layout shifts
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative AmuletSection mb-16">
      <img
        id="amuletBackground"
        src={background.src}
        alt="Background"
        className="absolute inset-0 w-full h-full z-[-1] object-cover filter blur-[100px]"
      />

      <div className="max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="text-center relative mb-16">
          <h2 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">
            Estampados Personalizados
          </h2>
          <div
            ref={underlineRef}
            className="absolute left-1/2 -bottom-2 w-36 h-1 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600"
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-5 gap-8 justify-items-center mb-16">
          {amulets.map((url, i) => (
            <div
              key={i}
              className="amulet-item w-48 aspect-square relative group cursor-pointer overflow-visible"
            >
              <img
                src={url.src}
                alt={`Amulet ${i + 1}`}
                className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden mb-8">
          <Swiper
            modules={[FreeMode]}
            slidesPerView={2}
            spaceBetween={20}
            freeMode
            className="amulet-slider"
          >
            {amulets.map((url, i) => (
              <SwiperSlide key={i} className="!w-[180px]">
                <div className="amulet-item w-full aspect-square relative overflow-visible">
                  <img
                    src={url.src}
                    alt={`Amulet ${i + 1}`}
                    className="w-full h-full object-contain drop-shadow-lg "
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
