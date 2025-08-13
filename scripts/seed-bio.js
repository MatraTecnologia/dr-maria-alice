const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function seedBio() {
  try {
    console.log('🌱 Adicionando dados faltantes na página de bio...')

    // Buscar a página bio existente
    const existingBio = await prisma.pagina.findUnique({
      where: { slug: 'bio' }
    })

    if (!existingBio) {
      console.log('❌ Página bio não encontrada. Execute primeiro o script seed-home.js')
      return
    }

    // Dados que estão faltando (apenas os arrays)
    const missingData = {
      timeline: [
        {
          year: "1979",
          title: "Formação em Medicina",
          description: "Graduou-se pela Faculdade de Medicina de Teresópolis, iniciando sua jornada na medicina"
        },
        {
          year: "1980s",
          title: "Especialização em Nefrologia",
          description: "Obteve o Título de Especialista em Nefrologia pela Sociedade Brasileira de Nefrologia"
        },
        {
          year: "2000s",
          title: "Descoberta da Medicina Integrativa",
          description: "Iniciou sua transição para a medicina integrativa, buscando tratamentos mais holísticos"
        },
        {
          year: "2010s",
          title: "Especialização Avançada",
          description: "Aprofundou-se em Nutriendocrinologia Funcional e terapias complementares"
        },
        {
          year: "Hoje",
          title: "Medicina Integrativa Completa",
          description: "Atua com foco em tratamentos personalizados e medicina preventiva"
        }
      ],
      certifications: [
        {
          title: "Formada em 1979 pela Faculdade de Medicina de Teresópolis",
          category: "Formação Base"
        },
        {
          title: "Título de Especialista em Nefrologia pela Sociedade Brasileira de Nefrologia e Associação Médica Brasileira",
          category: "Especialização Médica"
        },
        {
          title: "Pós Graduação em Nutriendocrinologia Funcional - Prevenção e Tratamento dos Distúrbios Relacionados à Idade",
          category: "Pós-Graduação"
        },
        {
          title: "Certificação em Fitoterapia e Medicina Ortomolecular e Funcional",
          category: "Medicina Integrativa"
        },
        {
          title: "Curso de Iniciação ao Bigliardi Org Test",
          category: "Diagnóstico Avançado"
        },
        {
          title: "Curso prático em Diagnóstico através da Bio ressonância - Módulos 1 e 2",
          category: "Diagnóstico Avançado"
        },
        {
          title: "Curso Semeiotica & DNA: avaliação personalizada baseada no DNA",
          category: "Medicina Personalizada"
        },
        {
          title: "Curso Monitoramento de Hormônios e Imunidade",
          category: "Endocrinologia"
        },
        {
          title: "Curso Dosagens Hormonais e Modulação Hormonal",
          category: "Endocrinologia"
        },
        {
          title: "Curso Intensivo Teórico Prático de Biopuntura",
          category: "Terapias Integrativas"
        },
        {
          title: "Curso Laserterapia Clínica",
          category: "Terapias Integrativas"
        },
        {
          title: "Curso Dosagem Hormonal na Saliva",
          category: "Diagnóstico Avançado"
        },
        {
          title: "Curso Wellness: Diet and Wellness Project",
          category: "Bem-estar e Nutrição"
        },
        {
          title: "Habilitação em práticas integrativas de laboratório e tratamento",
          category: "Habilitações"
        }
      ],
      memberships: [
        {
          title: "Membro da Associação Brasileira de Nutrologia",
          description: "Participação ativa na comunidade científica de nutrologia"
        },
        {
          title: "Membro da Associação Brasileira de Fitoterapia",
          description: "Contribuição para o desenvolvimento da fitoterapia no Brasil"
        }
      ]
    }

    // Mesclar com o conteúdo existente
    const currentContent = existingBio.conteudo || {}
    const updatedContent = { ...currentContent, ...missingData }

    // Atualizar apenas os campos que estavam faltando
    await prisma.pagina.update({
      where: { slug: 'bio' },
      data: {
        conteudo: updatedContent,
        updatedAt: new Date()
      }
    })

    console.log('✅ Dados adicionados com sucesso!')
    console.log('📊 Timeline:', missingData.timeline.length, 'itens')
    console.log('📊 Certifications:', missingData.certifications.length, 'itens')
    console.log('📊 Memberships:', missingData.memberships.length, 'itens')
    console.log('🔗 Agora você pode editar todos os cards na página de bio!')

  } catch (error) {
    console.error('❌ Erro ao adicionar dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedBio()