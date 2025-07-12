import { Card, CardContent } from "@/components/ui/card"
import { Home, Utensils, Users, TreePine, Heart, Camera } from "lucide-react"

const features = [
    {
        icon: Home,
        title: "Authentic Homestays",
        description: "Stay with local families in traditional homes and experience genuine village hospitality.",
    },
    {
        icon: Utensils,
        title: "Farm-to-Table Dining",
        description: "Enjoy fresh, organic meals prepared with ingredients grown right in the village.",
    },
    {
        icon: Users,
        title: "Cultural Immersion",
        description: "Participate in local festivals, crafts, and daily activities of village life.",
    },
    {
        icon: TreePine,
        title: "Nature Activities",
        description: "Hiking, bird watching, farming, and exploring pristine natural landscapes.",
    },
    {
        icon: Heart,
        title: "Community Support",
        description: "Your stay directly supports local communities and sustainable tourism.",
    },
    {
        icon: Camera,
        title: "Unforgettable Memories",
        description: "Create lasting memories with unique experiences you won't find anywhere else.",
    },
]

export default function Features() {
    return (
        <section className="py-20 bg-green-50 rounded-xl">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Village Stays?</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the beauty of rural life while supporting local communities and creating meaningful connections.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <feature.icon className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
