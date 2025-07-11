import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section
        className="relative bg-cover bg-center text-white h-[90vh] flex items-center justify-center px-6"
        style={{
          backgroundImage: 'url("/beautiful-rainbow-nature.jpg")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <p className="text-lg uppercase tracking-widest text-gray-300 mb-3">
              700m+ Above Sea Level
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Experience The {" "}
              <span className="italic text-teal-300">Soul</span> Of{" "}
              <span className="text-teal-400">Rural India</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 ">
              Support local communities, experience cultural heritage, and create memories that matter - far from the noise, close to the soul.
            </p>
            <Link
              to={"/village-listing"}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Villages
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-green-400 py-10 h-20 w-full ">

      </section>
    </>
  );
};

export default Home;
