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
import { Upload, Camera, Star, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">CoinGrader</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional AI-powered coin grading. Upload your coin images and
            get accurate, professional grades using advanced computer vision
            technology.
          </p>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="obverse">Obverse (Front)</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">
                      Click to upload front side
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reverse">Reverse (Back)</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-slate-300 transition-colors cursor-pointer">
                    <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">
                      Click to upload back side
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coin-details">Coin Details (Optional)</Label>
                <Textarea
                  id="coin-details"
                  placeholder="Enter any additional information about your coin (year, mint mark, denomination, etc.)"
                  className="resize-none"
                />
              </div>

              <Button className="w-full" size="lg">
                Grade My Coin
              </Button>
            </CardContent>
          </Card>

          {/* Results Preview */}
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
              <div className="text-center py-12 text-slate-400">
                <Star className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No coin analyzed yet</p>
                <p className="text-sm">Upload coin images to get started</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Advanced computer vision analyzes surface condition, strike
                quality, and overall preservation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Professional Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Grades follow industry-standard scales including Sheldon,
                European, and other recognized systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instant Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Get detailed grading reports with confidence scores and
                condition analysis in seconds.
              </p>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center py-8 text-slate-500">
          <p>
            &copy; 2025 CoinGrader. Professional coin grading powered by AI.
          </p>
        </footer>
      </div>
    </div>
  );
}
