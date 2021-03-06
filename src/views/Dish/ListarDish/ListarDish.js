import React, {Component} from 'react';
import axios from 'axios';

import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Alert
} from 'reactstrap';

function ListaPlatos(props) {
  const platos = props.platos
  const listPlatos = platos.map(plato => <tr key={plato.id}>
    <td className="col-md-8">{plato.nombre}</td>
    <td className="col-md-2">{plato.costo}</td>
    <td className="col-md-2">
      <Badge onClick={() => editarPlato(plato)} color="success">Editar</Badge>
    </td>
  </tr>)
  return listPlatos
}
function editarPlato(e) {
  console.log(e)
}

class Dish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaPlatos: []
    };
    this.handleChange = this
      .handleChange
      .bind(this)

    axios
      .get('Platos')
      .then(response => {
        this.setState({listaPlatos: response.data})
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                Lista de platos
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th className="col-md-8">Nombre del plato</th>
                      <th className="col-md-2">Costo</th>
                      <th className="col-md-2">Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ListaPlatos platos={this.state.listaPlatos}></ListaPlatos>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dish;
