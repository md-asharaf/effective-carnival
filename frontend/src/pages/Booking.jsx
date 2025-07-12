import React, { useState } from "react";

const Booking = () => {
    const [guests, setGuests] = useState(1);
    const [date, setDate] = useState("");

    const pricePerGuest = 1200; // INR
    const totalPrice = guests * pricePerGuest;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 bg-[#fdfaf4] text-gray-800">
            {/* Title & Location */}
            <h1 className="text-3xl font-bold text-[#4b2e2e] mb-2">Pottery Workshop with Local Artisan</h1>
            <p className="text-gray-600 mb-6">📍 Barmer, Rajasthan · Hosted by Rekha Devi</p>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <img
                    src="/images/pottery1.jpg"
                    alt="pottery"
                    className="w-full h-48 object-cover rounded-xl"
                />
                <img
                    src="/images/pottery2.jpg"
                    alt="workshop"
                    className="w-full h-48 object-cover rounded-xl"
                />
                <img
                    src="/images/pottery3.jpg"
                    alt="village"
                    className="w-full h-48 object-cover rounded-xl hidden md:block"
                />
            </div>

            {/* About the Experience */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2 text-green-800">About This Experience</h2>
                <p className="text-gray-700 leading-relaxed">
                    Learn traditional Rajasthani pottery techniques passed down for generations. This 3-hour
                    hands-on workshop includes clay shaping, hand painting, and a village lunch with the host
                    family. Suitable for all ages and skill levels.
                </p>
            </section>

            {/* Booking Card */}
            <section className="bg-white border rounded-xl p-6 shadow-md space-y-4 max-w-md">
                <h3 className="text-xl font-bold text-[#4b2e2e]">Book Your Spot</h3>

                {/* Date Picker */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border px-4 py-2 rounded-md"
                    />
                </div>

                {/* Guest Count */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                    <input
                        type="number"
                        min={1}
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full border px-4 py-2 rounded-md"
                    />
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4">
                    <div className="flex justify-between text-sm">
                        <span>₹{pricePerGuest} x {guests} guest(s)</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1 font-medium">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    disabled={!date}
                    className="w-full bg-green-700 text-white font-semibold py-2 rounded-md hover:bg-green-800 disabled:bg-gray-400"
                >
                    Book Now
                </button>
            </section>

            {/* Safety/Info Note */}
            <p className="text-xs text-gray-500 mt-4">
                💡 85% of your payment goes directly to the host family. You’ll receive confirmation via
                email or WhatsApp after booking.
            </p>
        </div>
    );
};

export default Booking;
