'use client';

import React, { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { mockExams } from '@/data/examData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { ChildStudent } from '@/types/parent';

type ParentExamCalendarProps = {
  child: ChildStudent | undefined;
};

const ParentExamCalendar: React.FC<ParentExamCalendarProps> = ({ child }) => {
  const classSection = useMemo(() => {
    if (!child) return undefined;
    return `${child.currentClass} - ${child.currentSection}`;
  }, [child]);

  const events = useMemo(() => {
    if (!classSection) return [];
    return mockExams
      .filter((ex) => ex.status === 'upcoming' && ex.classSection === classSection)
      .map((ex) => ({
        id: ex.id,
        title: `${ex.subject}: ${ex.title}`,
        start: ex.startDate,
        end: ex.endDate,
        allDay: false,
      }));
  }, [classSection]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{ left: 'prev,next', center: 'title', right: '' }}
              events={events}
              selectable={false}
              height="auto"
            />
          </div>
        ) : (
          <div className="text-sm text-gray-500">No upcoming exams scheduled for this child.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ParentExamCalendar;