// import { injectable } from '@loopback/core';
// import { Request, Response, NextFunction } from 'express';
// import { BodyParser } from '@loopback/rest';
// import * as xml2js from 'xml2js';
// import {Buffer} from 'buffer';
//
// interface myRequest extends Request {
//   _readableState: {
//     buffer: {
//       head: {
//         data: Buffer
//       },
//       tail: {
//         data: Buffer
//       }
//     }
//   }
// }
//
// @injectable()
// export class XmlBodyParser implements BodyParser {
//   name = 'xml';
//   supportedMediaTypes = ['application/xml'];
//
//   supports(mediaType: string): boolean {
//     return this.supportedMediaTypes.indexOf(mediaType) !== -1;
//   }
//
//
//
//   async parse(request: myRequest): Promise<any> {
//     const xmlString = request._readableState.buffer.tail.data.toString()
//     const xmlObject = await xml2js.parseStringPromise(xmlString);
//     return {
//       value: xmlObject,
//       consumed: true,
//     };
//   }
//
//   expressRequestHandler(): (req: Request, res: Response, next: NextFunction) => void {
//     return (req: Request, res: Response, next: NextFunction) => {
//       req.setEncoding('utf8');
//       const xmlMiddleware = require('body-parser-xml')({
//         limit: '1MB',
//         xmlParseOptions: {
//           normalize: true,
//           normalizeTags: true,
//           explicitArray: false,
//         },
//       });
//       xmlMiddleware(req, res, next);
//     };
//   }
// }
