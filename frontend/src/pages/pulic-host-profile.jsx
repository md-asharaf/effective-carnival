// import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Star,
    MapPin,
    Calendar,
    Users,
    MessageSquare,
    Shield,
    Clock,
    Globe,
    Heart,
    Camera,
    Phone,
    Mail,
    CheckCircle,
    Award,
    Car,
    Utensils,
} from "lucide-react"

// Mock data for public host profile
const hostProfile = {
    id: "host-rajesh-001",
    name: "Rajesh Gurung",
    joinedDate: "January 2020",
    location: "Ghandruk Village, Nepal",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1542692423-34015273c35e?q=80&w=2070&auto=format&fit=crop",

    // Host story and bio
    bio: `Namaste! I'm Rajesh, born and raised in the beautiful village of Ghandruk. My family has lived here for generations, and I'm passionate about sharing our rich Gurung culture with visitors from around the world. 

I started hosting travelers in 2020 because I believe that authentic cultural exchange happens best when you stay with local families. My wife Maya and I love cooking traditional meals, sharing stories about our village's history, and helping guests discover hidden gems in the Annapurna region.

When I'm not hosting, you'll find me tending to our organic vegetable garden, guiding trekkers on mountain trails, or playing traditional Gurung music with friends in the village square.`,

    languages: ["English", "Nepali", "Gurung", "Hindi"],
    responseTime: "Within 1 hour",
    responseRate: 98,

    // Verification and trust signals
    verifications: [
        { type: "Identity", verified: true },
        { type: "Phone", verified: true },
        { type: "Email", verified: true },
        { type: "Government ID", verified: true },
    ],

    // Host stats
    stats: {
        totalGuests: 247,
        yearsHosting: 4,
        averageRating: 4.9,
        totalReviews: 89,
        superhostStatus: true,
    },

    // Properties/rooms
    properties: [
        {
            id: "room-1",
            name: "Traditional Gurung Homestay",
            type: "Private room in family home",
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            price: 25,
            rating: 4.9,
            reviews: 45,
            image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
            amenities: ["Mountain View", "Shared Kitchen", "Traditional Meals", "Garden"],
        },
        {
            id: "room-2",
            name: "Annapurna View Room",
            type: "Private room with mountain view",
            guests: 3,
            bedrooms: 1,
            bathrooms: 1,
            price: 35,
            rating: 4.8,
            reviews: 32,
            image: "https://images.unsplash.com/photo-1598035736197-041538952811?q=80&w=2070&auto=format&fit=crop",
            amenities: ["Panoramic Views", "Private Bathroom", "WiFi", "Breakfast"],
        },
    ],

    // Recent reviews
    reviews: [
        {
            id: "review-1",
            guestName: "Sarah M.",
            guestAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
            country: "Australia",
            rating: 5,
            date: "January 2024",
            comment:
                "Rajesh and Maya are incredible hosts! They welcomed us like family and shared so much about Gurung culture. The traditional meals were amazing, and the mountain views from their home are breathtaking. Highly recommend staying here for an authentic Nepal experience.",
            propertyName: "Traditional Gurung Homestay",
        },
        {
            id: "review-2",
            guestName: "Marco R.",
            guestAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
            country: "Italy",
            rating: 5,
            date: "December 2023",
            comment:
                "What an unforgettable experience! Rajesh took us on a village tour and taught us about local traditions. Maya's cooking is exceptional - we learned to make dal bhat and momos. The hospitality here is beyond words.",
            propertyName: "Annapurna View Room",
        },
        {
            id: "review-3",
            guestName: "Yuki T.",
            guestAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
            country: "Japan",
            rating: 5,
            date: "November 2023",
            comment:
                "Rajesh is a wonderful storyteller and guide. He shared fascinating stories about village life and helped us understand Gurung customs. The room was clean and comfortable, and we felt completely safe and welcome.",
            propertyName: "Traditional Gurung Homestay",
        },
    ],

    // Host offerings and services
    services: [
        {
            name: "Cultural Tours",
            description: "Guided walks through the village with stories and history",
            price: "Free for guests",
            icon: Users,
        },
        {
            name: "Traditional Cooking Classes",
            description: "Learn to prepare authentic Gurung dishes",
            price: "$15 per person",
            icon: Utensils,
        },
        {
            name: "Mountain Sunrise Tours",
            description: "Early morning hike to best viewpoints",
            price: "$10 per person",
            icon: Camera,
        },
        {
            name: "Airport Pickup",
            description: "Transportation from Pokhara airport",
            price: "$25 per trip",
            icon: Car,
        },
    ],

    // House rules and policies
    houseRules: [
        "Check-in: 2:00 PM - 8:00 PM",
        "Check-out: 11:00 AM",
        "No smoking inside the house",
        "Respect local customs and traditions",
        "Remove shoes before entering",
        "Quiet hours: 9:00 PM - 7:00 AM",
    ],

    // Contact preferences
    contactInfo: {
        preferredContact: "WhatsApp or Email",
        phone: "+977-9841234567",
        email: "rajesh@ghandrukstay.com",
        whatsapp: "+977-9841234567",
    },

    // Host interests and hobbies
    interests: [
        "Mountain Trekking",
        "Traditional Music",
        "Organic Farming",
        "Photography",
        "Cultural Heritage",
        "Storytelling",
    ],
}

export default function PublicHostProfile() {
    // const [selectedProperty, setSelectedProperty] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo */}
            <div className="relative h-64 md:h-80">
                <img
                    src={hostProfile.coverImage || "/placeholder.svg"}
                    alt="Host cover photo"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
                {/* Host Header */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="relative">
                                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                    <AvatarImage src={hostProfile.avatar || "/placeholder.svg"} alt={hostProfile.name} />
                                    <AvatarFallback className="text-3xl">
                                        {hostProfile.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {hostProfile.stats.superhostStatus && (
                                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white">
                                        <Award className="w-3 h-3 mr-1" />
                                        Superhost
                                    </Badge>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900">{hostProfile.name}</h1>
                                    <div className="flex gap-1">
                                        {hostProfile.verifications
                                            .filter((v) => v.verified)
                                            .map((verification, index) => (
                                                <CheckCircle
                                                    key={index}
                                                    className="w-5 h-5 text-green-500"
                                                    title={`${verification.type} verified`}
                                                />
                                            ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{hostProfile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Hosting since {hostProfile.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {hostProfile.stats.averageRating} ({hostProfile.stats.totalReviews} reviews)
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {hostProfile.languages.map((language, index) => (
                                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                                            <Globe className="w-3 h-3" />
                                            {language}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Contact Host
                                    </Button>
                                    <Button variant="outline">
                                        <Heart className="w-4 h-4 mr-2" />
                                        Save Host
                                    </Button>
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <div className="text-2xl font-bold text-green-600">{hostProfile.stats.totalGuests}</div>
                                <div className="text-sm text-gray-500">Guests hosted</div>
                                <div className="text-lg font-semibold mt-2">{hostProfile.stats.yearsHosting} years</div>
                                <div className="text-sm text-gray-500">Experience</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Host */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">About {hostProfile.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-gray max-w-none">
                                    {hostProfile.bio.split("\n\n").map((paragraph, index) => (
                                        <p key={index} className="text-gray-700 leading-relaxed mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-semibold mb-3">Interests & Hobbies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {hostProfile.interests.map((interest, index) => (
                                            <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Host's Properties */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{hostProfile.name}'s Places</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {hostProfile.properties.map((property) => (
                                        <div
                                            key={property.id}
                                            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                                        >
                                            <div className="relative h-48">
                                                <img
                                                    src={property.image || "/placeholder.svg"}
                                                    alt={property.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg mb-1">{property.name}</h3>
                                                <p className="text-gray-600 text-sm mb-2">{property.type}</p>

                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-sm text-gray-500">
                                                        {property.guests} guests • {property.bedrooms} bedroom • {property.bathrooms} bathroom
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm">
                                                            {property.rating} ({property.reviews})
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {property.amenities.slice(0, 3).map((amenity, idx) => (
                                                        <Badge key={idx} variant="outline" className="text-xs">
                                                            {amenity}
                                                        </Badge>
                                                    ))}
                                                    {property.amenities.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{property.amenities.length - 3} more
                                                        </Badge>
                                                    )}
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-xl font-bold text-green-600">${property.price}/night</span>
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Services Offered */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">Services & Experiences</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {hostProfile.services.map((service, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <service.icon className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{service.name}</h4>
                                                <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                                                <span className="text-green-600 font-medium">{service.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center justify-between">
                                    <span>Reviews ({hostProfile.stats.totalReviews})</span>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xl font-bold">{hostProfile.stats.averageRating}</span>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {hostProfile.reviews.map((review) => (
                                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                            <div className="flex items-start gap-4">
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={review.guestAvatar || "/placeholder.svg"} alt={review.guestName} />
                                                    <AvatarFallback>{review.guestName[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold">{review.guestName}</h4>
                                                            <p className="text-sm text-gray-500">
                                                                {review.country} • {review.date}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 leading-relaxed mb-2">{review.comment}</p>
                                                    <p className="text-sm text-gray-500">Stayed at: {review.propertyName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="w-full mt-6 bg-transparent">
                                    Show All Reviews
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Host Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Host Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Response time</div>
                                        <div className="text-sm text-gray-600">{hostProfile.responseTime}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Response rate</div>
                                        <div className="text-sm text-gray-600">{hostProfile.responseRate}%</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <div className="font-medium">Identity verified</div>
                                        <div className="text-sm text-gray-600">
                                            {hostProfile.verifications.filter((v) => v.verified).length} verifications
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact {hostProfile.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>

                                <div className="text-center text-sm text-gray-600">
                                    <p>Preferred contact: {hostProfile.contactInfo.preferredContact}</p>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span>{hostProfile.contactInfo.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span>{hostProfile.contactInfo.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* House Rules */}
                        <Card>
                            <CardHeader>
                                <CardTitle>House Rules</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    {hostProfile.houseRules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Safety Features */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Safety & Trust</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {hostProfile.verifications.map((verification, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle
                                                className={`w-5 h-5 ${verification.verified ? "text-green-500" : "text-gray-300"}`}
                                            />
                                            <span className={`text-sm ${verification.verified ? "text-gray-900" : "text-gray-500"}`}>
                                                {verification.type} verified
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
