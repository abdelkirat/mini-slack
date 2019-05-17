const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Messages = require('../../models/Message');
/**
 * @route   GET api/messages
 * @desc    Get all messages
 * @access  public
 */
router.get('/', (req, res, next) => {
  Messages.find({ isDeleted: false })
    .sort({ createdAt: 1 })
    .then(messages => res.json(messages));
});

/**
 * @route   POST api/messages
 * @desc    Add new message
 * @access  private
 */
router.post('/', auth, (req, res, next) => {
  console.log(req.body);
  const newMessage = new Messages({
    user: req.body.user,
    message: req.body.message
  });

  newMessage.save().then(message => res.json(message));
});

/**
 * @route   PUT api/messages
 * @desc    Update message
 * @access  public
 */
router.put('/:id', auth, (req, res, next) => {
  Messages.findById(req.params.id)
    .then(message => {
      message.message = req.body.message;
      message.isEdited = true;

      message.save().then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
    });
});

/**
 * @route   DELETE api/messages
 * @desc    Delete one message
 * @access  public
 */
router.delete('/:id', auth, (req, res, next) => {
  Messages.findById(req.params.id)
    .then(message => {
      message.isDeleted = true;

      message.save().then(() => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }));
    });
});

module.exports = router;
