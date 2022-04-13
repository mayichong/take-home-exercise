import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';
import Modal from 'react-modal';
import axios from 'axios';
import {SketchPicker} from 'react-color';

class TeamMember extends React.PureComponent {

  state = {
    modalStatus: false,
    firstname: '',
    lastname: '',
    title: '',
    pic:'',
    story:'',
    background: '#fff',
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string
  };

  static defaultProps = {
    photoUrl: CodelitEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };

  handleColorChange = (color) => {
    this.setState({ background: color.hex });
  };


  handleModal = () =>{
    this.setState({modalStatus: true});
    
  }

  closeModal = () =>{
    this.setState({modalStatus: false});
  }

  handleFirstnameChange = (event) => {
      this.setState({
        firstname: event.target.value
      })
  }
  handleLastnameChange = (event) => {
    this.setState({
      lastname: event.target.value
    })
}
handleTitleChange = (event) => {
  this.setState({
    title: event.target.value
  })
}

handlePicChange = (event) => {
  this.setState({
    pic: event.target.value
  })
}
handleStoryChange = (event) => {
  this.setState({
    story: event.target.value
  })
}

handleSubmit = (event) => {
  console.log(this.state);
  axios({
    method: 'post',
    url: 'http://localhost:3001/new',
    data: this.state,
    mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
  })
  .then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error);
  })

}
  render() {
    return (
      
      <div className="container">
        <Modal isOpen={this.state.modalStatus} ariaHideApp={false}>
          <div style={{textAlign:"center"}}>
          <h2>Please input your information:</h2>
          <div className='space40'></div>
          <form onSubmit={this.handleSubmit}>
            <label className='input-font-size'>First Name: </label>
            <input type='text' value={this.state.firstname} onChange={this.handleFirstnameChange}/>
            <div className='space40'></div>
            <label className='input-font-size'>Last Name: </label>
            <input type='text' value={this.state.lastname} onChange={this.handleLastnameChange}/>
            <div className='space40'></div>
            <label className='input-font-size'>Title: </label>
            <input type='text' value={this.state.title} onChange={this.handleTitleChange}/>
            <div className='space40'></div>
            <label className='input-font-size'>Favorite Color: {this.state.background} </label>
            <div className='space40'></div>
            <div className='center'>
            <SketchPicker
            
        color={ this.state.background }
        onChangeComplete={ this.handleColorChange }
      /> </div>
            <div className='space40'></div>
            <label className='input-font-size'>Photo URL: </label>
            <input type='text' value={this.state.pic} onChange={this.handlePicChange}/>
            <div className='space40'></div>
            <label className='input-font-size'>Story: </label>
            <div style={{paddingTop:"10px"}}></div>
            <textarea rows="10" cols="50" name="comment" form="usrform" placeholder='type your stories here!' value={this.state.story} onChange={this.handleStoryChange}>
</textarea>
<div style={{paddingTop:"10px"}}></div>
<button type="submit">Submit</button>
&nbsp;&nbsp;&nbsp;&nbsp;
<button onClick={this.closeModal}>back</button>
          </form>
          </div>
        </Modal>
        <header>
          <div className="avatar-container">
            <img
              className="avatar"
              src={this.props.photoUrl}
              alt={this.props.name}
            />
            
          </div>
          <h2 className="title">{this.props.title}</h2>
          <h1 className="name">{this.props.name}</h1>
         
          {this.props.name === "Join us!" ? <button className='joinButton' onClick={this.handleModal}>Join the team!</button> : <></>}
        </header>
        <div className="body">{this.props.story}</div>
        <footer style={{ backgroundColor: this.props.favoriteColor }}>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box stat">9.0</div>
            <div className="one-third-flex-box stat bordered">9.0</div>
            <div className="one-third-flex-box stat">9.0</div>
          </div>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">CANDID</div>
            <div className="one-third-flex-box">LEARNING</div>
            <div className="one-third-flex-box">GRIT</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default TeamMember;
