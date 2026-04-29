/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início | Dra. Maria Alice Fernandes de Miranda",
  description: "Conheça a clínica da Dra. Maria Alice em Santana, SP. Focada em Medicina Integrativa e Longevidade Saudável.",
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const page = await prisma.pagina.findUnique({
    where: { slug: "home" },
  });

  const content = (page?.conteudo as any) || {};

  return <HomeClient initialContent={content} />;
}
