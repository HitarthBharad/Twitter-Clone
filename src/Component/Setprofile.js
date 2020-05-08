import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default class Setprofile extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            fname:'',
            lname:'',
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
        var id = path.substring(7)

        axios.get('http://localhost:5000/user/get/'+id)
        .then(Response=> {
            this.setState({
                fname: Response.data.firstname,
                lname: Response.data.lastname,
                username: Response.data.username,
                userid: Response.data._id,
                email: Response.data.email,
                dob: Response.data.dob.substring(0,10),
                date: Response.data.dob,
                password: Response.data.password,
            })
        })
    }
    handleBio =(e) => {
        this.setState({
            bio: e.target.value
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
            dob: this.state.date
        }

        axios.post('http://localhost:5000/profile/add',Profile)
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
            <div style={{paddingLeft:350,paddingTop:70}}>
                <Card style={{width:'39rem',paddingLeft:25}}>
                <Card.Title style={{paddingLeft:225}}> Set Profile</Card.Title>
                <hr/>
                <Form>
                    <Form.Group>
                        <Row>
                            <Col  md='auto' style={{paddingLeft:25}}>
                        <Image src='/images/profile.png' style={{width:60,height:60}} roundedCircle/>
                        </Col>
                        <Col xs={6}>
                        <h3> {this.state.username}</h3>
                        </Col>
                        </Row>
                    </Form.Group>
                    <hr/>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Firstname:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.fname} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Lastname:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.lname} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Email:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.email} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} >
                        <Form.Label column sm="2">
                            Date of Birth:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.dob} />
                        </Col>
                    </Form.Group>
                    <Form.Label> Bio: </Form.Label>
                    <Form.Group>
                    <Form.Control
                             type="text" 
                             placeholder="Bio" 
                             name='bio' 
                             value={this.state.bio}
                             onChange={this.handleBio} 
                             />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        SET IT
                    </Button>
                </Form>
                </Card>
            </div>
        )
    }
}