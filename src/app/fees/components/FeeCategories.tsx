'use client';

import { useState } from 'react';
import Button from '@/components/ui/button/Button';

import Badge from '@/components/ui/badge/Badge';
import { FeeCategory } from '@/types/fee';
import Input from '@/components/form/input/InputField';
import { Card } from '@/components/ui/card';

const mockCategories: FeeCategory[] = [
  {
    id: '1',
    name: 'Tuition Fee',
    description: 'Regular tuition fees for academic sessions',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Examination Fee',
    description: 'Fees for term and final examinations',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Transportation Fee',
    description: 'School bus transportation charges',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '4',
    name: 'Library Fee',
    description: 'Library membership and book rental fees',
    isActive: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

export default function FeeCategories() {
  const [categories, setCategories] = useState<FeeCategory[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const category: FeeCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        isActive: newCategory.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', isActive: true });
      setIsAdding(false);
    }
  };

  const toggleCategoryStatus = (id: string) => {
    setCategories(categories.map(category =>
      category.id === id
        ? { ...category, isActive: !category.isActive, updatedAt: new Date() }
        : category
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAdding(true)}>
          Add Category
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-3">Add New Category</h3>
          <div className="space-y-3">
            <Input
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <Input
              placeholder="Description (optional)"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newCategory.isActive}
                onChange={(e) => setNewCategory({ ...newCategory, isActive: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddCategory}>
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <Badge variant="solid" color={category.isActive ? 'success' : 'secondary'}>
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            {category.description && (
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Created: {category.createdAt.toLocaleDateString()}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleCategoryStatus(category.id)}
              >
                {category.isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No fee categories found.</p>
        </Card>
      )}
    </div>
  );
}