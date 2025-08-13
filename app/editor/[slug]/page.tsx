"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageEditor from "@/components/editor/pageEditor";
import { BlocoDeConteudo } from "@/components/editor/pageEditor";

export default function EditPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pagina, setPagina] = useState<{
    id: string;
    titulo: string;
    slug: string;
    conteudo: BlocoDeConteudo[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarPagina = useCallback(async () => {
    try {
      const response = await fetch(`/api/paginas/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPagina(data);
      } else {
        console.error("Página não encontrada");
      }
    } catch (error) {
      console.error("Erro ao carregar página:", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    carregarPagina();
  }, [carregarPagina]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Carregando editor...</p>
      </div>
    );
  }

  if (!pagina) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Página não encontrada</p>
      </div>
    );
  }

  return <PageEditor paginaExistente={pagina} />;
}
