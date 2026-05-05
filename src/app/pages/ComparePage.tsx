import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, TrendingUp, Award, IndianRupee, MapPin, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockColleges } from '../data/mockData';
import { motion } from 'motion/react';

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);

  const addCollege = (collegeId: string) => {
    if (selectedColleges.length < 3 && !selectedColleges.includes(collegeId)) {
      setSelectedColleges([...selectedColleges, collegeId]);
    }
  };

  const removeCollege = (collegeId: string) => {
    setSelectedColleges(selectedColleges.filter(id => id !== collegeId));
  };

  const colleges = selectedColleges.map(id => mockColleges.find(c => c.id === id)!).filter(Boolean);

  const comparisonMetrics = [
    { key: 'ranking', label: 'NIRF Ranking', getValue: (c: typeof mockColleges[0]) => `#${c.ranking.nirf}`, icon: Award },
    { key: 'rating', label: 'Overall Rating', getValue: (c: typeof mockColleges[0]) => `${c.rating}/5`, icon: Award },
    { key: 'type', label: 'College Type', getValue: (c: typeof mockColleges[0]) => c.type, icon: null },
    { key: 'established', label: 'Established', getValue: (c: typeof mockColleges[0]) => c.establishedYear.toString(), icon: null },
    { key: 'location', label: 'Location', getValue: (c: typeof mockColleges[0]) => `${c.city}, ${c.state}`, icon: MapPin },
    { key: 'fees', label: 'Annual Fees', getValue: (c: typeof mockColleges[0]) => `₹${(c.fees.min / 100000).toFixed(1)}L - ₹${(c.fees.max / 100000).toFixed(1)}L`, icon: IndianRupee },
    { key: 'avgPackage', label: 'Avg. Package', getValue: (c: typeof mockColleges[0]) => `₹${(c.placements.averagePackage / 100000).toFixed(1)}L`, icon: TrendingUp },
    { key: 'highestPackage', label: 'Highest Package', getValue: (c: typeof mockColleges[0]) => `₹${(c.placements.highestPackage / 100000).toFixed(1)}L`, icon: TrendingUp },
    { key: 'placementRate', label: 'Placement Rate', getValue: (c: typeof mockColleges[0]) => `${c.placements.placementRate}%`, icon: null },
    { key: 'roi', label: 'ROI Score', getValue: (c: typeof mockColleges[0]) => `${c.roi}/10`, icon: TrendingUp },
    { key: 'reviews', label: 'Total Reviews', getValue: (c: typeof mockColleges[0]) => c.reviewCount.toString(), icon: null },
  ];

  const getBestValue = (metricKey: string) => {
    if (colleges.length === 0) return null;

    switch (metricKey) {
      case 'ranking':
        return Math.min(...colleges.map(c => c.ranking.nirf));
      case 'rating':
        return Math.max(...colleges.map(c => c.rating));
      case 'avgPackage':
      case 'highestPackage':
        return Math.max(...colleges.map(c => metricKey === 'avgPackage' ? c.placements.averagePackage : c.placements.highestPackage));
      case 'placementRate':
        return Math.max(...colleges.map(c => c.placements.placementRate));
      case 'roi':
        return Math.max(...colleges.map(c => c.roi));
      case 'fees':
        return Math.min(...colleges.map(c => c.fees.min));
      default:
        return null;
    }
  };

  const isBestValue = (college: typeof mockColleges[0], metricKey: string) => {
    const bestValue = getBestValue(metricKey);
    if (bestValue === null) return false;

    switch (metricKey) {
      case 'ranking':
        return college.ranking.nirf === bestValue;
      case 'rating':
        return college.rating === bestValue;
      case 'avgPackage':
        return college.placements.averagePackage === bestValue;
      case 'highestPackage':
        return college.placements.highestPackage === bestValue;
      case 'placementRate':
        return college.placements.placementRate === bestValue;
      case 'roi':
        return college.roi === bestValue;
      case 'fees':
        return college.fees.min === bestValue;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Compare Colleges</h1>
          <p className="text-gray-600">Select up to 3 colleges to compare side-by-side</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                {selectedColleges[index] ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {(() => {
                      const college = mockColleges.find(c => c.id === selectedColleges[index]);
                      if (!college) return null;

                      return (
                        <div>
                          <div className="relative mb-4">
                            <img
                              src={college.imageUrl}
                              alt={college.name}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2"
                              onClick={() => removeCollege(college.id)}
                            >
                              <X className="size-4" />
                            </Button>
                          </div>

                          <Badge className="mb-2">NIRF #{college.ranking.nirf}</Badge>
                          <h3 className="font-bold text-lg mb-2 line-clamp-2">{college.name}</h3>
                          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                            <MapPin className="size-4" />
                            {college.city}, {college.state}
                          </p>

                          <Link to={`/college/${college.id}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              <ExternalLink className="size-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-12">
                    <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Plus className="size-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4 text-center">Select College {index + 1}</p>
                    <Select onValueChange={addCollege}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a college" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockColleges
                          .filter(c => !selectedColleges.includes(c.id))
                          .map(college => (
                            <SelectItem key={college.id} value={college.id}>
                              {college.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {colleges.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Detailed Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Metric</th>
                        {colleges.map(college => (
                          <th key={college.id} className="text-center p-4">
                            <div className="font-normal text-sm text-gray-600 mb-1">College</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonMetrics.map((metric) => {
                        const Icon = metric.icon;
                        return (
                          <tr key={metric.key} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                {Icon && <Icon className="size-4 text-gray-600" />}
                                <span className="font-medium">{metric.label}</span>
                              </div>
                            </td>
                            {colleges.map(college => {
                              const isBest = isBestValue(college, metric.key);
                              return (
                                <td key={college.id} className="text-center p-4">
                                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${isBest ? 'bg-green-50 text-green-700 font-semibold' : ''}`}>
                                    {isBest && <CheckCircle2 className="size-4" />}
                                    <span>{metric.getValue(college)}</span>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Green highlight</span> indicates the best value for each metric among the compared colleges.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 mt-6">
              <CardHeader>
                <CardTitle>Key Highlights Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {colleges.map(college => (
                    <div key={college.id}>
                      <h3 className="font-semibold mb-3 text-sm text-gray-600">{college.name}</h3>
                      <div className="space-y-2">
                        {college.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 mt-6">
              <CardHeader>
                <CardTitle>Top Recruiters Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {colleges.map(college => (
                    <div key={college.id}>
                      <h3 className="font-semibold mb-3 text-sm text-gray-600">{college.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {college.placements.topRecruiters.map((recruiter, idx) => (
                          <Badge key={idx} variant="secondary">
                            {recruiter}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {colleges.length < 2 && colleges.length > 0 && (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">Add at least 2 colleges to start comparing</p>
              <p className="text-gray-400">Select more colleges from the dropdowns above</p>
            </CardContent>
          </Card>
        )}

        {colleges.length === 0 && (
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Plus className="size-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No colleges selected</p>
              <p className="text-gray-400 mb-6">Start by selecting colleges from the dropdowns above</p>
              <Link to="/explore">
                <Button>Browse Colleges</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
