const mongoose = require('mongoose');
const Task = require('./../models/task');
mongoose.Promise = global.Promise;

// route logic
module.exports.create_new_task = (req, res, next) => {
    const new_task = new Task({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description
    });
    new_task
    .save()
    .then(result => {
      console.log(new_task);
      console.log(result);
      res.status(201).json({
        message: "created task successfully",
        createdTask: {
          _id: result.id,
          title: result.title,
          description: result.description,
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });
  };

  module.exports.get_one_task = (req, res, next) => {
    const id = req.params.taskId;
    Task.findOne({_id: id})
    .select("title description completed created_at updated_at _id")
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc) {
      res.status(200).json({doc: doc});
    } else {
      res.status(404).json({message: "id not found"});
    }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
  };


  module.exports.show_all = (req, res, next) => {
    Task.find({})
    .select("title description completed created_at updated_at _id")
    .exec()
    .then(docs => {
      console.log(docs);
      const response = {
        count: docs.length,
        my_tasks: docs.map(doc => {
          return {
            title: doc.title,
            description: doc.description,
            _id: doc.id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    })
  };


  module.exports.update_task = (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Task.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Task updated",
        result: updateOps
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  };

  module.exports.delete_task = (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({_id: id})
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "task successfully deleted",
        result: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  };
