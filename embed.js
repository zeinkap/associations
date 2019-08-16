//we will create a one to many relationship between user and posts
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true});

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
    posts: [postSchema] //array of posts inside user. schema is written rather than model. Now posts is associated to userschema
});
let User = mongoose.model("User", userSchema);

// //to verify our User model works, lets create and add a new user
// let newUser = new User({
//     email: "jannet.jackson@gmail.com",
//     name: "Jannet Jackson"
// });
// //embedding posts data to newUser
// newUser.posts.push({
//     title: "How to brew extreme tomato juice",
//     content: "This is like a super elixir potion. Use very cautiously."
// });
//now save to mongodb
// newUser.save((err, user) => {    
//     if(err) {
//         console.log("There is an error with user!");
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

//to verify our Post model works...
// let newPost = new Post({
//     title: "First Post",
//     content: "This whole thing is beginning to look so much more magnificent!"
// });

// newPost.save((err, post) => {
//     if(err) {
//         console.log("There is an error with post!");
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

//adding more posts
User.findOne({name: "Jannet Jackson"}, (err, user) => {
    if(err) {
        //console.log(err);
    } else {
        user.posts.push({
            title: "The Red Room",
            content: "In this short story, a white tire bodied, black stretched silky woman sucks in little boys"
        });
        user.save((err, user) => {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});
