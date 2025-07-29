'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BlockRenderer from './blockRenderer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Type, 
  Image, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Trash2, 
  Plus,
  Save
} from 'lucide-react'

export type BlocoDeConteudo = {
  id: string
  tipo: 'titulo' | 'subtitulo' | 'paragrafo' | 'imagem' | 'botao' | 'separador' | 'container'
  props: {
    texto?: string
    url?: string
    alinhamento?: 'esquerda' | 'centro' | 'direita'
    tamanho?: 'pequeno' | 'medio' | 'grande'
    cor?: string
    espacamento?: {
      topo?: number
      baixo?: number
      esquerda?: number
      direita?: number
    }
    largura?: 'completa' | 'meia' | 'terco'
    altura?: number
    alt?: string
    link?: string
    estilo?: 'primario' | 'secundario' | 'outline'
    larguraPersonalizada?: number
    linhasTexto?: number
  }
}

interface PageEditorProps {
  paginaExistente?: {
    id: string
    titulo: string
    slug: string
    conteudo: BlocoDeConteudo[]
  }
}

export default function PageEditor({ paginaExistente }: PageEditorProps) {
  const [blocos, setBlocos] = useState<BlocoDeConteudo[]>(paginaExistente?.conteudo || [])
  const [blocoSelecionado, setBlocoSelecionado] = useState<string | null>(null)
  const [paginaInfo, setPaginaInfo] = useState({
    titulo: paginaExistente?.titulo || '',
    slug: paginaExistente?.slug || ''
  })

  // Carregar dados da página existente
  useEffect(() => {
    if (paginaExistente) {
      setBlocos(paginaExistente.conteudo)
      setPaginaInfo({
        titulo: paginaExistente.titulo,
        slug: paginaExistente.slug
      })
    }
  }, [paginaExistente])

  function adicionarBloco(tipo: BlocoDeConteudo['tipo']) {
    const novoBloco: BlocoDeConteudo = {
      id: uuidv4(),
      tipo,
      props: {
        alinhamento: 'esquerda',
        espacamento: { topo: 16, baixo: 16, esquerda: 0, direita: 0 },
        largura: 'completa'
      }
    }
    setBlocos([...blocos, novoBloco])
    setBlocoSelecionado(novoBloco.id)
  }

  function atualizarBloco(id: string, novosProps: BlocoDeConteudo['props']) {
    setBlocos(prev =>
      prev.map(b => (b.id === id ? { ...b, props: { ...b.props, ...novosProps } } : b))
    )
  }

  function removerBloco(id: string) {
    setBlocos(prev => prev.filter(b => b.id !== id))
    setBlocoSelecionado(null)
  }

  function moverBloco(id: string, direcao: 'cima' | 'baixo') {
    setBlocos(prev => {
      const index = prev.findIndex(b => b.id === id)
      if (index === -1) return prev
      
      const novaLista = [...prev]
      if (direcao === 'cima' && index > 0) {
        [novaLista[index], novaLista[index - 1]] = [novaLista[index - 1], novaLista[index]]
      } else if (direcao === 'baixo' && index < novaLista.length - 1) {
        [novaLista[index], novaLista[index + 1]] = [novaLista[index + 1], novaLista[index]]
      }
      return novaLista
    })
  }

  async function salvarPagina() {
    if (!paginaInfo.titulo.trim() || !paginaInfo.slug.trim()) {
      alert('Por favor, preencha o título e slug da página')
      return
    }

    try {
      const url = paginaExistente 
        ? `/api/paginas/${paginaInfo.slug}` 
        : '/api/paginas'
      
      const method = paginaExistente ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: paginaInfo.titulo,
          slug: paginaInfo.slug,
          conteudo: blocos
        })
      })

      if (response.ok) {
        alert(paginaExistente ? 'Página atualizada com sucesso!' : 'Página salva com sucesso!')
      } else {
        const error = await response.json()
        alert(`Erro ao salvar: ${error.error}`)
      }
    } catch (error) {
      console.error('Erro ao salvar página:', error)
      alert('Erro ao salvar página. Verifique o console para mais detalhes.')
    }
  }

  const blocoAtual = blocos.find(b => b.id === blocoSelecionado)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar de Controles */}
      <div className="w-80 bg-white border-r border-gray-200 p-4 space-y-4 overflow-y-auto">
        {/* Informações da Página */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Informações da Página</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Título da Página
              </label>
              <input
                type="text"
                value={paginaInfo.titulo}
                onChange={(e) => setPaginaInfo(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Digite o título da página"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Slug da Página
              </label>
              <input
                type="text"
                value={paginaInfo.slug}
                onChange={(e) => setPaginaInfo(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="exemplo-pagina"
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL amigável (ex: /exemplo-pagina)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Adicionar Blocos</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('titulo')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Type className="h-5 w-5 mb-1" />
              <span className="text-xs">Título</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('subtitulo')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Type className="h-5 w-5 mb-1" />
              <span className="text-xs">Subtítulo</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('paragrafo')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Type className="h-5 w-5 mb-1" />
              <span className="text-xs">Texto</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('imagem')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Image className="h-5 w-5 mb-1" />
              <span className="text-xs">Imagem</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('botao')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Botão</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => adicionarBloco('separador')}
              className="flex flex-col items-center p-3 h-auto"
            >
              <div className="h-5 w-5 mb-1 border-t-2 border-gray-400" />
              <span className="text-xs">Separador</span>
            </Button>
          </div>
        </div>

        {/* Controles do Bloco Selecionado */}
        {blocoAtual && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Propriedades do Bloco</h4>
              
              {/* Alinhamento */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Alinhamento</label>
                <div className="flex gap-1">
                  <Button
                    variant={blocoAtual.props.alinhamento === 'esquerda' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => atualizarBloco(blocoAtual.id, { alinhamento: 'esquerda' })}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={blocoAtual.props.alinhamento === 'centro' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => atualizarBloco(blocoAtual.id, { alinhamento: 'centro' })}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={blocoAtual.props.alinhamento === 'direita' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => atualizarBloco(blocoAtual.id, { alinhamento: 'direita' })}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Largura */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Largura</label>
                <select 
                  value={blocoAtual.props.largura || 'completa'}
                  onChange={(e) => atualizarBloco(blocoAtual.id, { largura: e.target.value as BlocoDeConteudo['props']['largura'] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="completa">Largura Completa</option>
                  <option value="meia">Meia Largura</option>
                  <option value="terco">Um Terço</option>
                </select>
              </div>

              {/* Largura Personalizada */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Largura Personalizada (%)</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={blocoAtual.props.larguraPersonalizada || 100}
                  onChange={(e) => atualizarBloco(blocoAtual.id, { 
                    larguraPersonalizada: parseInt(e.target.value) || 100 
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="100"
                />
              </div>

              {/* Altura (para imagens e containers) */}
              {(blocoAtual.tipo === 'imagem' || blocoAtual.tipo === 'container') && (
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Altura (px)</label>
                  <input
                    type="number"
                    min="50"
                    max="800"
                    value={blocoAtual.props.altura || 300}
                    onChange={(e) => atualizarBloco(blocoAtual.id, { 
                      altura: parseInt(e.target.value) || 300 
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="300"
                  />
                </div>
              )}

              {/* Altura do Texto (para parágrafos) */}
              {blocoAtual.tipo === 'paragrafo' && (
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Linhas do Texto</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={blocoAtual.props.linhasTexto || 4}
                    onChange={(e) => atualizarBloco(blocoAtual.id, { 
                      linhasTexto: parseInt(e.target.value) || 4 
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="4"
                  />
                </div>
              )}

              {/* Tamanho do Texto */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Tamanho do Texto</label>
                <select 
                  value={blocoAtual.props.tamanho || 'medio'}
                  onChange={(e) => atualizarBloco(blocoAtual.id, { tamanho: e.target.value as BlocoDeConteudo['props']['tamanho'] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>

              {/* Espaçamento */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Espaçamento (px)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs">Topo</label>
                    <input
                      type="number"
                      value={blocoAtual.props.espacamento?.topo || 0}
                      onChange={(e) => atualizarBloco(blocoAtual.id, { 
                        espacamento: { ...blocoAtual.props.espacamento, topo: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full p-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs">Baixo</label>
                    <input
                      type="number"
                      value={blocoAtual.props.espacamento?.baixo || 0}
                      onChange={(e) => atualizarBloco(blocoAtual.id, { 
                        espacamento: { ...blocoAtual.props.espacamento, baixo: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full p-1 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moverBloco(blocoAtual.id, 'cima')}
                  className="flex-1"
                >
                  ↑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moverBloco(blocoAtual.id, 'baixo')}
                  className="flex-1"
                >
                  ↓
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removerBloco(blocoAtual.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Área de Edição */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Editor de Páginas</h2>
            <Button 
              onClick={salvarPagina} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!paginaInfo.titulo.trim() || !paginaInfo.slug.trim()}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Página
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border min-h-full p-8">
            {blocos.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                <Type className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Clique nos blocos na barra lateral para começar a editar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blocos.map((bloco, index) => (
                  <div
                    key={bloco.id}
                    className={`relative group cursor-pointer ${
                      blocoSelecionado === bloco.id ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
                    }`}
                    onClick={() => setBlocoSelecionado(bloco.id)}
                    style={{
                      marginTop: bloco.props.espacamento?.topo || 0,
                      marginBottom: bloco.props.espacamento?.baixo || 0,
                      marginLeft: bloco.props.espacamento?.esquerda || 0,
                      marginRight: bloco.props.espacamento?.direita || 0,
                      width: bloco.props.larguraPersonalizada ? `${bloco.props.larguraPersonalizada}%` : 
                             bloco.props.largura === 'meia' ? '50%' : 
                             bloco.props.largura === 'terco' ? '33.333%' : '100%'
                    }}
                  >
                    <BlockRenderer 
                      bloco={bloco} 
                      onChange={atualizarBloco}
                    />
                    
                    {/* Overlay de seleção */}
                    {blocoSelecionado === bloco.id && (
                      <div className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
