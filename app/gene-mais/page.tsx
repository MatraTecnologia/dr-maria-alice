"use client";
import { HeaderCustom } from "@/components/header-custom";
import EditablePage from "../../components/EditablePage";
import ImageEditor from "@/components/ImageEditor";
import InlineEditor from "@/components/InlineEditor";
import { Button } from "@/components/ui/button";

export default function GeneMais() {
  return (
    <EditablePage slug="gene-mais">
      {(content, handleSaveContent) => (
        <div className="min-h-screen bg-[#eaf6fd]">
          <HeaderCustom />
          <section className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[12%] py-8 md:py-12 items-center">
            <div className="w-full md:w-[45%] flex flex-col items-start">
              <ImageEditor
                fieldId="imagemGeneMais"
                initialValue={content.imagemGeneMais || "/gene+.png"}
                onSave={handleSaveContent}
                className="rounded-xl object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                alt="Gene Mais"
                width={200}
                height={200}
              />
            </div>
            <div className="w-full md:w-[55%] flex flex-col mt-8 md:mt-0">
              <InlineEditor
                fieldId="titulo"
                initialValue={content.titulo || "Kit de Coleta Gene +"}
                onSave={(value) => handleSaveContent("titulo", value)}
                type="title"
                className="text-2xl md:text-3xl font-bold text-[#222B45] mb-4"
              >
                {content.titulo || "Kit de Coleta Gene +"}
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
                  "O Kit Gene + oferece uma análise genética detalhada para orientar escolhas de saúde personalizadas com foco em prevenção e bem-estar. Avaliando desde perfis metabólicos e riscos cardíacos até sensibilidades alimentares e predisposições genéticas, o exame fornece informações essenciais para adaptar cuidados de saúde às suas necessidades genéticas. Cada exame é único e realizado separadamente, veja a lista completa a seguir."
                }
                onSave={(value) => handleSaveContent("descricao", value)}
                type="textarea"
                className="text-base text-[#222B45] mb-6 leading-relaxed whitespace-break-spaces"
              >
                {content.descricao ||
                  "O Kit Gene + oferece uma análise genética detalhada para orientar escolhas de saúde personalizadas com foco em prevenção e bem-estar. Avaliando desde perfis metabólicos e riscos cardíacos até sensibilidades alimentares e predisposições genéticas, o exame fornece informações essenciais para adaptar cuidados de saúde às suas necessidades genéticas. Cada exame é único e realizado separadamente, veja a lista completa a seguir."}
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
