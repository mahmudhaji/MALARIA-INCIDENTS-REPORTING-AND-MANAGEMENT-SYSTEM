
"use client";

import { useState, useEffect } from "react";
import { getCases } from "@/lib/case-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, Layers, Crosshair, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MalariaCase } from "@/lib/types";

export default function MapPage() {
  const [cases, setCases] = useState<MalariaCase[]>([]);

  useEffect(() => {
    setCases(getCases());
  }, []);

  const hasData = cases.length > 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Incident Mapping</h1>
          <p className="text-muted-foreground font-medium">Real-time geospatial visualization of your session's data.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-bold">
            {cases.length} Active Records
          </Badge>
          <Button size="sm" variant="secondary" className="font-bold"><Layers className="mr-2 h-4 w-4" /> Layers</Button>
        </div>
      </div>

      <div className="flex-1 grid gap-6 md:grid-cols-4 min-h-0">
        <div className="md:col-span-3 relative rounded-xl overflow-hidden border shadow-xl bg-slate-100 group">
          {/* Map Visual */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] ease-linear group-hover:scale-105" 
            style={{ backgroundImage: `url('https://picsum.photos/seed/patamap_surv/1600/1200')` }}
          />
          <div className="absolute inset-0 bg-white/40" />
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="shadow-md bg-white hover:bg-slate-50"><Crosshair className="h-4 w-4" /></Button>
            <div className="bg-white rounded-md shadow-md flex flex-col border overflow-hidden">
               <Button size="icon" variant="ghost" className="rounded-none border-b h-8 w-8">+</Button>
               <Button size="icon" variant="ghost" className="rounded-none h-8 w-8">-</Button>
            </div>
          </div>

          {/* Dynamic Map Markers based on User Data */}
          {cases.map((c, i) => (
            <div 
              key={c.id} 
              className="absolute animate-in zoom-in duration-300"
              style={{ 
                // Simulated random placement based on their lat/long decimals for visual variety in a prototype
                top: `${40 + (i * 10) % 40}%`, 
                left: `${30 + (i * 15) % 60}%` 
              }}
            >
              <div className="relative group/pin">
                <MapPin className={`h-8 w-8 cursor-pointer drop-shadow-lg ${
                  c.testResult === 'Positive' ? 'text-destructive fill-destructive/20' : 'text-primary fill-primary/20'
                }`} />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white p-3 rounded-lg shadow-2xl border-2 border-primary/10 opacity-0 group-hover/pin:opacity-100 transition-all pointer-events-none z-50">
                  <p className="text-xs font-black text-primary uppercase">{c.id}</p>
                  <p className="text-sm font-bold text-slate-800">{c.patientName}</p>
                  <p className="text-[10px] text-muted-foreground font-bold">{c.area}</p>
                  <div className="mt-2 flex gap-1">
                    <Badge className="text-[8px] h-4 font-black">{c.testResult.toUpperCase()}</Badge>
                    <Badge variant="outline" className="text-[8px] h-4 font-bold">{c.status}</Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {!hasData && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <div className="text-center p-8 bg-white/90 rounded-2xl shadow-2xl border border-white max-w-sm">
                <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">No Incidents Reported</h3>
                <p className="text-sm text-slate-600 font-medium mt-2">
                  The interactive map will populate once you report cases from the field. Currently displaying default regional overview.
                </p>
                <Button className="mt-6 font-bold" onClick={() => window.location.href = '/dashboard/report'}>Report First Case</Button>
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border max-w-xs z-30">
            <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
              <Info className="h-4 w-4" /> Map Legend
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="w-3 h-3 rounded-full bg-destructive shadow-sm" />
                <span className="text-slate-700">Positive RDT Case</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold">
                <div className="w-3 h-3 rounded-full bg-primary shadow-sm" />
                <span className="text-slate-700">Pending / Negative Case</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2">
          <Card className="border-none shadow-md">
            <CardHeader className="p-4 bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500">Regional Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
               {hasData ? (
                 <div className="space-y-3">
                   {/* Dynamically grouped density */}
                   {Array.from(new Set(cases.map(c => c.area))).slice(0, 4).map((area, i) => (
                     <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-xs font-bold text-slate-700">{area}</span>
                        <Badge variant="secondary" className="font-black text-[10px]">
                          {cases.filter(c => c.area === area).length}
                        </Badge>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-[10px] text-center italic text-muted-foreground py-4">Waiting for incoming field reports...</p>
               )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="p-4 bg-slate-50/50">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500">Map Filter</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Time Window</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-primary outline-none">
                  <option>Session Data Only</option>
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              <Button className="w-full h-8 text-xs font-bold" variant="outline" disabled={!hasData}>Recenter View</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
