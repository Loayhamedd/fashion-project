import { useState } from "react";
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageCircle, User, Home, CheckCircle,
  Instagram, Facebook, Twitter
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactMethod: "email"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = {
    companyName: "Fakhir Furniture",
    description: "A store specialized in luxury furniture",
    address: "Syria, Damascus, Al-Hamra Street, Commercial Center Building",
    phone: "+963 11 123 4567",
    whatsapp: "+963 93 123 4567",
    email: "info@fakhir-furniture.com",
    workingHours: "Sunday - Thursday: 9:00 AM - 8:00 PM\nFriday - Saturday: 10:00 AM - 6:00 PM",
    socialMedia: {
      instagram: "https://instagram.com/fakhir_furniture",
      facebook: "https://facebook.com/fakhirfurniture",
      twitter: "https://twitter.com/fakhir_furniture"
    }
  };

  const inquiryTypes = [
    "General Inquiry",
    "Product Order",
    "Technical Support",
    "Complaint",
    "Suggestion",
    "Partnership"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          contactMethod: "email"
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div div>
    <div className="min-h-screen bg-white py-22">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Contact us for any inquiries or requests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <Home className="w-16 h-16 text-[#A38B6D] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">{contactInfo.companyName}</h2>
                <p className="text-gray-600 mt-2">{contactInfo.description}</p>
              </div>


              <div className="space-y-6">

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#A38B6D] transition-colors">
                  <div className="p-3 bg-[#A38B6D]/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#A38B6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>


                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#A38B6D] transition-colors">
                  <div className="p-3 bg-[#A38B6D]/10 rounded-lg">
                    <Phone className="w-6 h-6 text-[#A38B6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">{contactInfo.phone}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">WhatsApp: {contactInfo.whatsapp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#A38B6D] transition-colors">
                  <div className="p-3 bg-[#A38B6D]/10 rounded-lg">
                    <Mail className="w-6 h-6 text-[#A38B6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">{contactInfo.email}</p>
                  </div>
                </div>


                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#A38B6D] transition-colors">
                  <div className="p-3 bg-[#A38B6D]/10 rounded-lg">
                    <Clock className="w-6 h-6 text-[#A38B6D]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{contactInfo.workingHours}</p>
                  </div>
                </div>
              </div>


              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Follow Us</h3>
                <div className="flex justify-center gap-4">
                  <a 
                    href={contactInfo.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-[#A38B6D] hover:text-white rounded-full transition-all duration-300 group"
                  >
                    <Instagram className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-[#A38B6D] hover:text-white rounded-full transition-all duration-300 group"
                  >
                    <Facebook className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </a>
                  <a 
                    href={contactInfo.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 hover:bg-[#A38B6D] hover:text-white rounded-full transition-all duration-300 group"
                  >
                    <Twitter className="w-5 h-5 text-gray-600 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>


            <div className="bg-gradient-to-br from-[#A38B6D]/5 to-white p-6 rounded-2xl border border-[#A38B6D]/20">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-[#A38B6D]" />
                <h3 className="font-semibold text-gray-900">We're Here to Help</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our team is always available to answer your inquiries. We promise to respond within 24 business hours.
              </p>
            </div>
          </div>


          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Your Message</h2>
                <p className="text-gray-600">Fill out the form and we'll get back to you as soon as possible</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You for Contacting Us!</h3>
                  <p className="text-gray-600 mb-6">
                    We have received your message and will respond within 24 business hours.
                  </p>
                  <div className="animate-pulse text-sm text-gray-500">
                    Reloading form...
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A38B6D] focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A38B6D] focus:border-transparent transition-all"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A38B6D] focus:border-transparent transition-all"
                        placeholder="+963 XXX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A38B6D] focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="flex gap-4">
                      {["email", "phone", "whatsapp"].map((method) => (
                        <label
                          key={method}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={formData.contactMethod === method}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#A38B6D] focus:ring-[#A38B6D]"
                          />
                          <span className="text-gray-700 capitalize">
                            {method === "email" && "Email"}
                            {method === "phone" && "Phone Call"}
                            {method === "whatsapp" && "WhatsApp"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A38B6D] focus:border-transparent transition-all resize-none"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full md:w-auto min-w-[200px] px-8 py-4 rounded-xl font-semibold
                        flex items-center justify-center gap-3 transition-all duration-300
                        ${isSubmitting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-[#A38B6D] hover:bg-[#8B7355] hover:shadow-lg'
                        }
                        text-white text-lg
                      `}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>


            <div className="mt-8 bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#A38B6D]" />
                <h3 className="text-xl font-bold text-gray-900">Our Location</h3>
              </div>
              
              <div className="relative h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="absolute -top-8 -left-4">
                        <div className="w-8 h-8 bg-[#A38B6D] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <div className="w-64 h-48 bg-white/80 rounded-lg border border-gray-300 shadow-inner">
                        <div className="absolute inset-0 flex">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex-1 border-r border-gray-200"></div>
                          ))}
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="absolute w-full h-1/4 border-b border-gray-200" style={{top: `${(i + 1) * 25}%`}}></div>
                          ))}
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-sm">
                          <p className="text-xs font-medium text-gray-800">{contactInfo.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm text-center">
                    Damascus, Syria
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  You can visit our store at the address above
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#A38B6D]/5 to-white p-8 rounded-2xl border border-[#A38B6D]/10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                q: "What is the delivery time?",
                a: "3 to 7 business days depending on location"
              },
              {
                q: "Do you offer assembly service?",
                a: "Yes, we provide free assembly service for all products"
              },
              {
                q: "What is the return policy?",
                a: "30-day return policy with the product in original condition"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-[#A38B6D] transition-colors">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>

    </div>
  );
};

export default ContactPage;