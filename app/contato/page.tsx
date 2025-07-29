"use client"
import { HeaderCustom } from "@/components/header-custom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useState } from "react"
import EditablePage from "@/components/EditablePage"
import InlineEditor from "@/components/InlineEditor"

const contactSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(1, "Telefone obrigatório"),
    message: z.string().min(1, "Mensagem obrigatória"),
    source: z.array(z.string()).optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function Contact() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            source: [],
        },
    })
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        setLoading(true)
        // Simulação de envio (substituir por chamada real com TanStack Query + Axios)
        setTimeout(() => {
            setLoading(false)
            toast.success("Mensagem enviada com sucesso!")
            form.reset()
        }, 1200)
    }

    return (
        <EditablePage slug="contato">
            {(content, handleSaveContent) => (
                <div className="min-h-screen mx-auto">
                    <section
                        className="flex flex-col px-4 sm:px-8 md:px-[6%] py-6 sm:py-10 relative"
                        style={{
                            backgroundImage: 'url("/default-section-1.svg")',
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-[#1a8ca811] pointer-events-none" />
                        <div className="relative z-10">
                            <HeaderCustom />
                            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 mt-6 sm:mt-10">
                                <div className="flex-1 min-w-0">
                                    <InlineEditor
                                        fieldId="titulo"
                                        initialValue={content.titulo || "Agende sua consulta"}
                                        onSave={(value) => handleSaveContent("titulo", value)}
                                        type="title"
                                        className="text-3xl font-bold mb-2"
                                    >
                                        {content.titulo || "Agende sua consulta"}
                                    </InlineEditor>
                                    <InlineEditor
                                        fieldId="descricao"
                                        initialValue={content.descricao || "A Clínica Dra. Maria Alice Fernandes de Miranda busca através da Medicina Integrativa oferecer saúde e bem-estar aos pacientes, utilizando recursos eficazes para o diagnóstico e tratamentos."}
                                        onSave={(value) => handleSaveContent("descricao", value)}
                                        type="textarea"
                                        className="text-blue-700 text-sm mb-4"
                                    >
                                        {content.descricao || "A Clínica Dra. Maria Alice Fernandes de Miranda busca através da Medicina Integrativa oferecer saúde e bem-estar aos pacientes, utilizando recursos eficazes para o diagnóstico e tratamentos."}
                                    </InlineEditor>
                                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                                        <Input
                                            type="text"
                                            placeholder="Nome"
                                            {...form.register("name")}
                                        />
                                        <Input
                                            type="email"
                                            placeholder="E-mail"
                                            {...form.register("email")}
                                        />
                                        <Input
                                            type="tel"
                                            placeholder="Telefone"
                                            {...form.register("phone")}
                                        />
                                        <Textarea
                                            placeholder="Mensagem"
                                            {...form.register("message")}
                                        />
                                        <div className="flex flex-col gap-2 mt-4">
                                            <label className="flex items-center gap-2">
                                                <Checkbox
                                                    value="google"
                                                    {...form.register("source")}
                                                />
                                                Google
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <Checkbox
                                                    value="facebook"
                                                    {...form.register("source")}
                                                />
                                                Facebook
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <Checkbox
                                                    value="instagram"
                                                    {...form.register("source")}
                                                />
                                                Instagram
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <Checkbox
                                                    value="indicacao"
                                                    {...form.register("source")}
                                                />
                                                Indicação
                                            </label>
                                        </div>
                                        <Button type="submit" className="mt-6" disabled={loading}>
                                            {loading ? "Enviando..." : "Enviar"}
                                        </Button>
                                    </form>
                                </div>
                                <div className="flex-1 flex flex-col gap-4 min-w-0 mt-8 md:mt-0">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-blue-500 text-xl">📞</span>
                                                <span className="font-semibold">Telefone</span>
                                            </div>
                                            <InlineEditor
                                                fieldId="telefone"
                                                initialValue={content.telefone || "11 4323-0042"}
                                                onSave={(value) => handleSaveContent("telefone", value)}
                                                className="ml-7 text-sm"
                                            >
                                                {content.telefone || "11 4323-0042"}
                                            </InlineEditor>
                                            <div className="ml-7 text-sm">11 4323-0043</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-blue-500 text-xl">💬</span>
                                                <span className="font-semibold">WhatsApp</span>
                                            </div>
                                            <div className="ml-7 text-sm">11 9 9304-9032</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-blue-500 text-xl">⏰</span>
                                                <span className="font-semibold">Horário De Atendimento</span>
                                            </div>
                                            <InlineEditor
                                                fieldId="horario"
                                                initialValue={content.horario || "Segunda – Quinta 08:00 / 18:00"}
                                                onSave={(value) => handleSaveContent("horario", value)}
                                                className="ml-7 text-sm"
                                            >
                                                {content.horario || "Segunda – Quinta 08:00 / 18:00"}
                                            </InlineEditor>
                                            <div className="ml-7 text-sm">Sexta 08:00 / 17:00</div>
                                            <div className="ml-7 text-sm">Sábado 08:00 / 16:00</div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-blue-500 font-bold text-lg mb-2">Leve-me até a clínica!</h3>
                                        <div className="rounded-lg overflow-hidden mb-2">
                                            <iframe
                                                src="https://www.google.com/maps?q=R.+Voluntários+da+Pátria,+3744+-+Santana,+São+Paulo+-+SP,+02402-400&output=embed"
                                                width="100%"
                                                height="200"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                title="Mapa da clínica"
                                            />
                                        </div>
                                        <Image
                                            src="/clinica.jpg"
                                            alt="Foto da clínica"
                                            width={400}
                                            height={120}
                                            className="rounded-lg object-cover w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-full h-auto"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </EditablePage>
    )
} 