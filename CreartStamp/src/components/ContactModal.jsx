import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, X } from 'lucide-react';
import WhatsAppIcon from "../assets/img/social/whatsapp.png";

export function ContactModal({ isOpen, onClose, productName, customMessage }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  const message = customMessage || `Hola, estoy interesado en ${productName}`;
  const whatsappNumber = '56912345678';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const mailtoLink = `mailto:tucorreo@ejemplo.com?subject=${encodeURIComponent(
    `Consulta sobre ${productName || "un producto"}`
  )}&body=${encodeURIComponent(message)}`;

  return createPortal(
    <div onClick={onClose} style={{ zIndex: 60 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-lg max-w-sm w-full p-6">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">Contáctame</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 hover:bg-gray-100 p-4 rounded-lg transition"
          >
            <img
              src={WhatsAppIcon.src || WhatsAppIcon}
              alt="WhatsApp"
              className="w-12 h-12 object-cover"
              fetchPriority="high"
            />
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          <a
            href={mailtoLink}
            className="flex flex-col items-center gap-2 hover:bg-gray-100 p-4 rounded-lg transition"
          >
            <Mail className="w-12 h-12 text-red-500" />
            <span className="text-sm font-medium">Email</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
