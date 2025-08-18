"use client";
import { HeaderCustom } from "@/components/header-custom";
import { MapPin, Phone, Clock, Navigation, MessageCircle } from "lucide-react";
import EditablePage from "@/components/EditablePage";
import InlineEditor from "@/components/InlineEditor";
import { useState, useEffect } from "react";

interface Configuracoes {
  telefone: string;
  link_agendamento: string;
  link_whatsapp: string;
  link_mapa: string;
  endereco_mapa: string;
}

const Contact = () => {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>({
    telefone: "+5521999999999",
    link_agendamento: "/contato",
    link_whatsapp:
      "https://wa.me/5511993049032?text=Olá! Gostaria de agendar um atendimento.",
    link_mapa:
      "https://www.google.com/maps?q=R.+Voluntários+da+Pátria,+3744+-+Santana,+São+Paulo+-+SP,+02402-400&output=embed",
    endereco_mapa:
      "R. Voluntários da Pátria, 3744 - Santana, São Paulo - SP, 02402-400",
  });

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const response = await fetch("/api/configuracoes");
        if (response.ok) {
          const data = await response.json();
          setConfiguracoes(data);
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    carregarConfiguracoes();
  }, []);

  const handleDirections = () => {
    // const encodedAddress = encodeURIComponent(configuracoes.endereco_mapa);
    window.open(`${configuracoes.link_mapa}`, "_blank");
  };

  return (
    <EditablePage slug="contato">
      {(content, handleSaveContent) => (
        <div className="min-h-screen mx-auto">
          <section
            className="flex flex-col px-4 sm:px-8 md:px-[6%] py-6 sm:py-10 relative"
            style={{
              backgroundImage: 'url("/default-section-1.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-green-50/80 pointer-events-none" />
            <div className="relative z-10">
              <HeaderCustom />

              {/* Hero Section */}
              <div className="text-center mb-8 mt-6 sm:mt-10">
                <InlineEditor
                  fieldId="titulo"
                  initialValue={content.titulo || "Entre em Contato"}
                  onSave={(value) => handleSaveContent("titulo", value)}
                  type="title"
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4"
                >
                  {content.titulo || "Entre em Contato"}
                </InlineEditor>
                <br />

                <InlineEditor
                  fieldId="subtitulo"
                  initialValue={content.subtitulo || "Agende sua consulta"}
                  onSave={(value) => handleSaveContent("subtitulo", value)}
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                >
                  {content.subtitulo || "Agende sua consulta"}
                </InlineEditor>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Info and Booking */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <InlineEditor
                        fieldId="nomeMedica"
                        initialValue={content.nomeMedica || "Dra. Maria Alice"}
                        onSave={(value) =>
                          handleSaveContent("nomeMedica", value)
                        }
                        className="text-xl font-bold text-gray-800"
                      >
                        {content.nomeMedica || "Dra. Maria Alice"}
                      </InlineEditor>
                      <br />
                      <InlineEditor
                        fieldId="especialidade"
                        initialValue={
                          content.especialidade || "Medicina Integrativa"
                        }
                        onSave={(value) =>
                          handleSaveContent("especialidade", value)
                        }
                        className="text-blue-600 font-medium text-sm"
                      >
                        {content.especialidade || "Medicina Integrativa"}
                      </InlineEditor>
                    </div>
                  </div>

                  <InlineEditor
                    fieldId="descricaoClinica"
                    initialValue={
                      content.descricaoClinica ||
                      "A Clínica Dra. Maria Alice Fernandes de Miranda busca através da Medicina Integrativa oferecer saúde e bem-estar aos pacientes, utilizando recursos eficazes para o diagnóstico e tratamentos."
                    }
                    onSave={(value) =>
                      handleSaveContent("descricaoClinica", value)
                    }
                    type="textarea"
                    className="text-gray-600 mb-6 leading-relaxed text-sm"
                  >
                    {content.descricaoClinica ||
                      "A Clínica Dra. Maria Alice Fernandes de Miranda busca através da Medicina Integrativa oferecer saúde e bem-estar aos pacientes, utilizando recursos eficazes para o diagnóstico e tratamentos."}
                  </InlineEditor>

                  {/* WhatsApp Button */}
                  <a
                    href={configuracoes.link_whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Agendar via WhatsApp
                  </a>
                </div>

                {/* Middle Column - Email CTA */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <InlineEditor
                      fieldId="tituloEmailCTA"
                      initialValue={
                        content.tituloEmailCTA || "Precisa de mais informações?"
                      }
                      onSave={(value) =>
                        handleSaveContent("tituloEmailCTA", value)
                      }
                      className="text-xl font-bold text-gray-800 mb-2"
                    >
                      {content.tituloEmailCTA || "Precisa de mais informações?"}
                    </InlineEditor>
                    <InlineEditor
                      fieldId="subtituloEmailCTA"
                      initialValue={
                        content.subtituloEmailCTA ||
                        "Entre em contato por email"
                      }
                      onSave={(value) =>
                        handleSaveContent("subtituloEmailCTA", value)
                      }
                      className="text-gray-600 text-sm mb-4"
                    >
                      {content.subtituloEmailCTA ||
                        "Entre em contato por email"}
                    </InlineEditor>
                  </div>

                  <div className="text-center">
                    <p className="mt-3 text-gray-600 text-sm">
                      <InlineEditor
                        fieldId="emailEndereco"
                        initialValue={
                          content.emailEndereco ||
                          "dramarialicerecepcao@gmail.com"
                        }
                        onSave={(value) =>
                          handleSaveContent("emailEndereco", value)
                        }
                        className="text-gray-600 text-sm"
                      >
                        {content.emailEndereco ||
                          "dramarialicerecepcao@gmail.com"}
                      </InlineEditor>
                    </p>
                    <a
                      href="mailto:dramarialicerecepcao@gmail.com"
                      className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Enviar Email
                    </a>
                  </div>
                </div>

                {/* Right Column - Map and Location */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <InlineEditor
                      fieldId="tituloLocalizacao"
                      initialValue={content.tituloLocalizacao || "Localização"}
                      onSave={(value) =>
                        handleSaveContent("tituloLocalizacao", value)
                      }
                      className="text-xl font-bold text-gray-800"
                    >
                      {content.tituloLocalizacao || "Localização"}
                    </InlineEditor>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <div className="space-y-1">
                        <InlineEditor
                          fieldId="labelEndereco"
                          initialValue={content.labelEndereco || "Endereço"}
                          onSave={(value) =>
                            handleSaveContent("labelEndereco", value)
                          }
                          className="font-medium text-gray-800 text-sm"
                        >
                          {content.labelEndereco || "Endereço"}
                        </InlineEditor>
                        <br />
                        <InlineEditor
                          fieldId="enderecoLinha1"
                          initialValue={
                            content.enderecoLinha1 ||
                            "R. Voluntários da Pátria, 3744"
                          }
                          onSave={(value) =>
                            handleSaveContent("enderecoLinha1", value)
                          }
                          className="text-gray-600 text-sm"
                        >
                          {content.enderecoLinha1 ||
                            "R. Voluntários da Pátria, 3744"}
                        </InlineEditor>
                        <br />
                        <InlineEditor
                          fieldId="enderecoLinha2"
                          initialValue={
                            content.enderecoLinha2 || "Santana, São Paulo - SP"
                          }
                          onSave={(value) =>
                            handleSaveContent("enderecoLinha2", value)
                          }
                          className="text-gray-600 text-sm"
                        >
                          {content.enderecoLinha2 || "Santana, São Paulo - SP"}
                        </InlineEditor>
                        <br />
                        <InlineEditor
                          fieldId="cep"
                          initialValue={content.cep || "CEP: 02402-400"}
                          onSave={(value) => handleSaveContent("cep", value)}
                          className="text-gray-600 text-sm"
                        >
                          {content.cep || "CEP: 02402-400"}
                        </InlineEditor>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-green-500" />
                      <div className="space-y-1">
                        <InlineEditor
                          fieldId="labelHorario"
                          initialValue={
                            content.labelHorario || "Horário de Funcionamento"
                          }
                          onSave={(value) =>
                            handleSaveContent("labelHorario", value)
                          }
                          className="font-medium text-gray-800 text-sm"
                        >
                          {content.labelHorario || "Horário de Funcionamento"}
                        </InlineEditor>
                        <br />
                        <InlineEditor
                          fieldId="horarioFuncionamento"
                          initialValue={
                            content.horarioFuncionamento ||
                            "Segunda a Sexta: 8h às 18h"
                          }
                          onSave={(value) =>
                            handleSaveContent("horarioFuncionamento", value)
                          }
                          className="text-gray-600 text-sm"
                        >
                          {content.horarioFuncionamento ||
                            "Segunda a Sexta: 8h às 18h"}
                        </InlineEditor>
                      </div>
                    </div>
                  </div>

                  {/* Directions Button */}
                  <button
                    onClick={handleDirections}
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-3 px-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Navigation className="w-5 h-5" />
                    Como Chegar
                  </button>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white/20 col-span-1 lg:col-span-2 mt-4">
                <div className="rounded-xl overflow-hidden h-80 lg:h-[420px] w-full">
                  <iframe
                    src={configuracoes.link_mapa}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa da clínica"
                    className="rounded-lg w-full h-full"
                  />
                </div>
              </div>

              {/* Contact Methods */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <InlineEditor
                    fieldId="tituloWhatsapp"
                    initialValue={content.tituloWhatsapp || "WhatsApp"}
                    onSave={(value) =>
                      handleSaveContent("tituloWhatsapp", value)
                    }
                    className="font-bold text-gray-800 mb-2"
                  >
                    {content.tituloWhatsapp || "WhatsApp"}
                  </InlineEditor>
                  <br />

                  <InlineEditor
                    fieldId="descricaoWhatsapp"
                    initialValue={
                      content.descricaoWhatsapp || "Agendamento rápido e fácil"
                    }
                    onSave={(value) =>
                      handleSaveContent("descricaoWhatsapp", value)
                    }
                    className="text-gray-600 text-sm"
                  >
                    {content.descricaoWhatsapp || "Agendamento rápido e fácil"}
                  </InlineEditor>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <InlineEditor
                    fieldId="tituloEmail"
                    initialValue={content.tituloEmail || "Email"}
                    onSave={(value) => handleSaveContent("tituloEmail", value)}
                    className="font-bold text-gray-800 mb-2"
                  >
                    {content.tituloEmail || "Email"}
                  </InlineEditor>
                  <br />

                  <InlineEditor
                    fieldId="descricaoEmail"
                    initialValue={
                      content.descricaoEmail || "dramarialicerecepcao@gmail.com"
                    }
                    onSave={(value) =>
                      handleSaveContent("descricaoEmail", value)
                    }
                    className="text-gray-600 text-sm"
                  >
                    {content.descricaoEmail || "dramarialicerecepcao@gmail.com"}
                  </InlineEditor>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <InlineEditor
                    fieldId="tituloTelefone"
                    initialValue={content.tituloTelefone || "Telefone"}
                    onSave={(value) =>
                      handleSaveContent("tituloTelefone", value)
                    }
                    className="font-bold text-gray-800 mb-2"
                  >
                    {content.tituloTelefone || "Telefone"}
                  </InlineEditor>
                  <br />
                  <InlineEditor
                    fieldId="descricaoTelefone"
                    initialValue={
                      content.descricaoTelefone || "Atendimento personalizado"
                    }
                    onSave={(value) =>
                      handleSaveContent("descricaoTelefone", value)
                    }
                    className="text-gray-600 text-sm"
                  >
                    {content.descricaoTelefone || "Atendimento personalizado"}
                  </InlineEditor>
                </div>

                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <InlineEditor
                    fieldId="tituloPresencial"
                    initialValue={content.tituloPresencial || "Presencial"}
                    onSave={(value) =>
                      handleSaveContent("tituloPresencial", value)
                    }
                    className="font-bold text-gray-800 mb-2"
                  >
                    {content.tituloPresencial || "Presencial"}
                  </InlineEditor>
                  <br />
                  <InlineEditor
                    fieldId="descricaoPresencial"
                    initialValue={
                      content.descricaoPresencial || "Visite nossa clínica"
                    }
                    onSave={(value) =>
                      handleSaveContent("descricaoPresencial", value)
                    }
                    className="text-gray-600 text-sm"
                  >
                    {content.descricaoPresencial || "Visite nossa clínica"}
                  </InlineEditor>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </EditablePage>
  );
};

export default Contact;
