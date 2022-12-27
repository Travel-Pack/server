const errorHandler = (err, req, res, next) => {
    let code = 500
    let msg = "Internal Server Error"

    if (err.name == 'SequelizeValidationError'){
        code = 400
        msg = err.errors[0].message
    }
    if (err.name == "SequelizeUniqueConstraintError"){
        code = 400
        msg = "This Email Already Registered"
    }

    if (err.name == "UnknownId"){
        code = 404
        msg = "Data Not Found"
    }

    if (err.name == "User not found"){
        code = 404
        msg = "User Not Found"
    }

    if (err.name == "Email is required" || err.name == "Password is required"){
        code = 400
        msg = "Username/Email and Password is Required"
    }

    if (err.name == "Invalid email or password"){
        code = 400
        msg = "Invalid Username/Email/Password"
    }

    if (err.name == "InvalidToken" || err.name == "JsonWebTokenError" || err.name == "NoTokenFound" || err.name == "InvalidUser"){
        code = 400
        msg = "Invalid Token/Authentication Failed"
    }
    
    if (err.name == "Unauthorized"){
        code = 403
        msg = "You are not authorized"
    }
    
    console.log(err);
    res.status(code).json({msg})
}

module.exports = errorHandler