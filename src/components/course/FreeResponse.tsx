import { useEffect, useMemo, useState } from 'react';

interface FreeResponseProps {
  courseId: string;
  lessonSlug: string;
  componentId: string;
  prompt: string;
  placeholder?: string;
}

export default function FreeResponse({
  courseId,
  lessonSlug,
  componentId,
  prompt,
  placeholder = 'Write your response here...'
}: FreeResponseProps) {
  const storageKey = useMemo(() => `${courseId}:${lessonSlug}:${componentId}`, [courseId, lessonSlug, componentId]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setValue(saved);
    }
  }, [storageKey]);

  const onChange = (next: string) => {
    setValue(next);
    window.localStorage.setItem(storageKey, next);
  };

  return (
    <section className="free-response">
      <h2>{prompt}</h2>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={6} />
      <p>{value.length} characters saved locally.</p>
    </section>
  );
}
