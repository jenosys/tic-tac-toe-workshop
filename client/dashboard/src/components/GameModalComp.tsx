import React from 'react';
import { Frame, AppProvider, TopBar, Modal, Button, TextContainer } from '@shopify/polaris';

interface State {
  active: boolean
}

class ModalExample extends React.Component<{}, State> {
  state: State = {
    active: true,
  };
​
  render() {
    const {active} = this.state;
​
    return (
      <div style={{height: '500px'}}>
        <Button onClick={this.handleChange}>Open</Button>
        <Modal
          open={active}
          onClose={this.handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: this.handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: this.handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    );
  }
​
  handleChange = () => {
    this.setState(({active}) => ({active: !active}));
  };
}