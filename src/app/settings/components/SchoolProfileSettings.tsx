'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { saveSchoolSettings, fetchSchoolSettings } from '@/store/schoolSettingsSlice';
import { SchoolSettingsPayload } from '@/lib/api';
import DatePicker from '@/components/form/date-picker';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

interface FormData {
  school_name: string;
  short_name: string;
  school_motto: string;
  established_year: number | '';
  principal_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  contact_email: string;
  contact_phone: string;
  academic_year: string;
  academic_year_start: string;
  academic_year_end: string;
  is_active: boolean;
  image?: File;
}

export default function SchoolProfileSettings() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: schoolSettings, isLoading, isSaving, error } = useSelector(
    (state: RootState) => state.schoolSettings
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    school_name: '',
    short_name: '',
    school_motto: '',
    established_year: '',
    principal_name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    contact_email: '',
    contact_phone: '',
    academic_year: '',
    academic_year_start: '',
    academic_year_end: '',
    is_active: true,
  });

  // Load school settings on component mount
  useEffect(() => {
    dispatch(fetchSchoolSettings());
  }, [dispatch]);

  // Update form data when school settings are loaded
  useEffect(() => {
    if (schoolSettings) {
      setFormData({
        school_name: schoolSettings.schoolName || '',
        short_name: schoolSettings.shortName || '',
        school_motto: schoolSettings.schoolMotto || '',
        established_year: schoolSettings.establishedYear || '',
        principal_name: schoolSettings.principalName || '',
        address: schoolSettings.address || '',
        city: schoolSettings.city || '',
        state: schoolSettings.state || '',
        country: schoolSettings.country || '',
        postal_code: schoolSettings.postalCode || '',
        contact_email: schoolSettings.contactEmail || '',
        contact_phone: schoolSettings.contactPhone || '',
        academic_year: schoolSettings.academicYear || '',
        academic_year_start: schoolSettings.academicYearStart?.split('T')[0] || '',
        academic_year_end: schoolSettings.academicYearEnd?.split('T')[0] || '',
        is_active: schoolSettings.isActive ?? true,
      });
      
      // Set logo preview if available
      if (schoolSettings.logoPath) {
        setLogoPreview(schoolSettings.logoPath);
      }
      setIsCreateMode(false);
    } else if (error && error.includes('404')) {
      // If 404 error, switch to create mode
      setIsCreateMode(true);
      setIsEditing(true);
    }
  }, [schoolSettings, error]);

  const handleSave = async () => {
    try {
      const payload: SchoolSettingsPayload = {
        ...formData,
        established_year: formData.established_year ? Number(formData.established_year) : undefined,
        website: typeof window !== 'undefined' ? window.location.origin : '',
      };
      
      await dispatch(saveSchoolSettings(payload)).unwrap();
      setIsEditing(false);
      setIsCreateMode(false);
    } catch (error) {
      // Error is handled by the Redux slice and toast
      console.error('Failed to save school settings:', error);
    }
  };

  const handleCancel = () => {
    if (schoolSettings) {
      setFormData({
        school_name: schoolSettings.schoolName || '',
        short_name: schoolSettings.shortName || '',
        school_motto: schoolSettings.schoolMotto || '',
        established_year: schoolSettings.establishedYear || '',
        principal_name: schoolSettings.principalName || '',
        address: schoolSettings.address || '',
        city: schoolSettings.city || '',
        state: schoolSettings.state || '',
        country: schoolSettings.country || '',
        postal_code: schoolSettings.postalCode || '',
        contact_email: schoolSettings.contactEmail || '',
        contact_phone: schoolSettings.contactPhone || '',
        academic_year: schoolSettings.academicYear || '',
        academic_year_start: schoolSettings.academicYearStart?.split('T')[0] || '',
        academic_year_end: schoolSettings.academicYearEnd?.split('T')[0] || '',
        is_active: schoolSettings.isActive ?? true,
      });
      
      // Reset logo preview
      if (schoolSettings.logoPath) {
        setLogoPreview(schoolSettings.logoPath);
      } else {
        setLogoPreview('');
      }
      
      // Clear file input
      const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 dark:border-brand-400"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">School Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School Logo */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">School Logo</h3>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="School Logo" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">No Logo</span>
                )}
              </div>
              {isEditing && (
                <div>
                  <Label htmlFor="logo-upload">Upload Logo</Label>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 dark:file:bg-brand-900/20 dark:file:text-brand-400 dark:hover:file:bg-brand-900/30"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max size: 5MB. Supported formats: JPG, PNG, GIF</p>
                </div>
              )}
            </div>
          </div>

          {/* School Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">School Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="school_name">School Name *</Label>
                <Input
                  type="text"
                  id="school_name"
                  defaultValue={formData.school_name}
                  onChange={(e) => handleInputChange('school_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="short_name">Short Name</Label>
                <Input
                  type="text"
                  id="short_name"
                  defaultValue={formData.short_name}
                  onChange={(e) => handleInputChange('short_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="established_year">Established Year</Label>
                <Input
                  type="number"
                  id="established_year"
                  defaultValue={formData.established_year?.toString()}
                  onChange={(e) => handleInputChange('established_year', e.target.value ? parseInt(e.target.value) : '')}
                  disabled={!isEditing}
                  min="1800"
                  max={new Date().getFullYear().toString()}
                />
              </div>
              <div>
                <Label htmlFor="principal_name">Principal Name</Label>
                <Input
                  type="text"
                  id="principal_name"
                  defaultValue={formData.principal_name}
                  onChange={(e) => handleInputChange('principal_name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="school_motto">School Motto</Label>
                <Input
                  type="text"
                  id="school_motto"
                  defaultValue={formData.school_motto}
                  onChange={(e) => handleInputChange('school_motto', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  type="email"
                  id="contact_email"
                  defaultValue={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  type="tel"
                  id="contact_phone"
                  defaultValue={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              {/* Website field - always show with auto-detected value */}
              <div className="md:col-span-2">
                <Label htmlFor="website">Website (Auto-detected)</Label>
                <Input
                  type="url"
                  id="website"
                  defaultValue={typeof window !== 'undefined' ? window.location.origin : ''}
                  disabled
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This field is automatically detected from the current site URL</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  defaultValue={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  type="text"
                  id="city"
                  defaultValue={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  type="text"
                  id="state"
                  defaultValue={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  type="text"
                  id="country"
                  defaultValue={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  type="text"
                  id="postal_code"
                  defaultValue={formData.postal_code}
                  onChange={(e) => handleInputChange('postal_code', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Academic Year Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Academic Year Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="academic_year">Academic Year</Label>
                <Input
                  type="text"
                  id="academic_year"
                  defaultValue={formData.academic_year}
                  onChange={(e) => handleInputChange('academic_year', e.target.value)}
                  disabled={!isEditing}
                  placeholder="e.g., 2025-2026"
                />
              </div>
              <div>
                <DatePicker
                  id="academic_year_start"
                  label="Academic Year Start"
                  defaultDate={formData.academic_year_start}
                  onChange={(selectedDates) => {
                    if (selectedDates.length > 0) {
                      const date = selectedDates[0];
                      const formattedDate = date.toISOString().split('T')[0];
                      handleInputChange('academic_year_start', formattedDate);
                    }
                  }}
                  placeholder="Select start date"
                />
              </div>
              <div>
                <DatePicker
                  id="academic_year_end"
                  label="Academic Year End"
                  defaultDate={formData.academic_year_end}
                  onChange={(selectedDates) => {
                    if (selectedDates.length > 0) {
                      const date = selectedDates[0];
                      const formattedDate = date.toISOString().split('T')[0];
                      handleInputChange('academic_year_end', formattedDate);
                    }
                  }}
                  placeholder="Select end date"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Status</h3>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                disabled={!isEditing}
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-brand-600"
              />
              <Label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                School is Active
              </Label>
            </div>
          </div>
        </div>

        {!isEditing && schoolSettings && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Current School Profile</h4>
            <p className="text-sm text-blue-700">
              Last updated: {new Date(schoolSettings.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}