import React, {Component} from 'react';
import axios from 'axios';
import classNames from 'classnames';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Label,
  Input,
  Button
} from 'reactstrap';

function editarPlato(e) {
  console.log(e)
}

class ListarOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaOrdenes: [],
      tiposEstado: []
    }
    this.BotonesCache = {}
    this.handleChange = this
      .handleChange
      .bind(this)
    this.ColumnaEstadoOrden = this
      .ColumnaEstadoOrden
      .bind(this)
    this.CardOrden = this
      .CardOrden
      .bind(this)
    let listaPromesas = [
      axios.get('EstadoOrdenes'),
      axios.get('Ordenes/getOrderDetails')
    ]

    this.getBotonoesProceso = this.getBotonoesProceso.bind(this)

    Promise
      .all(listaPromesas)
      .then((response) => {
        this.setState({listaOrdenes: response[1].data})
        this.setState({tiposEstado: response[0].data})
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getBotonoesProceso(EstadoOrdenId) {
    let listaBotones = []
    if (!this.BotonesCache[EstadoOrdenId]) {
      this.BotonesCache[EstadoOrdenId] = []
      
      this
        .state
        .tiposEstado
        .forEach(estado => {
          if (estado.id !== EstadoOrdenId) {
            this
              .BotonesCache[EstadoOrdenId]
              .push(<Button key={estado.id} className={classNames({
                [estado.color]: true,
                'float-right': true
              })} type="button" color="primary">{estado.descripcion}</Button>)
          }
        })
        
    } 
    return this.BotonesCache[EstadoOrdenId]
  }

  CardOrden(EstadoOrdenId) {

    let listaCards = []
    const BotonesHeader = this.getBotonoesProceso(EstadoOrdenId)
    this
      .state
      .listaOrdenes
      .forEach((orden) => {
        if (orden.EstadoOrdenId === EstadoOrdenId) {
          listaCards.push(
            <Card key={orden.id} md="12">
              <CardHeader>
                {orden.NombreCliente}
                {BotonesHeader}
              </CardHeader>
              <CardBody>
                <Badge pill className="float-right badge-info">{orden.details.length}</Badge>
                {orden.details[0].DetallePlato.nombre}
              </CardBody>
            </Card>
          )
        }
      })
    return listaCards
  }
  ColumnaEstadoOrden() {
    return this
      .state
      .tiposEstado
      .map(tipoEstado => {
        return (
          <Col
            key={tipoEstado.id}
            xs="12"
            sm="6"
            md="4"
            className={classNames({
            [tipoEstado.color]: true,
            'p-2 text-dark': true
          })}>
            {tipoEstado.descripcion}
            <Col md="12" className="p-0">
              {this.CardOrden(tipoEstado.id)}
            </Col>
          </Col>
        )
      })

  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          {this.ColumnaEstadoOrden()}
        </Row>
      </div>
    )
  }
}

export default ListarOrders;
