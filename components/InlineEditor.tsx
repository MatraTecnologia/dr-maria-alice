"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Edit3 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface InlineEditorProps {
  children: React.ReactNode;
  fieldId: string;
  initialValue: string;
  onSave: (value: string) => Promise<void>;
  type?: "text" | "textarea" | "title";
  className?: string;
}

export default function InlineEditor({
  children,
  initialValue,
  onSave,
  type = "text",
  className = "",
}: InlineEditorProps) {
  const { isSignedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(value);
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar as alterações");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  // Se não estiver logado, apenas mostra o conteúdo
  if (!isSignedIn) {
    return <span className={className}>{children}</span>;
  }

  // Se estiver editando, mostra o campo de edição
  if (isEditing) {
    return (
      <div className="relative group">
        {type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            rows={4}
            autoFocus
            placeholder="Digite o conteúdo aqui..."
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            autoFocus
            placeholder="Digite o conteúdo aqui..."
          />
        )}

        {/* Botões de ação */}
        <div className="absolute -top-2 -right-2 flex gap-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="h-6 w-6 p-0 bg-green-600 hover:bg-green-700"
          >
            <Save className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            onClick={handleCancel}
            className="h-6 w-6 p-0 bg-gray-600 hover:bg-gray-700"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  // Se estiver logado mas não editando, mostra o conteúdo com botão de editar sempre visível
  return (
    <div className="relative group min-h-[24px]">
      <span className={className}>
        {children || (
          <span className="text-gray-400 italic">
            Clique para adicionar conteúdo...
          </span>
        )}
      </span>

      {/* Botão de editar (sempre visível quando logado) */}
      <Button
        size="sm"
        onClick={() => setIsEditing(true)}
        className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-blue-600 hover:bg-blue-700 transition-all duration-200"
      >
        <Edit3 className="h-3 w-3" />
      </Button>
    </div>
  );
}
