"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionSection({MockInterviewQuestion,activeQuestionIndex }) {


    const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }else{
            alert('Your browser does not support text to speech')
        }
    }

  // Ensure MockInterviewQuestion is an array
  if (!MockInterviewQuestion || !Array.isArray(MockInterviewQuestion)) {
    return <div className='p-5 border rounded-lg mt-10'>No questions available</div>;
  }

  return (
    <div className='p-5 border rounded-lg mt-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {MockInterviewQuestion.map((question,index)=>(
                <h2 key={index} className={`p-2 text-primary bg-amber-100 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex==index&&'text-white bg-primary'}`}>Question #{index+1} </h2>
            ))}

           
        </div>
             <h2 className='my-10 text-md md:text-lg'>{MockInterviewQuestion[activeQuestionIndex]?.question}</h2> 
                <Volume2 className="cursor-pointer" onClick={()=>textToSpeach(MockInterviewQuestion[activeQuestionIndex]?.question)}/>
            <div className='p-5 rounded-lg border bg-blue-200 mt-30'>
                <h2 className='flex gap-2 items-center text-blue-900'>
                    <Lightbulb/>
                    <strong>Note:</strong>
                </h2>
                <h2 className='gap-2 my-2 text-blue-700'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
    
    
    </div> 


  )
}

export default QuestionSection