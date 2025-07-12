import React from "react";
import { motion } from "framer-motion";
import { FaGlobeAsia, FaUsers, FaHandshake, FaLeaf, FaBalanceScale, FaAward, FaHome, FaUserFriends, FaMoneyBillWave, FaLink } from 'react-icons/fa';

const About = () => {
    const values = [
        { name: "Authenticity", icon: <FaHandshake className="w-8 h-8 mx-auto" /> },
        { name: "Equity", icon: <FaBalanceScale className="w-8 h-8 mx-auto" /> },
        { name: "Sustainability", icon: <FaLeaf className="w-8 h-8 mx-auto" /> },
        { name: "Respect", icon: <FaUsers className="w-8 h-8 mx-auto" /> },
        { name: "Inclusion", icon: <FaGlobeAsia className="w-8 h-8 mx-auto" /> },
    ];

    const impacts = [
        { icon: <FaHome className="w-7 h-7 text-green-600" />, text: "100+ villages digitized" },
        { icon: <FaUserFriends className="w-7 h-7 text-green-600" />, text: "500+ local hosts onboarded" },
        { icon: <FaMoneyBillWave className="w-7 h-7 text-green-600" />, text: "85% of revenue goes directly to locals" },
        { icon: <FaAward className="w-7 h-7 text-green-600" />, text: "Recognized by tourism boards" },
    ];

    const testimonials = [
        {
            quote: "An unforgettable experience! We stayed with a family in Rajasthan and were treated with such warmth. The food was incredible, and the stories we heard will stay with us forever.",
            author: "Priya & Rohan",
            location: "Mumbai, India",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            quote: "VillageStay is a game-changer for conscious travelers. It felt good to know our money was directly supporting the local community. A much more meaningful way to travel.",
            author: "Alex Johnson",
            location: "London, UK",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            quote: "I was looking for an authentic escape from the city, and VillageStay delivered. The peace, the nature, and the genuine hospitality were exactly what I needed. Highly recommended!",
            author: "Ananya Sharma",
            location: "Bengaluru, India",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            quote: "The best way to understand a culture is to live it. VillageStay made that possible. Our host family in Kerala was amazing. We learned to cook local dishes and explored hidden gems.",
            author: "David Chen",
            location: "Singapore",
            avatar: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
            quote: "As a solo female traveler, safety and authenticity are my top priorities. VillageStay exceeded my expectations on both fronts. I felt welcomed and secure throughout my stay in Himachal.",
            author: "Fatima Al-Sayed",
            location: "Dubai, UAE",
            avatar: "https://randomuser.me/api/portraits/women/31.jpg"
        },
        {
            quote: "We wanted our children to experience a different side of India, away from the tourist traps. Our stay in a village in Odisha was humbling and educational. Thank you, VillageStay!",
            author: "The Kumar Family",
            location: "New Delhi, India",
            avatar: "https://randomuser.me/api/portraits/men/60.jpg"
        }
    ];

    // Animation variants for the container and items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="bg-[#fdfaf4] text-gray-800 font-sans">
            <div className="container mx-auto px-4 py-16">

                {/* Header Section */}
                <header className="text-center mb-20">
                    <h1 className="text-5xl font-extrabold text-[#4b2e2e] mb-4">
                        About <span className="text-green-700">VillageStay</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Bringing You Closer to the Heart of India Through Authentic, Sustainable, and Community-Driven Travel.
                    </p>
                </header>

                {/* Purpose Section */}
                <section className="mb-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-green-800 mb-4">Our Purpose</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            At <strong>VillageStay</strong>, we unlock the warmth, beauty, and culture of rural India. We empower local communities to host immersive experiences while helping travelers connect with real people and stories. Our platform bridges the gap between tradition and modernity, fostering a new era of tourism that is inclusive, sustainable, and enriching for all.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg" alt="Rural India" className="rounded-2xl shadow-xl w-full " />
                    </div>
                </section>

                {/* Values Section */}
                <section className="mb-20 text-center">
                    <h2 className="text-3xl font-bold text-green-800 mb-8">Our Core Values</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {values.map((value) => (
                            <div key={value.name} className="bg-white rounded-2xl shadow-lg p-6 text-[#4b2e2e] transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                                <div className="text-green-700 mb-3">{value.icon}</div>
                                <h3 className="font-semibold text-lg">{value.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Impact Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Our Impact</h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-5">
                            {impacts.map((impact) => (
                                <div key={impact.text} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
                                    {impact.icon}
                                    <p className="text-lg text-gray-700 font-medium">{impact.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-green-50 rounded-2xl p-8 border-l-4 border-green-500 shadow-lg">
                            <p className="text-lg italic text-gray-700">
                                “Thanks to VillageStay, we’ve had our first guests from Mumbai — and now my daughter is teaching them traditional painting!”
                            </p>
                            <p className="text-right mt-4 font-semibold text-green-800">— Rekha Devi, Bihar</p>
                        </div>
                    </div>
                </section>

                {/* Open Protocol Section */}
                <section className="mb-20 text-center bg-white p-10 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6">
                    <FaLink className="text-green-700 w-16 h-16 mb-4 md:mb-0" />
                    <div className="text-left">
                        <h2 className="text-3xl font-bold text-green-800 mb-2">Open & Interoperable</h2>
                        <p className="text-gray-700 leading-relaxed">
                            VillageStay is built on the <strong>Beckn Protocol</strong>, enabling our listings to be
                            discovered on other travel platforms. This helps expand the visibility of
                            rural hosts without locking them into a single system.
                        </p>
                    </div>
                </section>

                {/* Join the Movement Section */}
                <section className="bg-green-50 rounded-xl shadow-sm px-6 py-8 text-center">
                    <h3 className="text-2xl font-bold text-green-700 mb-3">Join the Movement</h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-4">
                        Whether you're a traveler, changemaker, or village looking for digital
                        visibility — there's a place for you at VillageStay.
                    </p>
                    <p className="text-[#4b2e2e] font-semibold">
                        📍 Discover hidden gems &nbsp; 🧵 Support rural livelihoods &nbsp; 💬 Share stories that matter
                    </p>
                </section>

                {/* Testimonials Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-green-800 mb-12 text-center">What Our Travelers Say</h2>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg flex flex-col"
                                variants={itemVariants}
                            >
                                <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
                                <div className="flex items-center mt-auto">
                                    <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                                    <div>
                                        <p className="text-gray-800 font-semibold">{testimonial.author}</p>
                                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Let’s make rural India visible, one stay at a time.
                </p>
            </div>
        </div>
    );
};

export default About;
