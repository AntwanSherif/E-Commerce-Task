import React, { Component, Fragment } from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react';

export default class OrdersContainer extends Component {
    handleCheckout = () => console.log('should handle checkout');
    
	render () {
		return (
            <Fragment>
			<Item.Group divided>
				<Item>
                    <Item.Image size='small' bordered src="/assets/images/default-image.png" />

					<Item.Content>
						<Item.Header as="a">My Neighbor Totoro</Item.Header>
						<Item.Meta>
							<span className="cinema">IFC Cinema</span>
						</Item.Meta>
						<Item.Extra>
							<Button primary floated="right">
								Buy tickets
								<Icon name="right chevron" />
							</Button>
							<Label>Limited</Label>
						</Item.Extra>
					</Item.Content>
				</Item>

				<Item>
                    <Item.Image size='small' bordered src="/assets/images/default-image.png" />

					<Item.Content>
						<Item.Header as="a">Watchmen</Item.Header>
						<Item.Meta>
							<span className="cinema">IFC</span>
						</Item.Meta>
						<Item.Extra>
							<Button primary floated="right">
								Buy tickets
								<Icon name="right chevron" />
							</Button>
						</Item.Extra>
					</Item.Content>
				</Item>
            </Item.Group>

                <Button 
                    fluid
                    color='teal'
                    content='Checkout'
                    onClick={this.handleCheckout}
                />
            </Fragment>
		);
	}
}
