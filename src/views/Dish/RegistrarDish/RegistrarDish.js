import React, {Component} from 'react';
import axios from 'axios';
import NotificationAlert from 'react-notification-alert';

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
  InputGroup,
  Alert
} from 'reactstrap';

var options = {};
options = {
  place: 'br',
  type: "success",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 5
}

const getOptions = (params) => {
  return Object.assign(options, params)
}

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      costo: '',
      nombre: ''
    };
    this.handleChange = this
      .handleChange
      .bind(this)
    this.save = this
      .save
      .bind(this)
    this.showAlert = this
      .showAlert
      .bind(this)
  }

  showAlert(data) {
    let params = {
      message: (
        <div>
          <div>
            Se registro correctamente el platillo
            <b>{" " + data.nombre}</b>
          </div>
        </div>
      )
    }
    this
      .refs
      .notify
      .notificationAlert(getOptions(params));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  save() {
    axios
      .post('Platos', this.state)
      .then(response => {
        this.showAlert(response.data)
        this.setState({costo: '', nombre: ''})
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
                    <Label htmlFor="prependedInput">Nombre del plato</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="nombre" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <FormGroup className="col-md-6">
                    <Label htmlFor="prependedInput">Costo del plato</Label>
                    <div className="controls">
                      <InputGroup className="input-prepend">
                        <Input name="costo" onChange={this.handleChange} type="text"/>
                      </InputGroup>
                    </div>
                  </FormGroup>

                  <div className="form-actions col-md-12">
                    <Button type="button" onClick={this.save} color="primary">Guardar</Button>
                    <Button onClick={this.showAlert} color="secondary">Cancela</Button>
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

export default Dish;
