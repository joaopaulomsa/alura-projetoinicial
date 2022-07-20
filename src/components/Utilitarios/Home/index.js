import { Col, Container} from "reactstrap";
import Logotipo from '../../../assets/images/logo.png';
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import jsonIconesPaineis from '../../../assets/icons/lf20_qVsv08.json';
import { Component } from "react";

class Home extends Component{

    constructor(props){
        super()
        this.defaultOptions = {
            Paineis: {
                loop: true,
                autoplay: true, 
                animationData: jsonIconesPaineis,
                rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
                }
            }
        }
    }

    render() { return (
        <Container>
            <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <p><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2 animate__animated animate__bounce" style={{ maxWidth: '220px', margin: '5px' }} /></p>
                <h1>Escolha de Painel</h1>
                <p>Escolha nos botões abaixo o painel que deseja visualizar!</p>
                <div>
                <Link to="/PainelChecklistCirurgias/8C" className="btn btn-outline-primary btn-lg">
                    <Lottie options={this.defaultOptions.Paineis} height={80}
                    width={80}
                    isStopped={false}
                    isPaused={false}/>
                    <span>Checklist Cirurgias</span>
                </Link>
                <Link to="/PainelEmergenciaPA" className="btn btn-outline-primary btn-lg">
                    <Lottie options={this.defaultOptions.Paineis} height={80}
                    width={80}
                    isStopped={false}
                    isPaused={false}/>
                    <span>PC Emergência PA</span>
                </Link>
                <Link to="/PainelTVEmergenciaPA" className="btn btn-outline-primary btn-lg">
                    <Lottie options={this.defaultOptions.Paineis} height={80}
                    width={80}
                    isStopped={false}
                    isPaused={false}/>
                    <span>TV Emergência PA</span>
                </Link>
                </div>
            </Col>
        </Container>
      );}
}

export default Home;