import { Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-warm-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Logo & Social */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl text-warm-gray-800 mb-6">
              CreartStamp
            </h3>
            <div className="flex items-center justify-center md:justify-start space-x-6">
              <a href="#" className="text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <nav className="space-y-4">
              <a href="#" className="block text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                Collections
              </a>
              <a href="#" className="block text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                Workshops
              </a>
              <a href="#" className="block text-warm-gray-600 hover:text-warm-gray-800 transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-warm-gray-600 mb-2">Contact us</p>
            <a href="mailto:contact@CreartStamp.com" className="text-warm-gray-800 hover:text-warm-gray-600 transition-colors">
              contact@CreartStamp.com
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-gray-100 text-center">
          <p className="text-warm-gray-500 text-sm">
            © {new Date().getFullYear()} CreartStamp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}