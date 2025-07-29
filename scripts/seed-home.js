const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

const homeContent = {
  titulo: "CONHEÇA A CLÍNICA DA",
  subtitulo: "DRA. MARIA ALICE",
  descricao: "Localizada no coração de Santana, um dos bairros mais tradicionais da Zona Norte de São Paulo, a Clínica Dra. Maria Alice Fernandes de Miranda é conhecida pelo atendimento humanizado e atenção com os seus pacientes.",
  descricao2: "A Clínica está focada na Longevidade Saudável através da prática da Medicina Integrativa e o poder da cura que vem de dentro, considerando a pessoa na sua plenitude.",
  descricao3: "A Medicina Integrativa é uma terapia que olha para o paciente como um todo: corpo, mente e espírito, visando a saúde, a qualidade de vida, o bem-estar e o autocuidado, utilizando diversas técnicas que buscam a cura e melhoram a vida de maneira íntegra.",
  descricao4: "Além de associar os diversos modelos terapêuticos (Medicina Alopática, Homeopática, Ortomolecular, Fitoterapia, etc) no processo de diagnóstico, tratamentos, prevenção e promoção da saúde.",
  botaoAgendar: "Agendar uma consulta",
  botaoSaibaMais: "Saiba mais",
  tituloTratamentos: "Tratamentos",
  subtituloTratamentos: "MEDICINA FUNCIONAL INTEGRATIVA – Diagnóstico e Tratamento",
  tituloOrtomolecular: "PRÁTICA ORTOMOLECULAR",
  descricaoOrtomolecular: "A Ortomolecular é um ramo da ciência que se dedica em restabelecer o equilíbrio do organismo, através do ajuste de níveis de substâncias naturais, como vitaminas, minerais, entre outros.",
  tituloEmagrecimento: "EMAGRECIMENTO",
  descricaoEmagrecimento: "A Ortomolecular tem um olhar clínico sobre o emagrecimento, atuando na causa do ganho de peso e promovendo o ajuste metabólico e hormonal, além de estratégias alimentares e mudanças de hábitos.",
  tituloModulacao: "MODULAÇÃO HORMONAL",
  descricaoModulacao: "Modulação Hormonal Feminina e Masculina: importante para a saúde e qualidade de vida, atuando no ajuste dos níveis hormonais para favorecer bem-estar, energia e saúde em todas as fases da vida.",
  tituloAgendamento: "AGENDAR UMA CONSULTA",
  descricaoAgendamento: "Agende sua consulta e tenha acesso a um atendimento de qualidade, personalizado e dedicado ao seu bem estar. Não perca tempo, reserve seu horário agora mesmo e invista na sua qualidade de vida!",
  botaoWhatsapp: "ATENDIMENTO VIA WHATSAPP",
  // Campos de imagem (inicialmente vazios para usar as imagens estáticas)
  imagemDra: "",
  imagemClinica: "",
  imagemOrtomolecular: "",
  imagemEmagrecimento: "",
  imagemModulacao: ""
}

async function seedHome() {
  try {
    console.log('🌱 Iniciando população da página inicial...')

    // Verificar se a página já existe
    const existingPage = await prisma.pagina.findUnique({
      where: { slug: 'home' }
    })

    if (existingPage) {
      console.log('🔄 Atualizando página inicial existente')

      await prisma.pagina.update({
        where: { slug: 'home' },
        data: {
          titulo: 'Página Inicial',
          conteudo: homeContent,
          updatedAt: new Date()
        }
      })
    } else {
      console.log('✨ Criando nova página inicial')

      await prisma.pagina.create({
        data: {
          slug: 'home',
          titulo: 'Página Inicial',
          conteudo: homeContent
        }
      })
    }

    console.log('✅ Página inicial populada com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao popular página inicial:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedHome() 