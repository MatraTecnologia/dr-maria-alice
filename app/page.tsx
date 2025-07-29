"use client"
import { HeaderCustom } from "@/components/header-custom";
import { Button } from "@/components/ui/button";
import { Armchair, Calendar, Headset, ParkingCircle } from "lucide-react";
import EditablePage from "@/components/EditablePage";
import InlineEditor from "@/components/InlineEditor";
import ImageEditor from "@/components/ImageEditor";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <EditablePage slug="home">
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
            <div className="absolute inset-0 bg-[#1a8ca811] pointer-events-none" />
            <div className="relative z-10 w-full max-w-7xl mx-auto">
              <HeaderCustom />
              <div className="flex flex-col lg:flex-row gap-10 py-10">
                <div className="flex flex-col w-full  text-gray-700">
                  <InlineEditor
                    fieldId="titulo"
                    initialValue={content.titulo || "CONHEÇA A CLÍNICA DA"}
                    onSave={(value) => handleSaveContent("titulo", value)}
                    className="text-blue-300 font-semibold text-lg sm:text-xl"
                  >
                    {content.titulo || "CONHEÇA A CLÍNICA DA"}
                  </InlineEditor>
                  <InlineEditor
                    fieldId="subtitulo"
                    initialValue={content.subtitulo || "DRA. MARIA ALICE"}
                    onSave={(value) => handleSaveContent("subtitulo", value)}
                    className="font-semibold text-xl sm:text-2xl"
                  >
                    {content.subtitulo || "DRA. MARIA ALICE"}
                  </InlineEditor>
                  <br />
                  <div className="text-sm sm:text-base">
                    <InlineEditor
                      fieldId="descricao"
                      initialValue={content.descricao || "Localizada no coração de Santana, um dos bairros mais tradicionais da Zona Norte de São Paulo, a Clínica Dra. Maria Alice Fernandes de Miranda é conhecida pelo atendimento humanizado e atenção com os seus pacientes."}
                      onSave={(value) => handleSaveContent("descricao", value)}
                      type="textarea"
                    >
                      {content.descricao || "Localizada no coração de Santana, um dos bairros mais tradicionais da Zona Norte de São Paulo, a Clínica Dra. Maria Alice Fernandes de Miranda é conhecida pelo atendimento humanizado e atenção com os seus pacientes."}
                    </InlineEditor>
                    <br /> <br />
                    <InlineEditor
                      fieldId="descricao2"
                      initialValue={content.descricao2 || "A Clínica está focada na Longevidade Saudável através da prática da Medicina Integrativa e o poder da cura que vem de dentro, considerando a pessoa na sua plenitude."}
                      onSave={(value) => handleSaveContent("descricao2", value)}
                      type="textarea"
                    >
                      {content.descricao2 || "A Clínica está focada na Longevidade Saudável através da prática da Medicina Integrativa e o poder da cura que vem de dentro, considerando a pessoa na sua plenitude."}
                    </InlineEditor>
                    <br /> <br />
                    <InlineEditor
                      fieldId="descricao3"
                      initialValue={content.descricao3 || "A Medicina Integrativa é uma terapia que olha para o paciente como um todo: corpo, mente e espírito, visando a saúde, a qualidade de vida, o bem-estar e o autocuidado, utilizando diversas técnicas que buscam a cura e melhoram a vida de maneira íntegra."}
                      onSave={(value) => handleSaveContent("descricao3", value)}
                      type="textarea"
                    >
                      {content.descricao3 || "A Medicina Integrativa é uma terapia que olha para o paciente como um todo: corpo, mente e espírito, visando a saúde, a qualidade de vida, o bem-estar e o autocuidado, utilizando diversas técnicas que buscam a cura e melhoram a vida de maneira íntegra."}
                    </InlineEditor>
                    <br /> <br />
                    <InlineEditor
                      fieldId="descricao4"
                      initialValue={content.descricao4 || "Além de associar os diversos modelos terapêuticos (Medicina Alopática, Homeopática, Ortomolecular, Fitoterapia, etc) no processo de diagnóstico, tratamentos, prevenção e promoção da saúde."}
                      onSave={(value) => handleSaveContent("descricao4", value)}
                      type="textarea"
                    >
                      {content.descricao4 || "Além de associar os diversos modelos terapêuticos (Medicina Alopática, Homeopática, Ortomolecular, Fitoterapia, etc) no processo de diagnóstico, tratamentos, prevenção e promoção da saúde."}
                    </InlineEditor>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-8 gap-4 w-full ">
                    <Button className="bg-blue-600 hover:bg-blue-700 p-4 sm:p-6 font-light w-full sm:w-auto">
                      {content.botaoAgendar || "Agendar uma consulta"}
                    </Button>
                    <Button onClick={() => router.push('/bio')} className="bg-transparent border-blue-600 border text-blue-600 hover:bg-blue-700 hover:text-white p-4 sm:p-6 font-light w-full sm:w-auto">
                      {content.botaoSaibaMais || "Saiba mais"}
                    </Button>
                  </div>
                </div>
                <div className="w-full flex justify-center lg:w-[60%] items-center">
                  <ImageEditor
                    fieldId="imagemDra"
                    initialValue={content.imagemDra || "/dra.jpg"}
                    onSave={handleSaveContent}
                    className="rounded-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto object-cover"
                    alt="Dra. Maria Alice"
                    width={302}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </section>
          <section
            className="flex flex-col px-4 sm:px-8 md:px-[18%] "
            style={{
              backgroundImage: 'url("/default-section-1.svg")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-10 py-10 items-start">
              <div className="w-full flex justify-center mb-8 lg:mb-0">
                <ImageEditor
                  fieldId="imagemClinica"
                  initialValue={content.imagemClinica || "/clinica.jpg"}
                  onSave={handleSaveContent}
                  className="rounded-xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto object-cover"
                  alt="Foto da clínica"
                  width={622}
                  height={840}
                />
              </div>
              <div className="flex flex-col w-full text-black">
                <ul className="pl-0 mt-4 space-y-4 text-base h-full ">
                  <li className="flex items-center gap-2 border-b border-gray-200 pb-2 transition-colors duration-200 hover:text-blue-400 group cursor-pointer">
                    <ParkingCircle className="text-black group-hover:text-blue-400 transition-colors duration-200" />
                    <span className="text-black group-hover:text-blue-400 transition-colors duration-200">Estacionamento no local</span>
                  </li>
                  <li className="flex items-center gap-2 border-b border-gray-200 pb-2 transition-colors duration-200 hover:text-blue-400 group cursor-pointer">
                    <Calendar className="text-black group-hover:text-blue-400 transition-colors duration-200" />
                    <span className="text-black group-hover:text-blue-400 transition-colors duration-200">Agendamento prévio</span>
                  </li>
                  <li className="flex items-center gap-2 border-b border-gray-200 pb-2 transition-colors duration-200 hover:text-blue-400 group cursor-pointer">
                    <Armchair className="text-black group-hover:text-blue-400 transition-colors duration-200" />
                    <span className="text-black group-hover:text-blue-400 transition-colors duration-200">Ambiente climatizado</span>
                  </li>
                  <li className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-400 group cursor-pointer">
                    <Headset className="text-black group-hover:text-blue-400 transition-colors duration-200" />
                    <span className="text-black group-hover:text-blue-400 transition-colors duration-200">Atendimento personalizado</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <div className="flex flex-col items-center py-10 sm:py-16 w-full max-w-7xl mx-auto">
              <InlineEditor
                fieldId="tituloTratamentos"
                initialValue={content.tituloTratamentos || "Tratamentos"}
                onSave={(value) => handleSaveContent("tituloTratamentos", value)}
                className="text-[#222B45] text-2xl sm:text-3xl font-bold mb-1 text-center"
              >
                {content.tituloTratamentos || "Tratamentos"}
              </InlineEditor>
              <InlineEditor
                fieldId="subtituloTratamentos"
                initialValue={content.subtituloTratamentos || "MEDICINA FUNCIONAL INTEGRATIVA – Diagnóstico e Tratamento"}
                onSave={(value) => handleSaveContent("subtituloTratamentos", value)}
                className="text-[10px] sm:text-[11px] text-[#8F9BB3] mb-8 sm:mb-10 mt-1 tracking-wide font-medium uppercase text-center"
              >
                {content.subtituloTratamentos || "MEDICINA FUNCIONAL INTEGRATIVA – Diagnóstico e Tratamento"}
              </InlineEditor>
              <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center items-center">
                                 <div className="relative bg-white rounded-2xl rounded-l-none border border-[#000000] shadow-[0_4px_24px_0_rgba(44,51,73,0.04)] flex flex-col items-start px-4 sm:px-6 pt-6 pb-5 w-full max-w-xs sm:max-w-sm md:w-[340px] min-h-[420px] transition-shadow hover:shadow-lg">
                   <ImageEditor
                     fieldId="imagemOrtomolecular"
                     initialValue={content.imagemOrtomolecular || "/pratica-ortomolecular.jpg"}
                     onSave={handleSaveContent}
                     className="w-full h-44 object-cover rounded-xl mb-6"
                     alt="Prática Ortomolecular"
                     width={300}
                     height={176}
                   />
                  <InlineEditor
                    fieldId="tituloOrtomolecular"
                    initialValue={content.tituloOrtomolecular || "PRÁTICA ORTOMOLECULAR"}
                    onSave={(value) => handleSaveContent("tituloOrtomolecular", value)}
                    className="font-bold text-[15px] text-[#222B45] mb-2 uppercase tracking-tight"
                  >
                    {content.tituloOrtomolecular || "PRÁTICA ORTOMOLECULAR"}
                  </InlineEditor>
                  <InlineEditor
                    fieldId="descricaoOrtomolecular"
                    initialValue={content.descricaoOrtomolecular || "A Ortomolecular é um ramo da ciência que se dedica em restabelecer o equilíbrio do organismo, através do ajuste de níveis de substâncias naturais, como vitaminas, minerais, entre outros."}
                    onSave={(value) => handleSaveContent("descricaoOrtomolecular", value)}
                    type="textarea"
                    className="text-[13px] text-[#8F9BB3] mb-6 leading-relaxed"
                  >
                    {content.descricaoOrtomolecular || "A Ortomolecular é um ramo da ciência que se dedica em restabelecer o equilíbrio do organismo, através do ajuste de níveis de substâncias naturais, como vitaminas, minerais, entre outros."}
                  </InlineEditor>
                  <button onClick={() => router.push('/partica-ortomolecular')} className="text-[#3366FF] text-xs font-semibold mt-auto hover:underline transition-colors">Saiba Mais →</button>
                </div>
                                 <div className="relative bg-white rounded-2xl rounded-l-none border border-[#000000] shadow-[0_4px_24px_0_rgba(44,51,73,0.04)] flex flex-col items-start px-4 sm:px-6 pt-6 pb-5 w-full max-w-xs sm:max-w-sm md:w-[340px] min-h-[420px] transition-shadow hover:shadow-lg">
                   <ImageEditor
                     fieldId="imagemEmagrecimento"
                     initialValue={content.imagemEmagrecimento || "/tratamento-emagrecimento.jpg"}
                     onSave={handleSaveContent}
                     className="w-full h-44 object-cover rounded-xl mb-6"
                     alt="Emagrecimento"
                     width={300}
                     height={176}
                   />
                  <InlineEditor
                    fieldId="tituloEmagrecimento"
                    initialValue={content.tituloEmagrecimento || "EMAGRECIMENTO"}
                    onSave={(value) => handleSaveContent("tituloEmagrecimento", value)}
                    className="font-bold text-[15px] text-[#222B45] mb-2 uppercase tracking-tight"
                  >
                    {content.tituloEmagrecimento || "EMAGRECIMENTO"}
                  </InlineEditor>
                  <InlineEditor
                    fieldId="descricaoEmagrecimento"
                    initialValue={content.descricaoEmagrecimento || "A Ortomolecular tem um olhar clínico sobre o emagrecimento, atuando na causa do ganho de peso e promovendo o ajuste metabólico e hormonal, além de estratégias alimentares e mudanças de hábitos."}
                    onSave={(value) => handleSaveContent("descricaoEmagrecimento", value)}
                    type="textarea"
                    className="text-[13px] text-[#8F9BB3] mb-6 leading-relaxed"
                  >
                    {content.descricaoEmagrecimento || "A Ortomolecular tem um olhar clínico sobre o emagrecimento, atuando na causa do ganho de peso e promovendo o ajuste metabólico e hormonal, além de estratégias alimentares e mudanças de hábitos."}
                  </InlineEditor>
                  <button onClick={() => router.push('/emagrecimento')} className="text-[#3366FF] text-xs font-semibold mt-auto hover:underline transition-colors">Saiba Mais →</button>
                </div>
                                 <div className="relative bg-white rounded-2xl rounded-l-none border border-[#000000] shadow-[0_4px_24px_0_rgba(44,51,73,0.04)] flex flex-col items-start px-4 sm:px-6 pt-6 pb-5 w-full max-w-xs sm:max-w-sm md:w-[340px] min-h-[420px] transition-shadow hover:shadow-lg">
                   <ImageEditor
                     fieldId="imagemModulacao"
                     initialValue={content.imagemModulacao || "/ortomolecular.png"}
                     onSave={handleSaveContent}
                     className="w-full h-44 object-cover rounded-xl mb-6"
                     alt="Modulação Hormonal"
                     width={300}
                     height={176}
                   />
                  <InlineEditor
                    fieldId="tituloModulacao"
                    initialValue={content.tituloModulacao || "MODULAÇÃO HORMONAL"}
                    onSave={(value) => handleSaveContent("tituloModulacao", value)}
                    className="font-bold text-[15px] text-[#222B45] mb-2 uppercase tracking-tight"
                  >
                    {content.tituloModulacao || "MODULAÇÃO HORMONAL"}
                  </InlineEditor>
                  <InlineEditor
                    fieldId="descricaoModulacao"
                    initialValue={content.descricaoModulacao || "Modulação Hormonal Feminina e Masculina: importante para a saúde e qualidade de vida, atuando no ajuste dos níveis hormonais para favorecer bem-estar, energia e saúde em todas as fases da vida."}
                    onSave={(value) => handleSaveContent("descricaoModulacao", value)}
                    type="textarea"
                    className="text-[13px] text-[#8F9BB3] mb-6 leading-relaxed"
                  >
                    {content.descricaoModulacao || "Modulação Hormonal Feminina e Masculina: importante para a saúde e qualidade de vida, atuando no ajuste dos níveis hormonais para favorecer bem-estar, energia e saúde em todas as fases da vida."}
                  </InlineEditor>
                  <button onClick={() => router.push('/modulacao-hormonal')} className="text-[#3366FF] text-xs font-semibold mt-auto hover:underline transition-colors">Saiba Mais →</button>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full bg-[#86D6FB] py-10 md:px-[18%] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
              <InlineEditor
                fieldId="tituloAgendamento"
                initialValue={content.tituloAgendamento || "AGENDAR UMA CONSULTA"}
                onSave={(value) => handleSaveContent("tituloAgendamento", value)}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4"
              >
                {content.tituloAgendamento || "AGENDAR UMA CONSULTA"}
              </InlineEditor>
              <InlineEditor
                fieldId="descricaoAgendamento"
                initialValue={content.descricaoAgendamento || "Agende sua consulta e tenha acesso a um atendimento de qualidade, personalizado e dedicado ao seu bem estar. Não perca tempo, reserve seu horário agora mesmo e invista na sua qualidade de vida!"}
                onSave={(value) => handleSaveContent("descricaoAgendamento", value)}
                type="textarea"
                className="text-white text-xs sm:text-sm md:text-base text-center max-w-2xl mb-8"
              >
                {content.descricaoAgendamento || "Agende sua consulta e tenha acesso a um atendimento de qualidade, personalizado e dedicado ao seu bem estar. Não perca tempo, reserve seu horário agora mesmo e invista na sua qualidade de vida!"}
              </InlineEditor>
                             <a
                 href="https://wa.me/SEU_NUMERO_WHATSAPP"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center justify-center bg-[#1877F2] hover:bg-[#145db2] text-white font-semibold text-xs md:text-sm px-6 sm:px-8 py-3 rounded-lg transition-colors duration-200 w-full max-w-xs sm:max-w-fit"
               >
                 <svg
                   className="w-5 h-5 mr-2"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6.01L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.67.96.98-3.58-.23-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.3 0 1.35.99 2.66 1.13 2.85.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"
                     fill="currentColor"
                   />
                 </svg>
                 {content.botaoWhatsapp || "ATENDIMENTO VIA WHATSAPP"}
               </a>
            </div>
          </section>
        </div>
      )}
    </EditablePage>
  )
}
