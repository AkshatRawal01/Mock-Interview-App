"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/geminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation';


function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [Loading,setLoading]=useState(false);
    const router=useRouter();
    const [JsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();

    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault();
        console.log(jobPosition,jobDesc,jobExperience)

        const InputPrompt=`Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. 

Based on this information, generate exactly ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5} interview questions with answers in JSON format.

IMPORTANT: Return ONLY valid JSON. Do not include any markdown, explanations, or text outside the JSON object. The JSON should have this structure:
{
  "questions": [
    {
      "question": "question text here",
      "answer": "answer text here"
    }
  ]
}`

        const result =  await chatSession.sendMessage(InputPrompt);
        let responseText = result.response.text();
        
        // Clean the response - remove markdown code blocks
        responseText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        // Try to extract JSON if there's extra text
        // Look for JSON object boundaries
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          responseText = jsonMatch[0];
        }
        
        // Parse and validate JSON
        let parsedJson;
        try {
          parsedJson = JSON.parse(responseText);
          console.log('Parsed JSON:', parsedJson);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          console.error('Response text:', responseText);
          alert('Failed to parse AI response. Please try again.');
          setLoading(false);
          return;
        }
        
        const MockJsonResp = JSON.stringify(parsedJson);
        setJsonResponse(MockJsonResp);

        if(MockJsonResp){
          try {
            const resp= await db.insert(MockInterview).values({
              mockId:uuidv4(),
              jsonMockResp:MockJsonResp,
              jobPosition:jobPosition,
              jobDesc:jobDesc,
              jobExperience:jobExperience,
              createdBy:user?.primaryEmailAddress?.emailAddress,
              createdAt:moment().format('DD-MM-yyyy')

            }).returning({mockId:MockInterview.mockId })

            console.log("Inserted Id:",resp)
            if(resp){
              setOpenDailog(false);
              router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
          } catch (dbError) {
            console.error('Database Error:', dbError);
            alert('Failed to save interview. Please try again.');
          }
        }else{
          console.log("ERROR: No JSON response")
        }

       

        setLoading(false);


    }
  return (
    <div>

        <div className='p-10 border-2 bg-secondary hover:scale-105 hover:shadow-md cursor-pointer rounded-lg' onClick={()=>setOpenDailog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
                <Dialog open={openDailog}>
           <DialogContent className="max-w-3xs">
            <DialogHeader>
            <DialogTitle className=' text-2xl '>Tell us more about your job interviewing</DialogTitle>
            <DialogDescription>
                <form  onSubmit={onSubmit}>
                    <div>
             
              <h2>Add details about your job position/role , job description and years of experience</h2>
              <div className='mt-7 my-2'>
                <label className='font-bold'> Job Role/Job Position</label>
                <Input placeholder="Ex.Data Analysis" required 
                onChange={(event)=>setJobPosition(event.target.value)}/>
              </div>
              <div className='mt-2 my-3'>
                <label className='font-bold'> Job Description/ Tech Stack(In Short)</label>
                <Textarea placeholder="Ex.React, Next.js,MySql etc." required
                onChange={(event)=>setJobDesc(event.target.value)}/>
              </div>
              <div className='mt-2 my-3'>
                <label className='font-bold '>Years of Experience</label>
                <Input placeholder="0" type="number" max="50" min="0" required
                onChange={(event)=>setJobExperience(event.target.value)}/>
              </div>
             </div>
                <div className='flex gap-5 justify-end'> 
                    <Button type="button" variant="ghost" onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type="submit" disabled={Loading} >
                      {Loading?<>
                      <LoaderCircle className='animate-spin'/>'Generating from Ai'
                      </>:
                      'Start Interview'}
                      </Button>
                </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview