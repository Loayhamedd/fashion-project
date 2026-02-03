import { useState } from "react";
import { User, Mail, Phone, MapPin } from "lucide-react";
import ContactImage from "../../assets/recommend/contact.png";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will respond to you as soon as possible.");
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Contact Form */}
          <div className="order-2 lg:order-1 relative right-8 ">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Countact US
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Fill out your data and select the required service and we will respond to you as soon as possible.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <User size={18} />
                  <span>Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Mail size={18} />
                  <span>Email</span>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <Phone size={18} />
                  <span>Phone</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700 font-medium">
                  <MapPin size={18} />
                  <span>Address</span>
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-0.5">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 "
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2">
            <div className="relative left-30">
              <img
                src={ContactImage}
                alt="Contact Us - Furniture Consultation"
                className="
                  w-full 
                  h-auto
                  max-h-[600px]
                  object-cover 
                  rounded-xl 
                  shadow-2xl
                  hover:shadow-3xl
                  transition-shadow duration-300
                "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Optional decorative element */}
              <div className="
                absolute -bottom-6 -right-6 
                w-32 h-32 
                bg-[#8B7355] 
                rounded-xl 
                -z-10
                opacity-20
                hidden lg:block
              "></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;