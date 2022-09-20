var fs = require('fs');
var request = require('request');
var CodeGen = require('swagger-js-codegen').CodeGen;

const swaggerPath = 'https://localhost:44398/swagger/Profession/swagger.json';
const apiPath = './api.js';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

request.get({
  url: swaggerPath,
  json: true
}, (e, res, body) => {
  console.log('body',e,body);
  var wxopenSourceCode = CodeGen.getCustomCode({
      className: 'API',
      swagger: body,
      template: {
          class: fs.readFileSync('wxopen.mustache', 'utf-8'),
          method: fs.readFileSync('method2.mustache', 'utf-8')
      }
  });
  fs.writeFileSync(apiPath, wxopenSourceCode);
})

//codegen
// var data = opts.swagger === '2.0' ? getViewForSwagger1(opts, type) : getViewForSwagger2(opts, type);
