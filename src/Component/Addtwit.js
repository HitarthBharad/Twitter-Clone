import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

export default class Addtwit extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            id: '',
            log:0,
            username:'',
            userid: '',
            content: '',
            following:[],
            follower:[],
            bio: '',
            mytwit:[],
            err: false,
            posted:false
        }
    }
    componentDidMount()
    {
        var path = this.props.location.pathname;
        var id = path.substring(6)
        console.log(id)

        axios.get('http://localhost:5000/profile/'+id)
        .then(Response=> {
           this.setState({
               userid: Response.data[0].userid,
               username: Response.data[0].username,
               id: Response.data[0]._id,
               following: Response.data[0].following,
               follower: Response.data[0].follower,
               bio: Response.data[0].bio,
               mytwit: Response.data[0].mytwit
           })
        })
        .catch(err=> console.log(err))
    }
    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const Tweet = {
            userid: this.state.userid,
            username: this.state.username,
            content: this.state.content,
            like:[],
            comment:[]
        }

       axios.post('http://localhost:5000/twit/add',Tweet)
        .then(Response=>{
        
        console.log(Response.data)
        
        axios.get('http://localhost:5000/twit/'+this.state.userid)
        .then(Response=>{
            var result = Response.data[Response.data.length -1]
            console.log(result)

            this.setState({
                posted:true,
                mytwit: [...this.state.mytwit,result],
            })

            const Profile= {
                userid:this.state.userid,
                username:this.state.username,
                following: this.state.following,
                follower:this.state.follower,
                bio:this.state.bio,
                mytwit: this.state.mytwit
            }

            axios.post(`http://localhost:5000/profile/update/${this.state.id}`,Profile)
            .then(Response=> {
            this.setState({
                posted:true,
            })
            console.log(Response.data)
        })
        .catch(err=> {
                this.setState({err:true,posted:false})
                console.log(err)
            })

        })
        
        })
        .catch(err=> {
            this.setState({
                err:true,
                posted:false
            })
            console.log(err)
        })
    }

    render()
    {
        return(
            <div>
                <Alert 
                show={this.state.posted} 
                onClose={()=> {this.setState({posted:false})
            window.location = `/home/${this.state.userid}`}} 
                dismissible 
                variant='success' 
               >
                <Alert.Heading>Tweet Posted</Alert.Heading>
              </Alert>
              <Alert 
                show={this.state.err} 
                onClose={()=> this.setState({err:false})} 
                dismissible 
                variant='danger'
                >
                <Alert.Heading>Error</Alert.Heading>
              </Alert>
              <Navbar expand="lg" variant="dark" style={{background:'#3BB9FF'}}>
              <Navbar.Brand href="#home">Twitter-Clone</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href={"/home/"+this.state.userid}>My profile</Nav.Link>
              </Nav>
          <Form style={{background:'#3BB9FF',border:'none'}}>
              <FormControl type="text" placeholder="Search" />
                  <Button variant='outline-black'>Go</Button>
              </Form>
          </Navbar.Collapse>
      </Navbar>
            <br/>
                <Container>
                <Form>
                    <Form.Row>
                    <Image src='/images/profile.png' roundedCircle style={{width:35,height:35}}/>
                    <Form.Label style={{paddingLeft:25,fontSize:25}}>@{this.state.username}</Form.Label>
                    </Form.Row>
                    <div style={{paddingLeft:20,borderLeft:'1px solid black',height:70}}>
                    </div>
                    <br/>
                    <Form.Group >
                        <Form.Control
                             type="text" 
                             placeholder="What's happening?" 
                             name='twit' 
                             value={this.state.content} 
                             onChange={this.handleContent}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Tweet
                    </Button>
                </Form>
                </Container>
            </div>
        )
    }
}