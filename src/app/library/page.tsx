'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/ui/badge/Badge';
import Input from '@/components/form/input/InputField';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table/index';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';
import { Search, Plus, BookOpen, MoreHorizontal } from 'lucide-react';
import { Book } from '@/types/library';

// Mock data for books
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to React',
    author: 'John Doe',
    isbn: '978-3-16-148410-0',
    publicationYear: 2023,
    publisher: 'Tech Publishing',
    category: 'Programming',
    totalCopies: 5,
    availableCopies: 3,
    status: 'available',
    location: 'Shelf A1',
    addedDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    author: 'Jane Smith',
    isbn: '978-1-23-456789-7',
    publicationYear: 2022,
    publisher: 'Code Masters',
    category: 'Programming',
    totalCopies: 3,
    availableCopies: 0,
    status: 'borrowed',
    location: 'Shelf B2',
    addedDate: new Date('2024-02-01'),
  },
  {
    id: '3',
    title: 'Mathematics Fundamentals',
    author: 'Dr. Alan Turing',
    isbn: '978-0-12-345678-9',
    publicationYear: 2021,
    publisher: 'Academic Press',
    category: 'Mathematics',
    totalCopies: 2,
    availableCopies: 2,
    status: 'available',
    location: 'Shelf C3',
    addedDate: new Date('2024-01-20'),
  },
];

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'solid';
      case 'borrowed':
        return 'solid';
      case 'maintenance':
        return 'solid';
      default:
        return 'solid';
    }
  };

  const getStatusBadgeColor = (status: Book['status']) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'borrowed':
        return 'warning';
      case 'maintenance':
        return 'error';
      default:
        return 'primary';
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Library</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage books, track issues and returns
          </p>
        </div>
        <Link href="/library/add">
          <Button startIcon={<Plus className="w-4 h-4" />}>
            Add Book
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                // startIcon={<Search className="w-4 h-4" />}
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell >Available Copies</TableCell>
                  <TableCell >Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {book.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {book.category}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">
                      {book.author}
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">
                      {book.isbn}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(book.status) as 'success' | 'warning' | 'error' | 'info'}
                        color={getStatusBadgeColor(book.status)}
                      >
                        {book.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">
                      {book.availableCopies} / {book.totalCopies}
                    </TableCell>
                    <TableCell>
                      <Dropdown
                        isOpen={isDropdownOpen}
                        onClose={() => setIsDropdownOpen(false)}
                      >
                        <button
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <DropdownItem
                            onClick={() => console.log('Edit', book.id)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Edit Book
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => console.log('Issue', book.id)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Issue Book
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => handleDeleteBook(book.id)}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                          >
                            Delete Book
                          </DropdownItem>
                        </div>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No books match your search criteria.' 
                  : 'No books found. Add your first book to get started.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
