
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { directoryData, categories } from "@/data/directoryData";
import PaginatedDirectory from "@/components/PaginatedDirectory";
import { useState } from "react";
import useConfig from "@/utils/useConfig";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const config = useConfig();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term is already tracked in state and passed to child components
    // This function is here to prevent form submission refresh
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className={`bg-gradient-to-r ${config.headerBackground} text-white py-16`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{config.siteTitle}</h1>
            <p className="text-xl opacity-90 mb-8">{config.siteDescription}</p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="max-w-xl bg-white rounded-full overflow-hidden flex items-center p-1 shadow-lg">
              <Search className="ml-4 text-gray-400" />
              <Input 
                type="text"
                placeholder="Search by name or description..." 
                className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className={`rounded-full bg-${config.primaryColor} hover:bg-${config.primaryColor}/90`}>Search</Button>
            </form>
          </motion.div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <PaginatedDirectory data={directoryData} categories={categories} />
      </main>
      
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{config.siteTitle}</h3>
              <p className="text-gray-300 mb-4">{config.siteDescription}</p>
              <div className="flex space-x-4">
                {Object.entries(config.social).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={`https://${url}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                ))}
              </div>
            </div>
            
            {config.footerLinks.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.url} 
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {config.siteTitle}. All rights reserved.</p>
            <address className="not-italic mt-2">
              {config.contactInfo.address} | {config.contactInfo.email} | {config.contactInfo.phone}
            </address>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
