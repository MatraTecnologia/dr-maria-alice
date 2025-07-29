import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('🔄 Iniciando PUT /api/paginas/[slug]/content')
    console.log('📝 Slug recebido:', params.slug)
    
    const body = await request.json()
    console.log('📦 Body recebido:', body)
    
    const { fieldId, value } = body
    console.log('🔍 FieldId:', fieldId, 'Value:', value)

    if (!fieldId || value === undefined) {
      console.error('❌ FieldId ou value não fornecidos')
      return NextResponse.json(
        { error: 'FieldId e value são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar a página atual
    console.log('🔍 Buscando página no banco...')
    const pagina = await prisma.pagina.findUnique({
      where: { slug: params.slug }
    })

    if (!pagina) {
      console.error('❌ Página não encontrada:', params.slug)
      return NextResponse.json(
        { error: 'Página não encontrada' },
        { status: 404 }
      )
    }

    console.log('✅ Página encontrada:', pagina.id)
    console.log('📄 Conteúdo atual:', pagina.conteudo)

    // Atualizar o conteúdo específico
    const conteudoAtual = pagina.conteudo as any
    const novoConteudo = {
      ...conteudoAtual,
      [fieldId]: value
    }

    console.log('🔄 Novo conteúdo:', novoConteudo)

    // Salvar a página atualizada
    console.log('💾 Salvando no banco...')
    const paginaAtualizada = await prisma.pagina.update({
      where: { slug: params.slug },
      data: {
        conteudo: novoConteudo,
        updatedAt: new Date()
      }
    })

    console.log('✅ Página atualizada com sucesso:', paginaAtualizada.id)

    return NextResponse.json({ 
      success: true, 
      message: 'Conteúdo atualizado com sucesso',
      fieldId,
      value 
    })
  } catch (error) {
    console.error('❌ Erro detalhado ao atualizar conteúdo:', error)
    
    if (error instanceof Error) {
      console.error('📝 Mensagem de erro:', error.message)
      console.error('📚 Stack trace:', error.stack)
    }
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor', 
        details: error instanceof Error ? error.message : 'Erro desconhecido',
        fieldId: body?.fieldId,
        slug: params.slug
      },
      { status: 500 }
    )
  }
}