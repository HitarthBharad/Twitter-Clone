import React from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
class Twit extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            tweetid: props.post._id,
            username: props.post.username,
            userid: props.post.userid,
            name:props.press,
            content: props.post.content,
            like: props.post.like,
            comment: props.post.comment,
            create: props.post.createdAt.substring(0,10),
            update: props.post.updatedAt.substring(0,10),
            people: [],
            edit: false,
            show_comment: false,
            read: ''
        }
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/twit/get/'+this.state.tweetid)
        .then(Response=> {
            this.setState({
                comment: Response.data.comment,
                like: Response.data.like
            })
        })
        .catch(err=> {console.log(err)})
    }

    handleLike= e => {
        e.preventDefault();
        var temp = this.state.like.filter(x => x.name === this.state.name)
        console.log(temp)
        if(temp.length===0)
        {
            axios.get('http://localhost:5000/twit/get/'+this.state.tweetid)
            .then(Response => {
            const p = {name:this.state.name}
            this.setState({
                like: [...this.state.like,p]
            })

            console.log(this.state.like)
            const Tweet = {
                userid: this.state.userid,
                username: this.state.username,
                content: this.state.content,
                like:this.state.like,
                comment:this.state.comment
            }

            axios.post('http://localhost:5000/twit/update/'+this.state.tweetid,Tweet)
            .then(Response=>{
    
                console.log('Liked !!')
            })
            .catch(err=> {
                    this.setState({err:true,posted:false})
                    console.log(err)
                })
            })
        }
        else{

            axios.get('http://localhost:5000/twit/get/'+this.state.tweetid)
            .then(Response => {
            const array = [...this.state.like]
            const index = array.indexOf(temp)
            array.splice(index,1)
            this.setState({
                like:array
            })

            console.log(this.state.like)

            const Tweet = {
                userid: this.state.userid,
                username: this.state.username,
                content: this.state.content,
                like:this.state.like,
                comment:this.state.comment
            }
            axios.post('http://localhost:5000/twit/update/'+this.state.tweetid,Tweet)
            .then(Response=>{console.log('Disliked')})
            .catch(err=> console.log(err))
        })
        }
    }

    handleDelete = (e) => {
        axios.delete('http://localhost:5000/twit/delete/'+ this.state.tweetid)
        .then(Response => console.log(Response.data))

        window.location = `/my/${this.state.userid}`
    }

    handleEdit = (e) => {
        this.setState({
            content:e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        const temp = {
            userid: this.state.userid,
            username:this.state.username,
            content: this.state.content,
            like: this.state.like,
            comment: this.state.comment
        }
        axios.post('http://localhost:5000/twit/update/'+this.state.tweetid,temp)
        .then(Response => {
            console.log(Response.data)
            this.setState({
                edit:true
            })
            window.location = '/home/'+this.state.userid
            this.setState({
                read: ''
            })
        })

    }

    handleComment = (e) => {
        e.preventDefault();

        axios.get('http://localhost:5000/twit/get/'+this.state.tweetid)
        .then(Response => {
            const temp = {
                id: this.state.userid,
                name: this.state.username,
                content: this.state.read
            }
            this.setState({
                comment: [...this.state.comment,temp]
            })

            const Tweet = {
                userid: this.state.userid,
                username:this.state.username,
                content: this.state.content,
                like: this.state.like,
                comment: this.state.comment
            }            

            axios.post('http://localhost:5000/twit/update/'+this.state.tweetid,Tweet)
            .then(Response => {
                console.log(Response.data)
                //window.location = '/home/'+this.state.userid
        })
            
        })
    }

    handleRead =e => {
        this.setState({
            read: e.target.value
        })
    }

    render()
    {
        return(
        <Container style={{fontFamily:'Open Sans'}}>

        <Row>
            <Image src='/images/profile.png' style={{width:30,height:30}} roundedCircle/>
            <h5 style={{paddingLeft:20,fontFamily:'Helvetica'}}>@{this.state.username}</h5>
            <h5 style={{paddingLeft:400}}>{this.state.create}</h5>
            <div style={{paddingLeft: 15}}>
             <NavDropdown  id="basic-nav-dropdown" disabled= {!(this.state.username === this.state.name)}>
            <NavDropdown.Item  onClick={() => this.setState({edit:true})}>Edit</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#delete" onClick ={this.handleDelete}>Delete</NavDropdown.Item>
            </NavDropdown>
            </div>
        </Row>
        <Row >
            <div style={{paddingLeft:50}}><h5> {this.state.content}</h5> </div>
        </Row>
        { this.state.edit && <div style={{paddingLeft:150}}>
        <Toast show={this.state.edit} onClose={() => {this.setState({edit:false})}}>
        <Toast.Header>
          <strong className="mr-auto">Edit Tweet</strong>
        </Toast.Header>
        <Toast.Body>
            <Form>
            <Form.Control plaintext readOnly defaultValue={'@'+this.state.username} />
            <Form.Group>
                <Form.Control
                    type='text'
                    placeholder='What`s new ?'
                    value ={this.state.content}
                    onChange= {this.handleEdit} />
            </Form.Group>
            <Button type ='Submit' variant='primary' onClick={this.handleSubmit}>
                Save Change !!
            </Button>
            </Form>
        </Toast.Body>
         </Toast>   
         </div>
        }

        <Row>
            <Button 
                variant='link' 
                onClick={this.handleLike} 
                style={{marginLeft:300}}>
                 Like: {this.state.like.length} 
            </Button>
            
                <Button
                    variant='link'
                    onClick={() => this.setState({show_comment: !this.state.show_comment})}> 
                    Comment: {this.state.comment.length}
                </Button> 

                {
                    this.state.show_comment && 

                    <div >
                    <Card style={{width: '20rem'}}>
                        <Card.Header>
                        <strong className="mr-auto">Comments</strong>
                    </Card.Header>
                    <Card.Body>
                    {this.state.comment.map( x=> (
                        <div style={{fontFamily:'Segoe'}}>
                            <Row style={{paddingLeft: 10}}>
                                <Image src='/images/profile.png' style={{width:15,height:15}} roundedCircle/>
                                <h6 style={{color:'grey',paddingLeft: 12}}>{x.name}</h6>
                                <hr/>
                            </Row>
                            <Row style={{paddingLeft: 35}}>
                                <h6>{x.content}</h6>
                            </Row>
                            <hr />
                        </div>
                    )) }
                    <Form>
                    <Form.Group>
                    <InputGroup className = "mb-3" size='sm'>
                    <Form.Control
                    type='text'
                    placeholder='Say something'
                    value ={this.state.read}
                    onChange= {this.handleRead} />
                        <InputGroup.Prepend>
                     <Button type ='Submit' variant='Primary' onClick={this.handleComment}>
                            >
                    </Button>
                    </InputGroup.Prepend>
                    </InputGroup>
                    </Form.Group>
                     </Form>
                    </Card.Body>
                     </Card>   
                    </div>
                }
            
        </Row>
        {console.log(this.props.post)}
        <hr/>
    </Container>
        )
    }
}


export default Twit