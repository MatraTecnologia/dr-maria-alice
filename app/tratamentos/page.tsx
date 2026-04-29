/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import TratamentosClient from "@/components/TratamentosClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tratamentos | Medicina Funcional Integrativa",
  description: "Conheça os tratamentos oferecidos pela Dra. Maria Alice: Emagrecimento, Modulação Hormonal, Prática Ortomolecular e mais.",
};

export const dynamic = 'force-dynamic';

export default async function TratamentosPage() {
  const page = await prisma.pagina.findUnique({
    where: { slug: "tratamentos" },
  });

  const content = (page?.conteudo as any) || {};

  return <TratamentosClient initialContent={content} />;
}