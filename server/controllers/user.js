import usersTable from '../db/usersTable';


class Usercontroller {
  static createAccount(req, res) {
    const account = {
      id: usersTable.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    usersTable.push(account);
    return res.status(201)
      .json({
        status: '201',
        message: ' Account created successfully',
        data: account,
      });
  }
}


export default Usercontroller;
