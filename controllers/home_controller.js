module.exports.home = function (req, res) {
  const apis = [
    {
      verb: "POST",
      token: "N",
      endpoint: "/api/users/signup",
      action: "To sign up a new user account",
    },
    {
      verb: "POST",
      token: "N",
      endpoint: "/api/users/signin",
      action: "To sign in an existing user account",
    },
    {
      verb: "POST",
      token: "Y",
      endpoint: "/api/posts/create",
      action: "To create blog post",
    },
    {
      verb: "POST",
      token: "Y",
      endpoint: "/api/posts/update",
      action: "To update existing blog post",
    },
    {
      verb: "GET",
      token: "Y",
      endpoint: "/api/posts/delete/:id",
      action: "To delete particular post",
    },
    {
      verb: "GET",
      token: "N",
      endpoint: "/api/posts",
      action: "To fetch all posts",
    },
    {
      verb: "GET",
      token: "N",
      endpoint: "/api/posts/search/:tagName",
      action: "To search posts with associated tagName",
    },
    {
      verb: "GET",
      token: "N",
      endpoint: "/api/posts/filter",
      action: "To filter posts on various criteria",
    },
    {
      verb: "POST",
      token: "Y",
      endpoint: "/api/tags/create",
      action: "To create tag associated with post",
    },
    {
      verb: "POST",
      token: "Y",
      endpoint: "/api/tags/update",
      action: "To update existing tag",
    },
    {
      verb: "GET",
      token: "Y",
      endpoint: "/api/tags/delete/:id",
      action: "To delete particular tag",
    },
  ];

  res.render("home", {
    apis: apis,
  });
};
