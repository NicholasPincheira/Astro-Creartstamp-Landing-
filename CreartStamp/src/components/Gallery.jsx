import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from 'lucide-react';
import Draggable from "gsap/Draggable";

// import image1 from "../../../../assets/img/Home/Seccion-1/natalia.jpg";
// import image2 from "../../../../assets/img/Home/Seccion-1/gray.jpg";
// import image3 from "../../../../assets/img/Home/Seccion-1/joyeria.jpeg";

// gsap.registerPlugin(ScrollTrigger, Draggable);

const defaultGalleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000',
    title: "CreartStamp",
    descriptionDesktop: "Soy una artista-artesana-hacedora-inventora-creadora-profesora, dedicada a la joyería contemporánea y textil, explorando el límite entre la joya y la escultura a través de un enfoque transdisciplinar.",
    descriptionMobile: "Artista dedicada a la joyería contemporánea y textil.",
    align: "right",
    link: "/natalia-piderit",
    showButtonDesktop: true,
    showButtonMobile: true,
    buttonTextDesktop: "Mas de mi →",
    buttonTextMobile: "Ver mas",
  },
  {
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000',
    title: "Diseños Contemporáneos",
    descriptionDesktop: "Fusionamos la tradición artesanal con las tendencias modernas, explorando nuevas formas y materiales para crear piezas únicas. Cada diseño es una síntesis entre técnicas ancestrales y procesos innovadores, ofreciendo joyería que trasciende lo convencional y redefine la elegancia contemporánea.",
    descriptionMobile: "Tradición y modernidad en perfecta armonía, creando piezas únicas que transforman lo clásico en vanguardia..",
    align: "left",
    link: "/disenos-contemporaneos",
    showButtonDesktop: true,
    showButtonMobile: true,
    buttonTextDesktop: "Descubre más",
    buttonTextMobile: "Descubre más",
  },
  {
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000',
    title: "Colecciones Exclusivas",
    descriptionDesktop: "Cada pieza es una expresión auténtica de estilo y personalidad. Nuestras colecciones están diseñadas para quienes buscan más que un accesorio: buscan una obra de arte que refleje su esencia, con detalles únicos y una historia en cada creación.",
    descriptionMobile: "Joyería única que refleja tu esencia y resalta tu individualidad con detalles exclusivos.",
    align: "right",
    link: "/colecciones-exclusivas",
    showButtonDesktop: true,
    showButtonMobile: true,
    buttonTextDesktop: "Ver colección",
    buttonTextMobile: "Ver colección",
  },
];

export function Gallery({ items = defaultGalleryItems}) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const underlineRef = useRef(null);
  const scrollIconRef = useRef(null);
  const [showIcon, setShowIcon] = useState(true);

  useEffect(() => {
    // 🚀 Detectar scroll y ocultar/mostrar la flecha
    const handleScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(scrollIconRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
        setShowIcon(false);
      } else {
        gsap.to(scrollIconRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
        setShowIcon(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // Animación del subrayado
      gsap.from(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      document.querySelectorAll(".gallery-item").forEach((item) => {
        const imageWrapper = item.querySelector(".image-wrapper");
        const content = item.querySelector(".content-wrapper");
        const liquidOverlay = imageWrapper.querySelector(".liquid-overlay");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        tl.from([imageWrapper, content], {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        }).fromTo(
          liquidOverlay,
          { x: "-100%" },
          {
            x: "100%",
            duration: 1.5,
            ease: "power2.inOut",
          },
          0
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden mb-16">
      {/* Scroll Indicator (solo en desktop) */}
      <div
        ref={scrollIconRef}
        className={`absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-custom-icon-container transition-opacity duration-500 ${showIcon ? "opacity-100" : "opacity-0"
          } hidden md:flex`}
      >
        <ChevronDown className="text-black w-6 h-6 scroll-arrow opacity-80 scroll-custom-icon" />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {/* Título con subrayado animado */}
        {/* <div className="text-center relative mb-16">
          <h2 ref={titleRef} className="text-6xl text-warm-gray-800 inline-block">
            Creaciones Únicas
          </h2>
          <div
            ref={underlineRef}
            className="h-1 w-40 bg-gradient-to-r from-warm-gray-400 to-warm-gray-600 mt-4 mx-auto"
          ></div>
        </div> */}

        <div className="space-y-8 lg:space-y-32">
          {items.map((item, index) => (
            <div
              key={index}
              className={`gallery-item flex flex-col md:flex-row items-center gap-12 ${item.align === "left" ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Imagen */}
              <div className="w-full md:w-1/2 relative overflow-hidden image-wrapper">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] md:h-[600px] object-cover rounded-lg"
                  />
                  <div className="liquid-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full" />

                  {/* Contenido dentro de la imagen en MOBILE */}
                  <div className="block md:hidden absolute inset-x-0 mobile-description-gallery bg-white/80 p-4 text-center shadow-lg">
                    <h3 className="text-2xl text-warm-gray-800">{item.title}</h3>
                    <p className="text-sm text-warm-gray-600">{item.descriptionMobile}</p>
                    {item.showButtonMobile && (
                      <a
                        href={item.link}
                        className="mt-2 inline-block px-3 text-md font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all"
                      >
                        {item.buttonTextMobile || "Ver más"}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido en DESKTOP */}
              <div className="hidden md:block w-full md:w-1/2 text-center md:text-left content-wrapper">
                <h3 className="text-4xl text-warm-gray-800 mb-6">{item.title}</h3>
                <p className="text-lg text-warm-gray-600">{item.descriptionDesktop}</p>
                {item.showButtonDesktop && (
                  <a
                    href={item.link}
                    className="mt-4 inline-block px-5 py-2 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all"
                  >
                    {item.buttonTextDesktop || "Ver más →"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}