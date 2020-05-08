import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card'
import "react-datepicker/dist/react-datepicker.css";

export default class Setprofile extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            fname:'',
            lname:'',
            id:'',
            username:'',
            email:'',
            userid: '',
            dob: '',
            date: '',
            bio: '',
            following: [],
            follower: [],
            mytwit:[],
            password: ''
        }
    }
    componentDidMount()
    {
        var path = this.props.location.pathname
        var id = path.substring(6)

        axios.get('http://localhost:5000/user/get/'+id)
        .then(Response=> {
            this.setState({
                fname: Response.data.firstname,
                lname: Response.data.lastname,
                username: Response.data.username,
                userid: Response.data._id,
                email: Response.data.email,
                date: Response.data.dob,
                password: Response.data.password,
            })
            axios.get('http://localhost:5000/profile/'+id)
            .then(Response=> {
                this.setState({
                    id: Response.data[0]._id,
                    bio: Response.data[0].bio,
                    follower:Response.data[0].follower,
                    following:Response.data[0].following,
                    mytwit:Response.data[0].mytwit
                })
                console.log(this.state)
            })
            .catch(err=> console.log(err))
        
        })
    }
    handleBio =(e) => {
        this.setState({
            bio: e.target.value
        })
    }

    handleFname = (e) => {
        this.setState({
            fname:e.target.value
        })
    }
    handleLname = (e) => {
        this.setState({
            lname:e.target.value
        })
    }
    handleUsername = (e) => {
        this.setState({
            username:e.target.value
        })
    }
    handleEmail = (e) => {
        this.setState({
            email:e.target.value
        })
    }
    handleDob = date => {
        this.setState({
            date:date
        })
    }
    handleSubmit = e=> {
        e.preventDefault();

        const Profile = {
            userid: this.state.userid,
            username: this.state.username,
            following: this.state.following,
            follower:this.state.follower,
            bio: this.state.bio,
            mytwit: this.state.mytwit
        }
        const User = {
            username: this.state.username,
            firstname: this.state.fname,
            lastname: this.state.lname,
            email: this.state.email,
            password: this.state.password,
            number : 1,
            dob: this.state.date,
            logged:true,
        }

        axios.post('http://localhost:5000/profile/update/'+this.state.id,Profile)
        .then(Response => {
            console.log(Response.data)
        })
        .catch(err=> {
            console.log(err)
        })
         
        axios.post(`http://localhost:5000/user/update/${this.state.userid}`,User)
        .then(Response => {
            console.log(Response.data)
            window.location = `/home/${this.state.userid}`
        })
        .catch(err=> console.log(err))

    }

    render()
    {
        return(
           <div style={{paddingLeft:400,paddingTop:70}}>
           <Card style={{width:'28rem'}} >
           <Card.Title style={{paddingLeft:110,fontSize:30,color:'#3BB9FF',font:'Helvatica'}}>EDIT PROFILE</Card.Title>
           <Card.Body>
           <Form >
           <Form.Label style={{color:'#3BB9FF'}}> Firstname</Form.Label>
           <Form.Group >
               <Form.Control
                    type="text" 
                    placeholder="Firstname" 
                    name='Fname' 
                    value={this.state.fname} 
                    onChange={this.handleFname}/>
           </Form.Group>
           <Form.Label style={{color:'#3BB9FF'}}> Lastname</Form.Label>
           <Form.Group >
               <Form.Control
                    type="text" 
                    placeholder="Lastname" 
                    name='Lname' 
                    value={this.state.lname} 
                    onChange={this.handletext}/>
           </Form.Group>
           <Form.Group>
           <Form.Label style={{color:'#3BB9FF'}}> 
               Username
           </Form.Label>
       <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="text"
          placeholder="Username"
          aria-describedby="inputGroupPrepend"
          name="username"
          onChange={this.handleUser}
          value={this.state.username}
        />
        </InputGroup>
        </Form.Group>
           <Form.Label style={{color:'#3BB9FF'}}> Email</Form.Label>
           <Form.Group >
               <Form.Control
                    type="text" 
                    placeholder="text" 
                    name='text' 
                    value={this.state.email} 
                    onChange={this.handleEmail}/>
           </Form.Group>
           <Form.Label style={{color:'#3BB9FF'}}> Bio</Form.Label>
           <Form.Group >
               <Form.Control
                    type="text" 
                    placeholder="BIO" 
                    name='bio' 
                    value={this.state.bio} 
                    onChange={this.handleBio}/>
           </Form.Group>
           </Form>
           <Button type='Submit' variant="primary" style={{width:100}} onClick={this.handleSubmit}> Done </Button>
           </Card.Body>
           </Card>
           </div>
        )
    }
}