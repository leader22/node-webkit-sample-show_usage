;(function (global, document, undefined) {
  'use strict';

  /**
   * Modules and constants.
   */
  var os = require('os');
  var _ = require('./src/lodash');
  var UPDATE_INTERVAL = 1000;


  /**
   * Main.
   */
  var Main = function () {
    this.timer = null;
    this.$output = document.getElementById('js-output');
    this.$exitBtn = document.getElementById('js-exit');
    this.tmpl = _.template(document.getElementById('js-tmpl').innerHTML);

    this.init();
  };
  Main.prototype = {
    init: function () {
      var that = this;

      that.render().attachEvent();
      that.timer = setInterval(function () {
        that.render();
      }, UPDATE_INTERVAL);
    },
    render: function () {
      this.$output.innerHTML = this.tmpl(getStatObj());
      return this;
    },
    attachEvent: function () {
      this.$exitBtn.addEventListener('click', function() {
        process.exit(1);
      }, false);

      return this;
    }
  };


  /**
   * Execute.
   */
  new Main();


  /**
   * Privates
   */
  function getStatObj() {
    var nodeMemoryUsage = process.memoryUsage();

    return {
      loadavg: os.loadavg(),
      uptime: {
        os: os.uptime(),
        node: process.uptime()
      },
      memory: {
        os: {
          total: os.totalmem(),
          used: os.totalmem() - os.freemem()
        },
        node: {
          total: nodeMemoryUsage.heapTotal,
          used: nodeMemoryUsage.heapUsed
        }
      },
      os: {
        hostname: os.hostname(),
        type: os.type(),
        release: os.release(),
        arch: os.arch(),
        cpuModelName: os.cpus()[0].model
      }
    };
  }

}(this.self || global, document));
