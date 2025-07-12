// import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Calendar,
  Users,
  Home,
  MessageSquare,
  TrendingUp,
  Camera,
  Edit,
  Phone,
  Mail,
  Globe,
  PlusCircle,
} from "lucide-react"

// Mock data based on the schema
const hostData = {
  id: "host-123",
  name: "Rajesh Gurung",
  email: "rajesh@villagestay.com",
  phone: "+977-9841234567",
  role: "room_owner",
  createdAt: "2023-01-15",
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",

  // Village data
  village: {
    id: "village-456",
    name: "Ghandruk Village",
    location: "Annapurna Region, Nepal",
    description: "Traditional Gurung village with stunning Himalayan views and rich cultural heritage.",
    images: [
      "https://images.unsplash.com/photo-1542692423-34015273c35e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595432542143-a15a47884153?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598459913303-9e148a2f8594?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605641834243-7716ac5a035d?q=80&w=2070&auto=format&fit=crop",
    ],
  },

  // Rooms data
  rooms: [
    {
      id: "room-1",
      name: "Mountain View Homestay",
      description: "Cozy room with panoramic mountain views",
      price: "45.00",
      available: true,
      bookings: 23,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: "room-2",
      name: "Traditional Gurung House",
      description: "Authentic traditional house experience",
      price: "35.00",
      available: true,
      bookings: 18,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1598035736197-041538952811?q=80&w=2070&auto=format&fit=crop"
    },
  ],

  // Recent bookings
  recentBookings: [
    {
      id: "booking-1",
      guestName: "Sarah Johnson",
      roomName: "Mountain View Homestay",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      totalPrice: "225.00",
      status: "confirmed",
    },
    {
      id: "booking-2",
      guestName: "Marco Rodriguez",
      roomName: "Traditional Gurung House",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      totalPrice: "105.00",
      status: "completed",
    },
  ],

  // Reviews
  reviews: [
    {
      id: "review-1",
      guestName: "Sarah Johnson",
      rating: 5,
      comment: "Amazing hospitality! Rajesh made our stay unforgettable with his warm welcome and local insights.",
      targetType: "room",
      createdAt: "2024-01-10",
    },
    {
      id: "review-2",
      guestName: "David Chen",
      rating: 5,
      comment: "The traditional house was authentic and comfortable. Great mountain views!",
      targetType: "room",
      createdAt: "2024-01-05",
    },
  ],

  // Stats
  stats: {
    totalBookings: 41,
    totalEarnings: "1,850.00",
    averageRating: 4.85,
    responseRate: 98,
    joinedDate: "January 2023",
  },
}

export default function HostProfile() {
  // const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Card className="bg-white shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-28 h-28 border-4 border-white shadow-md">
                  <AvatarImage src={hostData.avatar} alt={hostData.name} />
                  <AvatarFallback className="text-3xl bg-slate-200">
                    {hostData.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-600 hover:bg-green-700">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{hostData.name}</h1>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Verified Host</Badge>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{hostData.village.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Host since {hostData.stats.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>
                      {hostData.stats.averageRating} ({hostData.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-center">
                <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  View Public Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Bookings", value: hostData.stats.totalBookings, icon: Users, color: "text-blue-600" },
            { title: "Average Rating", value: hostData.stats.averageRating, icon: Star, color: "text-yellow-500" },
            { title: "Response Rate", value: `${hostData.stats.responseRate}%`, icon: MessageSquare, color: "text-green-600" },
            { title: "Active Rooms", value: hostData.rooms.length, icon: Home, color: "text-purple-600" },
          ].map(item => (
            <Card key={item.title} className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-full bg-slate-100 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                  <div className="text-sm text-gray-500">{item.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-slate-200 p-1 h-auto rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rooms">My Rooms</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="village">Village Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contact & Recent Activity */}
              <Card className="lg:col-span-2 shadow-md p-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-sm">New booking from Sarah Johnson</span><span className="text-xs text-gray-500 ml-auto">2 hours ago</span></div>
                  <div className="flex items-center gap-3"><div className="w-2 h-2 bg-blue-500 rounded-full"></div><span className="text-sm">Received 5-star review</span><span className="text-xs text-gray-500 ml-auto">1 day ago</span></div>
                  <div className="flex items-center gap-3"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div><span className="text-sm">Updated room photos</span><span className="text-xs text-gray-500 ml-auto">3 days ago</span></div>
                </CardContent>
              </Card>
              <Card className="shadow-md">
                <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-400" /><span>{hostData.email}</span></div>
                  <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-400" /><span>{hostData.phone}</span></div>
                  <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-gray-400" /><span>English, Nepali</span></div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rooms" className="mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">My Rooms</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white shadow-sm"><PlusCircle className="w-4 h-4 mr-2" />Add New Room</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hostData.rooms.map((room) => (
                <Card key={room.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="relative h-56">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <Badge className={`absolute top-3 right-3 text-white ${room.available ? "bg-green-600" : "bg-red-600"}`}>{room.available ? "Available" : "Booked"}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 truncate">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 h-10">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">${room.price}<span className="text-sm font-normal text-gray-500">/night</span></span>
                      <div className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-400" /><span className="font-semibold">{room.rating}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6 space-y-4">
            {hostData.recentBookings.map((booking) => (
              <Card key={booking.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{booking.guestName}</h3>
                    <p className="text-sm text-gray-500">{booking.roomName}</p>
                    <p className="text-sm text-gray-500">{booking.startDate} to {booking.endDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-green-600">${booking.totalPrice}</div>
                    <Badge variant="secondary" className={`mt-1 capitalize ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{booking.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-4">
            {hostData.reviews.map((review) => (
              <Card key={review.id} className="shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar><AvatarImage src={`https://i.pravatar.cc/150?u=${review.guestName}`} /><AvatarFallback>{review.guestName.charAt(0)}</AvatarFallback></Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-semibold">{review.guestName}</h3>
                        <span className="text-xs text-gray-500">{review.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (<Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />))}
                      </div>
                      <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="village" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{hostData.village.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span>{hostData.village.location}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6">{hostData.village.description}</p>
                    <Button className="bg-green-600 hover:bg-green-700">Edit Village Info</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {hostData.village.images.map((image, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${hostData.village.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
