import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

const VillageCard = ({ image, name, location, elevation, description }) => (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition duration-300 max-w-sm">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-1 text-gray-800">{name}</h2>
            <p className="text-sm text-gray-500 mb-3">
                {location} • {elevation}m above sea level
            </p>
            <p className="text-gray-700 text-sm mb-4">{description}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
                Explore Village
            </button>
        </div>
    </div>
);

const MostVisitedPlaces = () => {
    const villages = [
        // ...village data as before
        {
            id: 1,
            name: "Meadowview",
            image:
                "https://plus.unsplash.com/premium_photo-1675198764473-30434364c8b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
            location: "Himachal Pradesh, India",
            elevation: 1650,
            description:
                "A serene village nestled in the hills, known for its breathtaking scenery, traditional culture, and peaceful environment.",
        },
        {
            id: 2,
            name: "Sundarpur",
            image:
                "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
            location: "Uttarakhand, India",
            elevation: 1300,
            description:
                "A picturesque village surrounded by forests and waterfalls, perfect for eco-tourism and spiritual retreats.",
        },
        {
            id: 3,
            name: "Kalapathar",
            image:
                "https://images.unsplash.com/photo-1686579809662-829e8374d0a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
            location: "Sikkim, India",
            elevation: 2200,
            description:
                "A remote Himalayan village famous for snow-capped peaks, traditional wooden homes, and warm hospitality.",
        },
        {
            id: 4,
            name: "Arambol",
            image:
                "https://images.unsplash.com/photo-1615412704911-55d589229864?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
            location: "Goa, India",
            elevation: 30,
            description:
                "A peaceful coastal village known for its clean beaches, yoga retreats, and vibrant local markets.",
        },
        {
            id: 5,
            name: "Velas",
            image:
                "https://images.unsplash.com/photo-1715614412216-244d0dfc4bde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
            location: "Maharashtra, India",
            elevation: 120,
            description:
                "A turtle nesting village surrounded by hills and ocean, ideal for nature lovers and heritage walks.",
        },
    ];

    const swiperRef = useRef(null);

    return (
        <div className="relative px-20">
            {/* Custom Arrows */}
            <button
                className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-green-600 hover:text-white transition"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous"
                style={{ outline: "none" }}
            >
                {/* Left Arrow SVG */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-green-600 hover:text-white transition"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next"
                style={{ outline: "none" }}
            >
                {/* Right Arrow SVG */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                </svg>
            </button>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={false} // Disable default navigation
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper p-20"
                loop={true}
                onSwiper={swiper => {
                    swiperRef.current = swiper;
                }}
            >
                {villages.map(item => (
                    <SwiperSlide key={item.id}>
                        <VillageCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MostVisitedPlaces;
