"use client"
import { HeaderCustom } from "@/components/header-custom"
import { Button } from "@/components/ui/button"
import EditablePage from "@/components/EditablePage"
import InlineEditor from "@/components/InlineEditor"
import ImageEditor from "@/components/ImageEditor"
import Link from "next/link"

const tratamentos = [
  {
    titulo: "Emagrecimento",
    descricao: "A Ortomolecular tem um olhar clínico sobre o emagrecimento, atuando na causa do ganho de peso e promovendo o ajuste metabólico e hormonal, além de estratégias alimentares e mudanças de hábitos.",
    imagem: "/tratamento-emagrecimento.jpg",
    link: "/emagrecimento"
  },
  {
    titulo: "Prática Ortomolecular",
    descricao: "A Ortomolecular é um ramo da ciência que se dedica em restabelecer o equilíbrio do organismo, através do ajuste de níveis de substâncias naturais, como vitaminas, minerais, entre outros.",
    imagem: "/pratica-ortomolecular.jpg",
    link: "/partica-ortomolecular"
  },
  {
    titulo: "Envelhecimento Saudável",
    descricao: "Trabalhamos com medicina preventiva e tratamentos que respeitam as particularidades de cada fase da vida, promovendo longevidade com qualidade.",
    imagem: "/envelhecimento.png",
    link: "/envelhecimento-saudavel"
  },
  {
    titulo: "Modulação Hormonal",
    descricao: "Modulação Hormonal Feminina e Masculina: importante para a saúde e qualidade de vida, atuando no ajuste dos níveis hormonais para favorecer bem-estar, energia e saúde em todas as fases da vida.",
    imagem: "/modulacao.png",
    link: "/modulacao-hormonal"
  },
  {
    titulo: "Distúrbios do Sono",
    descricao: "Identificamos as causas específicas e desenvolvemos um plano personalizado para melhorar a qualidade do sono e promover o descanso adequado.",
    imagem: "/sono.png",
    link: "/disturbios-do-sono"
  },
  {
    titulo: "Estresse Físico e Emocional",
    descricao: "Identificamos as causas e desenvolvemos estratégias personalizadas para gerenciar o estresse e promover o equilíbrio físico e emocional.",
    imagem: "/estresse.png",
    link: "/estresse-fisico-emocional"
  }
]

export default function Tratamentos() {
  return (
    <EditablePage slug="tratamentos">
      {(content, handleSaveContent) => (
        <div className="min-h-screen bg-[#eaf6fd]">
          <HeaderCustom />
          <div className="flex flex-col items-center py-10 sm:py-16 w-full max-w-7xl mx-auto px-4 sm:px-8">
            <InlineEditor
              fieldId="titulo"
              initialValue={content.titulo || "Nossos Tratamentos"}
              onSave={(value) => handleSaveContent("titulo", value)}
              type="title"
              className="text-[#222B45] text-2xl sm:text-3xl font-bold mb-1 text-center"
            >
              {content.titulo || "Nossos Tratamentos"}
            </InlineEditor>
            
            <InlineEditor
              fieldId="subtitulo"
              initialValue={content.subtitulo || "MEDICINA FUNCIONAL INTEGRATIVA – Diagnóstico e Tratamento"}
              onSave={(value) => handleSaveContent("subtitulo", value)}
              className="text-[10px] sm:text-[11px] text-[#8F9BB3] mb-8 sm:mb-10 mt-1 tracking-wide font-medium uppercase text-center"
            >
              {content.subtitulo || "MEDICINA FUNCIONAL INTEGRATIVA – Diagnóstico e Tratamento"}
            </InlineEditor>
            
            <InlineEditor
              fieldId="descricao"
              initialValue={content.descricao || "Oferecemos tratamentos personalizados que combinam medicina tradicional e terapias complementares."}
              onSave={(value) => handleSaveContent("descricao", value)}
              type="textarea"
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 text-center"
            >
              {content.descricao || "Oferecemos tratamentos personalizados que combinam medicina tradicional e terapias complementares."}
            </InlineEditor>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
              {tratamentos.map((tratamento, index) => (
                <div key={index} className="relative bg-white rounded-2xl rounded-l-none border border-[#000000] shadow-[0_4px_24px_0_rgba(44,51,73,0.04)] flex flex-col items-start px-4 sm:px-6 pt-6 pb-5 w-full min-h-[420px] transition-shadow hover:shadow-lg">
                  <ImageEditor
                    fieldId={`imagemTratamento${index}`}
                    initialValue={content[`imagemTratamento${index}`] || tratamento.imagem}
                    onSave={handleSaveContent}
                    className="w-full h-44 object-cover rounded-xl mb-6"
                    alt={tratamento.titulo}
                    width={300}
                    height={300}
                  />
                  <span className="font-bold text-[15px] text-[#222B45] mb-2 uppercase tracking-tight">
                    {tratamento.titulo}
                  </span>
                  <span className="text-[13px] text-[#8F9BB3] mb-6 leading-relaxed flex-1">
                    {tratamento.descricao}
                  </span>
                  <Button asChild variant="link" className="text-[#3366FF] text-xs font-semibold mt-auto hover:underline transition-colors p-0 h-auto">
                    <Link href={tratamento.link}>Saiba Mais →</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </EditablePage>
  )
}