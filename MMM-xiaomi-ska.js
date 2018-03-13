/* global Module */

/* Magic Mirror
 * Module: MMM-xiaomi-ska
 *
 * By Jose M. Luis
 * MIT Licensed.
 */

Module.register('MMM-xiaomi-ska', {
  defaults: {
    gatewayIP: '192.168.1.103',
    animationSpeed: 1000,
    updateInterval: 30,
    showNotifications: true,
    minTemperature: 17,
    maxTemperature: 99,
    maxHumidity: 68,
    celcius: true
  },

  requiresVersion: '2.1.0',

  start() {
    const self = this;

    self.loaded = false;
    self.sensors = {};

    self.sendSocketNotification('START', self.config);
    Log.info('Starting module SKA: ' + self.name);
  },

  getDom() {
    const self = this;

    if (self.error) {
      return self.renderError();
    }

    if (!self.loaded) {
      return self.renderLoading();
    }

    return self.renderStats();
  },


  socketNotificationReceived(notification, payload) {
    const self = this;

    switch (notification) {
      case 'SENSORS':
        self.loaded = true;
        self.sensors = payload;
        break;
      case 'ERROR':
        self.error = payload;
        break;
    }

    this.updateDom(self.config.animationSpeed);
  },


  renderError() {
    const self = this;

    let wrapper = document.createElement('div');
    wrapper.className = 'dimmed light small';
    wrapper.innerHTML = self.error;
    return wrapper;
  },

  renderLoading() {
    const self = this;

    let wrapper = document.createElement('div');
    wrapper.className = 'dimmed light small';
    wrapper.innerHTML = self.translate('LOADING');

    return wrapper;
  },

  renderStats() {
    const self = this;
    let wrapper = document.createElement('table');
    wrapper.className = 'xsmall';

	  console.log('total sensores: ' + self.sensors.length);

    for (var i = 0; i < self.sensors.length; i++) {

      if (self.sensors[i].type === 'sensor') {
        // wrapper.innerHTML += `
        //   <tr>
        //     <td class="normal light small"> ${ self.sensors[i].type }</td >
        //   </tr>
        // `;

        wrapper.innerHTML += `
          <td class="normal light small">Nombre</td>
          <td class="battery">
            <i class="fa fa-superpowers xm-icon"></i> ${self.sensors[i].temperature}º
          </td>
          < td class="battery" >
            <i class="fa fa-superpowers xm-icon"></i> ${ self.sensors[i].humidity}%
          </td >`;
      }

      if (self.sensors[i].type === 'magnet') {
        wrapper.innerHTML += `
          <td class="normal light small">Nombre</td>
          <td class="battery">
            <i class="fa fa-superpowers xm-icon"></i> ${self.sensors[i].open}º
          </td>`;
      }

      if (self.sensors[i].type === 'power-plug') {
        wrapper.innerHTML += `
          <td class="normal light small">Nombre</td>
          <td class="battery">
            <i class="fa fa-superpowers xm-icon"></i> ${self.sensors[i].power}
          </td>`;
      }




    }

    
    

    return wrapper;
  },





  getScripts() {
    return [];
  },

  getStyles() {
    return [
      'MMM-xiaomi-ska.css',
      'font-awesome.css',
    ];
  },

  getTranslations() {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json'
    };
  },
});
