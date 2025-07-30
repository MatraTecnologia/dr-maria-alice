"use client"
import { HeaderCustom } from "@/components/header-custom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Settings, Phone, Calendar } from "lucide-react"
import Link from "next/link"

interface Configuracoes {
  telefone: string
  link_agendamento: string
}

export default function ConfiguracoesPage() {
  const [configuracoes, setConfiguracoes] = useState<Configuracoes>({
    telefone: '+5521999999999',
    link_agendamento: '/contato'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    carregarConfiguracoes()
  }, [])

  const carregarConfiguracoes = async () => {
    try {
      const response = await fetch('/api/configuracoes')
      if (response.ok) {
        const data = await response.json()
        setConfiguracoes(data)
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const salvarConfiguracao = async (chave: string, valor: string) => {
    setSaving(true)
    try {
      const response = await fetch('/api/configuracoes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chave, valor })
      })

      if (response.ok) {
        setConfiguracoes(prev => ({ ...prev, [chave]: valor }))
        console.log(`✅ Configuração ${chave} salva com sucesso!`)
      } else {
        console.error('❌ Erro ao salvar configuração')
      }
    } catch (error) {
      console.error('❌ Erro ao salvar configuração:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderCustom />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">Carregando...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeaderCustom />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações</h1>
            <p className="text-gray-600">Gerencie os links e configurações do site</p>
          </div>

          <div className="space-y-6">
            {/* Configuração do Telefone */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Telefone para Contato
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="telefone" className="text-sm font-medium text-gray-700">
                    Número do Telefone
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={configuracoes.telefone}
                    onChange={(e) => setConfiguracoes(prev => ({ ...prev, telefone: e.target.value }))}
                    placeholder="+5521999999999"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Formato: +55 (código do país) (DDD) (número)
                  </p>
                </div>
                <Button
                  onClick={() => salvarConfiguracao('telefone', configuracoes.telefone)}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? 'Salvando...' : 'Salvar Telefone'}
                </Button>
              </CardContent>
            </Card>

            {/* Configuração do Link de Agendamento */}
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Link de Agendamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="link_agendamento" className="text-sm font-medium text-gray-700">
                    Página de Agendamento
                  </Label>
                  <Input
                    id="link_agendamento"
                    type="text"
                    value={configuracoes.link_agendamento}
                    onChange={(e) => setConfiguracoes(prev => ({ ...prev, link_agendamento: e.target.value }))}
                    placeholder="/contato"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Exemplo: /contato, /agendamento, /marcar-consulta
                  </p>
                </div>
                <Button
                  onClick={() => salvarConfiguracao('link_agendamento', configuracoes.link_agendamento)}
                  disabled={saving}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {saving ? 'Salvando...' : 'Salvar Link'}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-800">Preview dos Botões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link href={`tel:${configuracoes.telefone}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar
                    </Button>
                  </Link>
                  <Link href={configuracoes.link_agendamento}>
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Consulta
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-blue-600 mt-3">
                  Estes são os botões que aparecem no header do site
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 