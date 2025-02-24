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
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Monday to Friday, 9am to 6pm"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "contact@classicars.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Classic Avenue",
      description: "Los Angeles, CA 90001"
    }
  ];

  return (
    <div className="min-h-screen dark:bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <MessageCircle className="w-16 h-16 text-brand" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-400 dark:text-gray-600 max-w-2xl mx-auto">
            Have questions about a specific classic car or need assistance? 
            We&apos;re here to help you find your dream vehicle.
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
                    Your Name
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
                    Email Address
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
                    Phone Number
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
                    I&apos;m Interested In
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
                      <option value="">Select an option</option>
                      <option value="buying">Buying a Classic Car</option>
                      <option value="selling">Selling my Classic Car</option>
                      <option value="valuation">Car Valuation</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-backgroundsecond dark:bg-gray-200/50 rounded-lg px-4 py-3 text-white dark:text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="Tell us about your interest in classic cars..."
                  required
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-white dark:text-gray-900 font-medium mb-2">
                  Preferred Contact Method
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
                    <span className="text-white dark:text-gray-900">Email</span>
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
                    <span className="text-white dark:text-gray-900">Phone</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand text-white dark:text-gray-900 py-4 rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>

            {/* Business Hours */}
            <div className="mt-8 pt-8 border-t border-gray-700/50 dark:border-gray-300/50">
              <div className="flex items-center gap-2 justify-center text-gray-400 dark:text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM PST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}