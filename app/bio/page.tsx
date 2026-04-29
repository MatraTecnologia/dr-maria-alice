/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import BioClient from "@/components/BioClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biografia | Dra. Maria Alice Fernandes de Miranda",
  description: "Saiba mais sobre a trajetória da Dra. Maria Alice, nefrologista com mais de 40 anos de experiência e especialista em Medicina Integrativa.",
};

export const dynamic = 'force-dynamic';

export default async function BiografiaDra() {
  const page = await prisma.pagina.findUnique({
    where: { slug: "bio" },
  });

  const content = (page?.conteudo as any) || {};

  return <BioClient initialContent={content} />;
}
