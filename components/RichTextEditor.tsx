"use client"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Quote } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const applyFormat = (format: string) => {
    const textarea = document.getElementById('rich-text-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    let newText = value
    let newCursorPos = start

    switch (format) {
      case 'bold':
        newText = value.substring(0, start) + `**${selectedText}**` + value.substring(end)
        newCursorPos = start + selectedText.length + 4
        break
      case 'italic':
        newText = value.substring(0, start) + `*${selectedText}*` + value.substring(end)
        newCursorPos = start + selectedText.length + 2
        break
      case 'list':
        const lines = selectedText.split('\n')
        const formattedLines = lines.map(line => line ? `- ${line}` : line)
        newText = value.substring(0, start) + formattedLines.join('\n') + value.substring(end)
        newCursorPos = start + formattedLines.join('\n').length
        break
      case 'ordered-list':
        const orderedLines = selectedText.split('\n')
        const formattedOrderedLines = orderedLines.map((line, index) => line ? `${index + 1}. ${line}` : line)
        newText = value.substring(0, start) + formattedOrderedLines.join('\n') + value.substring(end)
        newCursorPos = start + formattedOrderedLines.join('\n').length
        break
      case 'quote':
        const quoteLines = selectedText.split('\n')
        const formattedQuoteLines = quoteLines.map(line => line ? `> ${line}` : line)
        newText = value.substring(0, start) + formattedQuoteLines.join('\n') + value.substring(end)
        newCursorPos = start + formattedQuoteLines.join('\n').length
        break
    }

    onChange(newText)
    
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat('bold')}
          className="h-8 w-8 p-0 hover:bg-gray-200"
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat('italic')}
          className="h-8 w-8 p-0 hover:bg-gray-200"
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat('list')}
          className="h-8 w-8 p-0 hover:bg-gray-200"
          title="Lista não ordenada"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat('ordered-list')}
          className="h-8 w-8 p-0 hover:bg-gray-200"
          title="Lista ordenada"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFormat('quote')}
          className="h-8 w-8 p-0 hover:bg-gray-200"
          title="Citação"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      <textarea
        id="rich-text-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite o conteúdo da página aqui... Use as ferramentas acima para formatar o texto."
        className="w-full h-64 p-4 resize-none border-0 focus:outline-none focus:ring-0 text-sm"
      />
    </div>
  )
}