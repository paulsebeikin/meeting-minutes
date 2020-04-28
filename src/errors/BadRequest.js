module.exports = function BadRequest(message, errorCode) {

    Error.captureStackTrace(this, this.constructor);
    
    this.name = 'BadRequest';
    this.errors = [{

      message : message || 'Bad Request',
      statusCode : 400,
      errorCode : errorCode || 400
    }]
  };