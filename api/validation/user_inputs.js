const validator = require("validator");

exports.manager_signup = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      name,
      contactno,
      joineddate,
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(contactno) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s"))) {
      result.message = "Name only needs alpha characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(contactno) &&
      !validator.isLength(contactno, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.manager_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      password,
      repassword,
      name,
      contactno,
      joineddate,
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(contactno) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (password && password !== repassword) {
      result.message = "Passwords not matching";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s"))) {
      result.message = "Name only needs alpha characters";
      result.status = true;
      return result;
    }
    if (password && !validator.isLength(password, { min: 6 })) {
      result.message = "Password must be at least 6 letters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(contactno) &&
      !validator.isLength(contactno, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    console.error(error.stack);
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.admin_signup = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const { email, password, repassword } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (password !== repassword) {
      result.message = "Passwords not matching";
      result.status = true;
      return result;
    }
    if (!validator.isLength(password, { min: 6 })) {
      result.message = "Password must be at least 6 letters";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.login = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const { email, password } = req.body;

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isLength(password, { min: 6 })) {
      result.message = "Password must be at least 6 letters";
      result.status = true;
      return result;
    }
  } catch (error) {
    console.log(error.message);
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.supplier_insert = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      name,
      joineddate,
      address,
      contact
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(contact) ||
      validator.isEmpty(address) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s"))) {
      result.message = "Name only needs characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(contact) &&
      !validator.isLength(contact, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.supplier_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      name,
      joineddate,
      address,
      contact
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(contact) ||
      validator.isEmpty(address) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s"))) {
      result.message = "Name only needs characters";
      result.status = true;
      return result;
    }
    if (
      !validator.isNumeric(contact) &&
      !validator.isLength(contact, { min: 10, max: 10 })
    ) {
      result.message = "Invalid Contact Number";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};


/* exports.supplier_insert = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      name,
      joineddate,
      lane1,
      lane2,
      city,
      district,
      postal_code
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(city) ||
      validator.isEmpty(district) ||
      validator.isEmpty(postal_code) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s")) || !validator.isAlpha(city) || !validator.isAlpha(district)) {
      result.message = "Name , city and district only needs alpha characters";
      result.status = true;
      return result;
    }
    if(!validator.isNumeric(postal_code)){
      result.message = "Postal Code cannot include characters";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
}; */

/* exports.supplier_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      email,
      name,
      joineddate,
      lane1,
      lane2,
      city,
      district,
      postal_code
    } = req.body;

    if (
      validator.isEmpty(email) ||
      validator.isEmpty(name) ||
      validator.isEmpty(city) ||
      validator.isEmpty(district) ||
      validator.isEmpty(postal_code) ||
      validator.isEmpty(joineddate)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isEmail(email)) {
      result.message = "Invalid Email Format";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s")) || !validator.isAlpha(city) || !validator.isAlpha(district)) {
      result.message = "Name only needs alpha characters";
      result.status = true;
      return result;
    }
    if(!validator.isNumeric(postal_code)){
      result.message = "Postal Code cannot include characters";
      result.status = true;
      return result;
    }
    if (!validator.isDate(joineddate)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
}; */

exports.nameInput = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      name
    } = req.body;

    if (
      validator.isEmpty(name)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(name.replace(" ", "s"))) {
      result.message = "Name only needs alpha characters";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.supplyrecord_insert = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      unit_Prize,
      amount,
      type,
      received_date
    } = req.body;

    if (
      validator.isEmpty(unit_Prize) ||
      validator.isEmpty(amount) ||
      validator.isEmpty(type) ||
      validator.isEmpty(received_date)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(type)) {
      result.message = "Type only needs alpha characters";
      result.status = true;
      return result;
    }
    if(!validator.isNumeric(amount) || !validator.isNumeric(unit_Prize)){
      result.message = "Amount and Unit Prize cannot include characters";
      result.status = true;
      return result;
    }
    if (!validator.isDate(received_date)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.supplyrecord_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      unit_Prize,
      amount,
      type,
      received_date
    } = req.body;

    if (
      validator.isEmpty(unit_Prize) ||
      validator.isEmpty(amount) ||
      validator.isEmpty(type) ||
      validator.isEmpty(received_date)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(type)) {
      result.message = "Type only needs alpha characters";
      result.status = true;
      return result;
    }
    if(!validator.isNumeric(amount) || !validator.isNumeric(unit_Prize)){
      result.message = "Amount and Unit Prize cannot include characters";
      result.status = true;
      return result;
    }
    if (!validator.isDate(received_date)) {
      result.message = "Invalid Date";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.storage_insert = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      unit_price,
      stock_amount,
      type,
      unit
    } = req.body;

    if (
      validator.isEmpty(unit_price) ||
      validator.isEmpty(stock_amount) ||
      validator.isEmpty(type) || 
      validator.isEmpty(unit)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isAlpha(type)) {
      result.message = "Type only needs alpha characters";
      result.status = true;
      return result;
    }
    if (!validator.isNumeric(stock_amount) || !validator.isNumeric(unit_Prize)) {
      result.message = "Stock amount and unit price must be a number.";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

exports.storage_update = (req) => {
  result = {
    message: "",
    status: false,
  };

  try {
    const {
      unit_price,
      stock_amount
    } = req.body;

    if (
      validator.isEmpty(unit_price) ||
      validator.isEmpty(stock_amount)
    ) {
      result.message = "Input can't be empty";
      result.status = true;
      return result;
    }
    if (!validator.isNumeric(stock_amount) || !validator.isNumeric(unit_Prize)) {
      result.message = "Stock amount and unit price must be a number.";
      result.status = true;
      return result;
    }
  } catch (error) {
    result.message = "Input validation failed";
    result.status = true;
    return result;
  } finally {
    return result;
  }
};

