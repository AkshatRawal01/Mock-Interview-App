"use client"
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam'; // ✅ Correct import
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, User } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/geminiAiModel';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';

function RecordAnsSection({MockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const webcamRef = useRef(null);
  const [userAnswer,setUserAnswer]=useState('');
  const [Loading,setLoading]=useState(false);
  const { user } = useUser();
  const saveTimeoutRef = useRef(null);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])

  // Debounced save function
  const debouncedSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      if (userAnswer.length > 10) {
        UpdateUserAnswer();
      }
    }, 2000); // Save after 2 seconds of no new input
  };

  useEffect(() => {
    if (userAnswer.length > 10) {
      debouncedSave();
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [userAnswer]);

  const StartStopRecording = async() => {
    if(isRecording) {
      stopSpeechToText();
      // Only save when user stops recording
      if (userAnswer.length > 10) {
        try {
          await UpdateUserAnswer();
          toast.success('Answer saved successfully!');
        } catch (error) {
          toast.error('Failed to save answer. Please try again.');
          console.error('Error saving answer:', error);
        }
      } else {
        toast.warning('Answer is too short. Please provide a longer answer.');
      }
    } else {
      startSpeechToText();
      toast.info('Recording started...');
    }
  }

  const UpdateUserAnswer=async()=>{
      setLoading(true);
      try {
        const feedbackPrompt = `You're an AI interview evaluator.

Question: ${MockInterviewQuestion[activeQuestionIndex]?.question}
User Answer: ${userAnswer}

Please analyze the answer and respond strictly in the following JSON format:

{
  "rating": "number from 1 to 10",
  "feedback": "1-3 concise sentences on how the answer can be improved"
}

Only return this JSON. Do not include any explanation or markdown.`

        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
        
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
        
        const resp=await db.insert(UserAnswer).values({
          mockIdRef:interviewData?.mockId,
          question:MockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:MockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer,
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          userEmail:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        });

        if(resp){
          setUserAnswer('');
          setResults([]);
        }
      } catch (error) {
        console.error('Error in UpdateUserAnswer:', error);
        throw error;
      } finally {
        setLoading(false);
      }
  }

  return (
    <div className='justify-center flex flex-col items-center'>
      
     <div className='flex flex-col my-20 justify-center items-center bg-gray-300 rounded-lg p-5'>
      <Image
      src={'/webcom.svg'}
      width={200}
      height={200}
      className='absolute'
    />
 
                <Webcam
                  // audio={false}
                  // ref={webcamRef}
                  mirrored="true"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: 'user',
                    zIndex:10
                  }}
                  className="rounded-lg"
                />
 
    
</div>



    
        <button disabled={Loading} className={'my-10 border-black'}
        onClick={StartStopRecording}>
          {isRecording?
          <h2 className='text-red-700 flex gap-2 '>
            <Mic/> Stop Recording
          </h2>:
         ' Record Answer'}</button>

         {/* <Button onClick={()=>console.log(userAnswer)}>
          Show Answer
         </Button> */}
        
    </div>
  );
}

export default RecordAnsSection;