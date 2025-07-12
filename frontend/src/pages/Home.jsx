import React from "react";
import { Link } from "react-router-dom";
import { MostVisitedPlaces } from "../components";
import PopularVillages from "@/components/PopularVillages";
import WhyVillageStay from "@/components/Features";
import { ShieldCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF8ED]">

      {/* Hero section */}
      <section
        className="relative bg-cover bg-center text-white h-[80vh] flex items-center justify-center px-6"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg")',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <p className="text-lg uppercase tracking-widest text-gray-300 mb-3">
              BEYOND THE CITY LIGHTS
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Let's Explore, {" "}
              <span className="italic text-teal-300"> </span> the soul{" "}
              <span className="text-teal-400">of India</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 ">
              Step away from the hustle. Embrace the quiet charm of rural life, connect with local families, and support sustainable tourism. Your authentic journey starts here.
            </p>
            <Link
              to={"/villages"}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Explore Villages
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white  w-full px-20 py-10">
        {/* <h2 className="text-3xl text-center font-bold mb-4">Most Visited Places</h2> */}
        {/* <MostVisitedPlaces/> */}
        <PopularVillages />

        {/* Host Verification Section */}


        <WhyVillageStay />
      </section>
    </div>

  );
};

export default Home;
