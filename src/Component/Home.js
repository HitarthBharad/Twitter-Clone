import React from 'react'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import Twit from './Twit'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'


export default class Home extends React.Component
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
            logged:false,
        }
    }
    componentDidMount()
    {
        var path = this.props.location.pathname
        var id = path.substring(6)
        console.log(id)
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
                
                axios.get(`http://localhost:5000/user/get/${id}`)
                .then(Response=> {
                    this.setState({
                            logged:Response.data.logged
                        })})

                axios.get('http://localhost:5000/twit/user/'+this.state.userid)
                .then(Response=>this.setState({
                    tweet:Response.data
                }))

              this.state.following.forEach(x => {
                  axios.get('http://localhost:5000/twit/'+x.userid)
                  .then(Response=> {
                       Response.data.forEach(p => {
                       this.setState({
                           tweet:[...this.state.tweet,p]
                       })
                    })
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
            <div style={{paddingLeft:'150'}}>
             <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            </div>
         )
         else
        return(
            <div>
            <Alert 
            show={this.state.alert} 
            onClose={()=> this.setState({alert:false})} 
            dismissible 
            variant='danger'
            >
            <Alert.Heading>No User found</Alert.Heading>
          </Alert>
        

               <Navbar expand="lg" variant="dark" style={{background:'#3BB9FF'}}>
                    <Navbar.Brand href={"/home/"+this.state.userid}>Twitter-Clone</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={"/my/"+this.state.userid}>My</Nav.Link>
                        <Nav.Link href={'/post/'+this.state.userid}> Tweet</Nav.Link>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href={"/edit/"+this.state.userid}>Edit</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Navbar.Brand href={"/my/"+this.state.userid} style={{paddingLeft:550}}>@{this.state.username}</Navbar.Brand>
                    </Nav>

                
                <Form style={{background:'#3BB9FF',border:'none'}} >
                <Col>
                    
                    <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="mr-sm-2" 
                        value={this.state.search}
                        onChange={this.handleSearch}/>
                        <Button variant='outline-black' onClick={this.handleGo}>Go</Button>
                    </Col>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            
            <div className="Container" style={{paddingTop: 15}}>
                {
                    this.state.tweet.map(x => 
                <Twit post={x} press={this.state.username}/>)}
            </div>
            </div>
        )
    
    }
}