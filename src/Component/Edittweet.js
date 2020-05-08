import React from 'react'
import axios from 'axios'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default class Edittweet extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            userid: '',
            tweetid: '',
            username: '',
            content: '',
            like: '',
            comment: '',
            edit : true
        }
    }
    componentDidMount(){
        var id = this.props.location.pathname.substring(7);
        axios.get('http://localhost:5000/twit/get/'+id )
        .then(Response => {
            console.log(Response.data)
            this.setState({
                userid: Response.data.userid,
                tweetid: Response.data._id,
                username: Response.data.username,
                like: Response.data.like,
                comment: Response.data.comment,
                content: Response.data.content
            })
        })
        .catch(err => console.log(err))
    }

    handleEdit = e => {
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
        })
    }
 
    render() 
    { 
        return(
            <Container style={{paddingTop: 200,paddingLeft: 250}}>
            <Toast show={this.state.edit} onClose={() => {
                                                this.setState({edit:false})
                                                window.location= '/home/'+this.state.userid
                                            }} >
            <Toast.Header>
              <strong className="mr-auto">Edit Tweet</strong>
            </Toast.Header>
            <Toast.Body>
                <Form>
                <Form.Control 
                    plaintext 
                    readOnly 
                    defaultValue={this.state.username} 
                    style={{color:'grey'}}/>
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
            </Container>
        )
    }
}