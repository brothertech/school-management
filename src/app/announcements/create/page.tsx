'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import TextArea from '@/components/form/input/TextArea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateAnnouncementData } from '@/types/announcement';

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateAnnouncementData>({
    title: '',
    content: '',
    audience: 'all',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating announcement:', formData);
    // TODO: Implement API call
    router.push('/announcements');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="primary">
          <Link href="/announcements">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create Announcement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter announcement title"
                defaultValue={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                // required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Audience *</Label>
              {/* Select component imports are missing - need to add them */}
            
                <select
                  className="w-full rounded-md border border-gray-300 p-2"
                  value={formData.audience}
                  onChange={(e) => handleInputChange('audience', e.target.value)}
                >
                  <option value="" disabled>Select audience</option>
                  <option value="all">Everyone</option>
                  <option value="teachers">Teachers Only</option>
                  <option value="students">Students Only</option>
                  <option value="parents">Parents Only</option>
                </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <TextArea
                // id="content"
                placeholder="Enter announcement content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={6}
                // required
              />
            </div>

            <div className="flex gap-4">
              <Button  disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Announcement'}
              </Button>
              <Button  variant="outline" >
                <Link href="/announcements">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}