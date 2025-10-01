'use client';

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchExams } from "@/store/examSlice";
import ExamList from "./components/ExamList";
import ExamCreateEdit from "@/components/exams/ExamCreateEdit";
import ExamAnalytics from "@/components/exams/ExamAnalytics";
const ExamSettingsComp = dynamic(() => import("@/components/exams/ExamSettings"), { ssr: false });

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState("cbt");
  const [showAddExamForm, setShowAddExamForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { list, isLoading } = useSelector((s: RootState) => s.exam);

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  const role = useMemo(() => user?.roles?.includes('Super Admin') ? 'Super Admin' : user?.primary_role, [user]);

  const canCreate = role === 'Super Admin' || role === 'Admin' || role === 'Teacher';
  const canViewAnalytics = role === 'Super Admin' || role === 'Admin' || role === 'Teacher';
  const showSettings = role === 'Super Admin';

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Computer-Based Testing (CBT)</h1>
        {canCreate && (
          <Button onClick={() => setShowAddExamForm(true)} aria-label="Create new exam">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        )}
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
        {canViewAnalytics && (
          <Button
            variant={activeTab === "reports" ? "primary" : "outline"}
            onClick={() => setActiveTab("reports")}
          >
            Analytics
          </Button>
        )}
        {showSettings && (
          <Button
            variant={activeTab === "settings" ? "primary" : "outline"}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </Button>
        )}
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
            <ExamList exams={list} isLoading={isLoading} />
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

      {activeTab === "reports" && canViewAnalytics && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics & Reports</CardTitle>
            <CardDescription>
              Detailed analytics and reporting for CBT exams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExamAnalytics />
          </CardContent>
        </Card>
      )}

      {activeTab === "settings" && showSettings && (
        <Card>
          <CardHeader>
            <CardTitle>Global Exam Settings</CardTitle>
            <CardDescription>Configure system-wide CBT preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ExamSettingsComp />
          </CardContent>
        </Card>
      )}

      {showAddExamForm && canCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl">
            <ExamCreateEdit
              onSubmit={() => setShowAddExamForm(false)}
              onCancel={() => setShowAddExamForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
