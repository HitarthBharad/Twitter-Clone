import React from 'react'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Twit from './Twit'

export default class Visitor extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            id:'',
            back:'',
            userid: '',
            username: '',
            following: [],
            follower: [],
            bio: '',
            mytwit:[],
            tweet:[],
            backid:'',
            backname:'',
            backfollowing:[],
            backfollower:[],
            backbio:'',
            backmytwit:[],
            ladel:'',
            prof:[],
            firstname:'',
            lastname:'',
            }
    }
    componentDidMount()
    {
        var path = this.props.location.pathname
        var id = path.substring(7,31)
        var back = path.substring(32)
        console.log(id)
        this.setState({
            back: back
        })
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
                mytwit: Response.data[0].mytwit
                })
                
                axios.get('http://localhost:5000/twit/user/'+this.state.userid)
                .then(Response=>this.setState({
                    tweet:Response.data
                }))

                axios.get('http://localhost:5000/user/get/'+this.state.userid)
                .then(Response=>{
                    this.setState({
                        firstname:Response.data.firstname,
                        lastname: Response.data.lastname,
                        dob: Response.data.dob.substring(0,10)
                    })
                })

                var test = this.state.follower.filter(x => x.userid===this.state.back)

                if(test.length!==0)
                {
                    const temp = {
                        userid:test.userid,
                        name:test.username
                    }
                    this.setState({
                        label:'Following',
                        prof:[...this.state.prof,temp]
                    })
                }
                else{
                    this.setState({
                        label:'Follow',
                    })
                }

            
            })
       .catch(err=> console.log(err))
    }

    handleTwit = (e) => {
        e.preventDefault();
        this.setState({
            mytwit: [...this.state.mytwit,this.state.content]
        })
        console.log(this.state)
    }

    handleFollow = e => {
        if(this.state.label==='Follow')
        {
            axios.get('http://localhost:5000/profile/'+this.state.back)
            .then(Response=>{
                this.setState({
                    backid: Response.data[0]._id,
                    backname: Response.data[0].username,
                    backfollowing: Response.data[0].following,
                    backfollower: Response.data[0].follower,
                    backbio: Response.data[0].bio,
                    backmytwit: Response.data[0].mytwit
                })  
                const temp = {
                    userid:this.state.userid,
                    name:this.state.username
                }
                const temp2 = {
                    userid:this.state.back,
                    name:this.state.backname
                }
                this.setState({
                    backfollowing:[...this.state.backfollowing,temp],
                    follower:[...this.state.follower,temp2],
                    ladel:'Following'
                })

                const backUser = {
                    userid:this.state.back,
                    username:this.state.backname,
                    following:this.state.backfollowing,
                    follower:this.state.backfollower,
                    bio:this.state.backbio,
                    mytwit:this.state.backmytwit
                }
                const User={
                    userid:this.state.userid,
                    username:this.state.username,
                    following:this.state.following,
                    follower:this.state.follower,
                    bio:this.state.bio,
                    mytwit:this.state.mytwit
                }

                console.log(backUser)
                console.log(User)

            axios.post('http://localhost:5000/profile/update/'+this.state.backid,backUser)
            .then(Response=> {console.log(Response.data)})

            axios.post('http://localhost:5000/profile/update/'+this.state.id,User)
            .then(Response => {console.log(Response.data)})

            })
        }
        else{

            axios.get('http://localhost:5000/profile/'+this.state.back)
            .then(Response=>{
                this.setState({
                    backid: Response.data[0]._id,
                    backname: Response.data[0].username,
                    backfollowing: Response.data[0].following,
                    backfollower: Response.data[0].follower,
                    backbio: Response.data[0].bio,
                    backmytwit: Response.data[0].mytwit
                })  

                const arrayfollow = [...this.state.follower]
                const backarray = [...this.state.backfollowing]

                const ind = arrayfollow.indexOf(this.state.prof[0])
                arrayfollow.splice(ind,1)
                this.setState({
                    follower:arrayfollow
                })
                
                const it = backarray.indexOf(this.state.prof[0])
                backarray.splice(it,1)
                this.setState({
                    backfollowing:backarray
                })

                const backUser = {
                    userid:this.state.back,
                    username:this.state.backname,
                    following:this.state.backfollowing,
                    follower:this.state.backfollower,
                    bio:this.state.backbio,
                    mytwit:this.state.backmytwit
                }
                const User={
                    userid:this.state.userid,
                    username:this.state.username,
                    following:this.state.following,
                    follower:this.state.follower,
                    bio:this.state.bio,
                    mytwit:this.state.mytwit
                }

                console.log(User)
                console.log(backUser)

            axios.post('http://localhost:5000/profile/update/'+this.state.backid,backUser)
            .then(Response=> {console.log(Response.data)})

            axios.post('http://localhost:5000/profile/update/'+this.state.id,User)
            .then(Response => {console.log(Response.data)})


            })
        }
    }

    render()
    {
        return(
            <div>
               <Navbar expand="lg" variant="dark" style={{background:'#3BB9FF'}}>
                    <Navbar.Brand href={"/home/"+this.state.back}>Explore profile</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href={"/my/"+this.state.back}>My profile</Nav.Link>
                        <Nav.Link href={'/post/'+this.state.back}> Tweet</Nav.Link>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
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
                            <Button variant='outline-black' style={{fontSize:20}} onClick={this.handleFollow}>{this.state.label} </Button>
                            </Col>
                            <Col  xs lg='4'>
                            <Button variant='outline-black' style={{fontSize:20}}> Follower </Button>
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