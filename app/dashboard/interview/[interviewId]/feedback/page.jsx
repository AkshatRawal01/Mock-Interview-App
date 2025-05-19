"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Bold, ChevronsUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function feedbackPage({params}) {

    const [feedbackList,setFeedbackList] = useState([]);
    const router= useRouter();
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
        const result= await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef,params.interviewId)).orderBy(UserAnswer.id)

        console.log(result);
        setFeedbackList(result);
    }
  return (
    <div className='p-10'>
        
        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No interview feedback record found</h2>
      :<>
       <h2 className='font-bold text-3xl text-green-600'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
        <h2 className='text-blue-500 text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2>
        
        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback feedback for improvement </h2>

        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
  <CollapsibleTrigger className='p-2 my-2 text-primary rounded-lg text-lg bg-blue-50 text-left flex justify-between gap-7'>
  {item.question}<ChevronsUpDownIcon className='h-7 w-10'/>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className='flex flex-col gap-2'>
        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
        <h2 className='p-2 rounded-lg border bg-red-50 text-sm text-red-500'><strong>Your Answer:</strong>{item.userAns}</h2>
         <h2 className='p-2 rounded-lg border bg-green-50 text-sm text-green-600'><strong>Correct Answer:</strong>{item.correctAns}</h2>
         <h2 className='p-2 rounded-lg border bg-blue-50 text-sm text-blue-500'><strong>Feedback:</strong>{item.feedback}</h2>
    </div>
  </CollapsibleContent>
</Collapsible>

        ))}
        </>
}
        <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default feedbackPage
