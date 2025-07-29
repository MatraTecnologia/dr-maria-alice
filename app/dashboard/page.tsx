"use client"
import { HeaderCustom } from "@/components/header-custom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface PageData {
  id: string;
  slug: string;
  titulo: string;
  conteudo: unknown;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [paginas, setPaginas] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPaginas();
  }, []);

  const carregarPaginas = async () => {
    try {
      const response = await fetch('/api/paginas');
      if (response.ok) {
        const data = await response.json();
        setPaginas(data);
      }
    } catch (error) {
      console.error('Erro ao carregar páginas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPage = (slug: string) => {
    window.open(`/${slug}`, '_blank');
  };

  const contarBlocos = (conteudo: unknown) => {
    if (Array.isArray(conteudo)) {
      return conteudo.length;
    }
    try {
      const blocos = JSON.parse(JSON.stringify(conteudo)); // Deep copy to avoid modifying original state
      return Array.isArray(blocos) ? blocos.length : 0;
    } catch {
      return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderCustom />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Header do Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel de Controle</h1>
          <p className="text-gray-600">Visualize o conteúdo das páginas do site</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Páginas</p>
                  <p className="text-2xl font-bold text-gray-900">{paginas.length}</p>
                </div>
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Publicadas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {paginas.length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Última Modificação</p>
                  <p className="text-sm font-bold text-gray-900">
                    {paginas.length > 0 
                      ? new Date(paginas[0].updatedAt).toLocaleDateString('pt-BR')
                      : 'N/A'
                    }
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Páginas */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Páginas do Site</h2>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Carregando páginas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {paginas.map((pagina) => (
                <Card key={pagina.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pagina.titulo}</CardTitle>
                    </div>
                    <CardDescription>
                      Slug: /{pagina.slug}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Campos editáveis: {contarBlocos(pagina.conteudo)}</span>
                        <span>Modificado: {new Date(pagina.updatedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePreviewPage(pagina.slug)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar Página
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && paginas.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhuma página encontrada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}