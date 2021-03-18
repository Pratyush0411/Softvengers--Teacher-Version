/*
* controllers for dealing with question bank
*/
const PlanetQuestion=require('../models/planetQuestion');


//function to send back a list of questions
const questionList=(req,res)=>{
    PlanetQuestion.find().sort({questionID:1})
    .then((result)=>{
        console.log(result);
        if(result!=null)
        {let planetQuestions=result.map(planetQ=>{ 
            let question={
                questionID:planetQ.questionID,
                body:planetQ.body,
                correctOption:planetQ.correctOption,
                wrongOptions:planetQ.wrongOptions,
            }
             return question; });
        res.status(200).send(planetQuestions);
        }
        else
        {
            res.status(400).send('There are currently no questions in the database');
        }
    })
    .catch((err)=>{
        res.status(400).send(err);
    });

};

//function to send details of a question
const questionDetails=async(req,res)=>{
    console.log(req.params);
    let questionID=req.params.q_id;
    console.log(questionID);
    PlanetQuestion.findOne({questionID:questionID})
    .then(result=>{
        console.log(result);
        if(result!=null)
        res.status(200).send(result);
        else
        res.status(404).send("question with such an ID does not exist");
    })
    .catch(err =>{

        console.log(err);
        res.status(400).send(err);
    });


};

//function to create a new question
const newQuestion=async (req,res)=>{

    const {universeName, solarSystemName, planetName, difficulty, questionID, body, wrongOptions, correctOption}=req.body;
    var points;
    //checking if the question already exists
    try{
        const questionExists = await PlanetQuestion.findOne({ questionID: questionID});
        if(questionExists) 
        {
            return res.status(409).send('This question already exists.');
        }

    }
    catch(error){
        res.status(400).send(error); //error checking using try catch
    };

    //system assigning points based on difficulty level
    if(difficulty==='Easy')
   {
       points=5;
   }
    else if (difficulty==='Medium')
    {
        points=10;
    }
    else
    points=15;
    
    //creating the planet question model and saving it to the database
    const planetQ=new PlanetQuestion({
        universeName:universeName,
        solarSystemName:solarSystemName,
        planetName:planetName,
        difficulty:difficulty,
        questionID:questionID,
        body:body,
        wrongOptions:wrongOptions,
        correctOption:correctOption,
        points:points
    });
    planetQ.save().then((result)=>{
        console.log(result);
         res.status(200).send(result);})
         .catch((err)=>{
             console.log(err);
         res.status(400).send(err);});



};


const updateQuestion=(req,res)=>{

};

const deleteQuestion=(req,res)=>{
    const questionID=req.params.q_id;
    
    //first check if the question even exists in the database
    PlanetQuestion.findOne({questionID:questionID})
    .then((result)=>{
        console.log(result);
        if(result==null)
        {
            res.status(400).send('Resource not in the database');
        }
        else
        {
            PlanetQuestion.findOneAndDelete({ questionID: questionID }, function (err) {
                if(err)
                { console.log(err);
                    res.status(400).send('Error during deletion');
                }
                else{
                    console.log("Successful deletion");
                    res.status(200).send('deleted');
                }
                
              });
        }
    })
    .catch((err)=>{
        console.log(err);
    });
   


};

module.exports={
    questionDetails,
    questionList,
    newQuestion,
    deleteQuestion,
    updateQuestion,
};