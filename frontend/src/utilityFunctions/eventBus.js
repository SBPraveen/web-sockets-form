const eventBus = {
    subscribeToEvent(eventName, callback) {
      document.addEventListener(eventName, (e) => callback(e.detail));
    },
    publishMessage(data) {
        const {eventName} = data
        //Note CustomEvent accepts the second argument in the {detail:<Object>} format. No other format will be accepted
      document.dispatchEvent(new CustomEvent(eventName, {detail:data}));
    },
    removeEventSubscription(eventName, callback) {
      document.removeEventListener(eventName, callback);
    },
  };
export default eventBus;
