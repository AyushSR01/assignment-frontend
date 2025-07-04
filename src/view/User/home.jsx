import React from "react";
import { Link } from "react-router-dom";


function Home() {

  
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 tracking-wide animate-pulse">
            HelpDeskPro
          </h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="/" className="hover:text-blue-600 transition">Home</a>
            <Link to="/dashboard" className="hover:text-blue-600 transition">Tickets</Link>
            <Link to="/support" className="hover:text-blue-600 transition">Support</Link>
            <Link to="/signin"className="hover:text-blue-600 transition">Login/SignUp</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6">
            Your IT Help, Simplified.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Submit tickets. Get support. Stay productive.
          </p>
          <div
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition"
          >
            <Link to="/dashboard"> Submit a Ticket</Link>
          </div>
          <div
          className="inline-block px-6 py-3 bg-white ml=4 text-blue-600 font-medium rounded-full shadow hover:bg-gray-100 transition"
        >
          <Link to="/dashboardop">Operator dashboard(not backend enabled)</Link>

        </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 py-16">
        {[
          {
            title: "Easy Ticketing",
            desc: "Submit and manage support tickets in just a few clicks.",
          },
          {
            title: "Fast Response",
            desc: "Our team ensures quick responses with real-time updates.",
          },
          {
            title: "24/7 Availability",
            desc: "Always online to assist you, anytime and anywhere.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white text-center py-20 px-4 animate-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Need Help Now?
        </h2>
        <p className="text-lg mb-6">
          Our agents are ready to assist you 24/7. Let’s solve your issue together.
        </p>
        
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6 bg-white border-t mt-16">
        &copy; {new Date().getFullYear()} HelpDeskPro. Built with 💙 using React & Tailwind.
      </footer>
    </div>
  );
}

export default Home;

