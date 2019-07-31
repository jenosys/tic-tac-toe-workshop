import React from 'react';
import { Frame, AppProvider, TopBar, Modal, Button, TextContainer, Stack, TextField } from '@shopify/polaris';

export interface Props {
	active: boolean
}

export interface State {
	active: boolean
	nickname: string
}

class SetUsernameComp extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);		
	}

	state: State = {
		active: this.props.active,
		nickname: ""
	};


  	render() {
		const { active, nickname } = this.state;

		return (
			<div style={{height: '500px'}}>
				<Modal
					open={active}
					onClose={this.toggleModal}
					title="이름을 설정하세요"
					primaryAction={{
						content: '완료',
						onAction: this.toggleModal,
					}}
				>
					<Modal.Section>
						<Stack>
							<Stack.Item>
								<TextContainer>
								<p>
									세션에서 사용할 이름을 설정하세요.
								</p>
								</TextContainer>
							</Stack.Item>
							<Stack.Item fill>
								<TextField
									label="이름 입력"
									value={this.state.nickname}
									placeholder="안양의 이준영"
									onChange={this.handleChange}								
								/>
							</Stack.Item>
						</Stack>
			</Modal.Section>
			</Modal>
		</div>
		);
	};
	
	handleChange = (nickname: string) => {
		this.setState({nickname});
	}
	
	toggleModal = () => {
		this.setState(({active}) => ({active: !active}));
	};
	
}

export default SetUsernameComp