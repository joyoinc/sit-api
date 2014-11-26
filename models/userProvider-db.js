var bcrypt = require("bcrypt")
var mongoskin = require('mongoskin')

var msgs = [
  "auth successfully"
  , "auth failed"
  , "no such user"
]

UserProvider = function(){
  var connStr = 'mongodb://localhost/sampleDB'
  if(GLOBAL.connStr) connStr = GLOBAL.connStr
  this.db = mongoskin.db(connStr, {safe:true})
}

/** Begin
 *  add all function definition here
 */

UserProvider.prototype.resetiUserPasswd= function(obj, callback) {
  callback(null, obj)
}

UserProvider.prototype.addiUser= function(obj, callback) {
  if(obj.login && obj.email && obj.passwd) {
      var salt = bcrypt.genSaltSync()
      obj.passwd = bcrypt.hashSync(obj.passwd, salt)
      this.db.collection('iUser').insert(obj,{},callback)
  } else {
    callback({msg:'login, email and passwd are required'}, obj)
  }
}

UserProvider.prototype.authiUser= function(obj, callback) {
  var errCode = 1
  this.db.collection('iUser').findOne({ $or: [
    { login: obj.login },
    { email: obj.login }
  ]}, function(err, result){
    if(err) callback(err, {errCode:errCode, msg:msgs[errCode]})
    else {
      console.log(result)
      if(result===null)
        errCode = 2
      else {
        var salt = bcrypt.genSaltSync()
        var passwd = bcrypt.hashSync(obj.passwd, salt)
        if(passwd===result.passwd)
          errCode = 0
      }
      callback(null, {errCode:errCode, msg:msgs[errCode]})
    }
  })
}

UserProvider.prototype.iUserList= function(callback) {
  this.db.collection('iUser').find({},{'login':1,'email':1}).toArray(function(err, results) {
    if(err)
      callback(err, results)
    else {
      callback(null, results)
    }
  })
}
/** End */

exports.UserProvider = UserProvider
