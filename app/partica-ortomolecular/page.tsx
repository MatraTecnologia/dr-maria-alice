import { prisma } from "@/lib/prisma";
import TreatmentClient from "@/components/TreatmentClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prática Ortomolecular | Tratamentos",
  description: "Restabelecimento do equilíbrio orgânico através de substâncias naturais na Clínica Dra. Maria Alice.",
};

export default async function OrtomolecularPage() {
  const slug = "partica-ortomolecular";
  const page = await prisma.pagina.findUnique({
    where: { slug },
  });

  const content = (page?.conteudo as any) || {};

  return (
    <TreatmentClient
      slug={slug}
      initialContent={content}
      defaultTitle="Prática Ortomolecular"
      defaultImage="/pratica-ortomolecular.jpg"
      imageFieldId="imagemOrtomolecular"
    />
  );
}