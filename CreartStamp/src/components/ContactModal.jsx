import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mail, X } from 'lucide-react';
import WhatsAppIcon from "../assets/img/social/whatsapp.png";

// SVG minimalista de WhatsApp; sustitúyelo si tienes otro asset
const WhatsAppIconSvg = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16.67 7.17c-.3-.15-1.76-.86-2.04-.96-.28-.1-.48-.15-.68.15-.2.3-.82.96-1 1.15-.18.2-.36.23-.66.08-.3-.15-1.22-.45-2.32-1.43-.86-.77-1.43-1.72-1.6-2-.17-.28-.02-.43.12-.58.12-.11.28-.29.42-.43.14-.14.18-.24.28-.4.1-.17.05-.32 0-.44-.05-.12-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.18-.01-.36-.01-.52-.01-.16 0-.39.02-.6.29s-.78.95-.78 2.32c0 1.36.8 2.66.91 2.85.1.2 1.6 2.44 3.87 3.34.54.23.96.37 1.29.47.54.17 1.05.15 1.45.08.44-.08 1.36-.62 1.56-1.22.18-.6.18-1.32.12-1.46-.05-.14-.21-.21-.42-.36z" />
    </svg>
);

export function ContactModal({ isOpen, onClose, productName }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            // cuando isOpen pasa a false, dejamos 200ms para la animación antes de desmontar
            const t = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // si no estuvo nunca visible, no montamos nada
    if (!visible && !isOpen) return null;

    const whatsappNumber = '56912345678';
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hola, estoy interesado en ${productName}`
    )}`;
    const mailtoLink = `mailto:tucorreo@ejemplo.com?subject=${encodeURIComponent(
        `Consulta sobre ${productName}`
    )}&body=${encodeURIComponent(`Hola,\n\nEstoy interesado en ${productName}.\n`)}`;

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
