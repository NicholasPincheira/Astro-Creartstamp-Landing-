import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CatalogoModal({
  isOpen,
  onClose,
  images = [],
  onContactar,
  productoTitulo = "",
}) {
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [talla, setTalla] = useState("");
  const [color, setColor] = useState("");
  const [cantidad, setCantidad] = useState("");

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
      >
        {/* Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold text-center mb-4">Catálogo de Diseños</h2>

        {/* Swiper con navegación funcional */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
            className="rounded-lg overflow-hidden"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Catálogo ${i + 1}`}
                  className="w-full h-[300px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Flechas visibles y funcionales */}
          <button
            ref={prevRef}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full shadow-md transition"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white backdrop-blur-md p-2 rounded-full shadow-md transition"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Contador de slides */}
          <div className="text-center text-sm text-gray-600 mt-2">
            {currentSlide} / {images.length}
          </div>
        </div>

        {/* Formulario */}
        <div className="mt-6 space-y-4 text-sm">
          <p className="text-center italic font-medium">Si te interesa algo, ¡contáctame!</p>

          <input
            type="text"
            placeholder="Talla"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <button
            onClick={() => {
              const messageParts = [
                `Hola, me interesa ${productoTitulo}.`,
                talla && `Soy talla: ${talla}`,
                color && `En color: ${color}`,
                cantidad && `Necesito: ${cantidad}`,
              ].filter(Boolean);

              const finalMessage = messageParts.join(" ");
              onContactar(finalMessage);
              onClose();
            }}
            className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-900 transition"
          >
            Contactar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
