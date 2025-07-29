export type Pagina = {
    id?: string
    titulo: string
    slug: string
    conteudo: BlocoDeConteudo[];
    createdAt?: string
    updatedAt?: string
}

export type BlocoDeConteudo = {
    tipo: 'texto' | 'imagem' | 'titulo' | 'lista' | 'video'
    valor: string
}