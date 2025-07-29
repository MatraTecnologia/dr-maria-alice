const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

async function seedBio() {
  try {
    // Verificar se a página bio já existe
    const existingBio = await prisma.pagina.findUnique({
      where: { slug: 'bio' }
    })

    const bioContent = {
      titulo: 'Dra. Maria Alice',
      subtitulo: 'Médica Especialista em Medicina Integrativa',
      descricao: 'Com mais de 40 anos de dedicação à medicina, a Dra. Maria Alice construiu uma trajetória única que combina a solidez da formação médica tradicional com a visão holística da medicina integrativa.',
      experiencia: 'Formada em 1979 pela Faculdade de Medicina de Teresópolis, iniciou sua carreira como nefrologista, especializando-se no cuidado dos rins e sistema urinário. Ao longo dos anos, percebeu que o verdadeiro cuidado com a saúde vai além do tratamento de sintomas isolados.',
      formacao: 'Esta percepção a levou a explorar a medicina integrativa, onde encontrou ferramentas para tratar o paciente como um todo - corpo, mente e espírito. Hoje, atua especialmente no tratamento de doenças e desordens metabólicas, sempre com foco na prevenção e na medicina personalizada.',
      especialidades: 'Medicina Ortomolecular, Nutrologia, Suplementação, Modulação Hormonal, Medicina Integrativa, Nefrologia, Fitoterapia, Biopuntura, Laserterapia',
      filosofia: 'Acredito que cada paciente é único e merece um tratamento personalizado que considere não apenas os sintomas, mas toda a complexidade do ser humano. A medicina integrativa me permite oferecer o melhor de ambos os mundos: a precisão da medicina tradicional aliada à sabedoria das terapias complementares.'
    }

    if (existingBio) {
      console.log('Página bio já existe, atualizando conteúdo...')
      
      await prisma.pagina.update({
        where: { slug: 'bio' },
        data: {
          titulo: 'Dra. Maria Alice',
          conteudo: bioContent,
          updatedAt: new Date()
        }
      })
    } else {
      console.log('Criando página bio...')
      
      await prisma.pagina.create({
        data: {
          slug: 'bio',
          titulo: 'Dra. Maria Alice',
          conteudo: bioContent
        }
      })
    }

    console.log('✅ Página bio criada/atualizada com sucesso!')
    console.log('📝 Conteúdo salvo:', bioContent)
  } catch (error) {
    console.error('❌ Erro ao criar página bio:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedBio()