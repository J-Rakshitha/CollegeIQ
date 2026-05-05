import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Compass, GitCompare, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: GraduationCap },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/compare', label: 'Compare', icon: GitCompare },
    { path: '/personalize', label: 'For You', icon: Sparkles },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <GraduationCap className="size-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CollegeIQ
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
                  >
                    <Icon className="size-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Get Started
          </Button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1">
              <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                <Icon className="size-5" />
              </div>
              <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
