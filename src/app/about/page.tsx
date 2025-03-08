
import {
  ShieldCheck,
  Award,
  Wrench,
  Users,
  CarFront,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Sellers",
      description: "All our sellers go through a rigorous verification process to ensure the highest quality and authenticity of our classic cars."
    },
    {
      icon: Award,
      title: "Expert Curation",
      description: "Each vehicle in our collection is carefully selected and inspected by classic car experts with decades of experience."
    },
    {
      icon: Wrench,
      title: "Detailed History",
      description: "Complete documentation and maintenance history for every vehicle, ensuring transparency and peace of mind."
    }
  ];

  const stats = [
    { number: "4+", label: "Classic Cars" },
    { number: "2+", label: "Happy Collectors" },
    { number: "1+", label: "Years Experience" },
    { number: "101%", label: "Satisfaction" }
  ];

  return (
    <div className="min-h-screen  dark:bg-gray-100 py-12 my-12">
      {/* Sección Hero */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <CarFront className="w-16 h-16 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-900 mb-6">
            Descubre el Legado de los Autos Clásicos
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-600 max-w-3xl mx-auto">
            Bienvenido al destino principal para entusiastas de autos clásicos y muscle cars.
            Nuestra pasión por la historia automotriz nos impulsa a seleccionar la mejor colección
            de vehículos atemporales.
          </p>
        </div>

        {/* Sección de Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-backgroundtertiary dark:bg-white/50 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-bold text-brand mb-2">{stat.number}</div>
              <div className="text-gray-400 dark:text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Cuadrícula de Características */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-backgroundtertiary dark:bg-white/50 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Sección de Historia */}
        <div className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-8 backdrop-blur-sm mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4">
                Nuestra Historia
              </h2>
              <p className="text-gray-400 dark:text-gray-600 mb-4">
                Mote Cars nació de una profunda pasión por los autos clásicos y una ambición imparable de devolver a la vida a leyendas automotrices. Con solo un año en el mercado, ya nos hemos establecido como un nombre de confianza en la importación y venta de vehículos icónicos. Nuestra misión es simple: conectar a los entusiastas con la belleza atemporal de los autos clásicos, asegurando que cada uno encuentre su hogar perfecto.</p>
              {/* <p className="text-gray-400 dark:text-gray-600">
                Cada auto cuenta una historia, y estamos aquí para ayudar a escribir el siguiente capítulo
                en las historias de estas extraordinarias máquinas. Nuestro compromiso con la autenticidad
                y la calidad nos ha convertido en el destino predilecto tanto para coleccionistas serios
                como para entusiastas.
              </p> */}
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-background dark:bg-gray-200 rounded-xl flex items-center justify-center">
            
              <Image
            src="/images/forsale/first-mustang/img1.jpg"
            alt="Autos Clásicos"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
            </div>
          </div>
        </div>

        {/* Sección del Equipo */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-brand" />
            Conoce a Nuestro Equipo
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos aporta décadas de experiencia combinada en restauración,
            autenticación y venta de autos clásicos. Estamos aquí para ayudarte a encontrar
            tu auto clásico perfecto.
          </p>
         
          <Link
  href="/contact"
  className="w-1/4 bg-brand text-white dark:text-gray-900 px-4 py-2 rounded-md hover:bg-brand/90 transition-colors duration-200 flex items-center gap-1 mx-auto text-sm justify-center"
>
  <MessageCircle className="w-4 h-4" />
  Contáctanos
</Link>
        </div>
      </div>
    </div>
  );
}