
import { 
  ShieldCheck, 
  Award, 
  Wrench, 
  Users, 
  Clock, 
  CarFront, 
  MessageCircle 
} from 'lucide-react';

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
    { number: "1000+", label: "Classic Cars" },
    { number: "500+", label: "Happy Collectors" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Satisfaction" }
  ];

  return (
    <div className="min-h-screen  dark:bg-gray-100 py-12">
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
                Founded by passionate car enthusiasts, our marketplace has grown from 
                a small collection to one of the most trusted platforms for classic 
                car transactions. We take pride in connecting collectors with their 
                dream vehicles and preserving automotive history.
              </p>
              <p className="text-gray-400 dark:text-gray-600">
                Every car tells a story, and we&apos;re here to help write the next chapter 
                in these remarkable machines&apos; histories. Our commitment to authenticity 
                and quality has made us the go-to destination for serious collectors 
                and enthusiasts alike.
              </p>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-background dark:bg-gray-200 rounded-xl flex items-center justify-center">
              <Clock className="w-24 h-24 text-brand" />
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
          <button className="bg-brand text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-brand/90 transition-colors duration-200 flex items-center gap-2 mx-auto">
            <MessageCircle className="w-5 h-5" />
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}