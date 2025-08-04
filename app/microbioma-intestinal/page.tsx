"use client"
import { HeaderCustom } from "@/components/header-custom"
import { Button } from "@/components/ui/button"
import EditablePage from "@/components/EditablePage"
import InlineEditor from "@/components/InlineEditor"
import ImageEditor from "@/components/ImageEditor"

export default function MicrobiomaIntestinal() {
  return (
    <EditablePage slug="microbioma-intestinal">
      {(content, handleSaveContent) => (
        <div className="min-h-screen bg-[#eaf6fd]">
          <HeaderCustom />
          <section className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[12%] py-8 md:py-12 items-center">
            <div className="w-full md:w-[45%] flex flex-col items-start">
              <ImageEditor
                fieldId="imagemMicrobioma"
                initialValue={content.imagemMicrobioma || "/microbioma-intestinal.png"}
                onSave={handleSaveContent}
                className="rounded-xl object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                alt="Microbioma Intestinal"
                width={200}
                height={200}
              />
            </div>
            <div className="w-full md:w-[55%] flex flex-col mt-8 md:mt-0">
              <InlineEditor
                fieldId="titulo"
                initialValue={content.titulo || "Microbioma Intestinal"}
                onSave={(value) => handleSaveContent("titulo", value)}
                type="title"
                className="text-2xl md:text-3xl font-bold text-[#222B45] mb-4"
              >
                {content.titulo || "Microbioma Intestinal"}
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
                initialValue={content.descricao || ""}
                onSave={(value) => handleSaveContent("descricao", value)}
                type="textarea"
                className="text-base text-[#222B45] mb-6 leading-relaxed whitespace-break-spaces"
              >
                {content.descricao || ""}
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
  )
}