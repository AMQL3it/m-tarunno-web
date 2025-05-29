import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = ({ navlist }) => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 font-sans select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-10">
        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-yellow-400 text-xl mb-4 font-semibold">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {navlist.map((cat) => (
              <li key={cat.id}>
                <NavLink
                  to={`/newsfeed/${cat.id}`}
                  className="text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-yellow-400 text-xl mb-4 font-semibold">
            Follow Us
          </h2>
          <table className="w-full text-white border-collapse">
            <tbody>
              <tr>
                <td className="align-left">
                  <div className="flex items-center gap-3 pb-2">
                    <FaFacebook size={20} />
                    <span>Facebook</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-left">
                  <div className="flex items-center gap-3 pb-2">
                    <FaWhatsapp size={20} />
                    <span>WhatsApp</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-left">
                  <div className="flex items-center gap-3 pb-2">
                    <FaInstagram size={20} />
                    <span>Instagram</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-left">
                  <div className="flex items-center gap-3 pb-2">
                    <FaTwitter size={20} />
                    <span>Twitter</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Contact Us */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-yellow-400 text-xl mb-4 font-semibold">
            যোগাযোগ
          </h2>
          <address className="not-italic leading-relaxed text-gray-300 text-sm flex flex-col gap-2 ">
            <span> ১৮৭/২, আরামবাগ, মতিঝিল, ঢাকা - ১০০০ </span>
            <span>প্রকাশনায়ঃ সেবক ফাউন্ডেশন</span>
            <span>
              {" "}
              Email:{" "}
              <a
                href="mailto:monthlytarunno2012@gmail.com"
                className="hover:underline"
              >
                monthlytarunno2012@gmail.com
              </a>
            </span>
            <span>
              Phone:{" "}
              <a href="tel:+8801606592273" className="hover:underline">
                +8801606592273
              </a>
            </span>
          </address>
        </div>
      </div>

      <hr className="border-gray-800 my-8" />

      <div className="text-center text-gray-400 text-sm select-text">
        &copy; 2025 AMQL3it. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
