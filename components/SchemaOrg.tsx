import React from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SchemaOrgProps {
  type?: 'Physician' | 'MedicalClinic' | 'LocalBusiness';
  data?: Record<string, any>;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({ type = 'Physician', data }) => {
  const defaultData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": "Dra. Maria Alice Fernandes de Miranda",
    "image": "https://dramariaalice.com/dra.jpg",
    "url": "https://dramariaalice.com",
    "telephone": "+5511999999999", // Placeholder
    "medicalSpecialty": "Medicina Integrativa",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Exemplo, 123", // Placeholder
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "02011-000", // Placeholder
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.5015, // Placeholder for Santana, SP
      "longitude": -46.6234
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/dramariaalice", // Placeholder
      "https://www.facebook.com/dramariaalice" // Placeholder
    ]
  };

  const schemaData = data || defaultData;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaOrg;
