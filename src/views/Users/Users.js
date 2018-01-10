import React, {Component} from 'react';
import axios from 'axios';
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup
} from 'reactstrap';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      emailVerified: true,
      name: '',
      lastName: ''
    };
    this.handleChange = this
      .handleChange
      .bind(this)
    this.saveUser = this
      .saveUser
      .bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveUser() {
    axios
      .post('users', this.state)
      .then(response => { console.log(response.data)})
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <i className="fa fa-edit"></i>Formulario Usuario
              </CardHeader>
              <CardBody>
                <Form className="row">
                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">Nombre</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="name" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">Apellidos</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="lastName" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">DNI</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="dni" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">Email</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="email" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">Contraseña</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="password" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <div className="form-actions col-md-12">
                    <Button type="button" onClick={this.saveUser} color="primary">Guardar</Button>
                    <Button color="secondary">Cancel</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Forms;
