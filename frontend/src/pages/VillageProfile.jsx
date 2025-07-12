import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Star,
    MapPin,
    Users,
    Home,
    Camera,
    Heart,
    Share2,
    Clock,
    Thermometer,
    Mountain,
    TreePine,
    ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data with realistic images
const villageData = {
    id: "village-ghandruk-001",
    name: "Ghandruk Village",
    location: "Annapurna Conservation Area, Kaski District, Nepal",
    description: `Nestled at an altitude of 2,012 meters in the heart of the Annapurna region, Ghandruk is a picturesque Gurung village that offers visitors an authentic glimpse into traditional Himalayan life. This ancient settlement, with its stone-paved streets and traditional slate-roofed houses, has been home to the brave Gurung community for centuries. The village is renowned for its stunning panoramic views of the Annapurna and Machapuchare (Fishtail) peaks, terraced fields that cascade down the mountainsides like green staircases, and the warm hospitality of its people.`,
    establishedYear: "14th Century",
    population: 1200,
    altitude: "2,012m",
    bestTimeToVisit: "October to December, March to May",
    images: [
        {
            id: "img-1",
            url: "https://images.pexels.com/photos/462042/pexels-photo-462042.jpeg",
            caption:
                "Traditional stone houses against the backdrop of snow-capped Annapurna peaks.",
            isHero: true,
        },
        {
            id: "img-2",
            url: "https://images.unsplash.com/photo-1595432542143-a15a47884153?q=80&w=2070&auto=format&fit=crop",
            caption: "Ancient stone-paved pathways where generations have walked.",
        },
        {
            id: "img-3",
            url: "https://images.unsplash.com/photo-1598459913303-9e148a2f8594?q=80&w=2070&auto=format&fit=crop",
            caption:
                "Terraced fields during harvest season - a sight unchanged for centuries.",
        },
        {
            id: "img-4",
            url: "https://images.unsplash.com/photo-1605641834243-7716ac5a035d?q=80&w=2070&auto=format&fit=crop",
            caption:
                "Traditional Gurung women in colorful attire during a local festival.",
        },
        {
            id: "img-5",
            url: "https://images.unsplash.com/photo-1593189591125-14d213d356a3?q=80&w=1932&auto=format&fit=crop",
            caption:
                "Morning mist rolling over the village as the sun rises behind Machapuchare.",
        },
    ],
    rooms: [
        {
            id: "room-1",
            name: "Gurung Heritage Homestay",
            hostName: "Dhan Gurung",
            description:
                "Traditional stone house with authentic Gurung architecture.",
            price: "25.00",
            rating: 4.9,
            reviews: 47,
            amenities: ["Mountain View", "Traditional Meals"],
            image:
                "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
        },
        {
            id: "room-2",
            name: "Annapurna View Lodge",
            hostName: "Maya Gurung",
            description: "Comfortable rooms with panoramic Annapurna range views.",
            price: "35.00",
            rating: 4.8,
            reviews: 32,
            amenities: ["Panoramic Views", "Hot Shower", "WiFi"],
            image:
                "https://images.unsplash.com/photo-1598035736197-041538952811?q=80&w=2070&auto=format&fit=crop",
        },
        {
            id: "room-3",
            name: "Traditional Gurung House",
            hostName: "Bir Gurung",
            description: "Authentic village experience in a 200-year-old house.",
            price: "20.00",
            rating: 4.9,
            reviews: 28,
            amenities: ["Historic Building", "Organic Garden"],
            image:
                "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop",
        },
    ],
    guides: [
        {
            id: "guide-1",
            name: "Pemba Gurung",
            bio: "Born and raised in Ghandruk, Pemba has been guiding trekkers for over 15 years.",
            languages: ["English", "Nepali", "Gurung"],
            specialties: ["Trekking", "Bird Watching"],
            rating: 4.9,
            reviews: 156,
            image:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        },
        {
            id: "guide-2",
            name: "Sita Gurung",
            bio: "A local cultural expert who specializes in traditional crafts and cooking.",
            languages: ["English", "Nepali"],
            specialties: ["Cultural Heritage", "Cooking Classes"],
            rating: 4.8,
            reviews: 89,
            image:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
        },
    ],
    reviews: [
        {
            id: "review-1",
            guestName: "Sarah Mitchell",
            country: "Australia",
            rating: 5,
            comment:
                "Ghandruk exceeded all my expectations. The village is like stepping back in time, but in the most beautiful way. The mountain views are breathtaking.",
            date: "2024-01-15",
        },
        {
            id: "review-2",
            guestName: "Marco Rossi",
            country: "Italy",
            rating: 5,
            comment:
                "An authentic experience that touched my soul. Watching the sunrise over Annapurna from the village was magical. The traditional food and peaceful atmosphere made this trip unforgettable.",
            date: "2024-01-10",
        },
    ],
    culture: {
        ethnicity: "Gurung",
        language: "Gurung, Nepali",
        religion: "Buddhism, Hinduism",
        traditions: [
            "Rich oral tradition of 'Rodi,' where villagers gather to sing, dance, and share stories.",
            "Expertise in weaving traditional 'Dhaka' fabric for clothing and blankets.",
            "Celebration of 'Lhosar' (New Year) with family feasts and community events.",
            "Strong martial heritage, with many Gurungs serving in the British and Indian armies.",
        ],
    },
    activities: [
        {
            name: "Cultural Village Walk",
            duration: "3 hours",
            price: "15.00",
            description: "Guided tour through ancient pathways and cultural sites.",
        },
        {
            name: "Traditional Cooking Class",
            duration: "3 hours",
            price: "25.00",
            description: "Learn to prepare authentic Gurung dishes.",
        },
        {
            name: "Sunrise Mountain Viewing",
            duration: "2 hours",
            price: "10.00",
            description: "Early morning hike to the best viewpoint for sunrise.",
        },
        {
            name: "Handicraft Workshop",
            duration: "4 hours",
            price: "30.00",
            description: "Learn traditional weaving from local artisans.",
        },
    ],
    stats: {
        averageRating: 4.85,
        totalReviews: 234,
        establishedYear: "14th Century",
    },
};

export default function VillageProfile() {
    const [selectedImage, setSelectedImage] = useState(0);

    const heroImage =
        villageData.images.find((img) => img.isHero) || villageData.images[0];
    const galleryImages = villageData.images.filter((img) => !img.isHero);

    const quickInfo = [
        {
            icon: Mountain,
            label: "Altitude",
            value: villageData.altitude,
            color: "text-blue-600",
        },
        {
            icon: Thermometer,
            label: "Best Time",
            value: "Oct-Dec, Mar-May",
            color: "text-orange-600",
        },
        {
            icon: Users,
            label: "Population",
            value: `${villageData.population} people`,
            color: "text-green-600",
        },
        {
            icon: Clock,
            label: "Established",
            value: villageData.establishedYear,
            color: "text-purple-600",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full">
                <img
                    src={heroImage.url}
                    alt={villageData.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                    <div className="max-w-4xl text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight">
                            {villageData.name}
                        </h1>
                        <p className="text-lg md:text-xl mb-4 text-white/90">
                            {heroImage.caption}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <Badge className="bg-black/30 border border-white/20 text-white text-base px-4 py-2 backdrop-blur-sm">
                                <MapPin className="w-4 h-4 mr-2" />
                                {villageData.altitude}
                            </Badge>
                            <Badge className="bg-black/30 border border-white/20 text-white text-base px-4 py-2 backdrop-blur-sm">
                                <Users className="w-4 h-4 mr-2" />
                                {villageData.population} residents
                            </Badge>
                            <Badge className="bg-black/30 border border-white/20 text-white text-base px-4 py-2 backdrop-blur-sm">
                                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                                {villageData.stats.averageRating} (
                                {villageData.stats.totalReviews} reviews)
                            </Badge>
                        </div>
                        {/* <div className="flex flex-col sm:flex-row gap-3">
                                <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 shadow-lg">Explore Stays</Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent backdrop-blur-sm shadow-lg"><Heart className="w-5 h-5 mr-2" />Save Village</Button>
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent backdrop-blur-sm shadow-lg"><Share2 className="w-5 h-5 mr-2" />Share</Button>
                            </div> */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 -mt-28 relative z-10">
                    {quickInfo.map((item) => (
                        <Card
                            key={item.label}
                            className="bg-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <item.icon className={`w-8 h-8 ${item.color} mb-2`} />
                                <div className="font-semibold text-gray-800">{item.label}</div>
                                <div className="text-sm text-gray-600">{item.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="w-full">
                    <div className="border-b border-gray-200 overflow-x-auto">
                        <TabsList className="h-auto p-0 bg-transparent">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="gallery">Gallery</TabsTrigger>
                            <TabsTrigger value="stays">Homestays</TabsTrigger>
                            <TabsTrigger value="guides">Local Guides</TabsTrigger>
                            <TabsTrigger value="culture">Culture</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="overview" className="mt-8 space-y-8">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    About {villageData.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-700 leading-relaxed">
                                    {villageData.description}
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    Village Experiences
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {villageData.activities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-lg">{activity.name}</h4>
                                            <span className="text-green-600 font-bold">
                                                ${activity.price}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3 text-sm">
                                            {activity.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">
                                                Duration: {activity.duration}
                                            </span>
                                            <Button
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                            >
                                                Book Now
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="gallery" className="mt-8">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                    <Camera className="w-6 h-6" />
                                    Village Gallery
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="mb-6">
                                    <div className="relative h-96 rounded-lg overflow-hidden mb-3">
                                        <img
                                            src={galleryImages[selectedImage]?.url}
                                            alt={galleryImages[selectedImage]?.caption}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="text-center text-gray-600 italic">
                                        {galleryImages[selectedImage]?.caption}
                                    </p>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                    {galleryImages.map((image, index) => (
                                        <div
                                            key={image.id}
                                            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImage === index
                                                ? "ring-4 ring-green-500"
                                                : "hover:opacity-80"
                                                }`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.caption}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="stays" className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {villageData.rooms.map((room) => (
                                <Card
                                    key={room.id}
                                    className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                                >
                                    <div className="relative h-48">
                                        <img
                                            src={room.image}
                                            alt={room.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Hosted by {room.hostName}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {room.amenities.map((amenity, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {amenity}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-medium">
                                                    {room.rating}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({room.reviews})
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold text-green-600">
                                                ${room.price}/night
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="guides" className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {villageData.guides.map((guide) => (
                                <Link
                                    key={guide.id}
                                    to={`/host-public-profile/${guide.id}`}
                                    className="block hover:shadow-xl transition-shadow rounded-lg"
                                >
                                    <Card
                                        className="p-6 shadow-md flex flex-col sm:flex-row items-center gap-6 h-full"
                                    >
                                        <img
                                            src={guide.image}
                                            alt={guide.name}
                                            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl font-semibold">{guide.name}</h3>
                                            <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="font-medium">{guide.rating}</span>
                                                <span className="text-gray-500 text-sm">
                                                    ({guide.reviews} reviews)
                                                </span>
                                            </div>
                                            <p className="text-gray-600 my-2 text-sm">{guide.bio}</p>
                                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                                {guide.specialties.map((specialty, index) => (
                                                    <Badge
                                                        key={index}
                                                        className="bg-green-100 text-green-800"
                                                    >
                                                        {specialty}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="culture" className="mt-8">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">
                                    Cultural Heritage
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">
                                        Living Traditions
                                    </h3>
                                    <div className="space-y-3">
                                        {villageData.culture.traditions.map((tradition, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <TreePine className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                                <span>{tradition}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-8 space-y-6">
                        {villageData.reviews.map((review) => (
                            <Card key={review.id} className="shadow-md">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-lg">
                                                {review.guestName}
                                            </h3>
                                            <p className="text-sm text-gray-500">{review.country}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed italic">
                                        "{review.comment}"
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
