import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../../assets/logo/logo-white.svg";
import { Typography } from "@/components/ui/Typography";

const links = {
  navigation: [
    { id: 1, name: "Beranda", path: "/" },
    { id: 2, name: "Statistik", path: "/statistik" },
    { id: 3, name: "Prediksi", path: "/prediksi" },
    { id: 4, name: "Produk", path: "/produk" },
  ],
  social: [
    { id: 1, name: "Discord", url: "https://discord.com/" },
    { id: 2, name: "Instagram", url: "https://www.instagram.com/" },
    { id: 3, name: "Twitter", url: "https://x.com/" },
    { id: 4, name: "Facebook", url: "https://www.facebook.com/" },
  ],
};

const Footer = () => (
  <footer className="w-full bg-emerald-600 flex flex-col items-center justify-between p-6 sm:p-8 md:p-12 lg:px-[71px] mt-16">
    <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-10">
      <div className="flex flex-col items-start gap-4 w-full lg:w-1/4">
        <img src={LogoWhite} alt="GreenLify" className="h-16 lg:h-24 object-cover" />
        <Typography variant="blockquote" className="text-background">
          Transformasikan sampah menjadi manfaat yang berkelanjutan untuk lingkungan dan masyarakat Indonesia.
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row w-full lg:w-1/2 justify-between gap-8 md:gap-[80px] lg:gap-[160px]">
        <div className="flex flex-col gap-4 lg:gap-5 w-full md:w-1/3">
          <Typography variant="h4" className="text-background">Navigation</Typography>
          {links.navigation.map(link => (
            <Link key={link.id} to={link.path}>
              <Typography variant="p" className="text-background text-sm lg:text-base hover:text-sky-50 transition-colors">
                {link.name}
              </Typography>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:gap-5 w-full md:w-1/3">
          <Typography variant="h4" className="text-background">Community</Typography>
          <Link to="/tentangkami">
            <Typography variant="p" className="text-background text-sm lg:text-base hover:text-sky-50 transition-colors">
              Tentang Kami
            </Typography>
          </Link>
        </div>
        <div className="flex flex-col gap-4 lg:gap-5 w-full md:w-1/3">
          <Typography variant="h4" className="text-background">Socials</Typography>
          {links.social.map(link => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
              <Typography variant="p" className="text-background text-sm lg:text-base hover:text-sky-50 transition-colors">
                {link.name}
              </Typography>
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="w-full border-t-2 border-white my-6 lg:my-8" />
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <Typography variant="p-semibold" className="text-background text-sm lg:text-base font-medium text-center md:text-left">
        ©2024 ErsTalent - Hak cipta dilindungi undang-undang
      </Typography>
      <div className="flex gap-4">
        <Link to="/privacy+policy">
          <Typography variant="p-semibold" className="text-background text-sm lg:text-base hover:text-slate-50 transition-colors">
            Privasi & Kebijakan
          </Typography>
        </Link>
        <Link to="/terms+conditions">
          <Typography variant="p-semibold" className="text-background text-sm lg:text-base hover:text-slate-50 transition-colors">
            Syarat & Ketentuan
          </Typography>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;