
import { useEffect, useRef } from "react";
import { DirectoryItem } from "@/data/directoryData";

interface MapViewProps {
  item: DirectoryItem;
}

const MapView = ({ item }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!item.location || !mapRef.current) return;
    
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${item.location.lat},${item.location.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${item.location.lat},${item.location.lng}&key=YOUR_API_KEY`;
    
    // For demo purposes, we'll just display a placeholder map image
    const mapImage = document.createElement('img');
    mapImage.src = `https://via.placeholder.com/600x300/e5e7eb/94a3b8?text=Map+View+for+${encodeURIComponent(item.name)}`;
    mapImage.alt = `Location of ${item.name}`;
    mapImage.className = 'w-full h-full object-cover rounded-md';
    
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(mapImage);
  }, [item]);
  
  return (
    <div ref={mapRef} className="w-full h-64 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  );
};

export default MapView;
