import {createConnection} from "./index.js";
import {client} from "./index.js";
import bcrypt from "bcrypt";


async function genPassword(password)
{
  const salt = await bcrypt.genSalt(10);
  
  const hashedPassword= await bcrypt.hash(password,salt);
    return hashedPassword;
}
async function createUser(username,password) {
   
//    console.log(username,password)
    const user = await client
        .db("B27rwd")
        .collection("login")
        .insertMany([{username:username,password:password}]);
    console.log(user);
    return user;
}
async function checkAvailUser(username){
    const user = await client
        .db("B27rwd")
        .collection("login")
        .findOne({"username":username});
    console.log(user);
    return user;

}
async function checkQuestionIsAvailable(title){
    const check = await client
        .db("B27rwd")
        .collection("stackclone")
        .findOne({title:title});
    
    return check;

}
async function insertQuestion(question){
   console.log(question)
    // const {content}=filter;
    let date =new Date();
    let year=date.getFullYear();
    let month=date.getMonth()+1;
    let day=date.getDate();
    console.log(year,month,day);
const data=[{
    title:question.title,
    body:question.body,
    tags:question.tags,
    askBy:question.askby,
    date:`${year} ${month} ${day}`,
    answerDetail:[]
    
}]
console.log(data)
    const ques = await client
        .db("B27rwd")
        .collection("stackclone")
        .insertMany(data);
    
    return ques;

}
async function pushAnswer(request){
    
    let {username,comment,content} =request;
    let value={username:username,comment:comment,point:0}
    const result2 = await client
        .db("B27rwd")
        .collection("stackclone")
        .findOneAndUpdate({ title: content },
            { $push: { answerDetail: {user:username,solution:comment,point:0} } });

   
   return result2;
}
async function getAnswer(filter){
    const ques = await client
        .db("B27rwd")
        .collection("stackclone")
        .findOne(filter);
    
    return ques;

}
async function inserdata(request){
    // const ques=request;
    console.log(request)
    const ques = await client
        .db("B27rwd")
        .collection("question")
        .insertMany([request]);
    
    return ques;

}
async function getAllAvailableQuestion(filter){
    const ques = await client
    .db("B27rwd")
    .collection("stackclone")
    .find(filter).toArray();
   

return ques;
}
export{
    genPassword,
    createUser,
    checkAvailUser,
    checkQuestionIsAvailable,
    insertQuestion,
    pushAnswer,
    getAnswer,
    inserdata,
    getAllAvailableQuestion,

};