
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DirectoryCard from "@/components/DirectoryCard";
import DirectoryModal from "@/components/DirectoryModal";
import { Search } from "lucide-react";
import { DirectoryItem } from "@/data/directoryData";
import { getPaginatedData, getPageNumbers } from "@/utils/pagination";
import { motion } from "framer-motion";

interface PaginatedDirectoryProps {
  data: DirectoryItem[];
  categories: string[];
}

const PaginatedDirectory = ({ data, categories }: PaginatedDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<DirectoryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page
  
  // Filter data based on search term and category
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get paginated data
  const { items: displayItems, paginationInfo } = getPaginatedData(
    filteredData,
    currentPage,
    itemsPerPage
  );
  
  // Generate page numbers for pagination navigation
  const pageNumbers = getPageNumbers(
    paginationInfo.currentPage,
    paginationInfo.totalPages
  );
  
  const handleItemClick = (item: DirectoryItem) => {
    setSelectedItem(item);
  };
  
  const closeModal = () => {
    setSelectedItem(null);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page when changing filters
            }}
            className="mr-2 mb-2 transition-all duration-300"
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Results Count */}
      <p className="text-gray-600 mb-6">
        Showing {displayItems.length} of {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
      </p>
      
      {/* Directory Cards */}
      {displayItems.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <DirectoryCard
                item={item}
                onClick={() => handleItemClick(item)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-medium text-gray-500">No results found</h3>
          <p className="mt-2 text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Pagination */}
      {paginationInfo.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, paginationInfo.currentPage - 1))}
                  className={paginationInfo.currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {pageNumbers.map((pageNum, idx) => (
                pageNum === null ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === paginationInfo.currentPage}
                      onClick={() => handlePageChange(pageNum)}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(paginationInfo.totalPages, paginationInfo.currentPage + 1))}
                  className={paginationInfo.currentPage === paginationInfo.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      
      {/* Detail Modal */}
      {selectedItem && (
        <DirectoryModal item={selectedItem} onClose={closeModal} />
      )}
    </div>
  );
};

export default PaginatedDirectory;
