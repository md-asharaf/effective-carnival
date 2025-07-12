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
    id: "host-rohan-001",
    name: "Rohan Sharma",
    joinedDate: "March 2019",
    location: "Udaipur, Rajasthan, India",
    avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1887&auto=format&fit=crop",
    // coverImage: "https://images.unsplash.com/photo-1524293581917-878a6d017c71?q=80&w=2070&auto=format&fit=crop",

    // Host story and bio
    bio: `Namaste! I'm Rohan, and my family has been the custodian of this beautiful haveli in the heart of Udaipur for over a century. I am passionate about sharing the rich heritage and vibrant culture of Rajasthan with travelers from all over the globe.

I started hosting in 2019 to offer guests an authentic experience of royal Rajasthani hospitality. My wife, Priya, and I delight in preparing traditional Mewari cuisine, sharing tales of the city's glorious past, and helping our guests discover the magic of the 'City of Lakes'.

When I'm not attending to my guests, I practice miniature painting, a local art form passed down through generations in my family. I also enjoy playing the sitar and exploring the ancient Aravalli hills surrounding our city.`,

    languages: ["English", "Hindi", "Rajasthani", "Marwari"],
    responseTime: "Within 2 hours",
    responseRate: 95,

    // Verification and trust signals
    verifications: [
        { type: "Identity", verified: true },
        { type: "Phone", verified: true },
        { type: "Email", verified: true },
        { type: "Government ID", verified: true },
    ],

    // Host stats
    stats: {
        totalGuests: 312,
        yearsHosting: 5,
        averageRating: 4.9,
        totalReviews: 115,
        superhostStatus: true,
    },

    // Properties/rooms
    properties: [
        {
            id: "room-1",
            name: "Maharana Heritage Room",
            type: "Private room in a historic haveli",
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            price: 3500,
            rating: 4.9,
            reviews: 65,
            image: "https://images.unsplash.com/photo-1626556102433-01e5a444354c?q=80&w=1974&auto=format&fit=crop",
            amenities: ["Lake View", "Jharokha (Balcony)", "Traditional Decor", "Courtyard Access"],
        },
        {
            id: "room-2",
            name: "Pichola Lake View Suite",
            type: "Private suite with lake view",
            guests: 3,
            bedrooms: 1,
            bathrooms: 1,
            price: 5000,
            rating: 4.8,
            reviews: 50,
            image: "https://images.unsplash.com/photo-1618221118493-71957a326364?q=80&w=2070&auto=format&fit=crop",
            amenities: ["Panoramic Lake Views", "Private Bathroom", "WiFi", "Breakfast Included"],
        },
    ],

    // Recent reviews
    reviews: [
        {
            id: "review-1",
            guestName: "Aisha K.",
            guestAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
            country: "India",
            rating: 5,
            date: "February 2024",
            comment:
                "Rohan and Priya are the epitome of Indian hospitality. They made us feel like royalty in their stunning haveli. The home-cooked Rajasthani food was a highlight, and the views of Lake Pichola were simply magical. A truly authentic Udaipur experience!",
            propertyName: "Pichola Lake View Suite",
        },
        {
            id: "review-2",
            guestName: "John D.",
            guestAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
            country: "USA",
            rating: 5,
            date: "January 2024",
            comment:
                "An unforgettable stay! Rohan is a fantastic host, full of stories about the city's history. He even gave us a brief lesson in miniature painting. The haveli is a work of art itself. Highly recommended for a deep cultural immersion.",
            propertyName: "Maharana Heritage Room",
        },
        {
            id: "review-3",
            guestName: "Anika S.",
            guestAvatar: "https://randomuser.me/api/portraits/women/69.jpg",
            country: "India",
            rating: 5,
            date: "December 2023",
            comment:
                "Staying at Rohan's haveli felt like stepping back in time, but with all modern comforts. The hospitality was warm and genuine. Priya's cooking classes are a must-do! We learned to make Laal Maas and it was delicious.",
            propertyName: "Maharana Heritage Room",
        },
    ],

    // Host offerings and services
    services: [
        {
            name: "Old City Heritage Walk",
            description: "A guided tour through the historic lanes of Udaipur",
            price: "Free for guests",
            icon: Users,
        },
        {
            name: "Rajasthani Cooking Class",
            description: "Learn to cook authentic Mewari dishes like Dal Baati",
            price: "₹1500 per person",
            icon: Utensils,
        },
        {
            name: "Sunset Boat Ride on Lake Pichola",
            description: "Enjoy a serene boat ride with stunning sunset views",
            price: "₹800 per person",
            icon: Camera,
        },
        {
            name: "Airport Pickup",
            description: "Transportation from Udaipur Airport",
            price: "₹1200 per trip",
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
        phone: "+91-9876543210",
        email: "rohan.sharma@havelistay.com",
        whatsapp: "+91-9876543210",
    },

    // Host interests and hobbies
    interests: [
        "Rajasthani Folk Music",
        "Miniature Painting",
        "Local Cuisine",
        "History of Mewar",
        "Sitar",
        "Photography",
    ],
}

export default function PublicHostProfile() {
    // const [selectedProperty, setSelectedProperty] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cover Photo */}
            <div className="relative h-64 md:h-80">
                {/* <img
                    src={hostProfile.coverImage || "/placeholder.svg"}
                    alt="Host cover photo"
                    fill
                    className="object-cover"
                /> */}
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
                        <Card className="py-3">
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
                                                    <span className="text-xl font-bold text-green-600">₹{property.price}/night</span>
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
                        <Card className="py-3">
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
                        <Card className="py-3 mb-2">
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
                        <Card className="py-3">
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
                        <Card className="py-3">
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
                        <Card className="py-3">
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
                        <Card className="py-3">
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
