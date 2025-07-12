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
import { Link, useNavigate } from "react-router-dom";
// import { villages } from "@/lib/Data";

// Mock data with realistic images
const villageData = {
    id: "village-khuri-001",
    name: "Khuri Village",
    location: "Thar Desert, Jaisalmer District, Rajasthan, India",
    description: `Experience the timeless beauty of the Thar Desert in Khuri, a serene village nestled amidst golden sand dunes. Located just 50 km from Jaisalmer, Khuri offers an authentic desert experience, away from the commercial hustle. Famous for its traditional mud and straw houses, vibrant local culture, and warm Rajput hospitality, Khuri is a gateway to understanding the desert way of life. The village is a living museum of Rajasthani traditions, where life moves at a slower pace, dictated by the rising and setting of the sun over the magnificent dunes.`,
    establishedYear: "16th Century",
    population: 800,
    altitude: "235m",
    bestTimeToVisit: "October to March",
    images: [
        {
            id: "img-1",
            url: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            caption:
                "Traditional mud houses and the vast expanse of the Thar Desert.",
            isHero: true,
        },
        {
            id: "img-2",
            url: "https://images.pexels.com/photos/235648/pexels-photo-235648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            caption: "A camel caravan traversing the golden sand dunes at sunset.",
        },
        {
            id: "img-3",
            url: "https://images.pexels.com/photos/3875215/pexels-photo-3875215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            caption:
                "A local woman in traditional Rajasthani attire carrying water pots.",
        },
        {
            id: "img-4",
            url: "https://images.pexels.com/photos/164339/pexels-photo-164339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            caption:
                "Intricately decorated entrance of a traditional desert homestay.",
        },
        {
            id: "img-5",
            url: "https://images.pexels.com/photos/3875093/pexels-photo-3875093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            caption:
                "A cultural evening with folk music and dance under the starlit desert sky.",
        },
    ],
    rooms: [
        {
            id: "room-1",
            name: "Desert Haveli Homestay",
            hostName: "Ranjeet Singh",
            description:
                "Authentic mud house stay with traditional decor and desert views.",
            price: "2000",
            rating: 4.9,
            reviews: 55,
            amenities: ["Dune View", "Home-cooked Meals"],
            image:
                "https://images.pexels.com/photos/2474845/pexels-photo-2474845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: "room-2",
            name: "Thar Serenity Camp",
            hostName: "Meena Devi",
            description: "Comfortable tented accommodation with modern amenities.",
            price: "3000",
            rating: 4.8,
            reviews: 42,
            amenities: ["Private Tents", "Camel Safari", "Cultural Program"],
            image:
                "https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: "room-3",
            name: "Rajputana Desert Stay",
            hostName: "Vikram Singh",
            description: "Experience royal hospitality in a traditional village home.",
            price: "2500",
            rating: 4.9,
            reviews: 38,
            amenities: ["Historic Building", "Organic Farm"],
            image:
                "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ],
    guides: [
        {
            id: "guide-1",
            name: "Arjun Singh",
            bio: "A seasoned camel safari guide, Arjun knows the desert like the back of his hand.",
            languages: ["English", "Hindi", "Marwari"],
            specialties: ["Camel Safari", "Stargazing"],
            rating: 4.9,
            reviews: 182,
            image:
                "https://images.pexels.com/photos/2896423/pexels-photo-2896423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: "guide-2",
            name: "Priya Sharma",
            bio: "Priya is an expert in Rajasthani culture, crafts, and cuisine.",
            languages: ["English", "Hindi"],
            specialties: ["Cultural Tours", "Cooking Workshops"],
            rating: 4.8,
            reviews: 95,
            image:
                "https://images.pexels.com/photos/3875215/pexels-photo-3875215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
    ],
    reviews: [
        {
            id: "review-1",
            guestName: "Emily Carter",
            country: "United Kingdom",
            rating: 5,
            comment:
                "Khuri is a magical place. The silence of the desert is profound. The camel safari at sunset was a highlight of my trip to India. The hospitality was incredibly warm.",
            date: "2024-02-20",
        },
        {
            id: "review-2",
            guestName: "Rohan Patel",
            country: "India",
            rating: 5,
            comment:
                "An authentic and soul-stirring experience. The folk music performance under the stars was unforgettable. A must-visit for anyone looking to see the real Rajasthan.",
            date: "2024-01-15",
        },
    ],
    culture: {
        ethnicity: "Rajput, Bhil, Marwari",
        language: "Marwari, Hindi",
        religion: "Hinduism",
        traditions: [
            "Vibrant folk music and 'Kalbelia' dance performances in the evenings.",
            "Expertise in crafting beautiful 'Ralli' quilts and leather goods.",
            "Celebration of the 'Desert Festival' with camel races, folk art, and turban-tying competitions.",
            "Strong tradition of hospitality, treating guests as an incarnation of God ('Atithi Devo Bhava').",
        ],
    },
    activities: [
        {
            name: "Sunset Camel Safari",
            duration: "3 hours",
            price: "800",
            description: "Ride through the sand dunes and witness a spectacular desert sunset.",
        },
        {
            name: "Rajasthani Cooking Workshop",
            duration: "3 hours",
            price: "1200",
            description: "Learn to cook local delicacies like 'Dal Baati Churma'.",
        },
        {
            name: "Stargazing in the Desert",
            duration: "2 hours",
            price: "500",
            description: "Experience the clear, unpolluted night sky of the Thar Desert.",
        },
        {
            name: "Village Heritage Walk",
            duration: "2 hours",
            price: "400",
            description: "Explore the village, interact with locals, and learn about their lifestyle.",
        },
    ],
    stats: {
        averageRating: 4.88,
        totalReviews: 312,
        establishedYear: "16th Century",
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
    const navigate = useNavigate();

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
                                                ₹{activity.price}
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
                                                onClick={() => navigate(`/village-booking/${index}`)}
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
                                                ₹{room.price}/night
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
