"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Camera,
  Star,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Award,
  Eye,
  BarChart3,
  ImageIcon,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [obverseImage, setObverseImage] = useState(null);
  const [reverseImage, setReverseImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [coinDetails, setCoinDetails] = useState("");
  const [selectedCoinType, setSelectedCoinType] = useState("");
  const [gradingResults, setGradingResults] = useState(null);

  // Mock grading results for demonstration
  const mockResults = {
    overallGrade: "MS-65",
    gradeScore: 85,
    confidence: 92,
    details: {
      surface: "Excellent",
      strike: "Sharp",
      luster: "Outstanding",
      eyeAppeal: "Attractive",
    },
    marketValue: "$145 - $175",
    rarity: "Common",
    certificationRecommendation: "Recommended for certification",
  };

  const handleFileUpload = (file, side) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (side === "obverse") {
          setObverseImage(e.target.result);
        } else {
          setReverseImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setGradingResults(mockResults);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Stats */}
        <header className="text-center py-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Award className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">CoinGrader</h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Professional AI-powered coin grading. Upload your coin images and
            get accurate, professional grades using advanced computer vision
            technology.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-sm text-slate-500">Coins Graded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-slate-500">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.5s</div>
              <div className="text-sm text-slate-500">Avg. Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-slate-500">Available</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Section */}
          <Card className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Coin Images
              </CardTitle>
              <CardDescription>
                Upload clear, high-resolution images of both sides of your coin
                for the most accurate grading.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Coin Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="coin-type">Coin Type</Label>
                <Select
                  value={selectedCoinType}
                  onValueChange={setSelectedCoinType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="penny">Penny/Cent</SelectItem>
                    <SelectItem value="nickel">Nickel</SelectItem>
                    <SelectItem value="dime">Dime</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                    <SelectItem value="half-dollar">Half Dollar</SelectItem>
                    <SelectItem value="dollar">Dollar Coin</SelectItem>
                    <SelectItem value="foreign">Foreign Coin</SelectItem>
                    <SelectItem value="commemorative">Commemorative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="obverse">Obverse (Front)</Label>
                  <div
                    className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors cursor-pointer relative overflow-hidden"
                    onClick={() =>
                      document.getElementById("obverse-input").click()
                    }
                  >
                    {obverseImage ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={obverseImage}
                          alt="Obverse"
                          className="w-full h-32 object-cover rounded"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">
                          Click to upload front side
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="obverse-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "obverse")
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reverse">Reverse (Back)</Label>
                  <div
                    className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors cursor-pointer relative overflow-hidden"
                    onClick={() =>
                      document.getElementById("reverse-input").click()
                    }
                  >
                    {reverseImage ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={reverseImage}
                          alt="Reverse"
                          className="w-full h-32 object-cover rounded"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500">
                          Click to upload back side
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="reverse-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "reverse")
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coin-details">Coin Details (Optional)</Label>
                <Textarea
                  id="coin-details"
                  placeholder="Enter any additional information about your coin (year, mint mark, denomination, etc.)"
                  className="resize-none"
                  value={coinDetails}
                  onChange={(e) => setCoinDetails(e.target.value)}
                />
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Analyzing your coin...
                    </span>
                    <span className="text-sm text-slate-500">
                      {analysisProgress}%
                    </span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={simulateAnalysis}
                disabled={isAnalyzing || (!obverseImage && !reverseImage)}
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Grade My Coin
                  </>
                )}
              </Button>

              {/* Upload Tips */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pro Tips:</strong> Use good lighting, avoid shadows,
                  and ensure the entire coin is visible for best results.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Grading Results
              </CardTitle>
              <CardDescription>
                Your coin grading results will appear here after analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gradingResults ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="market">Market Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {gradingResults.overallGrade}
                        </div>
                        <div className="text-sm text-slate-600">
                          Overall Grade
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {gradingResults.confidence}%
                        </div>
                        <div className="text-sm text-slate-600">Confidence</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Grade Score</span>
                        <span className="text-sm text-slate-500">
                          {gradingResults.gradeScore}/100
                        </span>
                      </div>
                      <Progress
                        value={gradingResults.gradeScore}
                        className="w-full"
                      />
                    </div>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        {gradingResults.certificationRecommendation}
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(gradingResults.details).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 bg-slate-50 rounded"
                          >
                            <span className="capitalize font-medium">
                              {key}:
                            </span>
                            <Badge variant="outline">{value}</Badge>
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="market" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Estimated Value:</span>
                        <span className="text-lg font-bold text-green-600">
                          {gradingResults.marketValue}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Rarity:</span>
                        <Badge variant="secondary">
                          {gradingResults.rarity}
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <Star className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    No coin analyzed yet
                  </p>
                  <p className="text-sm">Upload coin images to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Advanced computer vision analyzes surface condition, strike
                quality, and overall preservation.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">
                  Computer Vision
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Deep Learning
                </Badge>
                <Badge variant="outline">Neural Networks</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Professional Standards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Grades follow industry-standard scales including Sheldon,
                European, and other recognized systems.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">
                  Sheldon Scale
                </Badge>
                <Badge variant="outline" className="mr-2">
                  PCGS Standards
                </Badge>
                <Badge variant="outline">NGC Compatible</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Instant Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Get detailed grading reports with confidence scores and
                condition analysis in seconds.
              </p>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2">
                  Real-time
                </Badge>
                <Badge variant="outline" className="mr-2">
                  Detailed Reports
                </Badge>
                <Badge variant="outline">Market Values</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works Section */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">
              How CoinGrader Works
            </CardTitle>
            <CardDescription>
              Our advanced AI system analyzes your coins in three simple steps
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Upload Images</h3>
                <p className="text-slate-600 text-sm">
                  Upload clear photos of both sides of your coin in good
                  lighting
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">2. AI Analysis</h3>
                <p className="text-slate-600 text-sm">
                  Our AI examines surface quality, strike sharpness, and overall
                  condition
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Get Results</h3>
                <p className="text-slate-600 text-sm">
                  Receive professional grade, confidence score, and market value
                  estimate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Coin Types */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-xl">Supported Coin Types</CardTitle>
            <CardDescription>
              We can grade a wide variety of coins from different countries and
              time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "US Coins",
                "World Coins",
                "Ancient Coins",
                "Commemoratives",
                "Gold Coins",
                "Silver Coins",
                "Copper Coins",
                "Modern Issues",
              ].map((type) => (
                <div
                  key={type}
                  className="text-center p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <div className="font-medium text-sm">{type}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <footer className="text-center py-12 border-t border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  CoinGrader
                </h3>
                <p className="text-slate-600 text-sm">
                  Professional AI-powered coin grading technology for collectors
                  and dealers worldwide.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• AI-Powered Analysis</li>
                  <li>• Professional Standards</li>
                  <li>• Instant Results</li>
                  <li>• Market Valuations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Accuracy</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Grade Accuracy:</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Confidence Score:</span>
                    <span className="font-semibold text-blue-600">95%+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <p className="text-slate-500 text-sm">
                &copy; 2025 CoinGrader. Professional coin grading powered by AI
                technology.
              </p>
              <p className="text-slate-400 text-xs mt-2">
                Disclaimer: AI grading is for reference purposes. Professional
                certification recommended for valuable coins.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
