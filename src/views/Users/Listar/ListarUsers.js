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
    <td>{usuario.name}</td>
    <td>{usuario.lastName}</td>
    <td>{usuario.dni}</td>
    <td>{usuario.role}</td>
    <td>
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
                Lista de platos
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Rol</th>
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
