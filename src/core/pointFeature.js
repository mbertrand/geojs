//////////////////////////////////////////////////////////////////////////////
/**
 * @module geo
 */
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class pointFeature
 *
 * @class
 * @returns {geo.pointFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.pointFeature = function (arg) {
  "use strict";
  if (!(this instanceof geo.pointFeature)) {
    return new geo.pointFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_this = this,
      m_data = null,
      m_positions = arg.positions === undefined ? null : arg.positions,
      m_radius = arg.radius = undefined ? null : arg.radius,
      s_init = this._init;

  this.data = function(data) {
    if (data === undefined) {
      return m_data;
    } else {
      m_data = data;
      m_this.dataTime().modified();
      m_this.modified();
      return m_this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set positions
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.positions = function (val) {
    if (val === undefined) {
      return m_positions;
    } else {
      m_positions = val;
      m_this.dataTime().modified();
      m_this.modified();
    }
    return m_this;
  };


  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function (arg) {
    s_init.call(m_this, arg);

    var defaultStyle = $.extend(
      {},
      {
        radius: function (d) { return 10.0; },
        stroke: function (d) { return -0.75; },
        strokeColor: function (d) { return [1.0, 1.0, 1.0]; },
        strokeWidth: function (d) { return 10.0; },
        fillColor: function (d) { return [1.0, 0.0, 0.0]; },
        fill: function (d) { return 0.75; },
        alpha: function (d) { return 1.0; },
        sprites: false,
        sprites_image: null
      },
      arg.style === undefined ? {} : arg.style
    );

    m_this.style(defaultStyle);

    if (m_positions) {
      m_this.dataTime().modified();
    }
  };

  return m_this;
};

inherit(geo.pointFeature, geo.feature);
