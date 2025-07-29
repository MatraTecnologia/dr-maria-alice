import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { titulo, slug, conteudo } = body

    // Verificar se a página já existe
    const paginaExistente = await prisma.pagina.findUnique({
      where: { slug }
    })

    if (paginaExistente) {
      return NextResponse.json(
        { error: 'Página com este slug já existe' },
        { status: 400 }
      )
    }

    // Criar nova página
    const novaPagina = await prisma.pagina.create({
      data: {
        titulo,
        slug,
        conteudo, // Já é um JSON, não precisa stringify
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    return NextResponse.json(novaPagina, { status: 201 })
  } catch (error) {
    console.error('Erro ao salvar página:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const paginas = await prisma.pagina.findMany({
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(paginas)
  } catch (error) {
    console.error('Erro ao buscar páginas:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}