import type { Product, Locale } from "../types";
import { CONTACT, SITE_URL } from "../data/constants";

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PetStore",
    name: "PET+",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua dos Pets, 123",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "04567-000",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [CONTACT.social.instagram, CONTACT.social.facebook, CONTACT.social.tiktok],
  };
}

export function buildProductSchema(product: Product, locale: Locale) {
  const price = product.salePrice ?? product.price;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.shortDescription[locale],
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: product.reviewsCount
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewsCount,
        }
      : undefined,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/loja/${product.slug}`,
      priceCurrency: "BRL",
      price: price.toFixed(2),
      availability:
        product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}
