
// "use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import StartInterviewClient from './StartInterviewClient'; // ✅ import client version

export default async function StartInterview({ params }) {
  const interviewId = params.interviewId;

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  if (!result || result.length === 0) {
    return <div>No interview found for this ID.</div>;
  }

  const interviewData = result[0];
  const jsonMockResp = JSON.parse(interviewData.jsonMockResp);

  return (
    <StartInterviewClient
      questions={jsonMockResp}
      interviewData={interviewData}
    />
  );
}


// import { db } from '@/utils/db'
// import { MockInterview } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import QuestionSection from './_components/QuestionSection'
// import { useParams } from 'next/navigation'
// import RecordAnsSection from './_components/RecordAnsSection'
// import { intersect } from 'drizzle-orm/gel-core'

// function StartInterview() {

//     const params = useParams();
//     const interviewId = params?.interviewId;

//     const [interviewData,setInterviewData]=useState();
//     const [MockInterviewQuestion,setMockInterviewQuestion]=useState();
//     const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
//     useEffect(()=>{
//         GetInteviewDetails();
//     },[])

//     //USe to get interview  Details by Mock Id
//         //
    
//         const GetInteviewDetails=async()=>{
//             const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId,interviewId))
            
            
            
//             const jsonMockResp = JSON.parse(result[0].jsonMockResp)
//             console.log(jsonMockResp);
//             setMockInterviewQuestion(jsonMockResp);
//             setInterviewData(result[0]);
//         }
        
    
//   return (
//     <div>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

//             {/* Question part */}
//             <QuestionSection 
//             MockInterviewQuestion={MockInterviewQuestion}
//             activeQuestionIndex={activeQuestionIndex}
//             />

//             {/* Audio/Video PArt */}
//             <RecordAnsSection/>

//         </div>
//     </div>
//   ) 
// }

// export default StartInterview