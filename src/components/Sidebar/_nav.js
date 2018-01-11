export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Usuarios',
      url: '/users',
      icon: 'icon-speedometer',
      children : [
        {
          name: 'Registrar Usuarios',
          url: '/usuarios/registrar',
          icon: 'fa fa-check'
        },
        {
          name: 'Lista Usuarios',
          url: '/usuarios/listar',
          icon: 'fa fa-list-ul'
        },
      ]
    },
    {
      name: 'Ordenes',
      url: '/ordenes',
      icon: 'icon-speedometer',
      children : [
        {
          name: 'Registrar',
          url: '/ordenes/registrar',
          icon: 'check'
        },
        {
          name: 'Lista',
          url: '/ordenes/lista',
          icon: 'list-ul'
        },
      ]
    },
    {
      name: 'Platos',
      url: '/platos',
      icon: 'fa fa-cutlery',
      children : [
        {
          name: 'Registrar',
          url: '/platos/registrar',
          icon: 'fa fa-check'
        },
        {
          name: 'Lista',
          url: '/platos/listar',
          icon: 'fa fa-list-ul'
        },
      ]
    },

  ]
};
