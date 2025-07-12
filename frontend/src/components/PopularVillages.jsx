import { Card } from "@/components/ui/card"
import { Star, MapPin, Mountain } from "lucide-react"
import { Link } from "react-router-dom"

const villages = [
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


export default function PopularVillages() {
    return (
        <div className="w-full mx-auto my-3">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Featured Places</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore serene villages offering authentic culture, breathtaking landscapes, and unforgettable local experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {villages.map((village) => (
                    <Link
                        key={village.id}
                        to={`/village-details/${village.id}`}
                        className="block"
                    >
                        <Card
                            className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-96"
                        >
                            <div className="relative h-full">
                                <img
                                    src={village.image}
                                    alt={village.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Gradient overlay for better text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Top badges and rating */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    {/* <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-sm">{place.category}</Badge> */}
                                    <div className="bg-black/50 rounded-full px-3 py-1 flex items-center gap-1 backdrop-blur-sm">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-white text-sm font-medium">{village.elevation} m</span>
                                    </div>
                                </div>

                                {/* Bottom content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition-colors">{village.name}</h3>
                                            <div className="flex items-center gap-1 text-sm text-white/80 mt-1">
                                                <MapPin className="w-4 h-4" />
                                                {village.location}
                                            </div>
                                        </div>

                                        <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{village.description}</p>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="flex items-center gap-1 text-sm text-white/80">
                                                <Mountain className="w-4 h-4" />
                                                <span>{village.visitors} visitors</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(village.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/40"
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
