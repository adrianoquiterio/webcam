import React, {Component} from 'react';
import Webcam from "react-webcam";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeImg: null,
            imagesArr: []
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capturar = () => {
        let shot = this.webcam.getScreenshot();
        let newArr = [...this.state.imagesArr];
        newArr.unshift(shot);
        this.setState({
            activeImg: shot,
            imagesArr: newArr
        });
    };        

    cancelar = () => {
        let novoArr = []
        this.setState({
            activeImg : null,
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
                    {this.state.imagesArr.map((image, index) => (
                       <img  src={image} alt="" key={index} />
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
                <button  onClick={this.capturar}>Tirar foto</button>
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