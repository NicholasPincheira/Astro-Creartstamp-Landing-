// CategoriasPrincipales.jsx
import React from 'react';

const categorias = [
  {
    nombre: "Poleras",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
    link: "/productos/poleras",
  },
  {
    nombre: "Polerones",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
    link: "/productos/polerones",
  },
  {
    nombre: "Bolsos",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
    link: "/productos/bolsos",
  },
  {
    nombre: "Gorros",
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000",
    link: "/productos/gorros",
  },
];

export default function CategoriasPrincipales() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 px-4 lg:py-16 lg:px-0 max-w-6xl mx-auto">
      {categorias.map((cat, i) => (
        <a
          key={i}
          href={cat.link}
          className="rounded-lg overflow-hidden shadow-md group transition-transform hover:scale-[1.02]"
        >
          <div className="relative">
            <img
              src={cat.img}
              alt={cat.nombre}
              className="w-full h-[200px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-xl md:text-2xl font-bold">{cat.nombre}</span>
            </div>
          </div>
        </a>
      ))}
    </main>
  );
}
