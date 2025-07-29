import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const pagina = await prisma.pagina.findUnique({
      where: { slug: params.slug }
    })

    if (!pagina) {
      return NextResponse.json(
        { error: 'Página não encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(pagina)
  } catch (error) {
    console.error('Erro ao buscar página:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json()
    const { titulo, conteudo } = body

    const paginaAtualizada = await prisma.pagina.update({
      where: { slug: params.slug },
      data: {
        titulo,
        conteudo,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(paginaAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar página:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.pagina.delete({
      where: { slug: params.slug }
    })

    return NextResponse.json({ message: 'Página excluída com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir página:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}