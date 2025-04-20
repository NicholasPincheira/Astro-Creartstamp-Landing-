import React, { useEffect, useState, useRef, createRef } from 'react';
import { MessageSquare, Menu, X, ChevronRight, ChevronLeft, Home, Archive, User, Settings, Linkedin, Mail, Rss } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';
import logo from "../assets/img/logo/creartstamp.png";
import whatsappIcon from "../assets/img/social/whatsapp.png";



// Función para partir un array en trozos de 'size' elementos.
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const FacebookIcon = () => (
  <svg className="w-6 h-6 text-black svgFacebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22,12A10,10,0,1,0,10,22V15H7v-3h3V9a4,4,0,0,1,4-4h3V8H14a1,1,0,0,0-1,1v2h4l-1,3H13v7A10,10,0,0,0,22,12Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6 text-black svgInstagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7,2A5,5,0,0,0,2,7V17a5,5,0,0,0,5,5H17a5,5,0,0,0,5-5V7a5,5,0,0,0-5-5Zm0,2H17a3,3,0,0,1,3,3V17a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V7A3,3,0,0,1,7,4Zm9.5,2a1,1,0,1,0,1,1A1,1,0,0,0,16.5,6ZM12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7Zm0,2a3,3,0,1,1-3,3A3,3,0,0,1,12,9Z" />
  </svg>
);

// Datos estáticos para la navegación.
const defaultNavLinks = [
  {
    title: "Inicio",
    type: "category",
    link: "/",
  },
  {
    title: "Servicios",
    type: "category",
    link: "#servicesSection",
  },
  {
    title: "Trabajos",
    type: "category",
    link: "#Experiencies",
  },
  {
    title: "Nosotros",
    type: "category",
    link: "#aboutSection",
  },
  {
    title: "Contactanos",
    type: "category",
    link: "/contact",
  },
];

//
// Componente DesktopMegaMenu: Se renderiza solo si existen subcategorías con contenido
//
function DesktopMegaMenu({ category, isOpen, anchorRef }) {
  // Si no hay subcategorías o el array está vacío, no se renderiza
  if (!category?.subcategories || category.subcategories.length === 0) return null;

  const menuRef = useRef(null);
  const timeline = useRef(null);
  const [openDirection, setOpenDirection] = useState('right');

  useEffect(() => {
    if (!menuRef.current || !anchorRef?.current) return;
    if (isOpen) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current.offsetWidth;
      if (anchorRect.right + menuWidth > window.innerWidth) {
        setOpenDirection('left');
      } else {
        setOpenDirection('right');
      }
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (timeline.current) timeline.current.kill();
    timeline.current = gsap.timeline({ paused: true })
      .fromTo(
        menuRef.current,
        { opacity: 0, y: 20, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' }
      );
    if (isOpen) timeline.current.play();
    else timeline.current.reverse();
    return () => {
      if (timeline.current) timeline.current.kill();
    };
  }, [isOpen]);

  const dynamicStyle = {
    bottom: '100%',
    ...(openDirection === 'right' ? { left: 0 } : { right: 0 })
  };

  // Agrupamos en filas de 4 para TODAS las categorías.
  const groupedSubcategories = chunkArray(category.subcategories, 4);

  return (
    <div ref={menuRef} className={clsx("absolute bg-white/90 background-categories shadow-lg", isOpen ? "block" : "hidden")} style={dynamicStyle}>
      <div className="megaMenuContainer max-w-5xl"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${groupedSubcategories.length}, minmax(200px, 1fr))`,
          gridAutoFlow: "column-reverse"
        }}>
        {groupedSubcategories.map((group, groupIndex) => (
          <div key={groupIndex} className="flex flex-col space-y-2 min-w-[220px]">
            {group.map((subcategory, index) => (
              <div className="category-item" key={index}>
                <h3 className="text-md text-black/80 mb-2">{subcategory.title}</h3>
                {subcategory.subcategories && (
                  <ul className="space-y-2">
                    {subcategory.subcategories.map((item, idx) => (
                      <li key={idx}>
                        <a href={item.link} className="text-xs text-black/60 hover:text-black transition-colors">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

//
// Componente MobileMenu: se mantiene la estructura (navegación en niveles, scroll interno), sin usar createPortal
//
function MobileMenu({ isOpen, onClose, navLinks }) {
  const [navigationStack, setNavigationStack] = useState([{ items: navLinks, title: "Menú" }]);
  const menuRef = useRef(null);
  const timeline = useRef(null);

  useEffect(() => {
    setNavigationStack([{ items: navLinks, title: "Menú" }]);
  }, [navLinks]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (timeline.current) timeline.current.kill();
    timeline.current = gsap.timeline({ paused: true })
      .fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    if (isOpen) {
      timeline.current.play();
      document.body.style.overflow = "hidden";
    } else {
      timeline.current.reverse();
      document.body.style.overflow = "";
    }
    return () => {
      if (timeline.current) timeline.current.kill();
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navigateForward = (item) => {
    if (item.subcategories && item.subcategories.length > 0) {
      setNavigationStack(prev => [...prev, { items: item.subcategories, title: item.title }]);
    }
  };

  const navigateBack = () => {
    setNavigationStack(prev => prev.slice(0, -1));
  };

  const currentLevel = navigationStack[navigationStack.length - 1];

  if (!isOpen) return null;

  return (
    <div className={clsx("fixed inset-0 bg-black/50 z-50 transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={onClose}>
      <div ref={menuRef} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-gray-400 border-b">
          <div className="flex items-center">
            {navigationStack.length > 1 && (
              <button onClick={navigateBack} className="mr-2 p-2 hover:bg-gray-100 rounded-full">
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-xl">{currentLevel.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {currentLevel.items.map((item, index) => (
            <div key={index} className="border-gray-200 border-b">
              {item.subcategories && item.subcategories.length > 0 ? (
                <button
                  onClick={() => navigateForward(item)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <a
                  href={item.link}
                  onClick={onClose}  // Para cerrar el menú cuando se haga click
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50"
                >
                  <span>{item.title}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//
// Componente SocialMedia (sin cambios)
//
function SocialMedia({ isOpen, onClose }) {
  const socialRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(socialRef.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(socialRef.current, { opacity: 0, y: 20, scale: 0.9, duration: 0.4, ease: "power3.in" });
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div ref={socialRef} className="fixed bottom-16 left-94 transform -translate-x-1/2 flex gap-4 bg-white shadow-lg p-3 rounded-full social-media-widget">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
      <a href="https://www.instagram.com/natapiderit/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
      <a href="mailto:nataliapiderit@gmail.com"><Mail className="w-6 h-6 text-black" /></a>
      <a href="https://www.linkedin.com/in/natalia-piderit/?originalSubdomain=cl" target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-black" /></a>
    </div>
  );
}

//
// Componente Navbar principal:
// Se conserva la estructura original, pero al hacer onMouseEnter se comprueba si hay subcategorías.
// Si un item simple no tiene subcategorías o el array está vacío, no se establece openCategory y no se renderiza el megamenu.
//
export function Navbar() {
  const [navLinks] = useState(defaultNavLinks);
  const [openCategory, setOpenCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ShowSocialMedia, SetShowSocialMedia] = useState(false);
  const linkRefs = useRef([]);
  const whatsappNumber = "56979567422"; // Reemplaza con tu número sin ceros o símbolos adicionales.
  const whatsappMessage = "Hola, estoy interesado en sus productos.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  // const WhatsappIcon = () => (
  //   whatsappIcon
  // );

  return (
    <>
      <div id="PrincipalNavbar">
        {/* Desktop Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 hidden lg:block">
          <div className="desktop-navbar w-full">
            <div className="max-w-7xl desktop-navbar-container mx-auto px-6 grid grid-cols-12 py-4"
              onMouseLeave={() => setOpenCategory(null)}>
              {/* IZQUIERDA: redes sociales + logo */}
              <div className="col-span-1 flex left-nav-home">
                <div className="left-nav-home-icons">
                  <a href="https://www.instagram.com/natapiderit/" target="_blank" rel="noopener noreferrer" className="deskInstagramIcon">
                    <InstagramIcon />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="deskFacebookIcon">
                    <FacebookIcon />
                  </a>
                  <a href="mailto:nataliapiderit@gmail.com" className="deskMailIcon">
                    <Mail className="w-6 h-6 text-black svgMail" />
                  </a>
                  <a href="https://www.linkedin.com/in/natalia-piderit/?originalSubdomain=cl" target="_blank" rel="noopener noreferrer" className="deskLinkedInIcon">
                    <Linkedin className="w-6 h-6 text-black svgLinkedIn" />
                  </a>
                </div>
                <div className="left-nav-home-logo">
                  <a href="/" className="text-2xl text-black navbar-logo ml-4">
                    <img className="logo-np" src={logo.src} alt="Logo" />
                  </a>
                </div>
              </div>

              {/* DERECHA: nav-links */}
              <div className="col-span-9 justify-center right-nav-home-links flex flex-wrap items-center justify-left gap-x-4 gap-y-2">
                {navLinks.map((category, index) => {
                  if (!linkRefs.current[index]) {
                    linkRefs.current[index] = createRef();
                  }
                  return (
                    <div key={index}
                      className="relative"
                      ref={linkRefs.current[index]}
                      onMouseEnter={() => {
                        // Solo se abre el megamenu si existen subcategorías con contenido
                        if (category.subcategories && category.subcategories.length > 0) {
                          setOpenCategory(category);
                        } else {
                          setOpenCategory(null);
                        }
                      }}>
                      <a href={category.link}
                        className="text-black hover:text-black/70 transition-colors px-4 py-2 nav-link whitespace-nowrap">
                        {category.title}
                      </a>
                      <DesktopMegaMenu
                        category={category}
                        isOpen={openCategory === category}
                        anchorRef={linkRefs.current[index]}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-1 flex left-nav-home"></div>
            </div>
          </div>
        </nav>

        {/* Navbar Mobile Dock */}
        <nav className="fixed MobileDock bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
          <div className="bg-white/90 backdrop-blur-md shadow-md rounded-full px-6 py-2 flex items-center gap-2">
            <a href={whatsappLink} className="p-0 rounded-lg hover:bg-gray-100 transition">
              <img
                src={whatsappIcon.src || whatsappIcon}
                alt="WhatsApp"
                className="w-8 h-8 object-cover"
                fetchPriority="high"
              />
            </a>
            <a href="/contact" className="p-3 rounded-lg hover:bg-gray-100 transition">
              <MessageSquare className="w-6 h-6 text-black" />
            </a>
            <a href="/" className="p-3 rounded-lg hover:bg-gray-100 transition">
              <Home className="w-6 h-6 text-black" />
            </a>
            <button onClick={() => SetShowSocialMedia(prev => !prev)}
              className="p-3 rounded-lg hover:bg-gray-100 transition">
              <Rss className="w-6 h-6 text-black" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="p-3 rounded-lg hover:bg-gray-100 transition">
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>
        </nav>
      </div>

      {/* Redes sociales en mobile */}
      <SocialMedia isOpen={ShowSocialMedia} onClose={() => SetShowSocialMedia(false)} />

      {/* Mobile Menu inline */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navLinks={navLinks} />
    </>
  );
}
