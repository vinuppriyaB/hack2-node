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
async function checkQuestionIsAvailable(filter){
    const check = await client
        .db("B27rwd")
        .collection("question")
        .findOne(filter);
    
    return check;

}
async function insertQuestion(filter){
   
    const {content}=filter;
    const ques = await client
        .db("B27rwd")
        .collection("question")
        .insertMany([{content:content,answer:[]}]);
    
    return ques;

}
async function pushAnswer(request){
    
    let {username,comment,content} =request.body;
    let value={username:username,comment:comment}
    const result2 = await client.db("B27rwd")
    .collection("question")
    .updateOne({ content: content },
      { $push: { answer: value } });
     
  return result2;
}
async function getAnswer(filter){
    const ques = await client
        .db("B27rwd")
        .collection("question")
        .findOne(filter);
    
    return ques;

}

export{
    genPassword,
    createUser,
    checkAvailUser,
    checkQuestionIsAvailable,
    insertQuestion,
    pushAnswer,
    getAnswer

};