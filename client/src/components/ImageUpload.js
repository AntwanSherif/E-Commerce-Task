import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Image, Button, Segment, Header } from 'semantic-ui-react';

export default class ImageUpload extends Component {
    static propTypes = {
        passUploadedImageData: PropTypes.func.isRequired
    }

    state = { uploadedImage: null }
    imageFileInputRef = React.createRef();

    hanleImageUpload = (e) => {
        this.setState({ uploadedImage: URL.createObjectURL(e.target.files[0])});
        
        //Pass image data to AddProductFormContainer to handle form data
        this.props.passUploadedImageData(e.target.files[0]);
    }

    render() {
      return (
        <Segment placeholder textAlign='center'>
            <Header content='Upload product image' />

            <Image
                src={this.state.uploadedImage || 'assets/images/default-image.png'}
                bordered
                centered
                size='tiny'
            />

            <Button
                content="Choose File"
                primary
                style={{marginTop: 20}}
                onClick={() => this.imageFileInputRef.current.click()}
            />
            <input 
                ref={this.imageFileInputRef}
                type='file'
                id='file'
                hidden
                onChange={e => this.hanleImageUpload(e)}
            />
        </Segment>
      )
    }
}
