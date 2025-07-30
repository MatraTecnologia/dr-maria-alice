const { PrismaClient } = require('../lib/generated/prisma')

const prisma = new PrismaClient()

const configuracoesIniciais = {
  telefone: '+5521999999999',
  link_agendamento: '/contato'
}

async function seedConfiguracoes() {
  try {
    console.log('🌱 Iniciando população das configurações...')
    
    // Verificar se a página de configurações já existe
    const existingConfig = await prisma.pagina.findUnique({
      where: { slug: 'configuracoes' }
    })

    if (existingConfig) {
      console.log(`🔄 Atualizando configurações existentes`)
      
      await prisma.pagina.update({
        where: { slug: 'configuracoes' },
        data: {
          titulo: 'Configurações',
          conteudo: configuracoesIniciais,
          updatedAt: new Date()
        }
      })
    } else {
      console.log(`✨ Criando nova página de configurações`)
      
      await prisma.pagina.create({
        data: {
          slug: 'configuracoes',
          titulo: 'Configurações',
          conteudo: configuracoesIniciais
        }
      })
    }
    
    console.log(`✅ Configurações processadas com sucesso!`)
    console.log('📋 Configurações no banco:')
    console.log(`  - telefone: ${configuracoesIniciais.telefone}`)
    console.log(`  - link_agendamento: ${configuracoesIniciais.link_agendamento}`)
    
  } catch (error) {
    console.error('❌ Erro ao popular configurações:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedConfiguracoes() 