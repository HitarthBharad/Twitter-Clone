import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
export default class Login extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            password: '',
            correct: true
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

     handleSubmit = async(e) => {
        e.preventDefault();

        const User = {
            username: this.state.username,
            password: this.state.password
        }

        axios.get('http://localhost:5000/user/')
        .then(Response=> {
            const result = Response.data.filter(person => person.username===User.username && person.password===User.password)
            if(result.length === 0)
            {
                this.setState({correct: false})
            }
            else
            {
                if(result[0].number === 1)
                {
                    const temp = {
                         username : result[0].username,
                         firstname : result[0].firstname,
                         lastname : result[0].lastname,
                         email : result[0].email,
                         password : result[0].password,
                         number : result[0].number,
                         dob : result[0].dob,
                         logged : true
                    }


                     axios.post('http://localhost:5000/user/update/'+result[0]._id,temp)
                    .then(Response => {
                        console.log(Response.data);
                      // window.location = `/home/${result[0]._id}`
                    })
                    window.location = `/home/${result[0]._id}`
                }
                else{
                    var id = result[0]._id
                window.location = `/setup/${id}`
                }
                
            }

            this.setState({
                username:'',
                password:'',
            })
        })
        .catch(err=> console.log(err))
    }
    render()
    {
        return(
            <div>
                <Alert show={!this.state.correct}variant="danger" onClose={()=> this.setState({correct:true})} dismissible>
                <Alert.Heading>Error</Alert.Heading>
                <p>
                    Wrong ID or Password
                </p>
              </Alert>
              <div style={{background:'#2B8DE0',height:400}}> 
              <h1 style={{paddingLeft:480,paddingTop:60,color:'white',fontFamily:'Segoe',fontStyle:'semilight'}}>Welcome to Twitter-Clone</h1>
              <div  style={{paddingLeft:500,paddingTop:70,fontFamily:"Book Antiqua" }}>
                <Card style={{ width: '21rem',border:'outset'}}>
                <Card.Title style={{marginLeft:115,fontSize:30,color:'#2B8de0'}}>LOGIN</Card.Title>
                <Card.Body>
                <br/>

               <Form >
               <Form.Group >

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
            
    {/*<Form.Label style={{color:'#3BB9FF'}}> Password</Form.Label>*/}
                    <Form.Group >
                        <Form.Control
                             type="password" 
                             placeholder="Password" 
                             name='password' 
                             value={this.state.password} 
                             onChange={this.handlePassword}
                            />
                    </Form.Group>
                   <br/>
                    <div >
                    <Button variant="primary" type="submit" onClick={this.handleSubmit} style={{marginLeft:100}}>
                        LOGIN
                    </Button>
                    <br/>
                    <br/>
                    <p style={{paddingTop: 25,color:'grey'}}>
                        Dont have an account ? <a href='/signup' style={{paddingLeft: 10}}>Sign Up</a>
                    </p>
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