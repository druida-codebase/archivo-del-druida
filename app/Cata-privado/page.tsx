'use client';

import Form from '@/components/Form';
import { ReportSchema, ReportType, emptyTeaReport } from '@/components/schemas';
import { useState } from 'react';

export default function Page() {
  const [draft, setDraft] = useState<ReportType>(emptyTeaReport);
  return <Form draft={draft} setDraft={setDraft} />;
}