import express from "express";
import { 
    checkQuestionIsAvailable,
    insertQuestion,
    pushAnswer,
    getAnswer
   } 
   from "../helper.js";
 
  
  const router= express.Router();


  router.post("/postquestion", async (request, response) => {
    let filter =request.body;
    
    const result = await checkQuestionIsAvailable(filter);
    if(result==null)
    {
        const result1=await insertQuestion(filter);
        response.send(result1);
    }
    else{
       response.send(result);
    }
    
      
      });  

      router.get("/", async (request, response) => {
        let filter =request.query;
        const result = await checkQuestionIsAvailable(filter);
        if(result==null)
        {
            const result1=await insertQuestion(filter);
            response.status(400).send(result1);
        }
        else{
           response.send(result);
        }
        
          
          });      
  router.post("/addanswer", async (request, response) => {
        
        
      const result=await pushAnswer(request);
      response.send(result);
          
  });
  router.get("/getanswer", async (request, response) => {
        
    let filter =request.query;  
    const result=await getAnswer(filter);
    response.send(result);
        
});
  
  


export const questionRouter = router;
