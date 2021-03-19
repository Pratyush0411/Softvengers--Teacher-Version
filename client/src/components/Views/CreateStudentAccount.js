import {useState} from 'react'

const CreateStudentAccount = () => {
    const [students, setStudents] = useState([
        {
            id:1,
            firstname: 'Saiteja',
            lastname:'reddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:1,
            score:25
        },
        {
            id:2,
            firstname: 'Kondreddy',
            lastname:'reddy',
            password: '123456',
            email: 'reddysaiteja5@gmail.com',
            rank:3,
            score:30
        }
    
    ])

    // const id =Math.floor(Math.random()*10000)+1
      
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [tutGrp, setTutGrp] = useState('')


      
      
    const onSubmit = (e)=>{
        e.preventDefault()


        if(!firstname){
            alert('please Enter Firstname')
            return
        }
        else if(!lastname){
            alert('please Enter Lastname')
            return
        }
        else if(!password){
            alert('please Enter Password')
            return
        }
        else if(!email){
            alert('please Enter Email Id ')
            return
        }
        else if(!tutGrp){
            alert('please Enter Tutorial Group')
            return
        }
        
        else{
            alert('Student Successfully Added')
            
        }
        const onCreation = (student)=>{
            const id =Math.floor(Math.random()*10000)+1
            const newStudent = {id,...student}
            setStudents([...students,newStudent])
          }
        onCreation({firstname,lastname,password,email,tutGrp})

        setFirstName('')
        setLastName('')
        setPassword('')
        setEmail('')
        setTutGrp('')
    }
    return (
        <div className='container'>
            <>{students.map((student)=> (<h3 key={student.id}>{student.firstname}</h3>))}</>
        <form className = 'add-form' onSubmit ={onSubmit} >
            <div className = 'form-control'>
                <label>First Name:</label>
                <input type='text' placeholder = 'Enter First Name' value={firstname} onChange={(e)=> setFirstName(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Last Name:</label>
                <input type='text' placeholder = 'Enter Last Name' value={lastname} onChange={(e)=> setLastName(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Password:</label>
                <input type='text' placeholder = 'Enter Password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <div className = 'form-control'>
                <label>Email Address:</label>
                <input type='text' placeholder = 'Enter Ntu Email address' value={email} onChange={(e)=> setEmail(e.target.value)}/> 
            </div>
            <div className = 'form-control'>
                <label>Tutorial Group :</label>
                <input type='text' placeholder = 'Enter Tutorial Group' value={tutGrp} onChange={(e)=> setTutGrp(e.target.value)}/> 
            </div>
            <input type = 'submit' value = 'Add Student'
            className ='btn2 btn2-block'/>
        </form>
        </div>
    )
}

export default CreateStudentAccount
