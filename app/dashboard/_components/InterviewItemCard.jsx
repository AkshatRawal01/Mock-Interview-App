import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router = useRouter();

    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedback=()=>{
        router.push('/dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border rounded-lg shadow-sm p-3'>
        <h2 className='font-bold text-blue-500'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-700'>{interview?.jobExperience} Years Of Experience</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt}</h2>

    <div className='flex justify-between mt-2 gap-2'>
          
            <Button size="sm" variant="outline" onClick={onFeedback}>Feedback</Button>
           <Button size="sm" onClick={onStart}>Restart </Button>
            
    </div>
    </div>
  )
}

export default InterviewItemCard