"use client"
import { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Send,
  CarFront,
  Clock
} from 'lucide-react'; 

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Contact us",
      info: "+54 9 1124663784",
      description: "Monday to Saturday, 9am to 8pm"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "motecarssales@gmail.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Palermo",
      description: "Capital Federal, CP 1425"
    }
  ];
  const handleClick = () => {
    const phoneNumber = '+5491124663784';
    const message = 'Hola! Me interesa que me contacten.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

return (
  <div className="min-h-screen dark:bg-gray-100 py-12 my-12">
    <div className="container mx-auto px-4">
      {/* Encabezado */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <MessageCircle className="w-16 h-16 text-brand" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-900 mb-6">
          Contáctanos
        </h1>
        <p className="text-xl text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
          ¿Tienes preguntas sobre un auto clásico específico o necesitas asistencia? 
          Estamos aquí para ayudarte a encontrar tu vehículo soñado.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-6 backdrop-blur-sm text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-brand font-semibold mb-1">{item.info}</p>
              <p className="text-gray-400 dark:text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Tu Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg pl-10 pr-4 py-3 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg pl-10 pr-4 py-3 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Número de Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg pl-10 pr-4 py-3 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Interés */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Estoy Interesado En
                </label>
                <div className="relative">
                  <CarFront className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg pl-10 pr-4 py-3 text-white dark:text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand"
                    required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="buying">Comprar un Auto Clásico</option>
                    <option value="selling">Vender mi Auto Clásico</option>
                    <option value="valuation">Valuación de Auto</option>
                    <option value="other">Otra Consulta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-white dark:text-gray-900 font-medium mb-2">
                Tu Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg px-4 py-3 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Cuéntanos sobre tu interés en autos clásicos..."
                required
              />
            </div>

            {/* Método de Contacto Preferido */}
            <div>
              <label className="block text-white dark:text-gray-900 font-medium mb-2">
                Método de Contacto Preferido
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                    className="mr-2 text-brand focus:ring-brand"
                  />
                  <span className="text-white dark:text-gray-900">Correo</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                    className="mr-2 text-brand focus:ring-brand"
                  />
                  <span className="text-white dark:text-gray-900">Teléfono</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleClick}
              className="w-full bg-brand text-white dark:text-gray-900 py-4 rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Send className="w-5 h-5" />
              Enviar Mensaje
            </button>
           {/* <Link
            href="/contact"
            className="bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
              <Send className="w-5 h-5" />
              Send Message
          </Link>*/}
          </form>

          {/* Horario Laboral */}
          <div className="mt-8 pt-8 border-t border-gray-700/50 dark:border-gray-300/50">
            <div className="flex items-center gap-2 justify-center text-gray-400 dark:text-gray-600">
              <Clock className="w-5 h-5" />
              <span>Horario de Atención: Lunes - Viernes, 9:00 AM - 6:00 PM PST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}