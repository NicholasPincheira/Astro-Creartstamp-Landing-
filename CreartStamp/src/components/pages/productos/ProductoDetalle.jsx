import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import CatalogoModal from "./CatalogModal";
import { ContactModal } from "../../ContactModal"; // Ajusta la ruta según tu proyecto

export default function ProductoDetalle({ producto }) {
  const [isCatalogoOpen, setIsCatalogoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mensajeContacto, setMensajeContacto] = useState("");

  if (!producto) {
    return <div className="text-center py-10 text-red-600">Producto no encontrado</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Volver */}
      <div className="mb-6">
        <a
          href="/categorias"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Volver a categorías
        </a>
      </div>

      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-bl from-slate-400 to-zinc-800 bg-clip-text text-transparent pb-5">
        {producto.titulo}
      </h1>

      {/* Descripción + Imagen */}
      <div className="flex flex-col md:flex-row items-start gap-12 lg:my-20">
        <div className="flex-1 space-y-4 my-auto text-center">
          <p className="text-xl leading-relaxed text-gray-800 lg:mx-8 italic">{producto.descripcion}</p>
        </div>

        <div className="md:w-[400px] w-full lg:flex-1 lg:aspect-[5/3] rounded-xl overflow-hidden shadow-md">
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Guía de tallas */}
      <div className="mt-16 max-w-sm mx-auto bg-gray-50 rounded-xl shadow-md p-6">
        <h3 className="text-center text-sm font-bold uppercase mb-4 text-gray-700">Guía de Tallas</h3>
        <ul className="text-center text-base text-gray-800 space-y-1">
          {producto.tallas.map((talla, i) => (
            <li key={i}>Talla {talla}</li>
          ))}
        </ul>
      </div>

      {/* Colores disponibles */}
      <div className="mt-10 text-center">
        <h4 className="text-sm font-semibold uppercase mb-2 text-gray-700">Colores disponibles</h4>
        <div className="flex justify-center gap-4">
          {producto.colores.map((color, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border border-gray-300 shadow-inner"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="mt-10 mb-0 md:mb-20 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => setIsCatalogoOpen(true)}
          className="w-full sm:w-auto px-6 cursor-pointer py-3 text-center rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
        >
          Ver Catálogo
        </button>
        <button
          onClick={() => {
            setMensajeContacto(""); // No mensaje personalizado, solo nombre
            setIsContactOpen(true);
          }}
          className="w-full sm:w-auto px-6 cursor-pointer py-3 text-center rounded-full border border-black text-black font-semibold hover:bg-gray-100 transition"
        >
          Contáctame
        </button>
      </div>

      {/* Modales */}
      <CatalogoModal
        isOpen={isCatalogoOpen}
        onClose={() => setIsCatalogoOpen(false)}
        productoTitulo={producto.titulo}
        images={producto.catalogoImgs || [producto.imagen]}
        onContactar={(mensaje) => {
          setMensajeContacto(mensaje);
          setIsContactOpen(true);
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        productName={producto.titulo}
        customMessage={mensajeContacto}
      />
    </div>
  );
}
