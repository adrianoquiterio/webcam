import React, {Component} from 'react';
import Webcam from "react-webcam";
const md5Hex = require ('md5-hex');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imagesArr: []
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capturar = () => {
        let shot = this.webcam.getScreenshot();
        let md5 = md5Hex(shot);
        let newArr = [...this.state.imagesArr];
        newArr.unshift({data : shot, id : md5});
        this.setState({
            imagesArr: newArr
        });
    };

    cancelar = () => {
        let novoArr = []
        this.setState({
            imagesArr : novoArr
        })
    }

    removeFoto = (id) => {
        let novoArr = this.state.imagesArr.filter( function( image ){
            return image.id != id;
        } );
        
        this.setState({
            imagesArr : novoArr
        })
    }
    
    enviarFotos = () =>{
        return(alert(this.state.imagesArr))
    }
    render() {

        const videoConstraints = {
            facingMode: "user"
        };
        let imagesPreview = null;
        if (this.state.imagesArr.length > 0) {
            imagesPreview = (
                <div >
                    {this.state.imagesArr.map((image) => (
                        <div key = {image.id}>
                            <img src={image.data} alt="" />
                    <button onClick={() => this.removeFoto(image.id)} >Remover id: { image.id }</button>
                        </div>
                    ))}
                </div>
            );
        }

        return (
            <div >
                <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <br/>
                <button onClick={this.capturar}>Tirar foto</button>
                <div >
                    {imagesPreview}
                </div>
                <div>
                    <button onClick={this.cancelar}>Cancelar </button>
                    <button onClick={this.enviarFotos}>Confirmar</button>
                </div>
            </div>
        );
    }
}

export default App;