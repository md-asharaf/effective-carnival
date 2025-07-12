import { villages } from "@/lib/Data"
import { useNavigate } from "react-router-dom"


const VillageStay = () => {
  const navigate = useNavigate()





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">VillageStay</h1>
            <p className="text-gray-600">Meet the people and communities that have been impacted by VillageStay</p>
          </div>
        </div>
      </div>

      {/* Village Grid */}
      <div className="w-full mx-auto px-20 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {villages.map((village) => (
            <div
              key={village.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={village.image || "/placeholder.svg"}
                  alt={village.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{village.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{village.shortDescription}</p>
                <button
                  onClick={() => navigate(`/village-details/${village.id}`)}
                  className="text-red-500 font-medium hover:text-red-600 transition-colors cursor-pointer"
                >
                  See Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VillageStay