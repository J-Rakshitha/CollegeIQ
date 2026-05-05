import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Shield, Sparkles, BarChart3, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockColleges, placementTrends } from '../data/mockData';
import { motion } from 'motion/react';

export default function HomePage() {
  const topColleges = mockColleges.slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: 'Verified Reviews',
      description: 'Only from real students with verified credentials',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'ROI calculations, placement trends, and smart comparisons',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description: 'Personalized college suggestions based on your profile',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Career Insights',
      description: 'Track placement trends and career outcomes',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { value: '1000+', label: 'Colleges', icon: Award },
    { value: '50K+', label: 'Verified Reviews', icon: Users },
    { value: '95%', label: 'Accuracy Rate', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 border-0">
              <Sparkles className="size-3 mr-1" />
              Built for 2026
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
              Find Your Perfect College, Powered by Data
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              The smartest way to discover, compare, and choose colleges. Trusted insights from real students, backed by real data.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Search colleges, courses, locations..."
                  className="pl-10 h-12 text-base border-2 focus:border-blue-500"
                />
              </div>
              <Link to="/explore">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 h-12 px-8">
                  Explore Colleges
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Icon className="size-5 text-blue-600" />
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <Card className="h-full border-2 hover:border-blue-200 transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className={`size-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                        <Icon className="size-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Top Ranked Colleges</h2>
              <p className="text-gray-600">Explore the best institutions for your future</p>
            </div>
            <Link to="/explore">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/college/${college.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all cursor-pointer border-2 hover:border-blue-200 group">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={college.imageUrl}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary">NIRF #{college.ranking.nirf}</Badge>
                        <div className="flex items-center gap-1">
                          <Award className="size-4 text-yellow-500" />
                          <span className="font-semibold">{college.rating}</span>
                          <span className="text-sm text-gray-500">({college.reviewCount})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {college.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                        <span>{college.city}, {college.state}</span>
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Avg. Package</span>
                          <span className="font-semibold">₹{(college.placements.averagePackage / 100000).toFixed(1)}L</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Placement Rate</span>
                          <span className="font-semibold text-green-600">{college.placements.placementRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">ROI Score</span>
                          <span className="font-semibold text-blue-600">{college.roi}/10</span>
                        </div>
                      </div>

                      <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                        {college.type}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="size-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Get Personalized Recommendations</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Tell us about your goals, scores, and preferences. We'll match you with the perfect colleges.
            </p>
            <Link to="/personalize">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                Start Your Journey
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
