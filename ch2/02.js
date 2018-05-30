var redis = require("redis")
var client = redis.createClient()

function LeaderBoard(key) {
  this.key = key;
}


LeaderBoard.prototype.addUser = function(username, score) {
  client.zadd([this.key, score, username], function(err, replies) {
    console.log("User", username, "added to the leaderboard!")
  });
};


var leaderBoard = new LeaderBoard("game-score");
LeaderBoard.addUser("Patrik", 70);
