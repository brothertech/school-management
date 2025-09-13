'use client';

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddExamForm from "./components/AddExamForm";
import { CreateExamData } from "@/types/exam";
import { mockExams } from "@/data/examData";
import ExamList from "./components/ExamList";

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState("cbt");
  const [showAddExamForm, setShowAddExamForm] = useState(false);
  const [exams, setExams] = useState(mockExams);

  const handleAddExam = (examData: CreateExamData) => {
    const newExam = {
      ...examData,
      id: `exam-${Date.now()}`,
      status: 'scheduled' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setExams(prev => [...prev, newExam]);
    setShowAddExamForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Computer-Based Testing (CBT)</h1>
        <Button onClick={() => setShowAddExamForm(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Exam
        </Button>
      </div>

      <div className="flex space-x-1 mb-6">
        <Button
          variant={activeTab === "cbt" ? "primary" : "outline"}
          onClick={() => setActiveTab("cbt")}
        >
          CBT Exams
        </Button>
        <Button
          variant={activeTab === "results" ? "primary" : "outline"}
          onClick={() => setActiveTab("results")}
        >
          Exam Results
        </Button>
        <Button
          variant={activeTab === "reports" ? "primary" : "outline"}
          onClick={() => setActiveTab("reports")}
        >
          Analytics
        </Button>
      </div>

      {activeTab === "cbt" && (
        <Card>
          <CardHeader>
            <CardTitle>CBT Exam Management</CardTitle>
            <CardDescription>
              Create and manage computer-based tests with advanced settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExamList exams={exams} />
          </CardContent>
        </Card>
      )}

      {activeTab === "results" && (
        <Card>
          <CardHeader>
            <CardTitle>Exam Results</CardTitle>
            <CardDescription>
              View and analyze student performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Exam results analytics interface will be implemented here</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "reports" && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Reports</CardTitle>
            <CardDescription>
              Detailed analytics and reporting for CBT exams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Advanced analytics dashboard will be implemented here</p>
          </CardContent>
        </Card>
      )}

      {showAddExamForm && (
        <AddExamForm
          onClose={() => setShowAddExamForm(false)}
          onSubmit={handleAddExam}
        />
      )}
    </div>
  );
}
