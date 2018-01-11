import React, {Component} from 'react';
class ToastTekton {
  constructor(nthis) {

    this.options = {
      place: 'br',
      type: "success",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 5
    }

    this.getOptions = (params) => {
      return Object.assign(this.options, params)
    }

    this.showAlert = function (params, nthis) {
      let paramsx = {
        message: (
          <div>
            <div>
              {(params.normal||'')}
              <b>{" " + (params.bold||'')}</b>
            </div>
          </div>
        )
      }
      params.normal = undefined
      params.bold = undefined

      nthis
        .refs
        .notify
        .notificationAlert(this.getOptions(Object.assign(params, paramsx)));
    }

  }

}

export default ToastTekton