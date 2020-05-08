import React from 'react'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Twit from './Twit'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
export default class MyProfile extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            id:'',
            userid: '',
            username: '',
            following: [],
            follower: [],
            bio: '',
            mytwit:[],
            tweet:[],
            search:'',
            alluser:[],
            alert: false,
            firstname:'',
            lastname:'',
            dob:Date()
        }
    }
    componentDidMount()
    {
        var path = this.props.location.pathname
        var id = path.substring(4)
        axios.get(`http://localhost:5000/profile/${id}`)
        .then(Response=> 
            {
                this.setState({
                id: Response.data[0]._id,
                userid: Response.data[0].userid,
                username: Response.data[0].username,
                following: Response.data[0].following,
                follower: Response.data[0].follower,
                bio: Response.data[0].bio,
                mytwit: Response.data[0].mytwit,
                })
                console.log(this.state)
                
                axios.get('http://localhost:5000/twit/user/'+this.state.userid)
                .then(Response=>this.setState({
                    tweet:Response.data
                }))

                axios.get('http://localhost:5000/user/get/'+this.state.userid)
                .then(Response=> {
                    this.setState({
                        firstname:Response.data.firstname,
                        lastname: Response.data.lastname,
                        dob: Response.data.dob.substring(0,10)
                    })
                })
            
            })
       .catch(err=> console.log(err))
       axios.get('http://localhost:5000/user/')
       .then(Response=> {
           this.setState({
               alluser: Response.data
           })
       })
    }

    handleSearch = (e) => {
        this.setState({
            search:e.target.value,
        })
    }

    handleGo = e => {

        var result = this.state.alluser.filter(x=> x.username=== this.state.search)
        console.log(result)
        if(result.length!==0)
        {
            if(result[0].username===this.state.username)
             {
                window.location = `/home/${result[0]._id}`
            }
            else{
                 window.location = `/visit/${result[0]._id}/${this.state.userid}`
            }
        }
        else{
            this.setState({
                alert:true,
                search:''
            })
        }
    }

    handleTwit = (e) => {
        e.preventDefault();
        this.setState({
            mytwit: [...this.state.mytwit,this.state.content]
        })
        console.log(this.state)
    }

    render()
    {
        if(this.state.username === '')
        return(
             <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
         )
         else
        return(
            <div>
               <Navbar expand="lg" variant="dark" style={{background:'#3BB9FF'}}>
                    <Navbar.Brand href={"/home/"+this.state.userid}>Twitter-Clone</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={'/post/'+this.state.userid}> Tweet</Nav.Link>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href={'/edit/'+this.state.userid}>Edit</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Navbar.Brand href={"/my/"+this.state.userid} style={{paddingLeft:600}}>@{this.state.username}</Navbar.Brand>
                    </Nav>
                <Form style={{background:'#3BB9FF',border:'none'}} inline>
                    <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="mr-sm-2" 
                        value={this.state.search}
                        onChange={this.handleSearch}/>
                        <Button variant='outline-black' onClick={this.handleGo}>Go</Button>
                        <Alert 
                        show={this.state.alert} 
                        onClose={()=> this.setState({alert:false})} 
                        dismissible 
                        variant='danger'
                        >
                        <ul>
                            <li> No user found </li>
                        </ul>
                      </Alert>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <br/>
            <div style={{paddingLeft:50,fontFamily:'Helvatica Neue'}}>
                <Row>
                    <Col>
                        <Image src='/images/profile.png' style={{width:100,height:100}} roundedCircle/>
                        <p></p>
                        <h4>@{this.state.username}</h4>
                        <Row>
                        <Col>
                        <h5 style={{paddingLeft:20,fontStyle:'oblique',color:'#3D3C3A'}}> | {this.state.firstname} {this.state.lastname}</h5>
                        </Col>
                        <Col>
                        <h5 style={{fontStyle:'oblique',color:'#3D3C3A'}}> Born: {this.state.dob}</h5>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs={8}>
                        <Row className="justify-content-md-center" style={{paddingLeft:60}}>
                            <Col  xs lg='4'>
                            <h4 style={{paddingLeft:35}}> {this.state.follower.length} </h4>
                            </Col>
                            <Col  xs lg='4'>
                            <h4 style={{paddingLeft:35}}> {this.state.following.length}</h4>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center" style={{paddingLeft:60}}>
                            <Col  xs lg='4'>    
                            <h4 > Follower </h4>
                            </Col>
                            <Col  xs lg='4'>
                            <h4 >Following </h4>
                            </Col>
                        </Row>
                        <hr/>
                        <Row className="justify-content-md-center" style={{fontSize:25}}>
                        <div>
                            {this.state.bio}
                        </div>
                        </Row>
                    </Col>
                </Row>
            </div>
            <hr/>
            <div className="Container">
                {this.state.tweet.slice(0).reverse().map(tweet => 
                    <Twit post={tweet} press={this.state.username}/>)}
            </div>
            </div>
        )
    }
}