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

LeaderBoard.prototype.removeUser = function(username) {
  client.zrem(this.key, username, function(err, replies) {
    console.log("User", username, "remove successfully!");
  });
};

LeaderBoard.prototype.getUserScoreAndRank = function(username) {
  var leaderboardKey = this.key;
  client.zscore(leaderboardKey, username, function(err, zscoreReply) {
    clieint.zrevrank(leaderboardKey, username, function(
      err, zreverankReply) {
      console.log("\nDetails of " + username + ":");
      console.log("Score: ", zscoreReply + ", Rank: #" + (zreverankReply + 1));
    });
  });
};

LeaderBoard.prototype.showTopUsers = function(quantity) {
  client.zrevrange([this.key, 0, quantity - 1, "WITHSCORES"],
                   function(err,
                            reply) {
                     console.log("\nTop", quantity, "users:");
                     for (var i = 0, rank = 1; i < reply.length; i += 2, rank++) {
                       console.log("#" + rank, "User: " + reply[i] + ", score:", reply[i+1]);
                     }
                   });
}

var leaderBoard = new LeaderBoard("game-score");
LeaderBoard.addUser("Arthur", 70);
LeaderBoard.addUser("KC", 20);
LeaderBoard.addUser("Maxwell", 10);
LeaderBoard.addUser("Patrik", 70);
