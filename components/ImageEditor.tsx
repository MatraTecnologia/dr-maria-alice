'use client'

import { useAuth } from '@clerk/nextjs'
import { Edit3, Save, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

interface ImageEditorProps {
  fieldId: string
  initialValue?: string
  onSave: (fieldId: string, value: string) => Promise<void>
  className?: string
  alt?: string
  width?: number
  height?: number
}

export default function ImageEditor({
  fieldId,
  initialValue = '',
  onSave,
  className = '',
  alt = 'Imagem',
  width = 300,
  height = 200,
}: ImageEditorProps) {
  const { isSignedIn } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageData, setImageData] = useState(initialValue)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Atualizar imageData quando initialValue mudar
  useEffect(() => {
    // Garantir que initialValue seja uma string válida
    if (typeof initialValue === 'string' && initialValue.trim() !== '') {
      setImageData(initialValue)
    } else {
      setImageData('')
    }
  }, [initialValue])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = e => {
      const base64 = e.target?.result as string
      setImageData(base64)
      setIsEditing(true) // Entrar no modo de edição quando uma imagem é selecionada
    }
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!imageData) return

    setIsSaving(true)
    try {
      await onSave(fieldId, imageData)
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao salvar imagem:', error)
      alert('Erro ao salvar imagem. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setImageData(initialValue)
    setIsEditing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageClick = () => {
    if (isSignedIn && !isEditing) {
      fileInputRef.current?.click()
    }
  }

  // Se não estiver logado, mostra apenas a imagem
  if (!isSignedIn) {
    return (
      <div className={className}>
        {imageData &&
        typeof imageData === 'string' &&
        imageData.trim() !== '' &&
        (imageData.startsWith('data:image/') ||
          imageData.startsWith('http') ||
          imageData.startsWith('/')) ? (
          <Image
            src={imageData}
            alt={alt}
            width={width}
            height={height}
            priority
            draggable={false}
            className="w-full h-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
            Imagem não disponível
          </div>
        )}
      </div>
    )
  }

  // Se estiver logado e não editando
  if (!isEditing) {
    return (
      <div className={`relative group ${className}`}>
        {imageData &&
        typeof imageData === 'string' &&
        imageData.trim() !== '' &&
        (imageData.startsWith('data:image/') ||
          imageData.startsWith('http') ||
          imageData.startsWith('/')) ? (
          <Image
            src={imageData}
            alt={alt}
            width={width}
            height={height}
            priority
            draggable={false}
            className="w-full h-full object-cover cursor-pointer"
            style={{ objectFit: 'cover' }}
            onClick={handleImageClick}
          />
        ) : (
          <div
            className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
            onClick={handleImageClick}
          >
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">Clique para adicionar imagem</p>
            </div>
          </div>
        )}

        {/* Botão de edição que aparece no hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white text-gray-800 hover:bg-gray-100"
            onClick={handleImageClick}
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Editar
          </Button>
        </div>

        {/* Input file hidden */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    )
  }

  // Se estiver editando
  return (
    <div className={`${className} relative z-40`}>
      <div className="space-y-4">
        {/* Preview da imagem */}
        {imageData &&
          typeof imageData === 'string' &&
          imageData.trim() !== '' &&
          (imageData.startsWith('data:image/') ||
            imageData.startsWith('http') ||
            imageData.startsWith('/')) && (
            <div className="relative">
              <Image
                src={imageData}
                alt={alt}
                width={width}
                priority
                height={height}
                draggable={false}
                className="w-full h-full object-cover rounded-lg"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

        {/* Upload de nova imagem */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Selecione uma nova imagem
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Formatos aceitos: JPG, PNG, GIF. Máximo: 5MB
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 bg-white p-3 rounded-lg shadow-lg border border-gray-200 relative z-50">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving || !imageData || imageData.trim() === ''}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Salvar
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            <X className="w-4 h-4 mr-1" />
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
