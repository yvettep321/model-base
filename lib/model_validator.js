'use strict';

const _ = require('lodash');
const validator = require('validator');
const ModelUtilities = require('./model_utilities');

const isFunction = ModelUtilities.isFunction;
const isObject = ModelUtilities.isObject;
const exists = ModelUtilities.exists;

/**
 * @type { any } value [ value to validate ]
 * @type { object } options [ optional object with extra constraints]
 * @description Set of validation functions to be used by model class
 */
module.exports = {
	array(value/*, options */) {
		return exists(value) && _.isArray(value);
	},
	buffer(value /*, options */) {
		return exists(value) && _.isBuffer(value);
	},
	string(value/*, options */) {
		return exists(value) && _.isString(value);
	},
	boolean(value/*, options */) {
		return exists(value) && _.isBoolean(value);
	},
	ip(value/*, options */) {
		return exists(value) && validator.isIP(value);
	},
	url(value/*, options */) {
		return exists(value) && validator.isURL(value);
	},
	slug(value/*, options*/) {
		return exists(value) && _.isString(value) && !validator.isUUID(value);
	},
	uuid(value/*, options */) {
		return exists(value) && validator.isUUID(value);
	},
	fqdn(value/*, options */) {
		return exists(value) && validator.isFQDN(value);
	},
	json(value/*, options */) {
		return exists(value) && validator.isJSON(value);
	},
	email(value/*, options */) {
		return exists(value) && validator.isEmail(value);
	},
	alpha(value/*, options */) {
		return exists(value) && validator.isAlpha(value);
	},
	base64(value/*, options */) {
		return exists(value) && validator.isBase64(value);
	},
	hex(value/*, options */) {
		return exists(value) && validator.isHexadecimal(value);
	},
	alpha_numeric(value/*, options */) {
		return exists(value) && validator.isAlphanumeric(value);
	},
	phone(value/*, options */) {
		return exists(value) && validator.isMobilePhone(value, 'en-GB');
	},
	'function': function(value/*, options */) {
		return exists(value) && isFunction(value) && _.isFunction(value);
	},
	date(value/*, options */) {
		return exists(value) && ( _.isDate(value) || validator.isDate('' + value) );
	},
	daterange(value/*, options */) {
		let _value = value;
		try { _value = JSON.parse(value); } catch(e) { }
		return exists(value) && (
			( _.isDate(value[0]) && _.isDate(value[1]) ) ||
			( validator.isDate('' + value[0]) &&  validator.isDate('' + value[1]) )
		);
	},
	integer(value/*, options */) {
		return exists(value) && ( _.isNumber(Number(value)) && validator.isInt('' + value) );
	},
	float(value/*, options */) {
		return exists(value) && ( _.isNumber(Number(value)) && validator.isFloat('' + value) );
	},
	number(value/*, options */) {
		return exists(value) && ( _.isNumber(Number(value)) && validator.isNumeric('' + value) );
	},
	object(value/*, options */) {
		return exists(value) && isObject(value) && _.isObject(value) && _.isPlainObject(value) && !_.isArray(value);
	}
};