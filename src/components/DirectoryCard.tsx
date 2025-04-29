
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DirectoryItemProps {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  image: string;
  rating: number;
  hours: string;
}

interface DirectoryCardProps {
  item: DirectoryItemProps;
  onClick: () => void;
}

const DirectoryCard = ({ item, onClick }: DirectoryCardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge>{item.category}</Badge>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{item.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-xl mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4 text-sm text-gray-500">
        <address className="not-italic text-left">{item.address}</address>
      </CardFooter>
    </Card>
  );
};

export default DirectoryCard;
