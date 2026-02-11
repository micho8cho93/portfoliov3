import { useEffect, useMemo, useState } from 'react';

interface QuizOption {
  id: string;
  label: string;
}

interface QuizProps {
  courseId: string;
  lessonSlug: string;
  componentId: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
}

export default function Quiz({
  courseId,
  lessonSlug,
  componentId,
  question,
  options,
  correctOptionId
}: QuizProps) {
  const storageKey = useMemo(() => `${courseId}:${lessonSlug}:${componentId}`, [courseId, lessonSlug, componentId]);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setSelected(saved);
    }
  }, [storageKey]);

  const onChange = (optionId: string) => {
    setSelected(optionId);
    window.localStorage.setItem(storageKey, optionId);
  };

  return (
    <section className="quiz-block">
      <h2>{question}</h2>
      <ul>
        {options.map((option) => (
          <li key={option.id}>
            <label>
              <input
                type="radio"
                name={storageKey}
                value={option.id}
                checked={selected === option.id}
                onChange={() => onChange(option.id)}
              />
              <span>{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {selected && (
        <p className={selected === correctOptionId ? 'correct' : 'incorrect'}>
          {selected === correctOptionId ? 'Correct.' : 'Not quite yet. Try again.'}
        </p>
      )}
    </section>
  );
}
