import {
  Clock,
  Shield,
  Star,
  ArrowRight,
  CarFront,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  const categories = [
    "American Muscle",
    "European Classics",
    // "Vintage Sports Cars",
    // "Luxury Automobiles"
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "Every vehicle authenticated by experts"
    },
    {
      icon: Clock,
      title: "Fast Process",
      description: "Quick and secure transactions"
    },
    {
      icon: Star,
      title: "Top Condition",
      description: "Premium quality classics only"
    }
  ];

  const latestAdditions = [
    {
      id: 1,

      image: "/images/forsale/first-mustang/img1.jpg",
      year: "1965",
      name: "Ford Mustang Restomod",
      price: "$110,000"

    },
    {
      id: 2,
      image: "/images/forsale/second-mustang/file4.jpg",
      year: "1965",
      name: "Ford Mustang",
      price: "$98,000"
    },
    {
      id: 3,
      image: "/images/forsale/corvette/corvette4.jpg",
      year: "1970",
      name: "Chevrolet Corvette Stingray",
      price: "$95,000"
    }
  ];
  return (
    <div className="min-h-screen dark:bg-gray-100">

      {/* Sección Hero */}
      <div className="relative overflow-hidden h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/forsale/first-mustang/img1.jpg"
            alt="Autos Clásicos"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 py-24 flex flex-col justify-between h-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white animate-fadeIn">
              Encuentra Tu Auto
              <span className="text-brand block mt-2">Clásico Soñado</span>
            </h1>
            <div className="mt-10">
            <div className="mt-10 relative">
  <div className="absolute -inset-1 bg-[var(--brand-light)] rounded-full blur opacity-30 animate-pulse"></div>
  <Link
  href="/cars"
  className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[var(--brand)] text-[var(--foreground)] text-2xl font-bold
             hover:shadow-[0_0_20px_var(--brand-light)] 
             hover:scale-105 transition-all duration-300"
>
  VER INVENTARIO
  <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</Link>
</div>
            </div>
          </div>

          <p className="text-justify text-xl text-gray-300 animate-slideUp delay-200">
            Descubre la mejor colección de autos clásicos y muscle cars.
            Cada vehículo cuenta una historia única de la tradición automotriz.
          </p>
        </div>
      </div>

      {/* Sección de Categorías */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link
              href="/cars"
              key={index}
              className="group bg-backgroundtertiary dark:bg-white/50 rounded-xl p-6 backdrop-blur-sm hover:bg-brand/20 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2 group-hover:text-brand">
                {category}
              </h3>
              <div className="flex items-center text-gray-400 dark:text-gray-600 group-hover:text-brand">
                Explorar
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sección de Características */}
      <div className="bg-backgroundtertiary/40 dark:bg-white/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Últimas Adiciones */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900">
            Últimas Adiciones
          </h2>
          <Link
            href="/cars"
          >
            <button className="text-brand hover:text-brand/80 transition-colors flex items-center gap-2">
              Ver Todos
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestAdditions.map((car) => (
            <Link
              href={`/cars/${car.id}`}
              key={car.id}
            >
              <div
                className="bg-backgroundtertiary dark:bg-white/50 rounded-xl overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden flex items-center justify-center">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="text-brand font-semibold mb-1">{car.year}</div>
                  <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2">
                    {car.name}
                  </h3>
                  <div className="text-gray-400 dark:text-gray-600 font-semibold">
                    {car.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sección CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4">
            ¿Listo para Encontrar Tu Clásico?
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a miles de entusiastas de autos clásicos que han encontrado sus vehículos soñados a través de nuestro mercado.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/cars"
              className="bg-brand text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2"
            >
              <CarFront className="w-5 h-5" />
              Explorar Autos
            </Link>
            <Link
              href="/contact"
              className="bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Contáctanos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}