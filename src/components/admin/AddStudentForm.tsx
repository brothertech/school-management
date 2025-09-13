"use client";

import React, { useState } from "react";
import { CreateStudentData } from "@/types/student";

interface AddStudentFormProps {
  onSubmit: (studentData: CreateStudentData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: CreateStudentData;
  isEditing?: boolean;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<CreateStudentData>(initialData || {
    // createdAt: new Date(),
    // updatedAt: new Date(),
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    gender: "male",
    currentClass: "",
    currentSection: "",
    rollNumber: 0,
    admissionNumber: "",
    admissionDate: new Date(),
    guardian: {
      name: "",
      relationship: "father",
      contact: "",
      email: "",
      occupation: "",
    },
    contact: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateStudentData, string>>>({});

  const handleInputChange = (field: keyof CreateStudentData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGuardianChange = (field: keyof CreateStudentData['guardian'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      guardian: { ...prev.guardian, [field]: value },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateStudentData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.currentClass.trim()) newErrors.currentClass = "Class is required";
    if (!formData.currentSection.trim()) newErrors.currentSection = "Section is required";
    if (formData.rollNumber <= 0) newErrors.rollNumber = "Valid roll number is required";
    if (!formData.admissionNumber.trim()) newErrors.admissionNumber = "Admission number is required";
    if (!formData.guardian.name.trim()) newErrors.guardian = "Guardian name is required";
    if (!formData.guardian.contact.trim()) newErrors.guardian = "Guardian contact is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const classOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const sectionOptions = ["A", "B", "C", "D", "E"];
  const relationshipOptions = ["father", "mother", "guardian", "other"];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{isEditing ? "Edit Student" : "Add New Student"}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange("dateOfBirth", new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class *
                </label>
                <select
                  value={formData.currentClass}
                  onChange={(e) => handleInputChange("currentClass", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>
                      Class {cls}
                    </option>
                  ))}
                </select>
                {errors.currentClass && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentClass}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section *
                </label>
                <select
                  value={formData.currentSection}
                  onChange={(e) => handleInputChange("currentSection", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">Select Section</option>
                  {sectionOptions.map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
                {errors.currentSection && (
                  <p className="mt-1 text-sm text-red-600">{errors.currentSection}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number *
                </label>
                <input
                  type="number"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Enter roll number"
                  min="1"
                />
                {errors.rollNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>
                )}
              </div>
            </div>

            {/* Admission Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Number *
                </label>
                <input
                  type="text"
                  value={formData.admissionNumber}
                  onChange={(e) => handleInputChange("admissionNumber", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Enter admission number"
                />
                {errors.admissionNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.admissionNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admission Date *
                </label>
                <input
                  type="date"
                  value={formData.admissionDate.toISOString().split('T')[0]}
                  onChange={(e) => handleInputChange("admissionDate", new Date(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Guardian Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guardian Name *
                  </label>
                  <input
                    type="text"
                    value={formData.guardian.name}
                    onChange={(e) => handleGuardianChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter guardian name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Relationship *
                  </label>
                  <select
                    value={formData.guardian.relationship}
                    onChange={(e) => handleGuardianChange("relationship", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    {relationshipOptions.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel.charAt(0).toUpperCase() + rel.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.guardian.contact}
                    onChange={(e) => handleGuardianChange("contact", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter contact number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.guardian.email || ""}
                    onChange={(e) => handleGuardianChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={formData.guardian.occupation || ""}
                    onChange={(e) => handleGuardianChange("occupation", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter occupation"
                  />
                </div>
              </div>
              {errors.guardian && (
                <p className="mt-2 text-sm text-red-600">{errors.guardian}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.contact || ""}
                    onChange={(e) => handleInputChange("contact", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter student contact"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter student email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="Enter full address"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Student" : "Create Student")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;