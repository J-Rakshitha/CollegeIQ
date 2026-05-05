import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Award, MapPin, IndianRupee, TrendingUp, X } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { mockColleges } from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [feeRange, setFeeRange] = useState([0, 500000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('ranking');

  const states = [...new Set(mockColleges.map(c => c.state))];
  const types = [...new Set(mockColleges.map(c => c.type))];

  const filteredColleges = mockColleges
    .filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(college.type);
      const matchesState = selectedStates.length === 0 || selectedStates.includes(college.state);
      const matchesFees = college.fees.min >= feeRange[0] && college.fees.max <= feeRange[1];
      const matchesRating = college.rating >= minRating;

      return matchesSearch && matchesType && matchesState && matchesFees && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === 'ranking') return a.ranking.nirf - b.ranking.nirf;
      if (sortBy === 'fees-low') return a.fees.min - b.fees.min;
      if (sortBy === 'fees-high') return b.fees.max - a.fees.max;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'placement') return b.placements.averagePackage - a.placements.averagePackage;
      if (sortBy === 'roi') return b.roi - a.roi;
      return 0;
    });

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleState = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStates([]);
    setFeeRange([0, 500000]);
    setMinRating(0);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">College Type</h3>
        <div className="space-y-2">
          {types.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <span className="text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">State</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {states.map(state => (
            <label key={state} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedStates.includes(state)}
                onCheckedChange={() => toggleState(state)}
              />
              <span className="text-sm">{state}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">
          Annual Fees: ₹{(feeRange[0] / 100000).toFixed(1)}L - ₹{(feeRange[1] / 100000).toFixed(1)}L
        </h3>
        <Slider
          value={feeRange}
          onValueChange={setFeeRange}
          min={0}
          max={500000}
          step={50000}
          className="mt-2"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-3">Minimum Rating: {minRating}</h3>
        <Slider
          value={[minRating]}
          onValueChange={(val) => setMinRating(val[0])}
          min={0}
          max={5}
          step={0.5}
          className="mt-2"
        />
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Colleges</h1>
          <p className="text-gray-600">Discover the perfect college for your future</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Search by college name, city, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-2"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 h-12 border-2">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">NIRF Ranking</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="fees-low">Fees: Low to High</SelectItem>
              <SelectItem value="fees-high">Fees: High to Low</SelectItem>
              <SelectItem value="placement">Avg. Package</SelectItem>
              <SelectItem value="roi">Best ROI</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 border-2 md:hidden">
                <SlidersHorizontal className="size-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          <Card className="hidden md:block w-80 h-fit sticky top-24">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="size-4" />
                </Button>
              </div>
              <FilterPanel />
            </CardContent>
          </Card>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} found
              </p>
              {(selectedTypes.length > 0 || selectedStates.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedTypes.map(type => (
                    <Badge key={type} variant="secondary" className="gap-1">
                      {type}
                      <X className="size-3 cursor-pointer" onClick={() => toggleType(type)} />
                    </Badge>
                  ))}
                  {selectedStates.map(state => (
                    <Badge key={state} variant="secondary" className="gap-1">
                      {state}
                      <X className="size-3 cursor-pointer" onClick={() => toggleState(state)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {filteredColleges.map(college => (
                <Link key={college.id} to={`/college/${college.id}`}>
                  <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-200 group">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 aspect-video md:aspect-square overflow-hidden">
                          <img
                            src={college.imageUrl}
                            alt={college.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
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
                              <span className="text-sm text-gray-500">({college.reviewCount} reviews)</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                            {college.name}
                          </h3>

                          <p className="text-gray-600 mb-4 flex items-center gap-1">
                            <MapPin className="size-4" />
                            {college.city}, {college.state}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Annual Fees</p>
                              <p className="font-semibold flex items-center gap-1">
                                <IndianRupee className="size-4" />
                                {(college.fees.min / 100000).toFixed(1)}L - {(college.fees.max / 100000).toFixed(1)}L
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Avg. Package</p>
                              <p className="font-semibold text-green-600">
                                ₹{(college.placements.averagePackage / 100000).toFixed(1)}L
                              </p>
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

                          <div className="flex flex-wrap gap-2">
                            {college.highlights.slice(0, 3).map((highlight, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {filteredColleges.length === 0 && (
                <Card className="p-12 text-center">
                  <p className="text-gray-500 text-lg">No colleges found matching your criteria</p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
