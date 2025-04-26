import React from 'react';
import { ChevronLeft } from 'lucide-react';

/** @typedef {{ title: string; img: string; link: string }} CategoriaItem */

/**
 * @param {{ title: string; items: CategoriaItem[] }} props
 */
export default function CategoriaGrid({ title, items }) {
  const itemCount = items.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Botón volver */}
      <div className="mb-6">
        <a
          href="/categorias"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a categorías
        </a>
      </div>

      {/* Grid normal: 1 columna en mobile, 2 en sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item, i) => {
          const isSingleItem = itemCount === 1;
          const isThirdInThree = itemCount === 3 && i === 2;
          const shouldExpandDesktop = isSingleItem || isThirdInThree;

          return (
            <a
              key={i}
              href={item.link}
              className={`block overflow-hidden rounded-xl shadow hover:scale-105 transition-all group bg-white ${
                shouldExpandDesktop ? 'sm:col-span-2' : ''
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  shouldExpandDesktop ? 'aspect-[4/4] sm:aspect-[5/2]' : 'aspect-[4/4]'
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md px-6 py-3 text-center">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
