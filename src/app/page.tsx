import { 
  Search, 
  Clock, 
  Shield, 
  Star,
  ArrowRight,
  CarFront,
  DollarSign,
  Users
} from 'lucide-react';

export default function Home() {
  const categories = [
    "American Muscle",
    "European Classics",
    "Vintage Sports Cars",
    "Luxury Automobiles"
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
      image: "/images/forsale/first-mustang/MustangRestomod/img1.jpg",
      year: "1969",
      name: "Ford Mustang",
      price: "$75,000"
    },
    {
      image: "/images/forsale/first-mustang/MustangRestomod/img1.jpg",
      year: "1963",
      name: "Chevrolet Corvette",
      price: "$95,000"
    },
    {
      image: "/images/forsale/first-mustang/MustangRestomod/img1.jpg",
      year: "1970",
      name: "Plymouth Barracuda",
      price: "$85,000"
    }
  ];

  return (
    <div className="min-h-screen dark:bg-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="absolute inset-0">
          <img 
            src="/images/forsale/first-mustang/MustangRestomod/img1.jpg"
            alt="Classic Cars" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Find Your Dream
              <span className="text-brand block mt-2">Classic Car</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-slideUp delay-200">
              Discover the finest collection of classic and muscle cars. 
              Each vehicle tells a unique story of automotive history.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 flex items-center max-w-2xl animate-slideUp delay-300">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or year..."
                  className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
              <button className="bg-brand text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group bg-backgroundtertiary dark:bg-white/50 rounded-xl p-6 backdrop-blur-sm hover:bg-brand/20 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-2 group-hover:text-brand">
                {category}
              </h3>
              <div className="flex items-center text-gray-400 dark:text-gray-600 group-hover:text-brand">
                Explore
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
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

      {/* Latest Additions */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900">
            Latest Additions
          </h2>
          <button className="text-brand hover:text-brand/80 transition-colors flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestAdditions.map((car, index) => (
            <div 
              key={index}  
              className="bg-backgroundtertiary dark:bg-white/50 rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-backgroundtertiary dark:bg-white/50 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white dark:text-gray-900 mb-4">
            Ready to Find Your Classic?
          </h2>
          <p className="text-gray-400 dark:text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of classic car enthusiasts who have found their dream vehicles through our marketplace.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-brand text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-brand/90 transition-colors flex items-center gap-2">
              <CarFront className="w-5 h-5" />
              Browse Cars
            </button>
            <button className="bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-300 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}