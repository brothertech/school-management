'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import { CreateBookData } from '@/types/library';

export default function AddBookPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateBookData>({
    title: '',
    author: '',
    isbn: '',
    publicationYear: new Date().getFullYear(),
    publisher: '',
    category: '',
    totalCopies: 1,
    location: '',
  });

  const handleInputChange = (field: keyof CreateBookData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Book added:', formData);
      
      // Redirect back to library page
      router.push('/library');
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          startIcon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Book</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add a new book to the library inventory
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  type="text"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  placeholder="Enter ISBN number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="publicationYear">Publication Year *</Label>
                <Input
                  id="publicationYear"
                  type="number"
                  value={formData.publicationYear}
                  onChange={(e) => handleInputChange('publicationYear', parseInt(e.target.value) || 0)}
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>

              <div>
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                  placeholder="Enter publisher name"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Enter book category"
                />
              </div>

              <div>
                <Label htmlFor="totalCopies">Total Copies *</Label>
                <Input
                  id="totalCopies"
                  type="number"
                  value={formData.totalCopies}
                  onChange={(e) => handleInputChange('totalCopies', parseInt(e.target.value) || 0)}
                  min="1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Shelf A1, Row 2"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                startIcon={<Save className="w-4 h-4" />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Book...' : 'Add Book'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/library')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}