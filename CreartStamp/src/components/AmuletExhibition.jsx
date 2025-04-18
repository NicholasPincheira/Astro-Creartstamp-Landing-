import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Draggable from "gsap/Draggable";
import 'swiper/css';

import background from "../assets/background.svg";
import "../styles/components/AmuletExhibition.css";

gsap.registerPlugin(ScrollTrigger, Draggable);

const amulets = [
  "https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000",
  "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
  "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
  "https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000"
];

export function AmuletExhibition() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del subrayado desde la derecha
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: 'right' },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animación de los amuletos (para desktop)
      gsap.from('.amulet-item', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative AmuletSection mb-16">
      {/* Fondo limitado a la sección */}
      <img
        id="amuletBackground"
        src={background.src}
        alt="Background"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full z-[-1] object-cover filter blur-[100px]"
      />
      
      <div className="max-w-7xl mx-auto px-4">
        {/* Título y subrayado */}
        <div ref={titleRef} className="text-center relative mb-12">
          <h2 className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">
            Estampados Personalizados
          </h2>
          <div
            ref={underlineRef}
            className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-36 h-1 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 origin-right"
          ></div>
        </div>

        {/* Vista Desktop: se usa una grilla centrada */}
        <div className="hidden md:grid grid-cols-5 gap-8 justify-items-center mb-16">
          {amulets.map((amulet, index) => (
            <div key={index} className="amulet-item w-48 h-48 relative group cursor-pointer">
              <div className="absolute inset-0 rounded-full overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                <img src={amulet} alt={`Amulet ${index + 1}`} className="w-full h-full object-cover AmuletItemPng" />
              </div>
            </div>
          ))}
        </div>

        {/* Vista Mobile: Slider de amuletos */}
        <div className="md:hidden mobileAmuletSlider mb-8">
          <Swiper
            modules={[FreeMode]}
            slidesPerView={2.5}
            spaceBetween={20}
            freeMode={true}
            className="amulet-slider"
          >
            {amulets.map((amulet, index) => (
              <SwiperSlide key={index} className="slide-item !w-[280px]">
                <div className="amulet-item w-full h-full relative">
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <img src={amulet} alt={`Amulet ${index + 1}`} className="w-full h-full object-cover AmuletItemPng" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
