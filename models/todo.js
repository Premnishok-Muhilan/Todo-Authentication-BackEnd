const mongoose = require("mongoose");

//define a schema
/*
Defines a Mongoose schema for a todo item in a MongoDB database using Mongoose,
which is an Object Data Modeling (ODM) library for MongoDB and Node.js.
Inside the mongoose.Schema constructor, you pass an object where each key
corresponds to a field in the MongoDB document and the associated value
defines the field’s schema
*/
const todoSchema = new mongoose.Schema({
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


/*
Create a model and export it
SYNTAX:
mongoose.model(name_of_model,schema,collection_name);

This is a method provided by Mongoose that creates a model from a schema.

WHAT IS A MODEL?
A model is a constructor function that you use to create and interact with documents
in a MongoDB collection. It essentially acts as an interface to the MongoDB collection.

"Todo": This is the name of the model. When you use mongoose.model(), the first argument
is a string that represents the name of the model. In this case, "Todo" is the name of the
model. Mongoose automatically pluralizes and capitalizes this name to determine the name of
the MongoDB collection. For example, the model name "Todo" will correspond to the todos collection in MongoDB.

todoSchema: This is the schema you defined earlier. It specifies the structure and rules
for the documents in the collection.This schema dictates how data should be stored and
validated in the todos collection.

"todos": This is the optional third argument you pass to mongoose.model(), and it specifies
the name of the MongoDB collection to use. By default, Mongoose pluralizes the model name
and uses it as the collection name. For instance, the model "Todo" would correspond to 
the todos collection. However, by explicitly providing "todos" as the third argument, you 
are specifying that the model should use the todos collection in MongoDB. If you omit this
argument, Mongoose would automatically determine the collection name based on the model name.


module.exports: This is a Node.js feature used to export functions, objects, or other
values from a module so they can be required and used in other files. 
By assigning mongoose.model("Todo", todoSchema, "todos") to module.exports, you make
the Mongoose model available for import in other parts of your application.
*/
module.exports = mongoose.model("Todo", todoSchema, "todos");
