import React from 'react';
import { Page, Button, Modal, TextContainer, DisplayText, Stack, Layout, Card } from '@shopify/polaris';
import Iframe from 'react-iframe';

export interface Props {}
export interface State { 
    active: boolean
}

export class GamePage extends React.Component<Props, State> {
    
    state: State = {
        active: false
    }

    render() {
        const {active} = this.state;

        return (
            <Page title="Game">                
                <Layout>
                    <Layout.Section oneHalf>
                        <Card title='플레이어 정보' sectioned>

                            Jaeseok
                            <p>Jaeseok</p>
                            <Button primary onClick={this.handleChange}>게임 시작</Button>                
                        </Card>                        
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title='접속자 리스트' sectioned>
                            <p>Jaeseok</p>
                        </Card>
                    </Layout.Section>
                </Layout>
                
                <Modal
                    open={active}
                    onClose={this.handleChange}
                    title="Tic Tac Toe"                    
                >
                    <Modal.Section>
                        <Iframe
                            url="https://www.youtube.com/embed/Wb-0prPgt1o"
                            width="560px"
                            height="315px"    
                            frameBorder={0}
                        />
                    <TextContainer>
                        <p>                        
                            How to play game
                        </p>
                    </TextContainer>
                    </Modal.Section>
                </Modal>
            </Page>
        );
    }

    handleChange = () => {
        this.setState(({active}:any) => ({active: !active}));
    };

    onClickStartGame() {
        this.setState(({active}) => ({ active: !active }));
    }
}

export  default GamePage;