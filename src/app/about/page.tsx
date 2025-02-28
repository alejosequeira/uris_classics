
import {
  ShieldCheck,
  Award,
  Wrench,
  Users,
  Clock,
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
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <CarFront className="w-16 h-16 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-900 mb-6">
            Discover the Legacy of Classic Cars
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-600 max-w-3xl mx-auto">
            Welcome to the premier destination for classic and muscle car enthusiasts.
            Our passion for automotive history drives us to curate the finest collection
            of timeless vehicles.
          </p>
        </div>

        {/* Stats Section */}
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

        {/* Features Grid */}
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

        {/* History Section */}
        <div className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-8 backdrop-blur-sm mb-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4">
                Our History
              </h2>
              <p className="text-gray-400 dark:text-gray-600 mb-4">
                Mote Cars was born from a deep passion for classic cars and an unstoppable ambition to bring automotive legends back to life. With just one year in the market, we have already established ourselves as a trusted name in the import and sale of iconic vehicles. Our mission is simple: to connect enthusiasts with the timeless beauty of classic cars, ensuring each one finds its perfect home.</p>
              {/* <p className="text-gray-400 dark:text-gray-600">
                Every car tells a story, and we&apos;re here to help write the next chapter
                in these remarkable machines&apos; histories. Our commitment to authenticity
                and quality has made us the go-to destination for serious collectors
                and enthusiasts alike.
              </p> */}
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-background dark:bg-gray-200 rounded-xl flex items-center justify-center">
            
              <Image
            src="/images/forsale/first-mustang/img1.jpg"
            alt="Classic Cars"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-brand" />
            Meet Our Team
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of experts brings decades of combined experience in classic car
            restoration, authentication, and sales. We&apos;re here to help you find your
            perfect classic car.
          </p>
         
          <Link
  href="/contact"
  className="w-1/4 bg-brand text-white dark:text-gray-900 px-4 py-2 rounded-md hover:bg-brand/90 transition-colors duration-200 flex items-center gap-1 mx-auto text-sm justify-center"
>
  <MessageCircle className="w-4 h-4" />
  Contact Us
</Link>
        </div>
      </div>
    </div>
  );
}