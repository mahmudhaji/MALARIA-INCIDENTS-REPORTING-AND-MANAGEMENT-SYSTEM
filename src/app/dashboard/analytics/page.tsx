
"use client";

import { useState, useEffect } from "react";
import { identifyEmergingMalariaHotspots, IdentifyEmergingMalariaHotspotsOutput } from "@/ai/flows/identify-emerging-malaria-hotspots-flow";
import { getCases } from "@/lib/case-store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, MapPin, AlertCircle, Loader2, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<IdentifyEmergingMalariaHotspotsOutput | null>(null);
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    setCaseCount(getCases().length);
  }, []);

  async function runAIAnalysis() {
    const currentCases = getCases();
    
    if (currentCases.length === 0) {
      return;
    }

    setIsAnalyzing(true);
    try {
      const incidents = currentCases.map(c => ({
        id: c.id,
        latitude: c.latitude,
        longitude: c.longitude,
        date: c.reportedAt,
        caseCount: 1,
        area: c.area
      }));

      const result = await identifyEmergingMalariaHotspots({
        malariaIncidents: incidents,
        timeframe: "last 30 days"
      });
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary uppercase">Advanced Analytics</h1>
          <p className="text-muted-foreground font-medium">AI-powered insights based on your reported incidents.</p>
        </div>
        <Button 
          onClick={runAIAnalysis} 
          disabled={isAnalyzing || caseCount === 0} 
          className="bg-accent hover:bg-accent/90 text-primary font-bold shadow-md"
        >
          {isAnalyzing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Records...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Run AI Hotspot Detection</>
          )}
        </Button>
      </div>

      {caseCount === 0 ? (
        <Card className="border-dashed border-2 py-20 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-white rounded-full shadow-sm">
              <Database className="h-10 w-10 text-slate-300" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-600">No Data Available for Analysis</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                The AI analytics engine requires at least one reported incident to identify trends. 
                Please add a field report to begin surveillance.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-none shadow-md overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                <TrendingUp className="h-5 w-5" />
                Trend Identification Summary
              </CardTitle>
              <CardDescription className="font-medium">AI analysis of your session's data patterns</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {analysis ? (
                <div className="prose prose-sm dark:prose-invert">
                  <p className="text-base leading-relaxed text-slate-700 font-medium">
                    {analysis.summary}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="p-4 bg-muted rounded-full">
                    <Sparkles className="h-8 w-8 text-muted-foreground opacity-50" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-500">Analysis Required</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">Click "Run AI Hotspot Detection" to process {caseCount} active records.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary text-sm font-black uppercase tracking-widest">
                <MapPin className="h-5 w-5" />
                Identified Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis && analysis.hotspots.length > 0 ? (
                analysis.hotspots.map((hotspot, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-2 relative overflow-hidden bg-background shadow-sm hover:border-primary/30 transition-colors">
                    <div className={`absolute top-0 right-0 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                      hotspot.severity === 'critical' ? 'bg-red-500 text-white' :
                      hotspot.severity === 'high' ? 'bg-orange-500 text-white' :
                      hotspot.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
                    }`}>
                      {hotspot.severity}
                    </div>
                    <h4 className="font-bold text-sm pr-12 text-slate-800">{hotspot.area || "Unnamed Region"}</h4>
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight">{hotspot.reason}</p>
                    <div className="text-[9px] font-mono text-muted-foreground/60 bg-slate-50 p-1 inline-block rounded">
                      GPS: {hotspot.latitude.toFixed(3)}, {hotspot.longitude.toFixed(3)}
                    </div>
                  </div>
                ))
              ) : analysis ? (
                <p className="text-sm text-center text-muted-foreground py-8 font-medium">No significant geographic clusters identified in current data.</p>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 italic">Ready for Processing</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
