import React from "react";
import { ChildStudent } from "@/types/parent";

interface ResultsViewProps {
  child: ChildStudent;
}

export default function ResultsView({ child }: ResultsViewProps) {
  const performance = child.examPerformance;
  
  const getGradeColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getGradeBadge = (score: number) => {
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Exam Performance - {child.firstName}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {performance.averageScore}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            performance.averageScore >= 80 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : performance.averageScore >= 60 
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}>
            {getGradeBadge(performance.averageScore)}
          </div>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {performance.totalExams}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total Exams</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {performance.highestScore}%
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">Highest Score</div>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {performance.lowestScore}%
          </div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Lowest Score</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {performance.rank}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Class Rank</div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
          Subject-wise Performance
        </h3>
        
        <div className="space-y-3">
          {performance.subjects.map((subject, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800 dark:text-white">
                    {subject.name}
                  </span>
                  <span className={`font-bold ${getGradeColor(subject.score)}`}>
                    {subject.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      subject.score >= 80 
                        ? "bg-green-500" 
                        : subject.score >= 60 
                        ? "bg-yellow-500" 
                        : "bg-red-500"
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
              <div className="ml-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  subject.score >= 80 
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : subject.score >= 60 
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                  {getGradeBadge(subject.score)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Exam Results */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
          Recent Exam Results
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Exam</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Date</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Score</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Grade</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Rank</th>
              </tr>
            </thead>
            <tbody>
              {performance.recentExams?.slice(0, 5).map((exam, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-white">{exam.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{exam.date}</td>
                  <td className={`px-4 py-3 font-medium ${getGradeColor(exam.score)}`}>
                    {exam.score}%
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      exam.score >= 80 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : exam.score >= 60 
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}>
                      {getGradeBadge(exam.score)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{exam.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {(!performance.recentExams || performance.recentExams.length === 0) && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No recent exam results
          </div>
        )}
      </div>

      {/* Teacher Comments */}
      {performance.teacherComments && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
            Teacher Comments
          </h3>
          <p className="text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            {performance.teacherComments}
          </p>
        </div>
      )}
    </div>
  );
}