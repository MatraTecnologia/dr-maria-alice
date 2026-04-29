import { prisma } from "@/lib/prisma";
import TreatmentClient from "@/components/TreatmentClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modulação Hormonal | Tratamentos",
  description: "Ajuste e equilíbrio hormonal para homens e mulheres com foco em qualidade de vida na Clínica Dra. Maria Alice.",
};

export default async function ModulacaoHormonalPage() {
  const slug = "modulacao-hormonal";
  const page = await prisma.pagina.findUnique({
    where: { slug },
  });

  const content = (page?.conteudo as any) || {};

  return (
    <TreatmentClient
      slug={slug}
      initialContent={content}
      defaultTitle="Modulacao Hormonal"
      defaultImage="/modulacao.png"
      imageFieldId="imagemModulacao"
    />
  );
}