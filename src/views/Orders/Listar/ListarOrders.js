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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup
} from 'reactstrap';

class ListarOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoPagoSeleccionado: '',
      listaOrdenes: [],
      tiposEstado: [],
      tiposPago: [],
      ordenSeleccionada: {
        details: []
      }
    }

    //Handlers
    this.handleChange = this
      .handleChange
      .bind(this)
    this.ColumnaEstadoOrden = this
      .ColumnaEstadoOrden
      .bind(this)
    this.CardOrden = this
      .CardOrden
      .bind(this)
    this.botonHeaderClick = this
      .botonHeaderClick
      .bind(this)
    this.toggleSuccess = this
      .toggleSuccess
      .bind(this)
    this.actualizarPedido = this
      .actualizarPedido
      .bind(this)
    this.ListaPlatos = this
      .ListaPlatos
      .bind(this)
    this.getParamsOrder = this
      .getParamsOrder
      .bind(this)
    this.getFechaString = this
      .getFechaString
      .bind(this)

    //Axios
    let listaPromesas = [
      axios.get('EstadoOrdenes'),
      axios.get('Ordenes/getOrderDetails')
    ]
    axios
      .get('TiposDePago')
      .then(response => {
        this.state.tiposPago = response.data
      })

    this.getBotonesProceso = this
      .getBotonesProceso
      .bind(this)

    Promise
      .all(listaPromesas)
      .then((response) => {
        this.setState({listaOrdenes: response[1].data})
        this.setState({tiposEstado: response[0].data})
      })
  }

  handleChange(e) {
    this.setState({tipoPagoSeleccionado: e.target.value})
  }

  toggleSuccess(esTerminado) {
    if (esTerminado && esTerminado.target.name === 'pagar') {
      this.setState({esPago: false})
      let params = this.getParamsOrder(this.state.ordenSeleccionada)
      this
        .state
        .listaOrdenes
        .forEach((orden) => {
          if (orden.id === this.state.ordenSeleccionada.id) {
            orden.EstadoOrdenId = this.state.ordenSeleccionada.EstadoOrdenIdTmp
            this.forceUpdate()
          }
        })
      this.actualizarPedido(params)
    }
    this.setState({
      success: !this.state.success
    });
  }

  ListaTiposPago() {
    return this
      .state
      .tiposPago
      .map(tipoPago => (
        <div key={tipoPago.id} className="radio">
          <Label check htmlFor="radio2">
            <Input
              type="radio"
              name="radios"
              value={tipoPago.id}
              checked={this.state.tipoPagoSeleccionado === tipoPago.id}
              onChange={this.handleChange}/> {tipoPago.descripcion}
          </Label>
        </div>
      ))

  }

  actualizarPedido(params) {
    const url = 'Ordenes/' + params.id
    axios
      .put(url, params)
      .then(response => {})
      .catch(err => {});
  }

  getFechaString(orden) {
    var f = new Date(orden.Fecha),
      mes = f.getMonth() + 1,
      dia = f.getDate(),
      hora = f.getHours(),
      minutos = f.getMinutes(),
      segundos = f.getSeconds();

    function anadecero(valor) {
      if (valor < 10) 
        valor = '0' + valor;
      return valor
    }

    return f.getFullYear() + "-" + anadecero(mes) + "-" + anadecero(dia) + " " + anadecero(hora) + ":" + anadecero(minutos) + ":" + anadecero(segundos)

  }
  getParamsOrder(orden, estado) {
    let EstadoOrdenId = orden.EstadoOrdenIdTmp

    if (!EstadoOrdenId) {
      EstadoOrdenId = (estado && estado.id)
        ? estado.id
        : orden.EstadoOrdenId
    } 

    let params = {
      "id": orden.id,
      "EstadoOrdenId": EstadoOrdenId,
      "Fecha": orden.Fecha,
      "TipoPagoId": orden.TipoPagoId,
      "NombreCliente": orden.NombreCliente,
      "CostoTotal": orden.CostoTotal
    }
    if (this.state.tipoPagoSeleccionado.length > 0) {
      params.TipoPagoId = this.state.tipoPagoSeleccionado
      this.state.tipoPagoSeleccionado = ''
    }
    return params
  }

  botonHeaderClick(orden, estado) {
    const params = this.getParamsOrder(orden, estado)
    if (estado.descripcion === 'Terminado' || estado.descripcion === 'ver') {
      const fecha = this.getFechaString(orden)

      this.state.ordenSeleccionada = JSON.parse(JSON.stringify(orden))
      this.state.ordenSeleccionada.EstadoOrdenIdTmp = estado.id
      this.state.tipoPagoSeleccionado =  this.state.ordenSeleccionada.TipoPagoId
      this.state.ordenSeleccionada.fechaString = fecha;
      console.log(estado.descripcion)
      if(estado.descripcion === 'Terminado'){
        this.setState({esPago: true})
      }else{
        this.setState({esPago: false})
      }
      
      this.toggleSuccess()
    } else {
      orden.EstadoOrdenId = estado.id
      this.forceUpdate()
      this.actualizarPedido(params)
    }
  }

  ListaPlatos(platos) {
    return platos.map((plato, index) => (
      <li key={index} className="list-group-item">
        <span>{plato.DetallePlato.nombre}</span>
        <span className="float-right">{parseFloat(plato.DetallePlato.costo).toFixed(2)}</span>
      </li>
    ))
  }

  getBotonesProceso(EstadoOrdenId, orden) {
    let listaBotones = []
    this
      .state
      .tiposEstado
      .forEach(estado => {
        if (estado.id !== EstadoOrdenId) {
          listaBotones.push(
            <Button
              key={estado.id}
              className={classNames({
              [estado.color]: true,
              'float-right': true
            })}
              type="button"
              onClick={() => {
              this.botonHeaderClick(orden, estado)
            }}
              color="primary">{estado.descripcion}</Button>
          )
        }
      })

    return listaBotones
  }

  CardOrden(EstadoOrdenId) {
    let listaCards = []
    this
      .state
      .listaOrdenes
      .forEach((orden) => {
        if (orden.EstadoOrdenId === EstadoOrdenId) {
          listaCards.push(
            <Card key={orden.id} md="12">
              <CardHeader>
                {orden.NombreCliente}
                {this.getBotonesProceso(EstadoOrdenId, orden)}
              </CardHeader>
              <CardBody>
                <Badge pill onClick={()=>{this.botonHeaderClick(orden,{descripcion:'ver'})}}  className="float-right badge-info">{orden.details.length}</Badge>
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
        <Modal
          isOpen={this.state.success}
          toggle={this.toggleSuccess}
          className={'modal-success ' + this.props.className}>
          <ModalHeader toggle={this.toggleSuccess}>Pagos</ModalHeader>
          <ModalBody>
            <Form className="row">
              <div className="col-md-12">
                <span className="float-right">{'Hora de pedido ' + this.state.ordenSeleccionada.fechaString}</span>
              </div>
              <FormGroup className="col-md-12">
                <Label htmlFor="prependedInput">Nombre</Label>
                <div className="controls">
                  <InputGroup className="input-prepend">
                    <Input
                      name="nombreCliente"
                      value={this.state.ordenSeleccionada.NombreCliente}
                      disabled
                      type="text"/>
                  </InputGroup>
                </div>
              </FormGroup>

              <FormGroup className="col-md-12">
                <Label htmlFor="prependedInput">Costo Total</Label>
                <div className="controls">
                  <InputGroup className="input-prepend">
                    <Input
                      name="nombreCliente"
                      value={parseFloat(this.state.ordenSeleccionada.CostoTotal).toFixed(2)}
                      disabled
                      type="text"/>
                  </InputGroup>
                </div>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Row>
                  <Col md="3">
                    <Label>Tipo de pago</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check>
                      {this.ListaTiposPago()}
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup className="col-md-12">
                <Label htmlFor="prependedInput">Consumo</Label>
                <div className="controls">
                  <ul className="list-group">
                    {this.ListaPlatos(this.state.ordenSeleccionada.details)}
                  </ul>
                </div>
              </FormGroup>

            </Form>

          </ModalBody>
          <ModalFooter>
            <Button
              name="pagar"
              className={classNames({'d-none': !this.state.esPago})}
              color="success"
              onClick={this.toggleSuccess}>Pagar</Button>{' '}
            <Button color="secondary" onClick={this.toggleSuccess}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ListarOrders;
