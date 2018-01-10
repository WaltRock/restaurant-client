import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import classNames from 'classnames';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'walt@tekton.com',
      password: '123123',
      isErrorUser: false,
      redirect: false
    }
    if (localStorage.getItem('Authorization')) {
      this.state.redirect = true
    }
    this.handleChange = this
      .handleChange
      .bind(this)
    this.login = this
      .login
      .bind(this)
  }

  verifyMailTekton(val) {
    return !!(val.substring(val.indexOf("@"), val.length).indexOf("tekton") + 1);
  }

  handleChange(e) {
    let val = e.target.value;
    if (this.state.isErrorUser && e.target.name === "email") {
      if (this.verifyMailTekton(val)) {
        this.setState({isErrorUser: false})
      }
    }
    this.setState({
      [e.target.name]: val
    })
  }

  login() {
    if (this.verifyMailTekton(this.state.email)) {
      this.setState({isErrorUser: false})
    } else {
      this.setState({isErrorUser: true})
      return true;
    }
    axios
      .post('Users/login', this.state)
      .then(response => {
        localStorage.setItem('Authorization', response.data.id)
        axios.defaults.headers.common['Authorization'] = response.data.id;
        this.setState({redirect: true})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/dashboard'/>;
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Inicia Session con tu cuenta Tekton</p>
                    <p
                      className={classNames({
                      'd-none': !this.state.isErrorUser,
                      'mb-0 text-danger': true
                    })}>
                      Ingrese un usuario de Tekton
                    </p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user"></i>
                      </InputGroupAddon>
                      <Input
                        className={classNames({'is-invalid': this.state.isErrorUser})}
                        value={this.state.email}
                        name="email"
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Email"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <i className="icon-lock"></i>
                      </InputGroupAddon>
                      <Input
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" onClick={this.login} className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">¿Olvidó la contraseña?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
