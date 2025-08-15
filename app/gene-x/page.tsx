"use client";
import EditablePage from "../../components/EditablePage";
import { HeaderCustom } from "@/components/header-custom";
import ImageEditor from "@/components/ImageEditor";
import InlineEditor from "@/components/InlineEditor";
import { Button } from "@/components/ui/button";

export default function GeneX() {
  return (
    <EditablePage slug="gene-x">
      {(content, handleSaveContent) => (
        <div className="min-h-screen bg-[#eaf6fd]">
          <HeaderCustom />
          <section className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[12%] py-8 md:py-12 items-center">
            <div className="w-full md:w-[45%] flex flex-col items-start">
              <ImageEditor
                fieldId="imagemGeneX"
                initialValue={content.imagemGeneX || "/geneX.png"}
                onSave={handleSaveContent}
                className="rounded-xl object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                alt="Gene X"
                width={200}
                height={200}
              />
            </div>
            <div className="w-full md:w-[55%] flex flex-col mt-8 md:mt-0">
              <InlineEditor
                fieldId="titulo"
                initialValue={content.titulo || "Kit de coleta Gene X"}
                onSave={(value) => handleSaveContent("titulo", value)}
                type="title"
                className="text-2xl md:text-3xl font-bold text-[#222B45] mb-4"
              >
                {content.titulo || "Kit de coleta Gene X"}
              </InlineEditor>

              <InlineEditor
                fieldId="subtitulo"
                initialValue={content.subtitulo || ""}
                onSave={(value) => handleSaveContent("subtitulo", value)}
                className="text-lg text-blue-600 mb-4"
              >
                {content.subtitulo || ""}
              </InlineEditor>

              <InlineEditor
                fieldId="descricao"
                initialValue={
                  content.descricao ||
                  "Este kit é utilizado para a realização de uma variedade de exames que permitem detectar a predisposição a doenças e a adoção de ações preventivas. Através de uma análise abrangente, identificamos as predisposições genéticas ao Câncer, além de avaliar fatores farmacogenéticos, distúrbios neurológicos e genéticos, como Parkinson e outros, oferecendo informações fundamentais para um acompanhamento eficaz e estratégias de prevenção mais diretas. Cada exame é único e realizado separadamente, veja a lista completa a seguir."
                }
                onSave={(value) => handleSaveContent("descricao", value)}
                type="textarea"
                className="text-base text-[#222B45] mb-6 leading-relaxed whitespace-break-spaces"
              >
                {content.descricao ||
                  "Este kit é utilizado para a realização de uma variedade de exames que permitem detectar a predisposição a doenças e a adoção de ações preventivas. Através de uma análise abrangente, identificamos as predisposições genéticas ao Câncer, além de avaliar fatores farmacogenéticos, distúrbios neurológicos e genéticos, como Parkinson e outros, oferecendo informações fundamentais para um acompanhamento eficaz e estratégias de prevenção mais diretas. Cada exame é único e realizado separadamente, veja a lista completa a seguir."}
              </InlineEditor>

              <Button
                asChild
                className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-light px-6 py-3 mt-2"
              >
                <a href="/contato">AGENDE UMA CONSULTA</a>
              </Button>
            </div>
          </section>
        </div>
      )}
    </EditablePage>
  );
}
