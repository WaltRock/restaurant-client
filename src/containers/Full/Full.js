import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Users from '../../views/Users/';
import RegistrarDish from '../../views/Dish/RegistrarDish';
import ListarDish from '../../views/Dish/ListarDish';
import Login from '../../views/Login/';
import NotificationAlert from 'react-notification-alert';

let firstComponent = Login

class Full extends Component {
  render() {
    if (!localStorage.getItem('Authorization')) {
      return <Redirect to='/login'/>
    }

    return (
      <div className="app">
        <Header/>
        <div className="app-body">
          <NotificationAlert ref="notify" />
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/users" name="Users" component={Users}/>
                <Route path="/platos/registrar" name="Reigistar Plato" component={RegistrarDish}/>
                <Route path="/platos/listar" name="Listar Platos" component={ListarDish}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Full;
