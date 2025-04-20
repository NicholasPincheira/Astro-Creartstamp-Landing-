// src/components/DynamicSlider.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultItems = [
  {
    url: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000",
    title: "Poleras Personalizadas",
    for: "Empresa",
    description: "Trabajo perfecto realizado por Alejandra",
  },
  {
    url: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
    title: "Gorras de Equipo",
    for: "Club Deportivo",
    description: "Excelente calidad y bordado nítido",
  },
  {
    url: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
    title: "Sudaderas Corporativas",
    for: "Oficina Central",
    description: "Confort y estilo para el equipo de trabajo",
  },
  // ... más ítems si los necesitas
];

export function DynamicSlider({ items = defaultItems, speed = 50 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const fullWidth = track.scrollWidth;
    const halfWidth = fullWidth / 2;
    const duration = halfWidth / speed;
    const wrap = gsap.utils.wrap(-halfWidth, 0);

    const tl = gsap.to(track, {
      x: `-=${halfWidth}`,
      duration,
      ease: 'none',
      modifiers: {
        x: (x) => wrap(parseFloat(x)) + 'px'
      },
      repeat: -1
    });

    return () => tl.kill();
  }, [items, speed]);

  const slides = [...items, ...items];

  return (
    <section id='Experiencies' className="py-20 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-5xl lg:text-6xl text-warm-gray-800 mb-0 lg:mb-4 font-extrabold bg-gradient-to-bl from-slate-500 to-zinc-900 bg-clip-text text-transparent leading-normal">
          Trabajos/Clientes
        </h2>
      </div>
      <div className="relative overflow-hidden px-4">
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{ willChange: 'transform' }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className={`
                flex-shrink-0 
                w-[80%] sm:w-[50%] md:w-[33.333%] lg:w-[25%] 
                p-2
              `}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay solo en la sección de texto */}
                <div className="absolute left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm p-4 text-white">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm">Para: {item.for}</p>
                  <p className="mt-1 text-sm leading-snug">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}