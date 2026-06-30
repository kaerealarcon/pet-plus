export const WHATSAPP_NUMBER = "5511912345678";

export const SITE_URL = "https://petplus.example.com";

export const CONTACT = {
  email: "ola@petplus.com.br",
  phone: "+55 (11) 91234-5678",
  address: "Rua dos Pets, 123 — Jardim Primavera, São Paulo — SP, 04567-000",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=Avenida+Paulista,+S%C3%A3o+Paulo&output=embed",
  social: {
    instagram: "https://instagram.com/petplus",
    facebook: "https://facebook.com/petplus",
    tiktok: "https://tiktok.com/@petplus",
  },
};

export const buildWhatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
