import React, { Component } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class InputComponent extends Component {
  state = {};

  onChange = e => {
    const { required, length } = this.props;
    const { name, value } = e.target;
    console.log(name, value);
    if(length.min && value.length < length.min) {
      this.props.valid = true
    }
    this.setState({ [name]: value });
  };

  render() {
    const { row, type, id, fieldLabel, fieldName, placeholder, required, length, valid } = this.props;
console.log(this.state);
    if (row) {
      return (
        <FormGroup row>
          <Col {...row}>
            <Label for={id}>{fieldLabel}</Label>
            <Input
              id={id}
              name={fieldName}
              type={type}
              placeholder={placeholder}
              required={required}
              maxLength={length.max}
              onChange={this.onChange}
            />
          </Col>
        </FormGroup>
      );
    } else {
      return (
        <FormGroup>
          <Label for={id}>{fieldName}</Label>
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
          />
        </FormGroup>
      );
    }
  }
}

InputComponent.propTypes = {
  row: PropTypes.object,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  fieldName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  length: PropTypes.object
};

InputComponent.defaultProps = {
  type: "text"
};

export default InputComponent;
