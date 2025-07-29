const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

const pagesData = {
  'alzheimer': {
    titulo: 'Alzheimer',
    conteudo: {
      titulo: 'Alzheimer',
      subtitulo: 'Tratamento e Prevenção',
      descricao: 'A doença de Alzheimer é uma condição neurodegenerativa que afeta a memória, pensamento e comportamento.',
      sintomas: 'Perda de memória, confusão, mudanças de humor, dificuldade para realizar tarefas diárias.',
      tratamento: 'Nossa abordagem integrativa combina medicina tradicional com terapias complementares para retardar a progressão da doença.',
      prevencao: 'Alimentação saudável, exercícios físicos, estimulação cognitiva e controle de fatores de risco são fundamentais.'
    }
  },
  'contato': {
    titulo: 'Contato',
    conteudo: {
      titulo: 'Entre em Contato',
      subtitulo: 'Agende sua Consulta',
      descricao: 'Estamos aqui para ajudar você a alcançar uma saúde integral e qualidade de vida.',
      endereco: 'Rua das Flores, 123 - Centro, Teresópolis - RJ',
      telefone: '(21) 99999-9999',
      email: 'contato@dramariaalice.com.br',
      horario: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h'
    }
  },
  'disturbios-do-sono': {
    titulo: 'Distúrbios do Sono',
    conteudo: {
      titulo: 'Distúrbios do Sono',
      subtitulo: 'Qualidade do Descanso',
      descricao: 'O sono é fundamental para a saúde física e mental. Distúrbios do sono podem afetar significativamente a qualidade de vida.',
      causas: 'Estresse, ansiedade, problemas hormonais, maus hábitos alimentares e uso de dispositivos eletrônicos.',
      sintomas: 'Insônia, sonolência diurna, ronco, apneia do sono, pesadelos frequentes.',
      tratamento: 'Identificamos as causas específicas e desenvolvemos um plano personalizado para melhorar a qualidade do sono.'
    }
  },
  'dosagem-de-iodo': {
    titulo: 'Dosagem de Iodo',
    conteudo: {
      titulo: 'Dosagem de Iodo',
      subtitulo: 'Equilíbrio Hormonal',
      descricao: 'O iodo é essencial para o funcionamento da tireoide e produção de hormônios tireoidianos.',
      importancia: 'O iodo é fundamental para o metabolismo, crescimento, desenvolvimento cerebral e regulação da temperatura corporal.',
      sintomas: 'Fadiga, ganho de peso, queda de cabelo, pele seca, intolerância ao frio.',
      tratamento: 'Avaliamos os níveis de iodo e desenvolvemos um plano de suplementação personalizado.'
    }
  },
  'emagrecimento': {
    titulo: 'Emagrecimento',
    conteudo: {
      titulo: 'Emagrecimento Saudável',
      subtitulo: 'Perda de Peso Sustentável',
      descricao: 'Emagrecimento não é apenas sobre perder peso, mas sobre ganhar saúde e qualidade de vida.',
      abordagem: 'Nossa abordagem considera fatores hormonais, metabólicos, emocionais e nutricionais.',
      beneficios: 'Melhora da autoestima, redução de riscos cardiovasculares, aumento da energia e bem-estar.',
      plano: 'Desenvolvemos um plano personalizado que inclui alimentação, exercícios e suplementação quando necessário.'
    }
  },
  'envelhecimento-saudavel': {
    titulo: 'Envelhecimento Saudável',
    conteudo: {
      titulo: 'Envelhecimento Saudável',
      subtitulo: 'Qualidade de Vida na Maturidade',
      descricao: 'Envelhecer com saúde é possível através de cuidados preventivos e tratamentos personalizados.',
      pilares: 'Nutrição adequada, atividade física, controle hormonal, saúde mental e prevenção de doenças.',
      beneficios: 'Manutenção da independência, prevenção de doenças crônicas, melhora da qualidade de vida.',
      abordagem: 'Trabalhamos com medicina preventiva e tratamentos que respeitam as particularidades de cada fase da vida.'
    }
  },
  'estresse-fisico-emocional': {
    titulo: 'Estresse Físico e Emocional',
    conteudo: {
      titulo: 'Estresse Físico e Emocional',
      subtitulo: 'Equilíbrio e Bem-estar',
      descricao: 'O estresse crônico pode afetar profundamente a saúde física e mental.',
      sintomas: 'Fadiga, irritabilidade, problemas de sono, dores musculares, alterações no apetite.',
      causas: 'Pressão no trabalho, problemas pessoais, má alimentação, falta de exercícios.',
      tratamento: 'Identificamos as causas e desenvolvemos estratégias personalizadas para gerenciar o estresse.'
    }
  },
  'histamina': {
    titulo: 'Histamina',
    conteudo: {
      titulo: 'Intolerância à Histamina',
      subtitulo: 'Alergias e Sensibilidades',
      descricao: 'A histamina é uma substância natural do corpo que, em excesso, pode causar diversos sintomas.',
      sintomas: 'Dores de cabeça, urticária, problemas digestivos, congestão nasal, fadiga.',
      causas: 'Alimentos ricos em histamina, deficiência da enzima DAO, estresse, medicamentos.',
      tratamento: 'Identificamos os gatilhos e desenvolvemos um plano alimentar e de suplementação personalizado.'
    }
  },
  'microbioma-intestinal': {
    titulo: 'Microbioma Intestinal',
    conteudo: {
      titulo: 'Microbioma Intestinal',
      subtitulo: 'Saúde do Intestino',
      descricao: 'O microbioma intestinal é fundamental para a saúde geral, imunidade e bem-estar.',
      importancia: 'Bactérias benéficas ajudam na digestão, produção de vitaminas e fortalecimento do sistema imunológico.',
      sintomas: 'Problemas digestivos, fadiga, alterações de humor, problemas de pele, imunidade baixa.',
      tratamento: 'Avaliamos o microbioma e desenvolvemos estratégias para restaurar o equilíbrio bacteriano.'
    }
  },
  'modulacao-hormonal': {
    titulo: 'Modulação Hormonal',
    conteudo: {
      titulo: 'Modulação Hormonal',
      subtitulo: 'Equilíbrio Hormonal Natural',
      descricao: 'O equilíbrio hormonal é fundamental para a saúde física, mental e emocional.',
      hormonios: 'Trabalhamos com tireoide, cortisol, insulina, hormônios sexuais e outros hormônios importantes.',
      sintomas: 'Fadiga, alterações de peso, mudanças de humor, problemas de sono, baixa libido.',
      tratamento: 'Utilizamos exames específicos e tratamentos naturais para restaurar o equilíbrio hormonal.'
    }
  },
  'partica-ortomolecular': {
    titulo: 'Partica Ortomolecular',
    conteudo: {
      titulo: 'Medicina Ortomolecular',
      subtitulo: 'Nutrição Celular',
      descricao: 'A medicina ortomolecular busca o equilíbrio bioquímico através de nutrientes essenciais.',
      principios: 'Correção de deficiências nutricionais, otimização do funcionamento celular, prevenção de doenças.',
      beneficios: 'Melhora da energia, fortalecimento do sistema imunológico, prevenção de doenças crônicas.',
      tratamento: 'Avaliamos as necessidades individuais e prescrevemos suplementação personalizada.'
    }
  },
  'perfil-nutrigenetico': {
    titulo: 'Perfil Nutrigenético',
    conteudo: {
      titulo: 'Perfil Nutrigenético',
      subtitulo: 'Nutrição Personalizada',
      descricao: 'A nutrigenética estuda como os genes influenciam a resposta individual aos nutrientes.',
      importancia: 'Cada pessoa tem necessidades nutricionais únicas baseadas em sua composição genética.',
      beneficios: 'Plano alimentar personalizado, otimização da saúde, prevenção de doenças.',
      processo: 'Realizamos análise genética e desenvolvemos recomendações nutricionais específicas.'
    }
  },
  'tratamentos': {
    titulo: 'Tratamentos',
    conteudo: {
      titulo: 'Nossos Tratamentos',
      subtitulo: 'Medicina Integrativa',
      descricao: 'Oferecemos tratamentos personalizados que combinam medicina tradicional e terapias complementares.',
      abordagem: 'Cada paciente é único e merece um tratamento personalizado que considere corpo, mente e espírito.',
      especialidades: 'Medicina ortomolecular, modulação hormonal, nutrigenética, fitoterapia, biopuntura.',
      consulta: 'Agende sua consulta para uma avaliação completa e personalizada.'
    }
  }
}

async function seedAllPages() {
  try {
    console.log('🌱 Iniciando população de todas as páginas...')
    
    for (const [slug, data] of Object.entries(pagesData)) {
      console.log(`📝 Processando página: ${slug}`)
      
      // Verificar se a página já existe
      const existingPage = await prisma.pagina.findUnique({
        where: { slug }
      })

      if (existingPage) {
        console.log(`🔄 Atualizando página existente: ${slug}`)
        
        await prisma.pagina.update({
          where: { slug },
          data: {
            titulo: data.titulo,
            conteudo: data.conteudo,
            updatedAt: new Date()
          }
        })
      } else {
        console.log(`✨ Criando nova página: ${slug}`)
        
        await prisma.pagina.create({
          data: {
            slug,
            titulo: data.titulo,
            conteudo: data.conteudo
          }
        })
      }
      
      console.log(`✅ Página ${slug} processada com sucesso!`)
    }

    console.log('🎉 Todas as páginas foram populadas com sucesso!')
    
    // Listar todas as páginas criadas
    const allPages = await prisma.pagina.findMany({
      orderBy: { slug: 'asc' }
    })
    
    console.log('📋 Páginas no banco:')
    allPages.forEach(page => {
      console.log(`  - ${page.slug}: ${page.titulo}`)
    })
    
  } catch (error) {
    console.error('❌ Erro ao popular páginas:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedAllPages()