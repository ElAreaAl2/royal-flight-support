import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://royalflightsupport.com';

type SEOProps = {
  /** Título completo de la página (ya traducido vía t()) */
  title: string;
  description: string;
  keywords?: string;
  /** Ruta EN (sin dominio). '' para home, '/permits', '/trip-support' */
  path?: string;
  /** Ruta de la imagen OG relativa al dominio */
  image?: string;
  type?: string;
  jsonLd?: object | object[];
};

/**
 * Meta tags de SEO: title, description, canonical, hreflang (en/es/x-default),
 * Open Graph, Twitter Cards y JSON-LD estructurado.
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  path = '',
  image = '/images/og-image.jpg',
  type = 'website',
  jsonLd,
}) => {
  const router = useRouter();
  const locale = router.locale ?? 'en';
  const cleanPath = path === '/' ? '' : path;

  const enUrl = `${SITE_URL}${cleanPath}`;
  const esUrl = `${SITE_URL}/es${cleanPath}`;
  const canonical = locale === 'es' ? esUrl : enUrl;
  const imageUrl = `${SITE_URL}${image}`;

  const docs = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const serialize = (doc: object) => JSON.stringify(doc).replace(/</g, '\\u003c');

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="author" content="Royal Flight Support" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* Iconos / app */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#000000" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Royal Flight Support" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Royal Flight Support – FBO, trip support y charter en Latinoamérica"
      />
      <meta property="og:locale" content={locale === 'es' ? 'es_ES' : 'en_US'} />
      <meta property="og:locale:alternate" content={locale === 'es' ? 'en_US' : 'es_ES'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD */}
      {docs.map((doc, i) => (
        <script
          key={`ld-json-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serialize(doc) }}
        />
      ))}
    </Head>
  );
};

export default SEO;
export { SITE_URL };
