import React, {Component} from 'react';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';
import ToastTekton from '../../../helpers/Toast'
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

class RegistrarUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        emailVerified: true,
        name: '',
        lastName: '',
        roleId: ''
      },
      roles: []
    };
    this.Toast = new ToastTekton(this);

    axios
      .get('Roles')
      .then((response) => {
        Object.assign(this.state.user, {role: response.data[0].id})
        this.setState({roles: response.data})
      })

    this.handleChange = this
      .handleChange
      .bind(this)

    this.saveUser = this
      .saveUser
      .bind(this);

  }

  TagListaRoles() {
    let items = []
    this
      .state
      .roles
      .forEach(rol => {
        items.push(
          <option key={rol.id} value={rol.id}>{rol.description}</option>
        )
      })
    return items
  }

  handleChange(e) {
    let nUser = Object.assign(this.state.user, {
      [e.target.name]: e.target.value
    })
    this.setState({user: nUser})
  }

  saveUser() {
    
    axios
      .post('users/createUser', this.state.user)
      .then(response => {
        this
          .Toast
          .showAlert({
            normal: 'Se registro el usuario',
            bold: response.data.name + " " + response.data.lastName
          }, this)
      })
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

                  <FormGroup className="col-md-6">
                    <Label htmlFor="ccyear">Rol</Label>
                    <Input type="select" name="roleId" onChange={this.handleChange}>
                      {this.TagListaRoles()}
                    </Input>
                  </FormGroup>

                  <div className="form-actions col-md-12">
                    <Button type="button" onClick={this.saveUser} color="primary">Guardar</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <NotificationAlert ref="notify"></NotificationAlert>
      </div>
    )
  }
}

export default RegistrarUsers;
