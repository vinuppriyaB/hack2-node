import express from "express";
import { 
    checkQuestionIsAvailable,
    insertQuestion,
    pushAnswer,
    getAnswer,
    inserdata,
    getAllAvailableQuestion,
    
   } 
   from "../helper.js";
 
  
  const router= express.Router();

  
  router.post("/postquestion", async (request, response) => {
    let {title} =request.body;
    
      const result1=await insertQuestion(request.body);
      response.send(result1);

    
      
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
        
    console.log(request.body) 
      const result=await pushAnswer(request.body);
      response.send(result);
          
  });

  router.get("/getanswer", async (request, response) => {
        
    let filter =request.query;  
    const result=await getAnswer(filter);
    if(result){
      response.status(200).send(result);

    }else{
      response.status(400).send({mgs:"no data"});
    }
    
        
});
router.get("/getavailquestion", async (request, response) => {
        
  let filter=request.query;
  const result=await getAllAvailableQuestion(filter);
  response.send(result);
      
});
router.post("/insertdata", async (request, response) => {
        
        
  const result=await inserdata(request.body);
  response.send(result);
      
});
  
  


export const questionRouter = router;
