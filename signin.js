const User = require("../../models/User");
const UserSession = require("../../models/UserSession");
const Project = require('../../models/Project');
module.exports = app => {

  /*
   * Sign up
   */
  app.post("/api/account/signup", (req, res, next) => {
    const { body } = req;
    console.log("body", body);
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find(
      {
        email: email
      },
      (err, previousUsers) => {
        if (err) {
          console.log("err000", err);
          return res.status(500).send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousUsers.length > 0) {
          return res.status(400).send({
            success: false,
            message: "Error: Account already exist."
          });
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            console.log("errr111", err);
            return res.status(500).send({
              success: false,
              message: "Error: Server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed up"
          });
        });
      }
    );
  });

  /*
   * Sign in
   */
  app.post("/api/account/signin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find(
      {
        email: email
      },
      (err, users) => {
        if (err) {
          console.log("err 2:", err);
          return res.status(500).send({
            success: false,
            message: "Error: server error"
          });
        }
        if (users.length != 1) {
          return res.status(400).send({
            success: false,
            message: "Error: Invalid"
          });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
          return res.status(401).send({
            success: false,
            message: "Error: Invalid"
          });
        }
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).send({
              success: false,
              message: "Error: server error"
            });
          }
          return res.send({
            success: true,
            message: "Valid sign in",
            token: doc._id
          });
        });
      }
    );
  });
  /*
  Log-out
  */
  app.get("/api/account/logout", (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: {
          isDeleted: true
        }
      },
      null,
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            success: false,
            message: "Error: Server error"
          });
        }
        return res.status(200).send({
          success: true,
          message: "Good"
        });
      }
    );
  });
  /*
  Verify
  */
 app.get('/api/account/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.status(200).send({
          success: true,
          message: 'Good'
        });
      }
    });
  });
  /*
  Project Selection
  */
 app.post('/api/account/projects', (req, res, next) => {
   let {taskName, project, startDate, endDate} = req.body;
   if(!taskName || !project || !startDate || !endDate) {
     res.status(400).send('bad request , missing required fields');
   }
   startDate = new Date(startDate);
   endDate = new Date(endDate);

   const newProject = new Project();
   newProject.taskName = taskName;
   newProject.project = project;
   newProject.startDate = startDate;
   newProject.endDate = endDate;
   newProject.save((err, project) => {
     if (err) {
       console.log("errr111", err);
       return res.status(500).send({
         success: false,
         message: "Error: database error on saving"
       });
     }
     return res.send({
       success: true,
       message: "taskCreated",
       data: project
     });
   });
 })
};
