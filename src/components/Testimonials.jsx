import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      company: "Digital Marketing Pro",
      avatar: "bg-gradient-to-r from-pink-400 to-pink-600",
      rating: 5,
      text: "BlogCraft transformed my content creation process. What used to take hours now takes minutes. The AI editor is a game-changer!",
      featured: true,
    },
    {
      name: "Michael Chen",
      role: "Tech Blogger",
      company: "TechInsights",
      avatar: "bg-gradient-to-r from-blue-400 to-blue-600",
      rating: 5,
      text: "The analytics dashboard gives me insights I never had before. I can see exactly what content resonates with my audience.",
    },
    {
      name: "Emily Rodriguez",
      role: "Freelance Writer",
      company: "Creative Solutions",
      avatar: "bg-gradient-to-r from-green-400 to-green-600",
      rating: 5,
      text: "Beautiful themes and lightning-fast performance. My blog has never looked better, and my readers love the experience.",
    },
    {
      name: "David Kim",
      role: "Marketing Director",
      company: "StartupHub",
      avatar: "bg-gradient-to-r from-purple-400 to-purple-600",
      rating: 5,
      text: "BlogCraft helped us scale our content marketing. The collaboration features make it easy for our team to work together.",
    },
    {
      name: "Lisa Thompson",
      role: "Business Coach",
      company: "Success Strategies",
      avatar: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      rating: 5,
      text: "The SEO optimization features built into BlogCraft helped me rank higher on Google. My organic traffic has doubled!",
    },
    {
      name: "James Wilson",
      role: "Food Blogger",
      company: "Culinary Adventures",
      avatar: "bg-gradient-to-r from-red-400 to-red-600",
      rating: 5,
      text: "I love how easy it is to add images and format my posts. The editor is intuitive and the themes are stunning.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              50,000+ creators
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of content creators who trust BlogCraft to power
            their success.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                testimonial.featured ? "ring-2 ring-blue-500 lg:scale-105" : ""
              }`}
            >
              {/* Featured badge */}
              {testimonial.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
              )}

              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-gray-200">
                <Quote className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full ${testimonial.avatar} flex items-center justify-center text-white font-semibold`}
                ></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              50K+
            </div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              1M+
            </div>
            <div className="text-gray-600">Posts Created</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              99.9%
            </div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="group">
            <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
              4.9★
            </div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
