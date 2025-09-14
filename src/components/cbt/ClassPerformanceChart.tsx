'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { getClassPerformanceStats } from '@/data/examResultsData';

const ClassPerformanceChart: React.FC = () => {
  const classStats = getClassPerformanceStats();
  const classes = Object.keys(classStats);
  const maxAverage = Math.max(...classes.map(cls => classStats[cls].average || 0), 100);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Average Score by Class
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Performance comparison across different classes
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {classes.map((className) => {
            const stats = classStats[className];
            const percentage = stats.average || 0;
            const widthPercentage = (percentage / maxAverage) * 100;
            
            return (
              <div key={className} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {className}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${widthPercentage}%`,
                      backgroundColor: percentage >= 70 ? '#10B981' : 
                                     percentage >= 50 ? '#F59E0B' : 
                                     '#EF4444'
                    }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{stats.completed} students completed</span>
                  <span>{stats.totalStudents} total students</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {classes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No performance data available yet.
            </p>
          </div>
        )}
        
        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Excellent (70%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Average (50-69%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Needs Improvement (Below 50%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassPerformanceChart;