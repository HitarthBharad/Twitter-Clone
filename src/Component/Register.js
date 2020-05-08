import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default class Register extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            dob: new Date(),
            email:'',
            password: '',
            addit: false,
            problem: false,
        }
    }

    handleUser = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handlePassword =(e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleEmail= (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleFname = (e)=> {
        this.setState({
            firstname: e.target.value
        })
    }
    handleLname= (e)=> {
        this.setState({
            lastname: e.target.value
        })
    }
    handleDate = date => {
        this.setState({
            dob: date
          })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const User = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            dob: this.state.dob,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/user/add',User)
        .then(Response=> {
            this.setState({addit:true})
            console.log(Response.data)   
            })
        .catch(err=> {this.setState({problem:true})
                        console.log(err)    
                    })
               console.log(this.state)
        this.setState({
            username:'',
            email: '',
            password: '',
            firstname:'',
            lastname:'',
            dob:new Date()
        })
    }
    render()
    {
        return(
            <div className='Container'>
              <Alert 
                show={this.state.addit} 
                onClose={()=> {this.setState({addit:false})
            window.location = '/'}} 
                dismissible 
                variant='success' 
               >
                <Alert.Heading>User Added</Alert.Heading>
              </Alert>
              <Alert 
                show={this.state.problem} 
                onClose={()=> this.setState({problem:false})} 
                dismissible 
                variant='danger'
                >
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    It could be one of few things
                </p>
                <ul>
                    <li> Empty field should not be submitted</li>
                    <li> Username should be Unique. </li>
                    <li> Your Email could be connected to another account</li>
                </ul>
              </Alert>
              <div style={{background:'#2B8DE0',height:720}}>
                  <h1 style={{paddingLeft:535,paddingTop:5,color:'white',fontFamily:'Book Antiqua'}}>Twitter-Clone</h1>
              <div  style={{paddingLeft:500,paddingTop:60,fontFamily:'Segoe'}}>
                <Card style={{ width: '24rem',border:'outset'}}>
                <Card.Title style={{paddingLeft:120,fontSize:30,color:'#2B8de0'}}>SIGN UP</Card.Title>
                <Card.Body>
               <Form>
                <Form.Group>
               <Form.Row>
               <Col>
                    <Form.Control 
                    placeholder="First name" 
                    value={this.state.firstname} 
                    onChange={this.handleFname}/>
                </Col>
                <Col>
                    <Form.Control 
                    placeholder="Last name" 
                    value={this.state.lastname} 
                    onChange={this.handleLname}/>
                </Col>
                </Form.Row>
                </Form.Group>
               <Form.Group>
                <br/>
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
                <br/>
                <Form.Group>
                    <Form.Control 
                        type='text' 
                        placeholder='Email' 
                        name='email' 
                        required
                        value={this.state.email} 
                        onChange={this.handleEmail}/>
                </Form.Group>
                    <br/>
                    <Form.Group >
                        <Form.Control
                             type="password" 
                             placeholder="Password" 
                             name='password' 
                             value={this.state.password} 
                             onChange={this.handlePassword}/>
                    </Form.Group>
                        <Form.Label style={{color:'#3BB9FF'}}> Date of Birth</Form.Label>
                        <Form.Group>
                    <DatePicker
                        selected={this.state.dob}
                        onChange={this.handleDate}
                        
                     />
                    </Form.Group>
                    <div style={{paddingLeft:110}}>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Register me
                    </Button>
                    </div>
                </Form>
                </Card.Body>
                </Card>
                </div>
                </div>
            </div>
        )
    }
}