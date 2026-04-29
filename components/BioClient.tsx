"use client";
import { HeaderCustom } from "@/components/header-custom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Stethoscope, BookOpen } from "lucide-react";
import InlineEditor from "@/components/InlineEditor";
import ImageEditor from "@/components/ImageEditor";
import EditablePage from "@/components/EditablePage";

interface BioClientProps {
  initialContent: any;
}

export default function BioClient({ initialContent }: BioClientProps) {
  return (
    <EditablePage slug="bio" initialContent={initialContent}>
      {(content, handleSaveContent) => (
        <div className="min-h-screen mx-auto bg-gradient-to-br from-slate-50 to-blue-50">
          <section
            className="flex flex-col px-4 sm:px-8 md:px-[6%] py-6 sm:py-10 relative"
            style={{
              backgroundImage: 'url("/default-section-1.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a8ca811] to-[#3b82f611] pointer-events-none" />
            <div className="relative z-10">
              <HeaderCustom />

              {/* Hero Biography Section */}
              <div className="flex flex-col lg:flex-row gap-12 py-12">
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-3xl blur-lg opacity-40"></div>
                    <ImageEditor
                      fieldId="imagemDra"
                      initialValue={content.imagemDra || "/dra.jpg"}
                      onSave={handleSaveContent}
                      className="relative rounded-2xl object-cover border-4 border-white"
                      alt="Dra. Maria Alice"
                      width={320}
                      height={400}
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                      <Stethoscope className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:w-2/3 text-gray-700">
                  <div className="mb-8">
                    <InlineEditor
                      fieldId="titulo"
                      initialValue={content.titulo || "Dra. Maria Alice"}
                      onSave={(value) => handleSaveContent("titulo", value)}
                      type="title"
                      className="font-bold text-4xl lg:text-5xl mb-4 text-gray-800"
                    >
                      {content.titulo || "Dra. Maria Alice"}
                    </InlineEditor>

                    <InlineEditor
                      fieldId="subtitulo"
                      initialValue={
                        content.subtitulo ||
                        "Médica Especialista em Medicina Integrativa"
                      }
                      onSave={(value) => handleSaveContent("subtitulo", value)}
                      className="text-xl text-blue-600 font-semibold mb-6"
                    >
                      {content.subtitulo ||
                        "Médica Especialista em Medicina Integrativa"}
                    </InlineEditor>

                    <div className="prose prose-lg text-gray-600 leading-relaxed space-y-4">
                      <InlineEditor
                        fieldId="descricao"
                        initialValue={
                          content.descricao ||
                          "Com mais de 40 anos de dedicação à medicina, a Dra. Maria Alice construiu uma trajetória única que combina a solidez da formação médica tradicional com a visão holística da medicina integrativa."
                        }
                        onSave={(value) => handleSaveContent("descricao", value)}
                        type="textarea"
                        className="text-gray-600 leading-relaxed whitespace-break-spaces"
                      >
                        {content.descricao ||
                          "Com mais de 40 anos de dedicação à medicina, a Dra. Maria Alice construiu uma trajetória única que combina a solidez da formação médica tradicional com a visão holística da medicina integrativa."}
                      </InlineEditor>

                      <InlineEditor
                        fieldId="experiencia"
                        initialValue={
                          content.experiencia ||
                          "Formada em 1979 pela Faculdade de Medicina de Teresópolis, iniciou sua carreira como nefrologista, especializando-se no cuidado dos rins e sistema urinário. Ao longo dos anos, percebeu que o verdadeiro cuidado com a saúde vai além do tratamento de sintomas isolados."
                        }
                        onSave={(value) => handleSaveContent("experiencia", value)}
                        type="textarea"
                        className="text-gray-600 leading-relaxed"
                      >
                        {content.experiencia ||
                          "Formada em 1979 pela Faculdade de Medicina de Teresópolis, iniciou sua carreira como nefrologista, especializando-se no cuidado dos rins e sistema urinário. Ao longo dos anos, percebeu que o verdadeiro cuidado com a saúde vai além do tratamento de sintomas isolados."}
                      </InlineEditor>

                      <InlineEditor
                        fieldId="formacao"
                        initialValue={
                          content.formacao ||
                          "Esta percepção a levou a explorar a medicina integrativa, onde encontrou ferramentas para tratar o paciente como um todo - corpo, mente e espírito. Hoje, atua especialmente no tratamento de doenças e desordens metabólicas, sempre com foco na prevenção e na medicina personalizada."
                        }
                        onSave={(value) => handleSaveContent("formacao", value)}
                        type="textarea"
                        className="text-gray-600 leading-relaxed"
                      >
                        {content.formacao ||
                          "Esta percepção a levou a explorar a medicina integrativa, onde encontrou ferramentas para tratar o paciente como um todo - corpo, mente e espírito. Hoje, atua especialmente no tratamento de doenças e desordens metabólicas, sempre com foco na prevenção e na medicina personalizada."}
                      </InlineEditor>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-col justify-center items-center md:flex-row gap-4 mt-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          40+
                        </div>
                        <div className="text-sm text-gray-600">
                          Anos de Experiência
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-700 mb-1">
                          5
                        </div>
                        <div className="text-sm text-gray-600">Especializações</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-900 mb-1">
                          1979
                        </div>
                        <div className="text-sm text-gray-600">Ano de Formação</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Section */}
              <div className="py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Trajetória Profissional
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Uma jornada de constante evolução e aprendizado na medicina
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 to-blue-400"></div>

                  {(content.timeline || []).map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`flex items-center mb-12 ${
                          index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`w-1/2 ${
                            index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                          }`}
                        >
                          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-3">
                                <div
                                  className={`w-3 h-3 rounded-full bg-blue-500`}
                                ></div>
                                <Badge
                                  variant="outline"
                                  className="font-semibold text-blue-700 border-blue-200"
                                >
                                  <InlineEditor
                                    fieldId={`timeline_${index}_year`}
                                    initialValue={item.year}
                                    onSave={(value) =>
                                      handleSaveContent(
                                        `timeline_${index}_year`,
                                        value
                                      )
                                    }
                                    className="font-semibold text-blue-700"
                                  >
                                    {item.year}
                                  </InlineEditor>
                                </Badge>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                <InlineEditor
                                  fieldId={`timeline_${index}_title`}
                                  initialValue={item.title}
                                  onSave={(value) =>
                                    handleSaveContent(
                                      `timeline_${index}_title`,
                                      value
                                    )
                                  }
                                  className="text-xl font-bold text-gray-800"
                                >
                                  {item.title}
                                </InlineEditor>
                              </h3>
                              <div className="text-gray-600">
                                <InlineEditor
                                  fieldId={`timeline_${index}_description`}
                                  initialValue={item.description}
                                  onSave={(value) =>
                                    handleSaveContent(
                                      `timeline_${index}_description`,
                                      value
                                    )
                                  }
                                  type="textarea"
                                  className="text-gray-600"
                                >
                                  {item.description}
                                </InlineEditor>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <div className="relative z-10">
                          <div
                            className={`w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg`}
                          >
                            <GraduationCap className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        <div className="w-1/2"></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Formação & Especializações
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Um currículo extenso que reflete o compromisso com a excelência
                    e atualização constante
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {(content.certifications || []).map((cert: any, index: number) => {
                    return (
                      <Card
                        key={index}
                        className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <Badge
                                variant="secondary"
                                className="mb-2 text-xs bg-blue-100 text-blue-800"
                              >
                                <InlineEditor
                                  fieldId={`certifications_${index}_category`}
                                  initialValue={cert.category}
                                  onSave={(value) =>
                                    handleSaveContent(
                                      `certifications_${index}_category`,
                                      value
                                    )
                                  }
                                  className="text-xs bg-blue-100 text-blue-800"
                                >
                                  {cert.category}
                                </InlineEditor>
                              </Badge>
                              <div className="text-sm text-gray-700 leading-relaxed">
                                <InlineEditor
                                  fieldId={`certifications_${index}_title`}
                                  initialValue={cert.title}
                                  onSave={(value) =>
                                    handleSaveContent(
                                      `certifications_${index}_title`,
                                      value
                                    )
                                  }
                                  type="textarea"
                                  className="text-sm text-gray-700 leading-relaxed"
                                >
                                  {cert.title}
                                </InlineEditor>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Philosophy Section */}
              <div className="py-16">
                <Card className="bg-gradient-to-r from-blue-600 to-blue-800 border-0 text-white shadow-2xl">
                  <CardContent className="p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-6">
                      Filosofia de Trabalho
                    </h2>
                    <blockquote className="text-xl italic leading-relaxed max-w-4xl mx-auto">
                      <InlineEditor
                        fieldId="filosofia"
                        initialValue={
                          content.filosofia ||
                          "Acredito que cada paciente é único e merece um tratamento personalizado que considere não apenas os sintomas, mas toda a complexidade do ser humano. A medicina integrativa me permite oferecer o melhor de ambos os mundos: a precisão da medicina tradicional aliada à sabedoria das terapias complementares."
                        }
                        onSave={(value) => handleSaveContent("filosofia", value)}
                        type="textarea"
                        className="text-xl italic leading-relaxed"
                      >
                        {content.filosofia ||
                          "Acredito que cada paciente é único e merece um tratamento personalizado que considere não apenas os sintomas, mas toda a complexidade do ser humano. A medicina integrativa me permite oferecer o melhor de ambos os mundos: a precisão da medicina tradicional aliada à sabedoria das terapias complementares."}
                      </InlineEditor>
                    </blockquote>
                    <div className="mt-6 text-lg opacity-90">
                      — Dra. Maria Alice
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      )}
    </EditablePage>
  );
}
