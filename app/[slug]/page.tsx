import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { HeaderCustom } from '@/components/header-custom'
import { BlocoDeConteudo } from '@/components/editor/pageEditor'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPage(slug: string) {
  const pagina = await prisma.pagina.findUnique({
    where: { slug }
  })
  return pagina
}

export default async function DynamicPage({ params }: PageProps) {
  const pagina = await getPage(params.slug)

  if (!pagina) {
    notFound()
  }

  const blocos: BlocoDeConteudo[] = Array.isArray(pagina.conteudo) 
    ? pagina.conteudo 
    : JSON.parse(pagina.conteudo as string)

  const renderizarBloco = (bloco: BlocoDeConteudo) => {
    const getAlignmentClass = () => {
      switch (bloco.props.alinhamento) {
        case 'centro': return 'text-center'
        case 'direita': return 'text-right'
        default: return 'text-left'
      }
    }

    const getTamanhoClass = () => {
      switch (bloco.props.tamanho) {
        case 'pequeno': return 'text-sm'
        case 'grande': return 'text-2xl'
        default: return 'text-base'
      }
    }

    const getLarguraStyle = () => {
      if (bloco.props.larguraPersonalizada) {
        return { width: `${bloco.props.larguraPersonalizada}%` }
      }
      switch (bloco.props.largura) {
        case 'meia': return { width: '50%' }
        case 'terco': return { width: '33.333%' }
        default: return { width: '100%' }
      }
    }

    const getEspacamentoStyle = () => ({
      marginTop: bloco.props.espacamento?.topo || 0,
      marginBottom: bloco.props.espacamento?.baixo || 0,
      marginLeft: bloco.props.espacamento?.esquerda || 0,
      marginRight: bloco.props.espacamento?.direita || 0,
    })

    switch (bloco.tipo) {
      case 'titulo':
        return (
          <h1 
            className={`text-3xl font-bold ${getAlignmentClass()} ${getTamanhoClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            {bloco.props.texto}
          </h1>
        )

      case 'subtitulo':
        return (
          <h2 
            className={`text-xl font-semibold ${getAlignmentClass()} ${getTamanhoClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            {bloco.props.texto}
          </h2>
        )

      case 'paragrafo':
        return (
          <p 
            className={`${getAlignmentClass()} ${getTamanhoClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            {bloco.props.texto}
          </p>
        )

      case 'imagem':
        return (
          <div 
            className={`${getAlignmentClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            {bloco.props.url && (
              <img 
                src={bloco.props.url} 
                alt={bloco.props.alt || ''}
                className="max-w-full h-auto rounded"
                style={{ 
                  maxHeight: bloco.props.altura ? `${bloco.props.altura}px` : 'auto',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
          </div>
        )

      case 'botao':
        return (
          <div 
            className={`${getAlignmentClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            {bloco.props.texto && (
              <a 
                href={bloco.props.link || '#'}
                className={`inline-block px-6 py-3 rounded-lg font-medium transition-colors ${
                  bloco.props.estilo === 'outline' 
                    ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white' 
                    : bloco.props.estilo === 'secundario'
                    ? 'bg-gray-600 text-white hover:bg-gray-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {bloco.props.texto}
              </a>
            )}
          </div>
        )

      case 'separador':
        return (
          <div 
            className={`${getAlignmentClass()}`}
            style={{ ...getLarguraStyle(), ...getEspacamentoStyle() }}
          >
            <hr className="border-gray-300 my-4" />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderCustom />
      
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <div className="space-y-6">
          {blocos.map((bloco) => (
            <div key={bloco.id}>
              {renderizarBloco(bloco)}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}