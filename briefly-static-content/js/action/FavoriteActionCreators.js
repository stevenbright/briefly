//var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
//var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
//var ChatMessageUtils = require('../utils/ChatMessageUtils');

var AppConstants = require('../util/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  set: function(itemId, itemType, isFavorite) {
    console.log("Item " + itemType + "/" + itemId + " " +
      (isFavorite ? "marked" : "unmarked") + " as favorite")
//    ChatAppDispatcher.dispatch({
//      type: ActionTypes.CREATE_MESSAGE,
//      text: text,
//      currentThreadID: currentThreadID
//    });
//    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
//    ChatWebAPIUtils.createMessage(message);
  }

};
