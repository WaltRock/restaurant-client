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
  InputGroup,
  Table,
  Badge
} from 'reactstrap';

class RegistrarOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreCliente: '',
      costoTotal: 0,
      listaPlatos: [],
      listaPlatosCliente: []
    };
    this.Toast = new ToastTekton(this);
    axios
      .get('Platos')
      .then((response) => {
        this.setState({listaPlatos: response.data})
      })

    axios
      .get('EstadoOrdenes/findOne')
      .then((response) => {
        this.setState({idEstado: response.data.id})
      })

    this.handleChange = this
      .handleChange
      .bind(this)

    this.saveOrden = this
      .saveOrden
      .bind(this);

    this.agregarPlatoCliente = this
      .agregarPlatoCliente
      .bind(this)

    this.quitarPlatoCliente = this
      .quitarPlatoCliente
      .bind(this)

    this.calcularCostoTotal = this
      .calcularCostoTotal
      .bind(this)
  }

  ListaPlatos(platos, esCliente) {
    const method = esCliente
      ? this.quitarPlatoCliente
      : this.agregarPlatoCliente

    const color = esCliente
      ? "danger"
      : "success"

    const text = esCliente
      ? "Quitar"
      : "Agregar"

    const listPlatos = platos.map((plato, index) => <tr key={index}>
      <td className="col-md-8">{plato.nombre}</td>
      <td className="col-md-2">{plato.costo}</td>
      <td className="col-md-2">
        <Badge onClick={() => method(plato)} color={color}>{text}</Badge>
      </td>
    </tr>)
    return listPlatos
  }
  calcularCostoTotal() {
    let platosCliente = this.state.listaPlatosCliente
    let costoTotal = 0;
    platosCliente.forEach((plato) => {
      costoTotal += plato.costo
    })

    this.setState({
      costoTotal: parseFloat(costoTotal).toFixed(2)
    })
  }

  quitarPlatoCliente(plato, index) {
    let platosCliente = this.state.listaPlatosCliente
    platosCliente.splice(index, 1)
    this.setState({listaPlatosCliente: platosCliente})
    this.calcularCostoTotal()
  }

  agregarPlatoCliente(plato, index) {
    let platosCliente = this.state.listaPlatosCliente
    platosCliente.push(plato)
    this.setState({listaPlatosCliente: platosCliente})
    this.calcularCostoTotal()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveOrden() {
    let listIdPlatos = []
    this.state.listaPlatosCliente.forEach(plato=>{
      listIdPlatos.push(plato.id)
    })
    const params = {
      nombreCliente: this.state.nombreCliente,
      costoTotal: parseFloat(this.state.costoTotal) ,
      listIdPlatos: listIdPlatos,
      estadoOrdenId: this.state.idEstado,
    }
    axios
      .post('Ordenes/createOrder', params)
      .then(response => {
        console.log(response.data);
        
        this
          .Toast
          .showAlert({
            normal: 'Se registro el plato para:',
            bold: response.data.NombreCliente + " S/. " + parseFloat(response.data.CostoTotal).toFixed(2)
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
                <i className="fa fa-edit"></i>Registrar Orden
              </CardHeader>
              <CardBody>
                <Form className="row">
                  <Col xs="6">
                    <FormGroup className="col-md-12">
                      <Label htmlFor="prependedInput">Nombre</Label>
                      <div className="controls">
                        <InputGroup className="input-prepend">
                          <Input name="nombreCliente" onChange={this.handleChange} type="text"/>
                        </InputGroup>
                      </div>
                    </FormGroup>

                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i>
                        Lista de platos
                        <p className="float-right m-0">{"Costo total: S/." + this.state.costoTotal}</p>
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped>
                          <thead>
                            <tr>
                              <th className="col-md-8">Nombre</th>
                              <th className="col-md-2">Costo</th>
                              <th className="col-md-2">Agregar</th>
                            </tr>
                          </thead>
                          <tbody
                            style={{
                            height: '220px'
                          }}>
                            {this.ListaPlatos(this.state.listaPlatosCliente, true)}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="6">
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i>
                        Lista de platos
                      </CardHeader>
                      <CardBody>
                        <Table responsive striped>
                          <thead>
                            <tr>
                              <th className="col-md-8">Nombre</th>
                              <th className="col-md-2">Costo</th>
                              <th className="col-md-2">Agregar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.ListaPlatos(this.state.listaPlatos)}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>

                  <div className="form-actions col-md-12">
                    <Button type="button" onClick={this.saveOrden} color="primary">Guardar</Button>
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

export default RegistrarOrders;
