'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { CreateExamData } from "@/types/exam";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";
// import Checkbox from "@/components/ui/checkbox";

const formSchema = z.object({
  title: z.string().min(1, "Exam title is required"),
  subject: z.string().min(1, "Subject is required"),
  classSection: z.string().min(1, "Class/Section is required"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  allowedAttempts: z.number().min(1, "Allowed attempts must be at least 1"),
  randomizeQuestions: z.boolean().default(false),
  instructions: z.string().optional(),
});

import { mockSubjects, mockClassSections } from '@/data/examData';
import Checkbox from "@/components/form/input/Checkbox";

interface AddExamFormProps {
  onClose: () => void;
  onSubmit: (data: CreateExamData) => void;
}

export default function AddExamForm({ onClose, onSubmit }: AddExamFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subject: "",
      classSection: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      duration: 60,
      allowedAttempts: 1,
      randomizeQuestions: false,
      instructions: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const startDateTime = new Date(`${values.startDate}T${values.startTime}`);
    const endDateTime = new Date(`${values.endDate}T${values.endTime}`);
    
    const examData: CreateExamData = {
      title: values.title,
      subject: values.subject,
      classSection: values.classSection,
      startDate: startDateTime,
      endDate: endDateTime,
      duration: values.duration,
      allowedAttempts: values.allowedAttempts,
      randomizeQuestions: values.randomizeQuestions,
      instructions: values.instructions,
    };
    onSubmit(examData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Create New Exam</CardTitle>
            <CardDescription>
              Create a new exam with all necessary details
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Exam Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Mid-Term Examination"
                  defaultValue={form.watch("title") || ""}
                  onChange={(e) => form.setValue("title", e.target.value)}
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <select
                  id="subject"
                  value={form.watch("subject") || ""}
                  onChange={(e) => form.setValue("subject", e.target.value)}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                >
                  <option value="">Select subject</option>
                  {mockSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {form.formState.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="classSection">Class/Section</Label>
                <select
                  id="classSection"
                  value={form.watch("classSection") || ""}
                  onChange={(e) => form.setValue("classSection", e.target.value)}
                  className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800"
                >
                  <option value="">Select class/section</option>
                  {mockClassSections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
                {form.formState.errors.classSection && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.classSection.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  defaultValue={form.watch("startDate") || ""}
                  onChange={(e) => form.setValue("startDate", e.target.value)}
                />
                {form.formState.errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.startDate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  defaultValue={form.watch("startTime") || ""}
                  onChange={(e) => form.setValue("startTime", e.target.value)}
                />
                {form.formState.errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.startTime.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={form.watch("endDate") || ""}
                  onChange={(e) => form.setValue("endDate", e.target.value)}
                />
                {form.formState.errors.endDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.endDate.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  defaultValue={form.watch("endTime") || ""}
                  onChange={(e) => form.setValue("endTime", e.target.value)}
                />
                {form.formState.errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.endTime.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  defaultValue={form.watch("duration") || 60}
                  onChange={(e) => form.setValue("duration", parseInt(e.target.value) || 60)}
                />
                {form.formState.errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.duration.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="allowedAttempts">Allowed Attempts</Label>
                <Input
                  id="allowedAttempts"
                  type="number"
                  defaultValue={form.watch("allowedAttempts") || 1}
                  onChange={(e) => form.setValue("allowedAttempts", parseInt(e.target.value) || 1)}
                />
                {form.formState.errors.allowedAttempts && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.allowedAttempts.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">Number of times students can take this exam</p>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="randomizeQuestions"
                  checked={form.watch("randomizeQuestions") || false}
                  onChange={(checked) => form.setValue("randomizeQuestions", checked === true)}
                />
                <Label htmlFor="randomizeQuestions" className="cursor-pointer">
                  Randomize Questions
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="instructions">Instructions/Rules</Label>
              <textarea
                id="instructions"
                placeholder="Enter exam instructions and rules..."
                value={form.watch("instructions") || ""}
                onChange={(e) => form.setValue("instructions", e.target.value)}
                className="h-32 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 resize-vertical"
              />
              {form.formState.errors.instructions && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.instructions.message}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                Create Exam
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}