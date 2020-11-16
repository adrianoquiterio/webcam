import React, { Component } from 'react';
import WebCam from 'react-webcam';
const md5Hex  = require('md5-hex');

class WebCamView extends Component {
  constructor(props){
    super(props)
    
  }
  render(){
    
    let res = <WebCam 
    audio={false}
    ref={this.props.webCamRef}
    screenshotFormat="image/jpeg"
  />
  debugger
    return(
      res  
      
    )
  }
}

class BotaoFoto extends Component{
  constructor(props){
    super(props)
  }
  
  render(){
    debugger
    return(<button >Botão - {this.props.webCamRef}</button> )
    /* (<button onClick={this.props.onAddFoto(webcamRef.current.getScreenshot())}>Tirar fotos</button>)*/
  }
  
}

class ListaFotos extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <ul>
        {
          this.props.lista.map( function( foto ){
            return <li><button onClick={() => this.props.onRemoveItem(foto.hash)}>{foto.imageData}</button></li>
          } )
        }
      </ul>
      
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      fotos : [],
      
    };
  }
 
  setRef = webcam =>{
    this.webCam = webcam;
  }

  onRemoveItem = id => {
    this.setState(state => {
      const list = state.list.filter(item => item.id !== id);
 
      return {
        list,
      };
    });
  };
 
  onAddFoto = imageData => {
    this.setState( state => {
      const hash = md5Hex(new Date());
      console.log('Data:' + imageData + ' hash ' + hash)
      const lista = state.fotos.concat( {imageData, hash} )
      return {
        lista,
      }
    });
  };

  //<BotaoFoto onAddFoto={ this.onAddFoto }/>
  // onRemoveItem = {this.onRemoveItem}/>
  /*<ul>
          {this.state.list.map(item => (
            <li key={item.id}>
              The person is {item.age} years old.
              <button
                type="button"
                onClick={() => this.onRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <img src={this.state.foto}/>*/
        //
        //<ListaFotos lista = { this.state.fotos }/>
  render() {
    return (
      <div>
        <div>
        <WebCamView webCamRef = { this.setRef }/>
        <BotaoFoto adicionaFoto = {this.onAddFoto} webCamRef = {this.webCam}/>
        </div>
      </div>
    );
  }
}
 
export default App;