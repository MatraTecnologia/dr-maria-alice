import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Configuracoes {
  [key: string]: string | number | boolean | null | undefined
}

export async function GET() {
  try {
    const configPage = await prisma.pagina.findUnique({
      where: { slug: 'configuracoes' }
    })

    if (!configPage) {
      // Retornar valores padrão se a página não existir
      return NextResponse.json({
        telefone: '+5521999999999',
        link_agendamento: '/contato'
      })
    }

    return NextResponse.json(configPage.conteudo as Configuracoes)
  } catch (error) {
    console.error('Erro ao buscar configurações:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { chave, valor }: { chave: string; valor: string | number | boolean | null | undefined } = body

    if (!chave || valor === undefined) {
      return NextResponse.json(
        { error: 'Chave e valor são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar configurações existentes
    const existingConfig = await prisma.pagina.findUnique({
      where: { slug: 'configuracoes' }
    })

    let configuracoes: Configuracoes = {}
    if (existingConfig) {
      configuracoes = existingConfig.conteudo as Configuracoes
    }

    // Atualizar a configuração específica
    configuracoes[chave] = valor

    // Salvar no banco
    const configuracao = await prisma.pagina.upsert({
      where: { slug: 'configuracoes' },
      update: {
        titulo: 'Configurações',
        conteudo: configuracoes,
        updatedAt: new Date()
      },
      create: {
        slug: 'configuracoes',
        titulo: 'Configurações',
        conteudo: configuracoes
      }
    })

    return NextResponse.json(configuracao)
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 