"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = {
  secret: `${process.env.JWT_SECRET}`,
  refreshSecret: `${process.env.JWT_REFRESH_SECRET}`,
  // expiresIn: '1d',
  expiresIn: `${process.env.JWT_EXPIRES}`,
}