
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Layers, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Incident Mapping</h1>
          <p className="text-muted-foreground">Geospatial visualization of reported malaria cases.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">4 Active Hotspots</Badge>
          <Button size="sm" variant="secondary"><Layers className="mr-2 h-4 w-4" /> Layers</Button>
        </div>
      </div>

      <div className="flex-1 grid gap-6 md:grid-cols-4 min-h-0">
        <div className="md:col-span-3 relative rounded-xl overflow-hidden border shadow-xl bg-muted group">
          {/* Simulated Map Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear group-hover:scale-110" 
            style={{ backgroundImage: `url('https://picsum.photos/seed/patamap123/1600/1200')` }}
          />
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="shadow-md"><Crosshair className="h-4 w-4" /></Button>
            <div className="bg-white rounded-md shadow-md flex flex-col border">
               <Button size="icon" variant="ghost" className="rounded-none border-b">+</Button>
               <Button size="icon" variant="ghost" className="rounded-none">-</Button>
            </div>
          </div>

          {/* Map Markers (Simulated) */}
          <div className="absolute top-[40%] left-[30%] animate-bounce">
            <div className="relative group/pin">
              <MapPin className="h-8 w-8 text-red-600 fill-red-600/20" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-lg shadow-xl border opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                <p className="text-xs font-bold text-primary">CASE-001: Nairobi Central</p>
                <p className="text-[10px] text-muted-foreground">Reported: 2h ago</p>
                <div className="mt-2 flex gap-1">
                  <Badge className="text-[8px] h-4">Positive</Badge>
                  <Badge variant="outline" className="text-[8px] h-4">High Fever</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-[60%] left-[55%]">
            <MapPin className="h-6 w-6 text-primary fill-primary/20" />
          </div>
          
          <div className="absolute top-[30%] left-[75%]">
            <MapPin className="h-6 w-6 text-accent fill-accent/20" />
          </div>

          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" /> Map Legend
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <span>Critical / Recent Surge</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Confirmed Case</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span>Under Treatment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2">
          <Card className="border-none shadow-md">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Location Filter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Region</label>
                <select className="w-full bg-secondary border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
                  <option>All Regions</option>
                  <option>Nairobi</option>
                  <option>Coast</option>
                  <option>Lake Basin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Time Range</label>
                <select className="w-full bg-secondary border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <Button className="w-full h-8 text-xs">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="p-4">
              <CardTitle className="text-base">Regional Density</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
               {[
                 { name: "Mombasa Port", count: 84, color: "bg-red-500" },
                 { name: "Nairobi Central", count: 42, color: "bg-orange-500" },
                 { name: "Dagoretti", count: 18, color: "bg-primary" },
                 { name: "Eldoret North", count: 12, color: "bg-accent" },
               ].map((area, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted p-1 rounded transition-colors">
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${area.color}`} />
                     <span className="text-xs font-medium">{area.name}</span>
                   </div>
                   <span className="text-xs font-bold">{area.count}</span>
                 </div>
               ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
