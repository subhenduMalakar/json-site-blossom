
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { directoryData, categories } from "@/data/directoryData";
import PaginatedDirectory from "@/components/PaginatedDirectory";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term is already tracked in state and passed to child components
    // This function is here to prevent form submission refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Directory Explorer</h1>
          <p className="text-xl opacity-90 mb-8">Discover amazing places and businesses in your area</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl bg-white rounded-full overflow-hidden flex items-center p-1 shadow-lg">
            <Search className="ml-4 text-gray-400" />
            <Input 
              type="text"
              placeholder="Search by name or description..." 
              className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="rounded-full">Search</Button>
          </form>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <PaginatedDirectory data={directoryData} categories={categories} />
      </main>
    </div>
  );
};

export default Index;
