/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import TreatmentClient from "@/components/TreatmentClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emagrecimento | Tratamentos",
  description: "Tratamento de emagrecimento com foco no equilíbrio metabólico e hormonal na Clínica Dra. Maria Alice.",
};

export const dynamic = 'force-dynamic';

export default async function EmagrecimentoPage() {
  const slug = "emagrecimento";
  const page = await prisma.pagina.findUnique({
    where: { slug },
  });

  const content = (page?.conteudo as any) || {};

  return (
    <TreatmentClient
      slug={slug}
      initialContent={content}
      defaultTitle="Emagrecimento"
      defaultImage="/pagina-emagrecimento-image.png"
      imageFieldId="imagemEmagrecimento"
    />
  );
}