import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, MapPin, Calendar, Building2, IndianRupee, TrendingUp, Users, BookOpen, Star, CheckCircle2, GitCompare, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { mockColleges, mockReviews, placementTrends, topCompanies } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

export default function CollegeDetailPage() {
  const { id } = useParams();
  const college = mockColleges.find(c => c.id === id);
  const reviews = mockReviews.filter(r => r.collegeId === id);

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const ratingDistribution = [
    { stars: 5, count: 450, percentage: 45 },
    { stars: 4, count: 350, percentage: 35 },
    { stars: 3, count: 150, percentage: 15 },
    { stars: 2, count: 35, percentage: 3.5 },
    { stars: 1, count: 15, percentage: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20 md:pb-8">
      <div className="relative h-96 overflow-hidden">
        <img
          src={college.imageUrl}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-4 left-4">
          <Link to="/explore">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30">
                NIRF #{college.ranking.nirf}
              </Badge>
              <Badge className="bg-white/20 backdrop-blur-sm border-white/30">
                {college.type}
              </Badge>
              {college.accreditation.map(acc => (
                <Badge key={acc} className="bg-white/20 backdrop-blur-sm border-white/30">
                  {acc}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>

            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="size-5" />
                <span>{college.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-5" />
                <span>Est. {college.establishedYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="size-5" />
                <span>{college.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Award className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{college.rating}</p>
                  <p className="text-sm text-gray-600">{college.reviewCount} Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <IndianRupee className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg. Package</p>
                  <p className="text-2xl font-bold">₹{(college.placements.averagePackage / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <TrendingUp className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">ROI Score</p>
                  <p className="text-2xl font-bold">{college.roi}/10</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="placements">Placements</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">About</h3>
                      <p className="text-gray-600 leading-relaxed">{college.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Highlights</h3>
                      <div className="grid gap-2">
                        {college.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Fees Structure</h3>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Minimum Annual Fees</p>
                            <p className="text-3xl font-bold text-blue-600">
                              ₹{(college.fees.min / 100000).toFixed(2)}L
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Maximum Annual Fees</p>
                            <p className="text-3xl font-bold text-indigo-600">
                              ₹{(college.fees.max / 100000).toFixed(2)}L
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="placements" className="mt-6 space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Avg. Package</p>
                          <p className="text-2xl font-bold text-green-600">
                            ₹{(college.placements.averagePackage / 100000).toFixed(1)}L
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Highest Package</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{(college.placements.highestPackage / 100000).toFixed(1)}L
                          </p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <p className="text-sm text-gray-600 mb-1">Placement Rate</p>
                          <p className="text-2xl font-bold text-orange-600">
                            {college.placements.placementRate}%
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Placement Trends (Last 5 Years)</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={placementTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line yAxisId="left" type="monotone" dataKey="average" stroke="#3b82f6" name="Avg Package (₹)" strokeWidth={2} />
                          <Line yAxisId="right" type="monotone" dataKey="placementRate" stroke="#10b981" name="Placement Rate (%)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Top Recruiters</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {college.placements.topRecruiters.map((recruiter, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="size-10 rounded-lg bg-white border flex items-center justify-center">
                              <Building2 className="size-5 text-gray-600" />
                            </div>
                            <span className="font-medium">{recruiter}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4">Top Companies Hiring</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topCompanies.slice(0, 6)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="hires" fill="#3b82f6" name="Number of Hires" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="courses" className="mt-6">
                    <div className="grid gap-3">
                      {college.courses.map((course, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4 flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                              <BookOpen className="size-5 text-white" />
                            </div>
                            <span className="font-medium">{course}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="facilities" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-3">
                      {college.facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle2 className="size-5 text-green-600" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="size-5 text-yellow-500" />
                  Student Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-6xl font-bold mb-2">{college.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-5 ${i < Math.floor(college.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{college.reviewCount} verified reviews</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ratingDistribution.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm font-medium">{item.stars}</span>
                          <Star className="size-3 fill-yellow-500 text-yellow-500" />
                        </div>
                        <Progress value={item.percentage} className="flex-1" />
                        <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                            {review.userName[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{review.userName}</p>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <CheckCircle2 className="size-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{review.userCourse} • {review.userBatch}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{review.rating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
                        {Object.entries(review.ratings).map(([key, value]) => (
                          <div key={key} className="text-center p-2 bg-gray-50 rounded">
                            <p className="text-xs text-gray-600 capitalize mb-1">{key}</p>
                            <p className="text-sm font-semibold">{value}/5</p>
                          </div>
                        ))}
                      </div>

                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      {review.pros.length > 0 && (
                        <div className="mb-2">
                          <p className="text-sm font-semibold text-green-600 mb-1">Pros:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {review.pros.map((pro, idx) => (
                              <li key={idx}>{pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {review.cons.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-red-600 mb-1">Cons:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {review.cons.map((con, idx) => (
                              <li key={idx}>{con}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                        <Button variant="ghost" size="sm">
                          Helpful ({review.helpful})
                        </Button>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600" size="lg">
                  Apply Now
                </Button>

                <Link to="/compare" state={{ collegeId: college.id }}>
                  <Button variant="outline" className="w-full" size="lg">
                    <GitCompare className="size-4 mr-2" />
                    Compare
                  </Button>
                </Link>

                <Button variant="outline" className="w-full">
                  <Share2 className="size-4 mr-2" />
                  Share
                </Button>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-semibold">Quick Stats</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">NIRF Rank</span>
                      <span className="font-semibold">#{college.ranking.nirf}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-semibold">{college.establishedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-semibold">{college.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses</span>
                      <span className="font-semibold">{college.courses.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
