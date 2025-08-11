"use client"
import { HeaderCustom } from "@/components/header-custom"
import { MapPin, Phone, Clock, Navigation, MessageCircle } from "lucide-react"

const Contact = () => {
    const handleDirections = () => {
        const address = "R. Voluntários da Pátria, 3744 - Santana, São Paulo - SP, 02402-400"
        const encodedAddress = encodeURIComponent(address)
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, "_blank")
    }

    return (
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-green-50/80 pointer-events-none" />
                <div className="relative z-10">
                    <HeaderCustom />

                    {/* Hero Section */}
                    <div className="text-center mb-8 mt-6 sm:mt-10">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                            Agende sua Consulta
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Medicina Integrativa para sua saúde e bem-estar</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Info and Booking */}
                        <div className="space-y-6">
                            {/* Main Info Card */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">Dra. Maria Alice</h2>
                                        <p className="text-blue-600 font-medium">Medicina Integrativa</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    A Clínica Dra. Maria Alice Fernandes de Miranda busca através da Medicina Integrativa oferecer saúde e
                                    bem-estar aos pacientes, utilizando recursos eficazes para o diagnóstico e tratamentos.
                                </p>

                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/5511993049032?text=Olá! Gostaria de agendar um atendimento."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    Agendar via WhatsApp
                                </a>
                            </div>

                            {/* Clinic Image */}
                            {/* Remover este bloco completamente */}
                        </div>

                        {/* Right Column - Map and Location */}
                        <div className="space-y-6">
                            {/* Location Info Card */}
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">Localização</h3>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-gray-800">Endereço</p>
                                            <p className="text-gray-600">R. Voluntários da Pátria, 3744</p>
                                            <p className="text-gray-600">Santana, São Paulo - SP</p>
                                            <p className="text-gray-600">CEP: 02402-400</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-green-500" />
                                        <div>
                                            <p className="font-medium text-gray-800">Horário de Funcionamento</p>
                                            <p className="text-gray-600">Segunda a Sexta: 8h às 18h</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Directions Button */}
                                <button
                                    onClick={handleDirections}
                                    className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold py-4 px-6 rounded-xl text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <Navigation className="w-6 h-6" />
                                    Como Chegar
                                </button>
                            </div>


                        </div>
                    </div>
                    {/* Map */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white/20 col-span-1 lg:col-span-2 mt-4">
                        <div className="rounded-xl overflow-hidden h-80 lg:h-[420px] w-full">
                            <iframe
                                src="https://www.google.com/maps?q=R.+Voluntários+da+Pátria,+3744+-+Santana,+São+Paulo+-+SP,+02402-400&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa da clínica"
                                className="rounded-lg w-full h-full"
                            />
                        </div>
                    </div>
                    {/* Contact Methods */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">WhatsApp</h4>
                            <p className="text-gray-600 text-sm">Agendamento rápido e fácil</p>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Telefone</h4>
                            <p className="text-gray-600 text-sm">Atendimento personalizado</p>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center border border-white/20 hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-800 mb-2">Presencial</h4>
                            <p className="text-gray-600 text-sm">Visite nossa clínica</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact;
