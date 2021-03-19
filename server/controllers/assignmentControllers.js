/*
* controllers for assignment
*/
const Assignment = require('../models/assignment');
const AssignmentQn = require('../models/assignmentQuestion');

const assignmentList=(req,res)=>{
};

const assignmentDetails=(req,res)=>{

};

const newAssignment=async(req,res)=>{
    const assignmentID = req.params.a_id;
    const { assignmentName, timeLimit, questionIDs, deadline, studentIDs } = req.body[0];
    console.log(req.body[0]);

    //Loop 1 to check if there is any error in looping through
    try {
        const assignment = new Assignment({
            assignmentID:assignmentID,
            assignmentName:assignmentName,
            timeLimit:timeLimit,
            questionIDs: questionIDs,
            deadline:deadline,
            studentIDs:studentIDs
        });
        for (i = 0; i < questionIDs.length; i++) {
            console.log("i:",i);
            console.log(req.body[i+1]);
            const { questionID, body, wrongOptions, correctOption, points } = req.body[i+1];
            const assignmentQ = new AssignmentQn({
                assignmentID:assignmentID,
                questionID:questionID,
                body: body,
                wrongOptions:wrongOptions,
                correctOption:correctOption,
                points:points,
            });
    
        }
    }
    catch {
        res.status(400).send('There was an error in adding Assignment or Assignment Questions');
    }

    try{
        const assignmentExists = await Assignment.findOne({ assignmentID: assignmentID});
        if(assignmentExists) 
        {
            console.log("One");
            return res.status(409).send('This assignment already exists');
        }

    }
    catch(error){
        console.log("Two");
        res.status(400).send(error); //error checking using try catch
    }


    const assignment = new Assignment({
        assignmentID:assignmentID,
        assignmentName:assignmentName,
        timeLimit:timeLimit,
        questionIDs: questionIDs,
        deadline:deadline,
        studentIDs:studentIDs
    });
    assignment.save().then((result)=>{
        console.log(result);})
         .catch((err)=>{
             console.log(err);
             console.log("Three");
         res.status(400).send(err);});

    console.log("questionLength", questionIDs.length);
    for (i = 0; i < questionIDs.length; i++) {

        const { questionID, body, wrongOptions, correctOption, points } = req.body[i+1];
        const assignmentQ = new AssignmentQn({
            assignmentID:assignmentID,
            questionID:questionID,
            body: body,
            wrongOptions:wrongOptions,
            correctOption:correctOption,
            points:points,
        });
        assignmentQ.save().then((result)=>{
            console.log(result);})
                .catch((err)=>{
                    console.log("Four");
                    console.log(err);
                res.status(400).send(err);});
    }
    return res.status(200).send("The values were added to the database");
};

//exporting the functions
module.exports={
    assignmentDetails,
    assignmentList,
    newAssignment,
};