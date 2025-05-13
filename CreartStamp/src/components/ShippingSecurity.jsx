// components/ShippingSecurity.jsx
import { useEffect, useRef } from "react";
import { Truck, CreditCard } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import background from "../assets/background.svg";

export function ShippingSecurity() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-w-(58%) mx-auto my-40 rounded-xl text-center px-8 py-12 overflow-visible">
        <img id="cardBackground" src={background.src} alt="" fetchPriority="high" /> 
      <div className="mb-12">
        <Truck className="mx-auto mb-4 w-30 h-30 text-pink-900" />
        <h2 className="text-4xl font-bold font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">Envios</h2>
        <p className="mt-2 text-xl text-base leading-relaxed font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">
          Los más rápidos imprimiendo poleras: Envío express en Santiago y priority en regiones vía Bluexpress
        </p>
      </div>

      <div className="mb-30">
        <CreditCard className="mx-auto mb-4 w-30 h-30  text-pink-900" />
        <h2 className="text-4xl font-bold font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">Pago seguro</h2>
        <p className="mt-2 text-xl text-base leading-relaxed font-extrabold bg-gradient-to-bl from-rose-200 to-pink-900 bg-clip-text text-transparent leading-tight">
          Vía Webpay, Khipu, Paypal o transferencia
        </p>
      </div>
    </div>
  );
}
