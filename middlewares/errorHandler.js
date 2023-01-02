const errorHandler = (err, req, res, next) => {
    let code = 500
    let msg = "Internal Server Error"
    // console.log(err, '<=== error');
    if (err.name == 'SequelizeValidationError'){
        code = 400
        msg = err.errors[0].message
    }

    else if (err.name == "SequelizeUniqueConstraintError"){
        code = 400
        msg = "This Email Already Registered"
    }

    else if (err.name == "Minimum password length must be 5 letter"){
        code = 400
        msg = err.name
    }

    else if (err.name == "Destination already in your favourites"){
        code = 400
        msg = err.name
    }

    else if (err.name == "Destination does not exist"){
        code = 400
        msg = err.name
    }

    else if (err.name == "User status already premium" || err.name == "User status already not premium"){
        code = 400
        msg = err.name
    }

    else if (err.name == "UnknownId"){
        code = 404
        msg = "Data Not Found"
    }

    else if (err.name == "User not found"){
        code = 404
        msg = "User Not Found"
    }

    else if (err.name == "Email is required" || err.name == "Password is required"){
        code = 400
        msg = "Email and Password is Required"
    }

    else if (err.name == "Invalid email or password"){
        code = 401
        msg = "Invalid Email/Password"
    }

    else if (err.name == "InvalidToken" || err.name == "JsonWebTokenError" || err.name == "NoTokenFound" || err.name == "InvalidUser"){
        code = 400
        msg = "Invalid Token/Authentication Failed"
    }

    else if (err.name == "Unauthorized"){
        code = 403
        msg = "You are not authorized"
    }

    console.log(err);
    res.status(code).json({msg})
}

module.exports = errorHandler
