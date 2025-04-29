
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

interface DirectoryModalProps {
  item: DirectoryItemProps;
  onClose: () => void;
}

const DirectoryModal = ({ item, onClose }: DirectoryModalProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
              <div className="flex items-center mt-2">
                <Badge className="mr-2">{item.category}</Badge>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{item.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium text-lg">About</h3>
          <p className="mt-2 text-gray-700">{item.description}</p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Address:</span> {item.address}</p>
              <p><span className="font-medium">Phone:</span> {item.phone}</p>
              <p>
                <span className="font-medium">Website:</span>{" "}
                <a 
                  href={`https://${item.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline"
                >
                  {item.website}
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a 
                  href={`mailto:${item.email}`} 
                  className="text-blue-600 hover:underline"
                >
                  {item.email}
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Hours</h3>
            <p>{item.hours}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Contact</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DirectoryModal;
