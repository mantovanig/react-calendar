'use strict';

var _locales = require('../locales');

describe('getDefaultLocales', function () {
  it('returns an array of default locales', function () {
    var locales = (0, _locales.getDefaultLocales)();

    expect(locales).toEqual(['en-US', 'en', 'en-GB']);
  });
});

describe('getDefaultLocale', function () {
  it('returns en-US', function () {
    var locale = (0, _locales.getDefaultLocale)();

    expect(locale).toBe('en-US');
  });
});