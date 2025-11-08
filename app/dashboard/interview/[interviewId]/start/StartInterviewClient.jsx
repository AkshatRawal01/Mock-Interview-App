'use client'
import { useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StartInterviewClient({ questions, interviewData }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Ensure questions is an array
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return <div className='p-5'>No questions available for this interview.</div>;
  }

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          MockInterviewQuestion={questions}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnsSection
          MockInterviewQuestion={questions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6 mt-6">
        <Button onClick={handlePrevious} disabled={activeQuestionIndex === 0}>
          Previous Question
        </Button>
        <Button onClick={handleNext} disabled={activeQuestionIndex >= questions.length - 1}>
          Next Question
        </Button>
        {/* show only on the last question */}
        {activeQuestionIndex === questions.length - 1 && (
            <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
          <Button
            variant="destructive"
          >
            End Interview
          </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
