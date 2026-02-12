import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../ui/button'

export default function Tratamento({
  url,
  titulo,
  descricao,
  link,
}: {
  url: string
  titulo: string
  descricao: string
  link: string
}) {
  return (
    <div className="flex flex-col justify-between w-72 h-[420px] gap-2 border border-[var(--e-global-color-astglobalcolor8)] rounded-[16px_16px_16px_0px] transition-colors duration-300 p-4 bg-white shadow">
      <Image
        src={url}
        alt="Imagem"
        draggable={false}
        className="w-[288px] h-40 object-cover rounded"
        priority
        width={288}
        height={160}
      />
      <div className="flex flex-col flex-1 justify-between">
        <h3 className="text-lg font-bold mt-2 mb-1">{titulo}</h3>
        <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-4">
          {descricao}
        </p>
        <Button asChild variant="outline" className="w-full mt-auto">
          <Link href={link}>Saiba Mais</Link>
        </Button>
      </div>
    </div>
  )
}
