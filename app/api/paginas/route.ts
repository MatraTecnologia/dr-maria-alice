import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface PageContent {
  [key: string]: string | number | boolean | null | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, slug, conteudo } = body;

    // Verificar se a página já existe
    const paginaExistente = await prisma.pagina.findUnique({
      where: { slug },
    });

    if (paginaExistente) {
      return NextResponse.json(
        { error: "Página com este slug já existe" },
        { status: 400 }
      );
    }

    // Criar nova página
    const novaPagina = await prisma.pagina.create({
      data: {
        titulo,
        slug,
        conteudo, // Já é um JSON, não precisa stringify
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(novaPagina, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar página:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const paginas = await prisma.pagina.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(paginas);
  } catch (error) {
    console.error("Erro ao buscar páginas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, fieldId, value } = body;

    if (!slug || !fieldId || value === undefined) {
      return NextResponse.json(
        { error: "Slug, fieldId e value são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar página existente
    const existingPage = await prisma.pagina.findUnique({
      where: { slug },
    });

    let conteudo: PageContent = {};
    if (existingPage) {
      conteudo = existingPage.conteudo as PageContent;
    }

    // Atualizar o campo específico
    conteudo[fieldId] = value;

    // Salvar no banco
    const paginaAtualizada = await prisma.pagina.upsert({
      where: { slug },
      update: {
        titulo: existingPage?.titulo || slug,
        conteudo,
        updatedAt: new Date(),
      },
      create: {
        slug,
        titulo: slug,
        conteudo,
      },
    });

    return NextResponse.json(paginaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar página:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
