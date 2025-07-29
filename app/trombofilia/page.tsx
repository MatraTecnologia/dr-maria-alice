"use client"
import { HeaderCustom } from "@/components/header-custom"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import EditablePage from "@/components/EditablePage"
import InlineEditor from "@/components/InlineEditor"
import ImageEditor from "@/components/ImageEditor"

export default function Trombofilia() {
    return (
        <EditablePage slug="trombofilia">
            {(content, handleSaveContent) => (
                <div className="min-h-screen bg-[#eaf6fd]">
                    <HeaderCustom />
                    <section className="flex flex-col md:flex-row gap-8 md:gap-10 px-4 md:px-[12%] py-8 md:py-12 items-center">
                        <div className="w-full md:w-[45%] flex flex-col items-start">
                            <ImageEditor
                                fieldId="imagemTrombofilia"
                                initialValue={content.imagemTrombofilia || "/trombofilia.png"}
                                onSave={handleSaveContent}
                                className="rounded-xl object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                                alt="Trombofilia"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="w-full md:w-[55%] flex flex-col mt-8 md:mt-0">
                            <InlineEditor
                                fieldId="titulo"
                                initialValue={content.titulo || "Trombofilia"}
                                onSave={(value) => handleSaveContent("titulo", value)}
                                type="title"
                                className="text-2xl md:text-3xl font-bold text-[#222B45] mb-4"
                            >
                                {content.titulo || "Trombofilia"}
                            </InlineEditor>
                            <InlineEditor
                                fieldId="descricao"
                                initialValue={content.descricao || "Trombofilia é uma predisposição a trombose, que pode ser causada por fatores hereditários ou adquiridos. Pessoas que possuem trombofilia hereditária apresentam risco aumentado de ter algum quadro trombótico, geralmente antes dos 45 anos de idade. A trombofilia hereditária está relacionada com até 37% dos casos de Trombose Venosa Profunda (TVP).\n\nPessoas que possuem as mutações nos genes apresentam risco aumentado de sofrer tromboembolismo durante uma cirurgia ou o uso de algum medicamento, como anticoncepcionais."}
                                onSave={(value) => handleSaveContent("descricao", value)}
                                type="textarea"
                                className="text-base text-[#222B45] mb-6 leading-relaxed"
                            >
                                {content.descricao || "Trombofilia é uma predisposição a trombose, que pode ser causada por fatores hereditários ou adquiridos. Pessoas que possuem trombofilia hereditária apresentam risco aumentado de ter algum quadro trombótico, geralmente antes dos 45 anos de idade. A trombofilia hereditária está relacionada com até 37% dos casos de Trombose Venosa Profunda (TVP).\n\nPessoas que possuem as mutações nos genes apresentam risco aumentado de sofrer tromboembolismo durante uma cirurgia ou o uso de algum medicamento, como anticoncepcionais."}
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