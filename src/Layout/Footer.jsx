import React from "react";
import {
  Edit3,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "#templates" },
    ],
    company: [
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "Testimonials", href: "#testimonials" },
    ],
    resources: [
      { name: "Blog", href: "#blog" },
      { name: "Docs", href: "#docs" },
      { name: "Article", href: "#article" },
    ],
    legal: [
      { name: "Privacy", href: "#privacy" },
      { name: "Terms", href: "#terms" },
      { name: "Cookies", href: "#cookies" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-3">
                <Edit3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">BlogCraft</span>
            </div>
            <p className="text-gray-400 mb-4">
              Build, grow, and monetize your content with ease.
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@blogcraft.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+92 312 716 7837</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Sialkot, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Footer Links – hidden on mobile */}
          <div className="hidden md:grid md:col-span-3 grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold mb-3 capitalize">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <div className="flex flex-col sm:flex-row max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 mb-3 sm:mb-0 sm:mr-2 bg-gray-800 border border-gray-700 rounded focus:outline-none text-white"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} BlogCraft
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-white hover:scale-110 transition"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
