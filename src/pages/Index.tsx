
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DirectoryCard from "@/components/DirectoryCard";
import DirectoryModal from "@/components/DirectoryModal";
import { Search } from "lucide-react";

// Sample JSON data that would normally come from an API or server
const directoryData = [
  {
    id: 1,
    name: "Mountain View Coffee Shop",
    category: "Cafe",
    description: "A cozy coffee shop with mountain views and fresh pastries daily.",
    address: "123 Alpine Road, Mountain View",
    phone: "(555) 123-4567",
    website: "www.mountainviewcoffee.com",
    email: "info@mountainviewcoffee.com",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    hours: "Mon-Fri: 7am-7pm, Sat-Sun: 8am-6pm"
  },
  {
    id: 2,
    name: "Tech Innovations Inc.",
    category: "Technology",
    description: "Leading technology company specializing in AI and machine learning solutions.",
    address: "456 Tech Blvd, Silicon Valley",
    phone: "(555) 987-6543",
    website: "www.techinnovationsinc.com",
    email: "contact@techinnovationsinc.com",
    image: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    hours: "Mon-Fri: 9am-5pm"
  },
  {
    id: 3,
    name: "Green Leaf Restaurant",
    category: "Restaurant",
    description: "Farm-to-table restaurant offering organic dishes and craft cocktails.",
    address: "789 Garden Lane, Greenville",
    phone: "(555) 456-7890",
    website: "www.greenleafrestaurant.com",
    email: "eat@greenleafrestaurant.com",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    hours: "Tue-Sun: 11am-10pm, Closed Mondays"
  },
  {
    id: 4,
    name: "Fitness First Gym",
    category: "Fitness",
    description: "Modern gym with state-of-the-art equipment and expert personal trainers.",
    address: "101 Muscle Road, Fitnessville",
    phone: "(555) 789-0123",
    website: "www.fitnessfirstgym.com",
    email: "train@fitnessfirstgym.com",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    hours: "Mon-Sun: 5am-11pm"
  },
  {
    id: 5,
    name: "Bookworm's Paradise",
    category: "Bookstore",
    description: "Cozy bookstore with rare finds and a reading cafe.",
    address: "222 Reader's Lane, Booktown",
    phone: "(555) 234-5678",
    website: "www.bookwormsparadise.com",
    email: "books@bookwormsparadise.com",
    image: "https://images.unsplash.com/photo-1521123845560-14093637aa7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    hours: "Mon-Sat: 10am-9pm, Sun: 11am-7pm"
  },
  {
    id: 6,
    name: "Ocean View Hotel",
    category: "Hotel",
    description: "Luxury beachfront hotel with panoramic ocean views and premium amenities.",
    address: "333 Coastal Highway, Beachside",
    phone: "(555) 345-6789",
    website: "www.oceanviewhotel.com",
    email: "reservations@oceanviewhotel.com",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    hours: "Open 24/7"
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(directoryData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Extract unique categories for filter
  const categories = ["All", ...new Set(directoryData.map(item => item.category))];
  
  useEffect(() => {
    // Filter data based on search term and category
    const filtered = directoryData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredData(filtered);
  }, [searchTerm, selectedCategory]);
  
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Directory Explorer</h1>
          <p className="text-xl opacity-90 mb-8">Discover amazing places and businesses in your area</p>
          
          {/* Search Bar */}
          <div className="max-w-xl bg-white rounded-full overflow-hidden flex items-center p-1 shadow-lg">
            <Search className="ml-4 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search by name or description..." 
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="rounded-full">Search</Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mr-2 mb-2"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
        </p>
        
        {/* Directory Cards */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map(item => (
              <DirectoryCard 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-medium text-gray-500">No results found</h3>
            <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Directory Explorer</h2>
            <p className="text-gray-400 mb-8">© 2025 Directory Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Detail Modal */}
      {selectedItem && (
        <DirectoryModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
};

export default Index;
