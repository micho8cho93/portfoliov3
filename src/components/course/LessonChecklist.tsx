import { useEffect, useMemo, useState } from 'react';

interface LessonChecklistProps {
  courseId: string;
  lessonSlug: string;
  componentId: string;
  items: string[];
}

export default function LessonChecklist({ courseId, lessonSlug, componentId, items }: LessonChecklistProps) {
  const storageKey = useMemo(() => `${courseId}:${lessonSlug}:${componentId}`, [courseId, lessonSlug, componentId]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setCheckedItems(parsed);
      }
    } catch {
      setCheckedItems([]);
    }
  }, [storageKey]);

  const toggleItem = (item: string) => {
    const next = checkedItems.includes(item) ? checkedItems.filter((entry) => entry !== item) : [...checkedItems, item];

    setCheckedItems(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  return (
    <section className="lesson-checklist">
      <h2>Lesson Checklist</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <label>
              <input type="checkbox" checked={checkedItems.includes(item)} onChange={() => toggleItem(item)} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p>
        {checkedItems.length}/{items.length} completed
      </p>
    </section>
  );
}
