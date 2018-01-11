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

function ListaUsuarios(props) {
  const usuarios = props.usuarios
  const listUsuarios = usuarios.map(usuario => <tr key={usuario.id}>
    <td className="col-md-3">{usuario.name}</td>
    <td className="col-md-3">{usuario.lastName}</td>
    <td className="col-md-2">{usuario.dni}</td>
    <td className="col-md-2">{usuario.role}</td>
    <td className="col-md-2">
      <Badge onClick={() => editarPlato(plato)} color="success">Editar</Badge>
    </td>
  </tr>)
  return listUsuarios
}
function editarPlato(e) {
  console.log(e)
}

class UsuariosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaUsuarios: []
    };
    this.handleChange = this
      .handleChange
      .bind(this)

    axios
      .get('users')
      .then(response => {
        this.setState({listaUsuarios: response.data})
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
                Lista de usuarios
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th className="col-md-3">Nombre</th>
                      <th className="col-md-3">Apellido</th>
                      <th className="col-md-2">DNI</th>
                      <th className="col-md-2">Rol</th>
                      <th className="col-md-2">Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ListaUsuarios usuarios={this.state.listaUsuarios}></ListaUsuarios>
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

export default UsuariosList;
