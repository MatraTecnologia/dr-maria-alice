"use client";
import { HeaderCustom } from "@/components/header-custom";
import EditablePage from "../../components/EditablePage";
import ImageEditor from "@/components/ImageEditor";
import InlineEditor from "@/components/InlineEditor";
import { Button } from "@/components/ui/button";

export default function HormonalSalivar() {
  return (
    <EditablePage slug="hormonal-salivar">
      {(content, handleSaveContent) => (
        <div className="min-h-screen bg-[#eaf6fd]">
          <HeaderCustom />
          <section className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[12%] py-8 md:py-12 items-center">
            <div className="w-full md:w-[45%] flex flex-col items-start">
              <ImageEditor
                fieldId="imagemHormonalSalivar"
                initialValue={
                  content.imagemHormonalSalivar || "/hormonal-salivar.jpeg"
                }
                onSave={handleSaveContent}
                className="rounded-xl object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                alt="Hormonal Salivar"
                width={200}
                height={200}
              />
            </div>
            <div className="w-full md:w-[55%] flex flex-col mt-8 md:mt-0">
              <InlineEditor
                fieldId="titulo"
                initialValue={content.titulo || "Dosagem Hormonal na Saliva"}
                onSave={(value) => handleSaveContent("titulo", value)}
                type="title"
                className="text-2xl md:text-3xl font-bold text-[#222B45] mb-4"
              >
                {content.titulo || "Dosagem Hormonal na Saliva"}
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
                  'O Exame Hormonal na Saliva oferece a precisão necessária para a mensuração de vários hormônios no diagnóstico e estudos científicos. Vários estudos demonstram uma forte correlação entre os níveis de hormônio esteroides no sangue e na saliva (hormônio ativo ou "bio disponível"). Porém o teste salivar é o meio ideal para diagnosticar os níveis de hormônios esteróides, bio disponíveis ativos no tecido. Além disso, os hormônios na saliva são excepcionalmente estáveis e podem ser armazenados em temperatura ambiente por até 20 dias sem afetar a precisão do resultado. Isto oferece máxima flexibilidade na coleta de amostras e envio.'
                }
                onSave={(value) => handleSaveContent("descricao", value)}
                type="textarea"
                className="text-base text-[#222B45] mb-6 leading-relaxed whitespace-break-spaces"
              >
                {content.descricao ||
                  'O Exame Hormonal na Saliva oferece a precisão necessária para a mensuração de vários hormônios no diagnóstico e estudos científicos. Vários estudos demonstram uma forte correlação entre os níveis de hormônio esteroides no sangue e na saliva (hormônio ativo ou "bio disponível"). Porém o teste salivar é o meio ideal para diagnosticar os níveis de hormônios esteróides, bio disponíveis ativos no tecido. Além disso, os hormônios na saliva são excepcionalmente estáveis e podem ser armazenados em temperatura ambiente por até 20 dias sem afetar a precisão do resultado. Isto oferece máxima flexibilidade na coleta de amostras e envio.'}
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
