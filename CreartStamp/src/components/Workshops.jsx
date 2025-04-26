import { useEffect, useRef } from 'react';
import { Gem, Palette, Sparkles, Brush } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Draggable from "gsap/Draggable";

// import workshop1 from '../../../../assets/img/Home/Seccion-Talleres/t1.jpg';
// import workshop2 from '../../../../assets/img/Home/Seccion-Talleres/t2.jpg';
// import workshop3 from '../../../../assets/img/Home/Seccion-Talleres/t3.jpg';
// import workshop4 from '../../../../assets/img/Home/Seccion-Talleres/t4.jpg';

// gsap.registerPlugin(ScrollTrigger);

const defaultWorkshops = [
  {
    title: 'Arte en Metales',
    description: 'Explora la fusión entre arte y joyería.',
    icon: Gem,
    color: 'from-purple-500 to-pink-500',
    image: "https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000"
  },
  {
    title: 'Diseño Creativo',
    description: 'Desarrolla tu estilo único en el diseño de joyas.',
    icon: Palette,
    color: 'from-blue-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000'
  },
  {
    title: 'Técnicas de costura',
    description: 'Domina técnicas para construir tu arte con tejidos.',
    icon: Brush,
    color: 'from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000'
  },
  {
    title: 'Procesos Quimicos',
    description: 'Explora creaciones con resina exposica, reacciones para crear tu obra.',
    icon: Sparkles,
    color: 'from-emerald-500 to-lime-500',
    image: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070'
  }
];

export function Workshops({ workshops = defaultWorkshops }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const cardsRef = useRef([]);

  // Registrar plugins solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined" && gsap?.registerPlugin) {
      gsap.registerPlugin(ScrollTrigger, Draggable);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title decoration animation

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        
      });

      // Animación del subrayado (expande desde el centro hacia los lados)
      gsap.fromTo(
        underlineRef.current,
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
             
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id='servicesSection' ref={sectionRef} className="py-20 customMobilePost bg-white relative mb-70">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-5xl lg:text-6xl text-warm-gray-800 mb-0 lg:mb-4 font-extrabold bg-gradient-to-bl from-slate-500 to-zinc-900 bg-clip-text text-transparent leading-normal">
            Servicios
          </h2>
          <div
            ref={underlineRef}
            className="h-1 w-40 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 mx-auto inline-block transform"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className={`absolute inset-0 bg-gradient-to-br ${workshop.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className="p-8">
                <div className="relative z-10 mb-6 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                  <workshop.icon className="w-12 h-12 mx-auto text-warm-gray-800" />
                </div>

                <div className="relative z-10 text-center transform transition-all duration-300 group-hover:-translate-y-1">
                  <h3 className="text-2xl text-warm-gray-800 mb-4">
                    {workshop.title}
                  </h3>
                  <p className="text-warm-gray-600">
                    {workshop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}