import React from 'react'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider  } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {useState,useEffect} from 'react'
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone'
import IconButton from '@material-ui/core/IconButton'

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([
        {
            id:1,
            name: 'Assignment 1',
            date: 'Date Added : 25 Feb 2021'
        },
        {
            id:2,
            name: 'Assignment 2',
            date: 'Date Added : 20 Feb 2021'
        },
        {
            id:3,
            name: 'Assignment 3',
            date: 'Date Added : 18 Feb 2021'
        },
        // {
        //     id:4,
        //     name: 'Assignment 4',
        //     date: 'Date Added : 12 Feb 2021'
        // },
        // {
        //     id:5,
        //     name: 'Assignment 5',
        //     date: 'Date Added : 2 Feb 2021'
        // },
        // {
        //     id: 6,
        //     name: 'Assignment 6',
        //     date: 'Date Added : 25 Jan 2021'
        // }

    
    ])
    
    const ColorButton = withStyles((theme) => ({
        root: {
            body :{
                color: 'white'
              },
            backgroundColor: '#6f7bd9',
            margin:'auto',
          marginRight:'2rem'
        }
      }))(Button); 
      const IColourButton = withStyles((theme) => ({
        root: {
            body :{
                color: 'white'
              },
            backgroundColor: '#6f7bd9',
            
          marginLeft:'49rem'
        }
      }))(IconButton);        
    return (
        <div className='assignment-container'>
            <h1>Assignments <IColourButton><AddTwoToneIcon/></IColourButton></h1>
            <p></p>
            {assignments.map((assignment)=>(
            <Card>
                <CardActionArea>
                    <CardMedia title="Assigment"/>
                    <CardContent><Typography gutterBottom variant="h5" component="h2">Assignment {assignment.id}</Typography>
                    <Typography>{assignment.date}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions><ColorButton size="large" variant="outlined" >Statistics</ColorButton></CardActions>
            </Card>))}
      </div>
    )
}

export default ViewAssignments
