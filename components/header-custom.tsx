'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Calendar, ChevronDown, Menu, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const tratamentosItems = [
  { href: '/emagrecimento', label: 'Emagrecimento' },
  { href: '/partica-ortomolecular', label: 'Prática Ortomolecular' },
  { href: '/envelhecimento-saudavel', label: 'Envelhecimento Saudável' },
  { href: '/modulacao-hormonal', label: 'Modulação Hormonal' },
  { href: '/disturbios-do-sono', label: 'Distúrbios do Sono' },
  { href: '/estresse-fisico-emocional', label: 'Estresse Físico e Emocional' },
]

const examesItems = [
  { href: '/dosagem-de-iodo', label: 'Dosagem de Iodo' },
  { href: '/perfil-nutrigenetico', label: 'Perfil Nutrigenético' },
  { href: '/microbioma-intestinal', label: 'Microbioma Intestinal' },
  { href: '/trombofilia', label: 'Trombofilia' },
  { href: '/histamina', label: 'Histamina – Estudo da Metilação' },
  { href: '/alzheimer', label: 'Alzheimer' },
  { href: '/hormonal-salivar', label: 'Hormonal Salivar' },
  { href: '/gene-mais', label: 'Gene +' },
  { href: '/gene-x', label: 'Gene X' },
  { href: '/copromax', label: 'Copromax' },
]

export const HeaderCustom = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [openTratamentos, setOpenTratamentos] = useState(false)
  const [openExames, setOpenExames] = useState(false)
  const [configuracoes, setConfiguracoes] = useState({
    telefone: '+5521999999999',
    link_agendamento: '/contato',
  })
  const { isSignedIn } = useUser()
  const isActive = (href: string) => pathname === href
  const isInSection = (items: { href: string }[]) =>
    items.some(item => pathname === item.href)

  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const response = await fetch('/api/configuracoes')
        if (response.ok) {
          const data = await response.json()
          setConfiguracoes(data)
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }

    carregarConfiguracoes()
  }, [])

  return (
    <header className="w-full border-blue-100/50 bg-transparent">
      <div className="container mx-auto">
        <div className="flex h-20 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/logo.png"
                alt="Dra. Maria Alice - Medicina Integrativa"
                width={160}
                height={40}
                draggable={false}
                className="transition-transform duration-300 group-hover:scale-105 w-40 h-10"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                isActive('/')
                  ? 'text-blue-700 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              INÍCIO
            </Link>

            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                    isActive('/dashboard')
                      ? 'text-blue-700 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  DASHBOARD
                </Link>
                <Link
                  href="/configuracoes"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                    isActive('/configuracoes')
                      ? 'text-blue-700 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  CONFIGURAÇÕES
                </Link>
              </>
            ) : null}

            <Link
              href="/bio"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                isActive('/bio')
                  ? 'text-blue-700 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              BIOGRAFIA
            </Link>

            {/* Tratamentos Dropdown */}
            <div
              onMouseEnter={() => setOpenTratamentos(true)}
              onMouseLeave={() => setOpenTratamentos(false)}
              className="relative"
            >
              <Popover open={openTratamentos} onOpenChange={setOpenTratamentos}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                      isInSection(tratamentosItems)
                        ? 'text-blue-700 bg-blue-50 shadow-sm'
                        : 'text-gray-700'
                    }`}
                    onClick={() => router.push('/tratamentos')}
                  >
                    TRATAMENTOS
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        openTratamentos ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-72 p-2 bg-white/95 backdrop-blur-xl border-blue-100 shadow-xl"
                  sideOffset={8}
                >
                  <div className="space-y-1">
                    {tratamentosItems.map(item => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start text-left h-auto p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 ${
                          isActive(item.href)
                            ? 'text-blue-700 bg-blue-50 shadow-sm'
                            : 'text-gray-700'
                        }`}
                        onClick={() => {
                          router.push(item.href)
                          setOpenTratamentos(false)
                        }}
                      >
                        <div className="text-sm font-medium">{item.label}</div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Exames Dropdown */}
            <div
              onMouseEnter={() => setOpenExames(true)}
              onMouseLeave={() => setOpenExames(false)}
              className="relative"
            >
              <Popover open={openExames} onOpenChange={setOpenExames}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                      isInSection(examesItems)
                        ? 'text-blue-700 bg-blue-50 shadow-sm'
                        : 'text-gray-700'
                    }`}
                  >
                    EXAMES ESPECIAIS
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                        openExames ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-80 p-2 bg-white/95 backdrop-blur-xl border-blue-100 shadow-xl"
                  sideOffset={8}
                >
                  <div className="space-y-1">
                    {examesItems.map(item => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start text-left h-auto p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1 ${
                          isActive(item.href)
                            ? 'text-blue-700 bg-blue-50 shadow-sm'
                            : 'text-gray-700'
                        }`}
                        onClick={() => {
                          router.push(item.href)
                          setOpenExames(false)
                        }}
                      >
                        <div className="text-sm font-medium">{item.label}</div>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Link
              href="/contato"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 ${
                isActive('/contato')
                  ? 'text-blue-700 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              CONTATO
            </Link>
          </nav>

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {isSignedIn ? (
              <>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Sair
                  </Button>
                </SignOutButton>
              </>
            ) : null}
            <Link href={`tel:${configuracoes.telefone}`}>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Ligar
              </Button>
            </Link>
            <Link href={configuracoes.link_agendamento}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerTitle className="sr-only">Menu de Navegação</DrawerTitle>
              <DrawerContent className="bg-white/95 backdrop-blur-xl">
                <div className="mx-auto w-full max-w-sm max-h-screen overflow-y-auto">
                  <div className="p-6 space-y-4">
                    {/* Mobile Logo */}
                    <div className="flex justify-center pb-4 border-b border-blue-100">
                      <Image
                        src="/logo.png"
                        alt="logo"
                        width={140}
                        height={35}
                        priority
                        draggable={false}
                        className="w-35 h-8.75"
                      />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="space-y-2">
                      <Link
                        href="/"
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                          isActive('/')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        INÍCIO
                      </Link>

                      <Link
                        href="/bio"
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                          isActive('/bio')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        BIOGRAFIA
                      </Link>

                      {/* Mobile Tratamentos */}
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg">
                          TRATAMENTOS
                        </div>
                        <div className="pl-4 space-y-1">
                          {tratamentosItems.map(item => (
                            <Button
                              key={item.href}
                              variant="ghost"
                              className={`w-full justify-start text-left h-auto p-3 rounded-lg transition-all duration-300 ${
                                isActive(item.href)
                                  ? 'text-blue-700 bg-blue-50'
                                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                              }`}
                              onClick={() => router.push(item.href)}
                            >
                              {item.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Exames */}
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg">
                          EXAMES ESPECIAIS
                        </div>
                        <div className="pl-4 space-y-1">
                          {examesItems.map(item => (
                            <Button
                              key={item.href}
                              variant="ghost"
                              className={`w-full justify-start text-left h-auto p-3 rounded-lg transition-all duration-300 ${
                                isActive(item.href)
                                  ? 'text-blue-700 bg-blue-50'
                                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                              }`}
                              onClick={() => router.push(item.href)}
                            >
                              {item.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <Link
                        href="/contato"
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                          isActive('/contato')
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        CONTATO
                      </Link>
                      {isSignedIn ? (
                        <Link
                          href="/configuracoes"
                          className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                            isActive('/configuracoes')
                              ? 'text-blue-700 bg-blue-50'
                              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                          }`}
                        >
                          CONFIGURAÇÕES
                        </Link>
                      ) : null}
                    </div>

                    {/* Mobile CTA Buttons */}
                    <div className="pt-4 border-t border-blue-100 space-y-3">
                      <Link
                        href={`tel:${configuracoes.telefone}`}
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Ligar Agora
                        </Button>
                      </Link>
                      <Link
                        href={configuracoes.link_agendamento}
                        className="block"
                      >
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg">
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar Consulta
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
}
