"use client";

import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { AttendanceData, ExamPerformanceData, FeeCollectionData, StudentAttendance } from "@/types/reports";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Mock data for reports
const attendanceData: AttendanceData[] = [
  { className: "Class 1A", attendanceRate: 95, totalStudents: 30, presentStudents: 28 },
  { className: "Class 1B", attendanceRate: 88, totalStudents: 28, presentStudents: 25 },
  { className: "Class 2A", attendanceRate: 92, totalStudents: 32, presentStudents: 29 },
  { className: "Class 2B", attendanceRate: 85, totalStudents: 30, presentStudents: 26 },
  { className: "Class 3A", attendanceRate: 97, totalStudents: 35, presentStudents: 34 },
  { className: "Class 3B", attendanceRate: 90, totalStudents: 33, presentStudents: 30 },
];

const examPerformanceData: ExamPerformanceData[] = [
  { subject: "Mathematics", averageScore: 78, highestScore: 98, lowestScore: 45, passRate: 92 },
  { subject: "Science", averageScore: 82, highestScore: 96, lowestScore: 52, passRate: 95 },
  { subject: "English", averageScore: 85, highestScore: 97, lowestScore: 58, passRate: 97 },
  { subject: "History", averageScore: 76, highestScore: 94, lowestScore: 42, passRate: 88 },
  { subject: "Geography", averageScore: 80, highestScore: 95, lowestScore: 48, passRate: 93 },
  { subject: "Art", averageScore: 88, highestScore: 99, lowestScore: 62, passRate: 98 },
];

const feeCollectionData: FeeCollectionData[] = [
  { category: "Tuition Fees", amount: 125000, percentage: 65, color: "#465FFF" },
  { category: "Transport Fees", amount: 35000, percentage: 18, color: "#FF6B6B" },
  { category: "Meal Fees", amount: 25000, percentage: 13, color: "#4ECDC4" },
  { category: "Activity Fees", amount: 8000, percentage: 4, color: "#FFD166" },
];

const studentAttendanceData: StudentAttendance[] = [
  { studentName: "John Smith", className: "Class 1A", attendanceRate: 96, presentDays: 24, totalDays: 25 },
  { studentName: "Sarah Johnson", className: "Class 1A", attendanceRate: 92, presentDays: 23, totalDays: 25 },
  { studentName: "Mike Wilson", className: "Class 1B", attendanceRate: 88, presentDays: 22, totalDays: 25 },
  { studentName: "Emily Davis", className: "Class 2A", attendanceRate: 100, presentDays: 25, totalDays: 25 },
  { studentName: "David Brown", className: "Class 2B", attendanceRate: 84, presentDays: 21, totalDays: 25 },
  { studentName: "Lisa Miller", className: "Class 3A", attendanceRate: 96, presentDays: 24, totalDays: 25 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("attendance");

  // Attendance Chart Options
  const attendanceChartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 350,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
      },
    },
    colors: ["#465FFF"],
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: ["transparent"] },
    xaxis: {
      categories: attendanceData.map(item => item.className),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "Attendance Rate (%)" },
      min: 0,
      max: 100,
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const attendanceChartSeries = [
    {
      name: "Attendance Rate",
      data: attendanceData.map(item => item.attendanceRate),
    },
  ];

  // Exam Performance Chart Options
  const examChartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 350,
      toolbar: { show: false },
    },
    colors: ["#465FFF", "#FF6B6B"],
    stroke: { width: 3, curve: "smooth" },
    markers: { size: 5 },
    xaxis: {
      categories: examPerformanceData.map(item => item.subject),
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "Score" },
      min: 0,
      max: 100,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val}%`,
      },
    },
  };

  const examChartSeries = [
    {
      name: "Average Score",
      data: examPerformanceData.map(item => item.averageScore),
    },
    {
      name: "Pass Rate",
      data: examPerformanceData.map(item => item.passRate),
    },
  ];

  // Fee Collection Pie Chart Options
  const feeChartOptions: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      height: 350,
    },
    colors: feeCollectionData.map(item => item.color),
    labels: feeCollectionData.map(item => item.category),
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`,
      },
    },
  };

  const feeChartSeries = feeCollectionData.map(item => item.amount);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white/90">
        Reports & Analytics
      </h1>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {["attendance", "exams", "fees"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "attendance" && "Attendance Reports"}
              {tab === "exams" && "Exam Performance"}
              {tab === "fees" && "Fee Collection"}
            </button>
          ))}
        </nav>
      </div>

      {/* Attendance Report */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Class Attendance Rates
            </h2>
            <ReactApexChart
              options={attendanceChartOptions}
              series={attendanceChartSeries}
              type="bar"
              height={350}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Student Attendance Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Student</th>
                    <th className="text-left py-2">Class</th>
                    <th className="text-left py-2">Attendance Rate</th>
                    <th className="text-left py-2">Present Days</th>
                    <th className="text-left py-2">Total Days</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendanceData.map((student, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{student.studentName}</td>
                      <td className="py-2">{student.className}</td>
                      <td className="py-2">{student.attendanceRate}%</td>
                      <td className="py-2">{student.presentDays}</td>
                      <td className="py-2">{student.totalDays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Exam Performance */}
      {activeTab === "exams" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Subject-wise Exam Performance
            </h2>
            <ReactApexChart
              options={examChartOptions}
              series={examChartSeries}
              type="line"
              height={350}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Exam Performance Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Subject</th>
                    <th className="text-left py-2">Average Score</th>
                    <th className="text-left py-2">Highest Score</th>
                    <th className="text-left py-2">Lowest Score</th>
                    <th className="text-left py-2">Pass Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {examPerformanceData.map((subject, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{subject.subject}</td>
                      <td className="py-2">{subject.averageScore}%</td>
                      <td className="py-2">{subject.highestScore}%</td>
                      <td className="py-2">{subject.lowestScore}%</td>
                      <td className="py-2">{subject.passRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Fee Collection */}
      {activeTab === "fees" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Fee Collection Summary
            </h2>
            <ReactApexChart
              options={feeChartOptions}
              series={feeChartSeries}
              type="pie"
              height={350}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
              Fee Collection Details
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Category</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {feeCollectionData.map((fee, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{fee.category}</td>
                      <td className="py-2">${fee.amount.toLocaleString()}</td>
                      <td className="py-2">{fee.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
