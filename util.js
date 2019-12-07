import jwt from 'jsonwebtoken';

// data match - json form 통일
const successTrue = function(data){
  return {
    success: true,
    message: null,
    errors: null,
    data: data
  };
};

// data miss - json form 통일
const successFalse = function(err, message){
  if(!err && !message) message = 'data not found';
  return {
    success: false,
    message: message,
    errors: (err)? parseError(err): null,
    data: null
  };
};

// error form 통일
const parseError = function(errors){
  let parsed = {};
  if(errors.name == 'ValidationError'){
    for(let name in errors.errors){
      let validationError = errors.errors[name];
      parsed[name] = { message: validationError.message };
    }
  } else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0) {
    parsed.username = { message:'This username already exists!' };
  } else {
    parsed.unhandled = errors;
  }
  return parsed;
};


// middlewares - jwt 가 있는지 확인
const isSigned = function(req, res, next){
  let token = req.headers['x-access-token'];
  if (!token) return res.json(successFalse(null, 'token is required!'));
  else {
    jwt.verify(token, res.app.get('jwt-secret'), function(err, decoded) {
      if(err) return res.json(successFalse(err));
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
};

export {successTrue, successFalse, parseError, isSigned};
