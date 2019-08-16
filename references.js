// rather than embedding data, we will store ids in our posts array where each id will correspond to an individual post
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true});

//POST - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
let Post = mongoose.model("Post", postSchema);

//USER - email, name  
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [    //rather than an array of posts it is an array of mongoose object ids belonging to a post
        {
            type:  mongoose.Schema.Types.ObjectId,  //syntax to add object ids
            ref: "Post"
        }
    ] 
});
let User = mongoose.model("User", userSchema);

/*first we will create a post 
* find the user to whom the post will be added to
* Push post into user's posts
* save user 
* print data
*/
// Post.create({  
//    title: "Third post here!",
//    content: "I think this is working :)" 
// }, (err, post) => {
//     User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
//         if (err) {
//             console.log(err);
//         } else {    //add post into user's post
//             foundUser.posts.push(post);
//             foundUser.save((err, data) => { //finally saving to DB
//                 if(err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Davos"
// }, (err, user) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
// now that we have a user and a post in DB. we will connect post and user using id. This was done above

//to find user and to find all posts for that user rather than just seeing ids in DB
User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});
