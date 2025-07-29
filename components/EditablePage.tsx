"use client"
import { useEffect, useState } from "react"

interface PageContent {
  [key: string]: string
}

interface EditablePageProps {
  slug: string
  children: (content: PageContent, handleSaveContent: (fieldId: string, value: string) => Promise<void>) => React.ReactNode
}

export default function EditablePage({ slug, children }: EditablePageProps) {
  const [content, setContent] = useState<PageContent>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/paginas/${slug}`)
        if (response.ok) {
          const data = await response.json()
          setContent(data.conteudo || {})
        }
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [slug])

  const handleSaveContent = async (fieldId: string, value: string) => {
    try {
      console.log('🔄 Salvando conteúdo:', { fieldId, value })
      
      const response = await fetch(`/api/paginas/${slug}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldId, value })
      })

      console.log('📡 Status da resposta:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Conteúdo salvo com sucesso:', result)
        setContent(prev => ({ ...prev, [fieldId]: value }))
      } else {
        const errorData = await response.text()
        console.error('❌ Erro na resposta:', errorData)
        
        try {
          const errorJson = JSON.parse(errorData)
          throw new Error(`Erro ${response.status}: ${errorJson.error || errorJson.details || 'Erro desconhecido'}`)
        } catch {
          throw new Error(`Erro ${response.status}: ${errorData.substring(0, 100)}`)
        }
      }
    } catch (error) {
      console.error('❌ Erro ao salvar conteúdo:', error)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Carregando...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {children(content, handleSaveContent)}
    </div>
  )
}