import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL } from "../../data/constants";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  schema?: object | object[];
  noIndex?: boolean;
}

export function Seo({ title, description, image, schema, noIndex }: SeoProps) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;
  const fullTitle = `${title} | PET+`;
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
