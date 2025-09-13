'use client';

import { useState } from 'react';
import { SchoolProfile, UpdateSchoolProfileData } from '@/types/settings';
import { mockSchoolProfile } from '@/data/settingsData';

export default function SchoolProfileSettings() {
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(mockSchoolProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpdateSchoolProfileData>({
    name: mockSchoolProfile.name,
    shortName: mockSchoolProfile.shortName,
    logo: mockSchoolProfile.logo,
    address: mockSchoolProfile.address,
    city: mockSchoolProfile.city,
    state: mockSchoolProfile.state,
    country: mockSchoolProfile.country,
    postalCode: mockSchoolProfile.postalCode,
    phone: mockSchoolProfile.phone,
    email: mockSchoolProfile.email,
    website: mockSchoolProfile.website,
    establishedYear: mockSchoolProfile.establishedYear,
    principalName: mockSchoolProfile.principalName,
    motto: mockSchoolProfile.motto,
    isActive: mockSchoolProfile.isActive,
  });

  const handleSave = () => {
    const updatedProfile: SchoolProfile = {
      ...schoolProfile,
      ...formData,
      updatedAt: new Date(),
    };
    setSchoolProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: schoolProfile.name,
      shortName: schoolProfile.shortName,
      logo: schoolProfile.logo,
      address: schoolProfile.address,
      city: schoolProfile.city,
      state: schoolProfile.state,
      country: schoolProfile.country,
      postalCode: schoolProfile.postalCode,
      phone: schoolProfile.phone,
      email: schoolProfile.email,
      website: schoolProfile.website,
      establishedYear: schoolProfile.establishedYear,
      principalName: schoolProfile.principalName,
      motto: schoolProfile.motto,
      isActive: schoolProfile.isActive,
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UpdateSchoolProfileData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* School Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  value={formData.shortName || ''}
                  onChange={(e) => handleInputChange('shortName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Established Year
                </label>
                <input
                  type="number"
                  value={formData.establishedYear || ''}
                  onChange={(e) => handleInputChange('establishedYear', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Name
                </label>
                <input
                  type="text"
                  value={formData.principalName || ''}
                  onChange={(e) => handleInputChange('principalName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motto
                </label>
                <input
                  type="text"
                  value={formData.motto || ''}
                  onChange={(e) => handleInputChange('motto', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  value={formData.country || ''}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  value={formData.postalCode || ''}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">School Logo</h3>
            <div className="flex items-center space-x-4">
              {formData.logo && (
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500">Logo</span>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logo URL
                </label>
                <input
                  type="url"
                  value={formData.logo || ''}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                  placeholder="https://example.com/logo.png"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                disabled={!isEditing}
                className="mr-2"
              />
              Active School Profile
            </label>
          </div>
        </div>

        {!isEditing && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Current School Profile</h4>
            <p className="text-sm text-blue-700">
              Last updated: {schoolProfile.updatedAt.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}