/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import ContactClient from "@/components/ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Agende sua Consulta",
  description: "Entre em contato com a Dra. Maria Alice em Santana, SP. Telefone, WhatsApp, e-mail e localização da clínica.",
};

export default async function ContactPage() {
  const page = await prisma.pagina.findUnique({
    where: { slug: "contato" },
  });

  const content = (page?.conteudo as any) || {};

  return <ContactClient initialContent={content} />;
}
