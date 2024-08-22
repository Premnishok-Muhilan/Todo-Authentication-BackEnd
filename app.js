//used to import the Express module
const express = require("express");

/*import todoRouter
Router Module: The todoRoutes module is expected to export an Express router object.
An Express router is a subset of the Express application that can handle routes and
middleware.
Purpose: By importing this router, you can modularize your route definitions,
making your code more organized and maintainable.
*/
const todoRouter = require("./routes/todoRoutes");

//import the requestLogger
const requestLogger = require("./utils/logger");

/*imports the Todo model
The const keyword indicates that once the Todo variable is assigned a value,
it cannot be reassigned to a different value. However, the properties of the
object assigned to Todo can still be modified.
*/
const Todo = require("./models/todo");

/*
express() is a function provided by the Express library.
When you call this function, it creates and returns an instance
of an Express application.
The express() function initializes a new application object that
provides various methods for handling HTTP requests and configuring
the web server.
*/
const app = express();

/*
The line app.use(express.json()); is used in an Express.js application
to set up middleware that automatically parses incoming JSON request bodies.

app.use() is a method provided by the Express application object (app) to
register middleware functions. Middleware functions are functions that have
access to the request (req), response (res), and the next middleware function
in the application’s request-response cycle.

express.json() is a built-in middleware function provided by Express that
parses incoming requests with JSON payloads.

Parsing JSON:
When a client sends a request with a Content-Type header set to application/json,
express.json() will automatically parse the JSON data in the request body.
After parsing, the resulting JavaScript object is available in req.body. 
This allows you to easily access and work with the data sent in the request.

Simplifies handling and processing of JSON data sent in HTTP requests, making it easier to build APIs
and handle incoming data in a structured way.
*/
//app.use(express.json()): Registers middleware that parses JSON request bodies.

app.use(express.json());

app.use(requestLogger);

//Define route handler
//Avoiding this would result in "Cannot GET /" error
/*
This is a method provided by the Express application object (app).
It is used to define a route that responds to HTTP GET requests.
The method takes two arguments:
  1.Route Path: The first argument specifies the URL path that this route will handle.
    In this case, "/" indicates the root path of the application.
  2.Callback Function: The second argument is a callback function that will be executed
    whenever a GET request is made to the specified path. 
    This function takes two parameters:
        1.request: An object representing the incoming request.
          It contains information about the request, such as query parameters,
          headers, and the request body.
        2.response: An object used to send a response back to the client.
          It provides methods to send data, set response headers, and manage the
          response status.
*/
app.get("/", (request, response) => {
  /*
  response.send(): This method sends a response to the client.
  It can be used to send a variety of data types, including strings,
  JSON objects, HTML, and more.
  Data Sent: In this case, the method sends the string "Hello using express JS" as
  the response body to the client. This will be displayed in the client’s web browser
  or received by the client making the HTTP request.
  */
  response.send("Hello using experss JS");
});

//To use router from todoRoutes.js
/*
app.use() is a method provided by the Express application object (app) to
register middleware functions.
Path: The first argument specifies the URL path prefix that the middleware
or router should handle.
Middleware/Router: The second argument is the middleware function or router
object that should be used for requests to the specified path.
Path Prefix: This string specifies the path prefix that will be used to match
incoming requests. In this case, it means that any request starting with
/api/v1/todos will be handled by the todoRouter.

todoRouter:
    Router Object: This is an instance of an Express router that you have imported
    from another module (e.g., ./routes/todoRoutes). It contains route definitions
    and middleware specific to handling requests related to todos.
    Functionality: The todoRouter is set up to handle requests to various endpoints
    under the /api/v1/todos path.

When you use app.use("/api/v1/todos", todoRouter);, Express will:
    Match Requests: Check if the incoming request URL starts with /api/v1/todos.
    Delegate Handling: Route the request to the todoRouter, which contains
       the route handlers for specific operations related to todos.

What Happens with This Setup
  Request to /api/v1/todos/: Will be handled by the route router.get('/') in todoRouter.
  Request to /api/v1/todos/123: Will be handled by the route router.get('/:id') in todoRouter, where 123 is the id parameter.
  Request to /api/v1/todos with POST method: Will be handled by the route router.post('/') in todoRouter.
*/
app.use("/api/v1/todos", todoRouter);

//sample post request which sends the request body as response
// app.post("/api/v1/todos", async (req, res) => {
//   try {
//     console.log(req.body);
//     res.send(req.body);
//   } catch {
//     res.status(500).send({ message: error.message });
//   }
// });

//Moved to todoRoutes.js
// app.post("/api/v1/todos", async (req, res) => {
//   try {
//     // get the description from the request body
//     const { description } = req.body;

//     // create a new todo
//     const newTodo = new Todo({
//       description,
//     });

//     // save the todo to the database
//     const savedTodo = await newTodo.save();

//     // send the saved todo as a response
//     res.send({ message: "Todo created successfully", todo: savedTodo });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

/*
When you use module.exports = app, you are telling Node.js to export the app instance
from the current module (usually a file).
This means that when another file requires this module, it will receive the app object.
*/
module.exports = app;
