/* eslint-disable react-hooks/rules-of-hooks */
import React,{ Component } from 'react';
import { Col, Container, Row} from 'reactstrap';
import jsonLoadingHealth from './lf30_editor_csk5d6ws.json'
import Lottie from 'react-lottie';

const defaultOptions = {
    LoadingHealth: {
        loop: true,
        autoplay: true, 
        animationData: jsonLoadingHealth,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    }
}

class LoadingScreen extends Component {
    constructor(props){
        super()
        
        
    }
    render () { return (
        <Container fluid style={{ height: window.innerHeight+'px'}}>
            <Row>
                <Col xs={12} style={{ marginTop: '20%'}}>
                <Lottie options={defaultOptions.LoadingHealth} height={200}
                    width={200}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                    isPaused={false}/>
                    </Col>
            </Row>    
        </Container>  
    ); }
    
}

export default LoadingScreen;
