import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import background from "../assets/background.svg";
import "../styles/components/Card.css"
// import image1 from "../../../../assets/img/Home/Seccion-1/natalia.jpg";

const defaultCardItems = [
  {
    image: "https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000",
    cardTitle: "Alejandra",
    cardDescription:
      "Profesional del estampado textil, especializada en la personalización de prendas.Creativa,detallista,diseñadora y creadora de CreartStamp y de Effatá  .Con conocimientos tecnicos y de las tecnicas usadas al estampar.",
    tags: [
      { label: "Estampados", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Pedidos Empresas", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Pedidos Colegios", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Cumpleaños", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Matrimonios", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Confeccion a Medida", color: "#f5f5f4", textColor: "#44403c" },
      { label: "Confeccion a Medida", color: "#f5f5f4", textColor: "#44403c" },
    ],
  },
];

export function Card({ items = defaultCardItems }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;

    if (!card || !glow || !content) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = -((y - centerY) / centerY);

      card.style.transform = `perspective(1000px) rotateY(${percentX * 10}deg) rotateX(${percentY * 10}deg)`;
      content.style.transform = `translateZ(36px)`;
      content.style.transition = 'transform 0.8s ease';
      glow.style.opacity = '1';
      glow.style.backgroundImage = `
        radial-gradient(
          circle at ${x}px ${y}px,
          #ffffff44,
          #0000000f
        )
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      content.style.transform = 'translateZ(0px)';
      glow.style.opacity = '0';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id='aboutSection' className="CardSection flex flex-col md:flex items-start md:items-center justify-center p-6 md:p-8 relative mt-40 min-h-[auto] md:min-h-screen">
      <img id="cardBackground" src={background.src} alt="" fetchPriority="high" /> 
      {items.map((item, index) => (
        <div
          key={index}
          ref={cardRef}
          className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 transform-gpu transition-all duration-300 ease-out hover:scale-[1.02]"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
        >
          {/* Glow Layer */}
          <div
            ref={glowRef}
            className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl pointer-events-none"
          />

          {/* Card Content */}
          <div ref={contentRef} className="relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.cardTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold font-jost text-warm-gray-800">
                  {item.cardTitle}
                </h1>
                <p className="text-xs md:text-lg font-montserrat text-warm-gray-600">
                  {item.cardDescription}
                  {/* <a> <strong>Ver mas</strong></a> */}
                </p>
                <div className="flex flex-wrap gap-3">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full text-xs md:text-sm"
                      style={{
                        backgroundColor: tag.color,
                        color: tag.textColor,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
