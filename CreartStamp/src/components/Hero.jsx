import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";


// import image1 from "../../../../assets/img/Home/Slider-Principal/slider1.jpg";
// import image2 from "../../../../assets/img/Home/Slider-Principal/slider2.jpg";
// import image3 from "../../../../assets/img/Home/Slider-Principal/slider3.jpg";
// import image4 from "../../../../assets/img/Home/Slider-Principal/slider-4.jpg";
// import image5 from "../../../../assets/img/Home/Slider-Principal/slider5.jpg";
// import image6 from "../../../../assets/img/Home/Slider-Principal/slider6.jpg";

const defaultSlides = {
  config: {
    animation: "pixelate-transition", // Cambia entre "fade-in", "drag-reveal", "pixelate-transition"
    showArrows: true,  //Muestra/oculta flechas de navegación
    showBullets: true, //Muestra/oculta los bullets
    enableSwipe: true, //Habilita/deshabilita el swipe en móviles
  },
  slide1: {
    divs: {
      div1: {
        class: "slide-item",
        img: "https://images.unsplash.com/photo-1584307833174-a3bbb76ab367?q=80&w=1000",
        link: "/",
        title: "Diseños Empresariales ",
        description: "Diseñamos la vestimenta o las decoraciones de tu empresa"
      },
      div2: {
        class: "slide-item",
        img: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1000',
        link: "/",
        title: "Diseños Eventos",
        description: "Diseñamos la vestimenta o las decoraciones de tu cumpleaños, bodas "
      },
      div3: {
        class: "slide-item",
        img: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1000',
        link: "/",
        title: "Diseños Estudiantiles",
        description: "Diseñamos la vestimenta o las decoraciones para tus alumnos"
      }
    }
  },
  slide2: {
    divs: {
      div1: {
        class: "slide-item",
        img: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070',
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      }
    }
  },
  slide3: {
    divs: {
      div1: {
        class: "slide-item",
        img: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070',
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      },
      div2: {
        class: "slide-item",
        img: 'https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070',
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      }
    }
  },
  slide4: {
    divs: {
      div1: {
        class: "slide-item",
        img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      },
      div2: {
        class: "slide-item",
        img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      },
      div3: {
        class: "slide-item",
        img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      },
      div4: {
        class: "slide-item",
        img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2070",
        link: "/joyas",
        title: "Joyas que hablan de ti",
        description: "Diseños únicos y atemporales"
      }
    }
  }
};

export function Hero({ slides = defaultSlides } = {}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); //
  const slidesRef = useRef([]);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const isSwiping = useRef(false);

  // Registrar plugins solo en el cliente
  useEffect(() => {
    if (typeof window !== "undefined" && gsap?.registerPlugin) {
      gsap.registerPlugin(ScrollTrigger, Draggable);
    }
    // Pequeño retraso para mostrar Skeleton
    const timeout = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!slides.config.enableSwipe) return;

    const handleTouchStart = (e) => {
      startX.current = e.touches ? e.touches[0].clientX : e.clientX;
      isSwiping.current = true;
    };

    const handleTouchMove = (e) => {
      if (!isSwiping.current) return;
      const moveX = e.touches ? e.touches[0].clientX : e.clientX;
      const diff = startX.current - moveX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext(); // Swipe izquierda → siguiente slide
        else handlePrev(); // Swipe derecha → slide anterior
        isSwiping.current = false; // Evita múltiples cambios de slide en un solo gesto
      }
    };

    const handleTouchEnd = () => {
      isSwiping.current = false;
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousedown", handleTouchStart);
    container.addEventListener("mousemove", handleTouchMove);
    container.addEventListener("mouseup", handleTouchEnd);
    container.addEventListener("mouseleave", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleTouchStart);
      container.removeEventListener("mousemove", handleTouchMove);
      container.removeEventListener("mouseup", handleTouchEnd);
      container.removeEventListener("mouseleave", handleTouchEnd);
    };
  }, [currentSlide]);

  useEffect(() => {
    const animationType = slides.config.animation;
    switch (animationType) {
      case "fade-in":
        gsap.fromTo(
          slidesRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, ease: "power3.out", duration: 0.5 }
        );
        break;
      case "drag-reveal":
        gsap.fromTo(
          slidesRef.current,
          { x: "-100%", opacity: 0 },
          { x: "0%", opacity: 1, stagger: 0.15, ease: "power2.out", duration: 0.5 }
        );
        break;
      case "pixelate-transition":
        gsap.fromTo(
          slidesRef.current,
          { filter: "blur(10px)", opacity: 0 },
          { filter: "blur(0px)", opacity: 1, stagger: 0.15, ease: "power3.out", duration: 0.5 }
        );
        break;
    }
  }, [currentSlide]);

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Object.keys(slides).length - 2 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === Object.keys(slides).length - 2 ? 0 : prev + 1
    );
  };

  return (
    <div ref={containerRef} className="hero-section relative w-full h-[80vh] md:h-[70vh] overflow-hidden flex items-center justify-center mb-10">

      {/* 🔥 SKELETON mientras no cargue */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 flex items-center justify-center z-20">
          <div className="space-y-6 text-center">
            <div className="h-8 w-48 bg-gray-600 rounded mx-auto"></div>
            <div className="h-5 w-64 bg-gray-600 rounded mx-auto"></div>
          </div>
        </div>
      )}

      {/* Fondo Moderno Sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 opacity-30"></div>

      <div className="relative w-full h-full flex transition-transform duration-500 ">
        {Object.entries(slides)
          .filter(([key]) => key !== "config")
          .map(([slideKey, slideData], slideIndex) => (
            <div
              key={slideIndex}
              ref={(el) => (slidesRef.current[slideIndex] = el)}
              className={`slide-${slideIndex} absolute inset-0 flex md:flex-row flex-col transition-all duration-500`}
              style={{
                transform: `translateX(${(slideIndex - currentSlide) * 100}%)`,
                display: "flex"
              }}
            >
              {Object.values(slideData.divs).map((div, index) => (


                <a
                  key={index}
                  href={div.link}
                  className={`slide-div relative flex-1 overflow-hidden transition-transform duration-500 ${div.class || ''}`}
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <div
                    className="absolute inset-0 z-10 bg-cover bg-center transform hover:scale-100 transition-transform duration-500"
                    style={{ backgroundImage: `url(${div.img})` }}
                  />
                  {div.overlay !== false && (
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                  )}

                  <div className="relative h-full flex z-10 flex-col items-center justify-center text-white p-6">
                    <h2 className="text-3xl md:text-4xl mb-4c text-white">{div.title}</h2>
                    <p className="text-lg md:text-xl opacity-90 text-center">{div.description}</p>
                  </div>
                </a>
              ))}
            </div>
          ))}
      </div>

      {/* Flechas de navegación (configurables) */}
      {slides.config.showArrows && (
        <>
          <button onClick={handlePrev} className="absolute custom-arrow-left md:left-10 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full  transition hover:bg-black/60 focus:outline-none">❮</button>
          <button onClick={handleNext} className="absolute custom-arrow-right md:right-10 top-1/2 transform -translate-y-1/2 bg-black/40 text-white rounded-full transition hover:bg-black/60 focus:outline-none">❯</button>
        </>
      )}

      {/* Bullets (configurables) */}
      {slides.config.showBullets && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Object.keys(slides)
            .filter((key) => key !== "config")
            .map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === index ? "bg-white" : "bg-gray-500"}`} />
            ))}
        </div>
      )}
    </div>
  );
}