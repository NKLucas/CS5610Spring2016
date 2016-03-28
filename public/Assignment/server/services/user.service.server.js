/**
 * Created by Zhiyu on 3/26/16.
 */
module.exports = function(app, userModel){
    app.post("/api/assignment/user", createUser);
    //app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user", findUserFromUsername);
    app.get("/api/assignment/user", login);
    app.put("/api/assignment/user/:id", updateById);
    app.delete("/api/assignment/user/:id", deleteById);

    function createUser(req, res){
        var user = req.body;
        var new_user = userModel.create(user);
        res.json(new_user);
    }

    function findAllUsers(req, res){
        var users = userModel.findAll();
        res.json(users);
        //userModel
        //    .findAll()
        //    .then(function(users){
        //        res.json(users);
        //    });
    }

    function findUserById(req, res){
        var id = req.params.id;
        var user = userModel.findById(id);
        res.json(user);
        //userModel
        //    .findById(id)
        //    .then(function(user){
        //       res.json(user);
        //    });
    }

    function findUserFromUsername(req, res){

        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
        //userModel
        //    .findUserByUsername(username)
        //    .then(function(user){
        //       res.json(user);
        //    });
    }

    function login(req, res){
        var username = req.query.username;
        var password = req.query.password;
        var credential = {
            username:username,
            password:password
        };
        var user = userModel.findUserByCredentials(credential);
        res.json(user);
        //userModel
        //    .findUserByCredentials(credential)
        //    .then(function(user){
        //        res.json(user);
        //    });
    }

    function updateById(req, res){
        var id = req.params.id;
        var user = req.body;
        var updatedUser = userModel.update(id, user);
        res.json(updatedUser);
        //userModel
        //    .update(id, user)
        //    .then(function(updatedUser){
        //        res.json(updatedUser);
        //    });
    }

    function deleteById(req, res){
        var id = req.params.id;
        var users = userModel.remove(id);
        res.json(users);
        //userModel
        //    .remove(id)
        //    .then(function(users){
        //        res.json(users);
        //    });
    }


};