
import React from 'react';
import { Music, Package, Calendar, Users } from 'lucide-react';

export const PassBenefits: React.FC = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 p-6 border border-purple-500/20 sticky top-24">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
          Pass Benefits
        </h2>
        
        <ul className="space-y-6 mb-8">
          <li className="flex items-start">
            <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
              <Music className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Concert Ticket (First-come, first-served seating)</h3>
              <p className="text-gray-300 text-sm">First-come, first-served seating. Arrive early for the best seats!</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
              <Package className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Free SOUNDUOEX Merchandise</h3>
              <p className="text-gray-300 text-sm">Select two SOUNDUOEX merchandise items included with your pass.</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Digital Concert Experience with behind-the-scenes footage</h3>
              <p className="text-gray-300 text-sm">SOUNDUOEX digital concert with behind-the-scenes footage and interviews.</p>
            </div>
          </li>
          
          <li className="flex items-start">
            <div className="mr-4 mt-1 bg-purple-500/20 p-2 rounded-lg">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Opportunity for an SOUNDUOEX Meet & Greet</h3>
              <p className="text-gray-300 text-sm">Limited spots available. Members will be contacted by email before the event.</p>
            </div>
          </li>
        </ul>
        
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <h3 className="text-center text-lg font-semibold text-white mb-2">Pass Counter</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-300">
              {78462} <span className="text-sm font-normal text-gray-400">/ 80,000 available</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">Only {80000 - 78462} spots remaining!</p>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-400">
          Secure your pass now before they're all gone!
        </div>
      </div>
    </div>
  );
};
