import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, TrendingUp, Award, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { mockColleges } from '../data/mockData';
import { motion } from 'motion/react';

export default function PersonalizePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    examScore: '',
    examType: '',
    preferredCourse: '',
    budget: [0, 500000],
    preferredLocations: [] as string[],
    priorities: 'balanced',
  });

  const [recommendations, setRecommendations] = useState<typeof mockColleges>([]);

  const examTypes = ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE', 'State CET', 'Other'];
  const courses = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'IT'];
  const states = [...new Set(mockColleges.map(c => c.state))];

  const generateRecommendations = () => {
    let scored = mockColleges.map(college => {
      let score = 0;

      if (formData.priorities === 'placements') {
        score += (college.placements.averagePackage / 100000) * 2;
        score += college.placements.placementRate * 0.5;
      } else if (formData.priorities === 'rankings') {
        score += (50 - college.ranking.nirf) * 2;
        score += college.rating * 10;
      } else if (formData.priorities === 'fees') {
        score += (500000 - college.fees.min) / 10000;
        score += college.roi * 5;
      } else {
        score += (50 - college.ranking.nirf);
        score += college.rating * 10;
        score += (college.placements.averagePackage / 100000);
        score += college.roi * 3;
      }

      if (college.fees.min >= formData.budget[0] && college.fees.max <= formData.budget[1]) {
        score += 20;
      }

      if (formData.preferredLocations.length > 0 && formData.preferredLocations.includes(college.state)) {
        score += 15;
      }

      return { ...college, matchScore: score };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scored.slice(0, 6));
    setStep(3);
  };

  const handleNext = () => {
    if (step === 2) {
      generateRecommendations();
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleLocation = (state: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(state)
        ? prev.preferredLocations.filter(s => s !== state)
        : [...prev.preferredLocations, state]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {step < 3 && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full mb-4">
                <Sparkles className="size-5" />
                <span className="font-semibold">AI-Powered Recommendations</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Find Your Perfect Match</h1>
              <p className="text-gray-600">Answer a few questions and we'll recommend the best colleges for you</p>
            </div>

            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 2 && (
                    <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-blue-600" />
                  Academic Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="examType">Entrance Exam</Label>
                  <Select value={formData.examType} onValueChange={(val) => setFormData({ ...formData, examType: val })}>
                    <SelectTrigger id="examType" className="mt-2">
                      <SelectValue placeholder="Select your exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map(exam => (
                        <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="examScore">Your Score/Rank</Label>
                  <Input
                    id="examScore"
                    type="text"
                    placeholder="e.g., 95 percentile or 5000 rank"
                    value={formData.examScore}
                    onChange={(e) => setFormData({ ...formData, examScore: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="preferredCourse">Preferred Course</Label>
                  <Select value={formData.preferredCourse} onValueChange={(val) => setFormData({ ...formData, preferredCourse: val })}>
                    <SelectTrigger id="preferredCourse" className="mt-2">
                      <SelectValue placeholder="Select your preferred course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Next
                    <ChevronRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-blue-600" />
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Annual Budget: ₹{(formData.budget[0] / 100000).toFixed(1)}L - ₹{(formData.budget[1] / 100000).toFixed(1)}L</Label>
                  <Slider
                    value={formData.budget}
                    onValueChange={(val) => setFormData({ ...formData, budget: val })}
                    min={0}
                    max={500000}
                    step={50000}
                    className="mt-4"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Preferred Locations</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {states.map(state => (
                      <Button
                        key={state}
                        variant={formData.preferredLocations.includes(state) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleLocation(state)}
                        className={formData.preferredLocations.includes(state) ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
                      >
                        {state}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">What matters most to you?</Label>
                  <RadioGroup value={formData.priorities} onValueChange={(val) => setFormData({ ...formData, priorities: val })}>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="rankings" />
                        <div className="flex-1">
                          <p className="font-semibold">Rankings & Reputation</p>
                          <p className="text-sm text-gray-600">Top-ranked institutions with strong brand value</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="placements" />
                        <div className="flex-1">
                          <p className="font-semibold">Placements & Packages</p>
                          <p className="text-sm text-gray-600">Best career outcomes and salary packages</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="fees" />
                        <div className="flex-1">
                          <p className="font-semibold">Affordability & ROI</p>
                          <p className="text-sm text-gray-600">Best value for money with high ROI</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="balanced" />
                        <div className="flex-1">
                          <p className="font-semibold">Balanced Approach</p>
                          <p className="text-sm text-gray-600">Consider all factors equally</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-between gap-3 pt-4">
                  <Button onClick={handleBack} variant="outline">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Get Recommendations
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <div className="size-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-2">Your Personalized Recommendations</h1>
              <p className="text-gray-600">Based on your preferences and profile, here are the best matches for you</p>
            </div>

            <div className="grid gap-6 mb-6">
              {recommendations.map((college, index) => (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 hover:border-blue-200 hover:shadow-lg transition-all">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 aspect-video md:aspect-square overflow-hidden relative">
                          <img
                            src={college.imageUrl}
                            alt={college.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0">
                              {index === 0 ? '🏆 Top Match' : `#${index + 1} Match`}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex-1 p-6">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">NIRF #{college.ranking.nirf}</Badge>
                              <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                                {college.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="size-4 text-yellow-500" />
                              <span className="font-semibold">{college.rating}</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-xl mb-2">{college.name}</h3>
                          <p className="text-gray-600 mb-4">{college.location}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Fees Range</p>
                              <p className="font-semibold">₹{(college.fees.min / 100000).toFixed(1)}L - {(college.fees.max / 100000).toFixed(1)}L</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Avg. Package</p>
                              <p className="font-semibold text-green-600">₹{(college.placements.averagePackage / 100000).toFixed(1)}L</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Placement Rate</p>
                              <p className="font-semibold text-blue-600">{college.placements.placementRate}%</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">ROI Score</p>
                              <p className="font-semibold flex items-center gap-1">
                                <TrendingUp className="size-4 text-orange-500" />
                                {college.roi}/10
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Link to={`/college/${college.id}`} className="flex-1">
                              <Button variant="outline" className="w-full">
                                View Details
                              </Button>
                            </Link>
                            <Link to="/compare" state={{ collegeId: college.id }} className="flex-1">
                              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                                Compare
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button onClick={() => setStep(1)} variant="outline" size="lg">
                Start Over
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
