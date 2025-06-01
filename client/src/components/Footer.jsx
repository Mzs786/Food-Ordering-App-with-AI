import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Configuration for reusable sections
  const footerLinks = {
    usefulLinks: [
      { label: "About us", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Blogs", href: "/blog" },
      { label: "FAQ", href: "/faq" }
    ],
    mainMenu: [
      { label: "Home", href: "/" },
      { label: "Offers", href: "/offers" },
      { label: "Menus", href: "/menu" },
      { label: "Reservation", href: "/reservation" }
    ],
    socialMedia: [
      {
        name: "Twitter",
        href: "https://twitter.com",
        icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
      },
      {
        name: "YouTube",
        href: "https://youtube.com",
        icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
      },
      {
        name: "Facebook",
        href: "https://facebook.com",
        icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
      }
    ]
  };

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 xl:px-24 py-10">
        <div className="footer text-base-content">
          {/* Brand Section */}
          <section className="space-y-4">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-24 w-24"
              loading="lazy"
            />
            <p className="text-gray-600 max-w-xs">
              Savor the artistry where every dish is a culinary masterpiece
            </p>
          </section>

          {/* Useful Links */}
          <nav>
            <h2 className="footer-title text-gray-900">Useful links</h2>
            <ul className="space-y-2">
              {footerLinks.usefulLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="link link-hover text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Menu */}
          <nav>
            <h2 className="footer-title text-gray-900">Main Menu</h2>
            <ul className="space-y-2">
              {footerLinks.mainMenu.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="link link-hover text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Information */}
          <address className="not-italic">
            <h2 className="footer-title text-gray-900">Contact Us</h2>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:mdzubairsaleem7862@gmail.com" 
                  className="link link-hover text-gray-600 hover:text-primary transition-colors"
                >
                  mdzubairsaleem7862@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919582489666" 
                  className="link link-hover text-gray-600 hover:text-primary transition-colors"
                >
                  +91 958 248 9666
                </a>
              </li>
              <li className="flex gap-4 mt-4">
                {footerLinks.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    aria-label={social.name}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="fill-current"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </li>
            </ul>
          </address>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
            <p>&copy; {currentYear} All rights reserved.</p>
            <nav className="flex gap-6">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;