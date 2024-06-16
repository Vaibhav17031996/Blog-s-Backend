const mongoose = require("mongoose");

function connectMongo() {
  mongoose
    .connect("mongodb://localhost/prod1")
    .then((mongooseInstance) => {
      console.log("prod1 db succesfully connected");
      // console.log(mongooseInstance);
    })
    .catch((err) => {
      console.log("error connecting the database", err);
      process.exit(1); //this exit takes in the parameter called as 'code'-> 2 major codes -> 0 & 1(mostly used) -> this "process" is the part of Node, not of the dotenv
      // 1 means -> we are intentionaly exiting our node / we are intentionaly terminating our node due to some major failure or error
    });
}
module.exports = connectMongo;

/* after the mogno code has landed in catch what will happen to the node server 
    options are =>
    1) it will continue working
    2) it will stop working 
    3) it will keep on working with problems 
    4) none of the above 

    Correct ans is => 3) it will keep on working with problems. (But at that point Node server is totally irrelevant. Because nowadays everything runs on database.)

    Why => so that website chalti rahe agar dataserver crash ho jaye bhi to. ->
    That means if a query did not work, in that situation my server should be up and running. It should not block our other users. But at that point Node server is totally irrelevant. Because nowadays everything runs on database. 

    So how to stop the node? => Using process (Check line 12)

    1000 users -> other users 
        1001 -> signup -> it failed -> 

    database itself is not connected -> At that point Node server is totally irrelevant.
*/
