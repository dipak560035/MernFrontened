// export default function Footer() {
//   return (
//     <footer className="mt-24 border-t border-neutral-200 bg-white">
//       <div className="mx-auto max-w-7xl px-6 py-12">
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
//           <div>
//             <h4 className="mb-3 text-sm font-semibold">Meubel House</h4>
//             <p className="text-sm text-neutral-600">
//               400 University Drive Suite 200 Coral Gables, FL 33134 USA
//             </p>
//           </div>
//           <div>
//             <h4 className="mb-3 text-sm font-semibold">Links</h4>
//             <ul className="space-y-2 text-sm text-neutral-600">
//               <li>Home</li>
//               <li>Shop</li>
//               <li>About</li>
//               <li>Contact</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="mb-3 text-sm font-semibold">Help</h4>
//             <ul className="space-y-2 text-sm text-neutral-600">
//               <li>Payment Options</li>
//               <li>Returns</li>
//               <li>Privacy Policies</li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="mb-3 text-sm font-semibold">Newsletter</h4>
//             <div className="flex gap-2">
//               <input
//                 className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
//                 placeholder="Enter Your Email Address"
//               />
//               <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm">
//                 SUBSCRIBE
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600">
//           2022 Meubel House. All rights reserved
//         </div>
//       </div>
//     </footer>
//   );
// }























import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold">HEAVEN CRAFT</h3>
            <p className="text-sm text-neutral-600 leading-6">
              Premium handcrafted furniture designed for modern homes.
              We bring comfort, elegance, and quality together.
            </p>
            <p className="mt-4 text-sm text-neutral-600">
              Kathmandu, Nepal
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link to="/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-neutral-600">
              Subscribe to get special offers and updates.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-l-md px-3 py-2 text-sm text-black outline-none"
              />
              <button className="rounded-r-md bg-white px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-200 transition">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex justify-center md:justify-start gap-4 text-lg">

  {/* Facebook */}
  <a
    href="https://www.facebook.com/deepak.shah.234736"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="HeavenCraft Facebook"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transition hover:scale-110 hover:shadow-lg"
  >
    <FaFacebookF />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/iamdeepaksha/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="HeavenCraft Instagram"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white shadow-md transition hover:scale-110 hover:shadow-lg"
  >
    <FaInstagram />
  </a>

  {/* Twitter / X */}
  <a
    href="https://twitter.com/heavencraft"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="HeavenCraft Twitter"
    className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:scale-110 hover:shadow-lg"
  >
    <FaTwitter />
  </a>

</div>


          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-neutral-600 pt-6 md:flex-row">
          <p className="text-sm text-neutral-500 text-center md:text-left">
            © {year} HeavenCraft. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-3xl">

  {/* Visa */}
  <FaCcVisa className="text-[#1A1F71] hover:scale-110 transition" />

  {/* Mastercard */}
  <FaCcMastercard className="text-[#EB001B] hover:scale-110 transition" />

  {/* PayPal */}
  <FaCcPaypal className="text-[#003087] hover:scale-110 transition" />

</div>

        </div>

      </div>
    </footer>
  );
}
