
"use client";

import { useState, useEffect } from "react";
import { identifyEmergingMalariaHotspots, IdentifyEmergingMalariaHotspotsOutput } from "@/ai/flows/identify-emerging-malaria-hotspots-flow";
import { MOCK_CASES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AnalyticsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<IdentifyEmergingMalariaHotspotsOutput | null>(null);

  async function runAIAnalysis() {
    setIsAnalyzing(true);
    try {
      // Map mock cases to schema
      const incidents = MOCK_CASES.map(c => ({
        id: c.id,
        latitude: c.latitude,
        longitude: c.longitude,
        date: c.reportedAt,
        caseCount: 1, // Simple unit case
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

  useEffect(() => {
    // Optionally run on mount
    // runAIAnalysis();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Advanced Analytics</h1>
          <p className="text-muted-foreground">AI-powered insights and trend identification.</p>
        </div>
        <Button onClick={runAIAnalysis} disabled={isAnalyzing} className="bg-accent hover:bg-accent/90">
          {isAnalyzing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Data...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Run AI Hotspot Detection</>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Trend Identification Summary
            </CardTitle>
            <CardDescription>AI analysis of recent incident patterns</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {analysis ? (
              <div className="prose prose-sm dark:prose-invert">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {analysis.summary}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="p-4 bg-muted rounded-full">
                  <Sparkles className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">No Analysis Available</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">Click "Run AI Hotspot Detection" to analyze reported incidents for emerging trends.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" />
              Identified Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis && analysis.hotspots.length > 0 ? (
              analysis.hotspots.map((hotspot, i) => (
                <div key={i} className="p-4 border rounded-lg space-y-2 relative overflow-hidden bg-background">
                  <div className={`absolute top-0 right-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    hotspot.severity === 'critical' ? 'bg-red-500 text-white' :
                    hotspot.severity === 'high' ? 'bg-orange-500 text-white' :
                    hotspot.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'
                  }`}>
                    {hotspot.severity}
                  </div>
                  <h4 className="font-semibold text-sm pr-12">{hotspot.area || "Unnamed Region"}</h4>
                  <p className="text-xs text-muted-foreground">{hotspot.reason}</p>
                  <div className="text-[10px] font-mono text-muted-foreground/60">
                    Loc: {hotspot.latitude.toFixed(4)}, {hotspot.longitude.toFixed(4)}
                  </div>
                </div>
              ))
            ) : analysis ? (
              <p className="text-sm text-center text-muted-foreground py-8">No significant hotspots detected.</p>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-sm italic">Analysis required</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
