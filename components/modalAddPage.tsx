"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import dynamic from "next/dynamic"

// Importação dinâmica do editor de texto rico
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded-md animate-pulse" />
})

interface ModalAddPageProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModalAddPage({ isOpen, onClose }: ModalAddPageProps) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    content: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui será implementada a lógica para salvar a página
    console.log("Dados do formulário:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Nova Página</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
                Slug
              </Label>
              <Input
                id="slug"
                type="text"
                placeholder="exemplo-pagina"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500">
                URL amigável da página (ex: /exemplo-pagina)
              </p>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Título da página"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              Conteúdo
            </Label>
            <div className="border border-gray-300 rounded-md focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <RichTextEditor
                value={formData.content}
                onChange={(content) => handleInputChange("content", content)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Criar Página
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}