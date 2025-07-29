import { BlocoDeConteudo } from './pageEditor'
import { Button } from '@/components/ui/button'

type Props = {
  bloco: BlocoDeConteudo
  onChange: (id: string, props: BlocoDeConteudo['props']) => void
}

export default function BlockRenderer({ bloco, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(bloco.id, { [e.target.name]: e.target.value })
  }

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

  switch (bloco.tipo) {
    case 'titulo':
      return (
        <input
          type="text"
          name="texto"
          placeholder="Digite o título"
          value={bloco.props.texto || ''}
          onChange={handleChange}
          className={`w-full p-2 text-3xl font-bold border-0 focus:outline-none focus:ring-0 ${getAlignmentClass()}`}
        />
      )
    
    case 'subtitulo':
      return (
        <input
          type="text"
          name="texto"
          placeholder="Digite o subtítulo"
          value={bloco.props.texto || ''}
          onChange={handleChange}
          className={`w-full p-2 text-xl font-semibold border-0 focus:outline-none focus:ring-0 ${getAlignmentClass()}`}
        />
      )
    
    case 'paragrafo':
      return (
        <textarea
          name="texto"
          placeholder="Digite o parágrafo"
          value={bloco.props.texto || ''}
          onChange={handleChange}
          className={`w-full p-2 border-0 focus:outline-none focus:ring-0 resize-none ${getAlignmentClass()} ${getTamanhoClass()}`}
          rows={bloco.props.linhasTexto || 4}
          style={{
            width: bloco.props.larguraPersonalizada ? `${bloco.props.larguraPersonalizada}%` : '100%'
          }}
        />
      )
    
    case 'imagem':
      return (
        <div className="space-y-2" style={{
          width: bloco.props.larguraPersonalizada ? `${bloco.props.larguraPersonalizada}%` : '100%'
        }}>
          <input
            type="text"
            name="url"
            placeholder="URL da imagem"
            value={bloco.props.url || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            name="alt"
            placeholder="Texto alternativo da imagem"
            value={bloco.props.alt || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {bloco.props.url && (
            <div className={`${getAlignmentClass()}`}>
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
            </div>
          )}
        </div>
      )
    
    case 'botao':
      return (
        <div className={`${getAlignmentClass()}`} style={{
          width: bloco.props.larguraPersonalizada ? `${bloco.props.larguraPersonalizada}%` : '100%'
        }}>
          <div className="inline-block space-y-2">
            <input
              type="text"
              name="texto"
              placeholder="Texto do botão"
              value={bloco.props.texto || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              name="link"
              placeholder="Link do botão (opcional)"
              value={bloco.props.link || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <select
              name="estilo"
              value={bloco.props.estilo || 'primario'}
              onChange={(e) => onChange(bloco.id, { estilo: e.target.value as BlocoDeConteudo['props']['estilo'] })}
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="primario">Primário</option>
              <option value="secundario">Secundário</option>
              <option value="outline">Outline</option>
            </select>
            {bloco.props.texto && (
              <Button
                variant={bloco.props.estilo === 'outline' ? 'outline' : 
                         bloco.props.estilo === 'secundario' ? 'secondary' : 'default'}
                className="mt-2"
              >
                {bloco.props.texto}
              </Button>
            )}
          </div>
        </div>
      )
    
    case 'separador':
      return (
        <div className={`${getAlignmentClass()}`}>
          <hr className="border-gray-300 my-4" style={{ 
            width: bloco.props.largura === 'meia' ? '50%' : 
                   bloco.props.largura === 'terco' ? '33.333%' : '100%' 
          }} />
        </div>
      )
    
    default:
      return null
  }
}
