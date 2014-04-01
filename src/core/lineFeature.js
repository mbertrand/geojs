//////////////////////////////////////////////////////////////////////////////
/**
 * @module geo
 */

/*jslint devel: true, forin: true, newcap: true, plusplus: true*/
/*jslint white: true, indent: 2*/

/*global geo, ogs, inherit, document$*/
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
/**
 * Create a new instance of class lineFeature
 *
 * @class
 * @returns {geo.lineFeature}
 */
//////////////////////////////////////////////////////////////////////////////
geo.lineFeature = function(arg) {
  "use strict";
  if (!(this instanceof geo.lineFeature)) {
    return new geo.lineFeature(arg);
  }
  arg = arg || {};
  geo.feature.call(this, arg);

  ////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   */
  ////////////////////////////////////////////////////////////////////////////
  var m_positions = arg.positions === undefined ? [] : arg.positions,
      s_init = this._init;

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Get/Set positions
   *
   * @returns {geo.pointFeature}
   */
  ////////////////////////////////////////////////////////////////////////////
  this.positions = function(val) {
    if (val === undefined ) {
      return m_positions;
    } else {
      // Copy incoming array of positions
      m_positions = val.slice(0);
      this.modified();
      return this;
    }
  };

  ////////////////////////////////////////////////////////////////////////////
  /**
   * Initialize
   */
  ////////////////////////////////////////////////////////////////////////////
  this._init = function(arg) {
    s_init.call(this, arg);

    var defaultStyle = $.extend({}, {"width":[1.0],
                         "color": [1.0, 1.0, 1.0],
                         "pattern": "solid"},
                         arg.style === undefined ? {} : arg.style);

    this.style(defaultStyle);

    if (m_positions) {
      this.dataTime().modified();
    }
  };

  this._init(arg);
  return this;
};

inherit(geo.lineFeature, geo.feature);
