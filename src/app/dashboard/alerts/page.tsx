
"use client";

import { useState } from "react";
import { generateMalariaSurgeAlert, GenerateMalariaSurgeAlertOutput } from "@/ai/flows/generate-malaria-surge-alert-flow";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, AlertCircle, ShieldAlert, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateMalariaSurgeAlertOutput | null>(null);

  // Form state
  const [region, setRegion] = useState("Coast Region");
  const [current, setCurrent] = useState(45);
  const [historical, setHistorical] = useState(30);
  const [threshold, setThreshold] = useState(20);

  async function checkSurge() {
    setIsLoading(true);
    try {
      const output = await generateMalariaSurgeAlert({
        regionName: region,
        currentCases: current,
        historicalAverageCases: historical,
        surgeThresholdPercentage: threshold
      });
      setResult(output);
      
      if (output.surgeDetected) {
        toast({
          variant: "destructive",
          title: "Surge Detected!",
          description: output.alertMessage
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Surge Alert System</h1>
        <p className="text-muted-foreground">Monitor regional case counts and detect unusual spikes in real-time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Manual Surge Check
            </CardTitle>
            <CardDescription>Verify if a region's data indicates a significant increase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="region">Region Name</Label>
              <Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Current Period Cases</Label>
                <Input id="current" type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="historical">Historical Average</Label>
                <Input id="historical" type="number" value={historical} onChange={(e) => setHistorical(Number(e.target.value))} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Alert Threshold (%)</Label>
              <Input id="threshold" type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
              <p className="text-xs text-muted-foreground">Triggers alert if current cases exceed historical by this percentage.</p>
            </div>
            <Button className="w-full" onClick={checkSurge} disabled={isLoading}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...</> : "Detect Surge"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md h-full">
            <CardHeader>
              <CardTitle>Analysis Result</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
              {result ? (
                <div className="w-full space-y-6">
                  {result.surgeDetected ? (
                    <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                      <AlertCircle className="h-5 w-5" />
                      <AlertTitle className="text-destructive font-bold">ALARM: Surge Detected</AlertTitle>
                      <AlertDescription className="text-destructive mt-2 leading-relaxed font-medium">
                        {result.alertMessage}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="p-4 bg-green-100 rounded-full inline-block">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-green-700">Stable Activity</h3>
                        <p className="text-muted-foreground">Current cases in {region} are within the expected historical range.</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-secondary rounded-lg space-y-3">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground">Calculation Proof</h4>
                    <div className="flex justify-between text-sm">
                      <span>Threshold value:</span>
                      <span className="font-mono">{historical} + {threshold}% = {(historical * (1 + threshold/100)).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Actual value:</span>
                      <span className={`font-mono font-bold ${result.surgeDetected ? 'text-red-500' : 'text-green-600'}`}>
                        {current}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground space-y-4">
                  <div className="p-4 bg-muted rounded-full inline-block">
                    <Bell className="h-10 w-10" />
                  </div>
                  <p>Run a check to see real-time alerts.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
