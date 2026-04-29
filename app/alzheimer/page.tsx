/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import TreatmentClient from "@/components/TreatmentClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alzheimer | Tratamentos",
  description: "Tratamento e suporte para Alzheimer com abordagem integrativa na Clínica Dra. Maria Alice.",
};

export const dynamic = 'force-dynamic';

export default async function AlzheimerPage() {
  const slug = "alzheimer";
  const page = await prisma.pagina.findUnique({
    where: { slug },
  });

  const content = (page?.conteudo as any) || {};

  return (
    <TreatmentClient
      slug={slug}
      initialContent={content}
      defaultTitle="Alzheimer"
      defaultImage="/alzheimer.png"
      imageFieldId="imagemAlzheimer"
    />
  );
}