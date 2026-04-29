"use client";
import { useState, useEffect } from "react";

interface PageContent {
  [key: string]: string;
}

interface Pagina {
  id: string;
  slug: string;
  titulo: string;
  conteudo: PageContent;
  createdAt: string;
  updatedAt: string;
}

interface EditablePageProps {
  slug: string;
  initialContent?: PageContent;
  children: (
    content: PageContent,
    handleSaveContent: (fieldId: string, value: string) => Promise<void>
  ) => React.ReactNode;
}

export default function EditablePage({ slug, children, initialContent }: EditablePageProps) {
  const [content, setContent] = useState<PageContent>(initialContent || {});
  const [loading, setLoading] = useState(!initialContent);

  // Carregar conteúdo existente do banco apenas se não foi passado via props
  useEffect(() => {
    if (initialContent) return;
    
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/paginas?slug=${slug}`);
        if (response.ok) {
          const data = await response.json();
          // Filtrar pela página específica
          const pageData = data.find((page: Pagina) => page.slug === slug);
          if (pageData && pageData.conteudo) {
            setContent(pageData.conteudo);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug, initialContent]);

  const handleSaveContent = async (fieldId: string, value: string) => {
    try {
      console.log("🔄 Salvando conteúdo:", { slug, fieldId, value });

      // Salvar no banco via API
      const response = await fetch("/api/paginas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, fieldId, value }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Conteúdo salvo no banco:", result);

        // Atualiza o estado local
        setContent((prev) => ({ ...prev, [fieldId]: value }));
      } else {
        const errorData = await response.text();
        console.error("❌ Erro na resposta:", errorData);
        throw new Error(`Erro ${response.status}: ${errorData}`);
      }
    } catch (error) {
      console.error("❌ Erro ao salvar conteúdo:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {children(content, handleSaveContent)}
    </div>
  );
}
