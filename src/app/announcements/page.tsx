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
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Announcement } from '@/types/announcement';

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'School Holiday Notice',
    content: 'School will be closed from December 25th to January 1st for winter break.',
    audience: 'all',
    createdAt: new Date('2024-12-20'),
    createdBy: 'Admin',
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'Scheduled for January 15th, 2025. Please confirm your attendance.',
    audience: 'parents',
    createdAt: new Date('2024-12-18'),
    createdBy: 'Principal',
  },
  {
    id: '3',
    title: 'Exam Schedule Update',
    content: 'Final exams will be held from January 20th to January 25th.',
    audience: 'students',
    createdAt: new Date('2024-12-15'),
    createdBy: 'Exam Department',
  },
  {
    id: '4',
    title: 'Staff Meeting Reminder',
    content: 'Monthly staff meeting this Friday at 3 PM in the conference room.',
    audience: 'teachers',
    createdAt: new Date('2024-12-12'),
    createdBy: 'HR Department',
  },
];

const getAudienceBadgeVariant = (audience: string): 'light' | 'solid' => {
  switch (audience) {
    case 'all': return 'solid';
    case 'teachers': return 'solid';
    case 'students': return 'solid';
    case 'parents': return 'solid';
    default: return 'solid';
  }
};

const getAudienceBadgeColor = (audience: string) => {
  switch (audience) {
    case 'all': return 'primary';
    case 'teachers': return 'warning';
    case 'students': return 'success';
    case 'parents': return 'info';
    default: return 'secondary';
  }
};

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [announcements] = useState<Announcement[]>(mockAnnouncements);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

const DropdownActions = ({ announcementId }: { announcementId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      <button 
        onClick={toggleDropdown} 
        className="dropdown-toggle flex items-center justify-center w-8 h-8 p-0 text-gray-500 transition-colors bg-transparent border-none rounded hover:text-gray-700"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="w-40 p-2"
      >
        <DropdownItem
          onClick={() => navigator.clipboard.writeText(announcementId)}
        >
          Copy ID
        </DropdownItem>
        <DropdownItem>View details</DropdownItem>
        <DropdownItem>Edit</DropdownItem>
        <DropdownItem className="text-red-600">
          Delete
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Button>
          <Link href="/announcements/create">
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              defaultValue={searchTerm}
              onChange={handleSearch}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Title</TableCell>
                <TableCell isHeader>Audience</TableCell>
                <TableCell isHeader>Date</TableCell>
                <TableCell isHeader>Created By</TableCell>
                <TableCell isHeader className="w-[100px]">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">
                    {announcement.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getAudienceBadgeVariant(announcement.audience)}
                      color={getAudienceBadgeColor(announcement.audience) as 'primary' | 'warning' | 'success' | 'info'}
                    >
                      {announcement.audience}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {announcement.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{announcement.createdBy}</TableCell>
                  <TableCell>
                    <DropdownActions announcementId={announcement.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}