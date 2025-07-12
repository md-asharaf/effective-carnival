import { Card } from "@/components/ui/card"
import { Star, MapPin, Users } from "lucide-react"
import { Link } from "react-router-dom"

const popularPlaces = [
    {
        id: 1,
        name: "Santorini, Greece",
        description: "Famous for its stunning sunsets, white-washed buildings, and crystal-clear waters.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.9,
        visitors: "2.1M",
        category: "Island Paradise",
        location: "Cyclades, Greece",
    },
    {
        id: 2,
        name: "Kyoto, Japan",
        description: "Ancient temples, traditional gardens, and rich cultural heritage await visitors.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.8,
        visitors: "1.8M",
        category: "Cultural Heritage",
        location: "Kansai, Japan",
    },
    {
        id: 3,
        name: "Machu Picchu, Peru",
        description: "Mysterious ancient Incan citadel perched high in the Andes Mountains.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.9,
        visitors: "1.5M",
        category: "Historical Wonder",
        location: "Cusco Region, Peru",
    },
    {
        id: 4,
        name: "Bali, Indonesia",
        description: "Tropical paradise with beautiful beaches, rice terraces, and vibrant culture.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.7,
        visitors: "3.2M",
        category: "Tropical Paradise",
        location: "Indonesia",
    },
    {
        id: 5,
        name: "Bali, Indonesia",
        description: "Tropical paradise with beautiful beaches, rice terraces, and vibrant culture.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.7,
        visitors: "3.2M",
        category: "Tropical Paradise",
        location: "Indonesia",
    },
    {
        id: 6,
        name: "Bali, Indonesia",
        description: "Tropical paradise with beautiful beaches, rice terraces, and vibrant culture.",
        image: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
        rating: 4.7,
        visitors: "3.2M",
        category: "Tropical Paradise",
        location: "Indonesia",
    },

]

export default function PopularVillages() {
    return (
        <div className="w-full  mx-auto my-3">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Most Popular Villages</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover the world's most beloved destinations, which is a nostalgic journey through breathtaking landscapes, rich cultures, and unforgettable experiences.
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {popularPlaces.map((place) => (
                    <Link
                        key={place.id}
                        to={`/village-details/${place.id}`}
                    >
                        <Card
                            key={place.id}
                            className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-96"
                        >
                            <div className="relative h-full">
                                <img
                                    src={place.image}
                                    alt={place.name}
                                    width={400}
                                    height={320}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Gradient overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Top badges and rating */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    {/* <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-sm">{place.category}</Badge> */}
                                    <div className="bg-black/50 rounded-full px-3 py-1 flex items-center gap-1 backdrop-blur-sm">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-sm font-medium">{place.rating}</span>
                                    </div>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{place.name}</h3>
                                            <div className="flex items-center gap-1 text-sm text-white/80 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                {place.location}
                                            </div>
                                        </div>

                                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{place.description}</p>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1 text-sm text-white/80">
                                                <Users className="w-4 h-4" />
                                                <span>{place.visitors} visitors</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(place.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/40"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-8">
                <p className="text-muted-foreground">Rankings based on visitor reviews and travel data from the past year</p>
            </div>
        </div>
    )
}
