const eventBus = {
    subscribeToEvent(eventName, callback) {
        console.log("subscribeToEvent", eventName);

      document.addEventListener(eventName, (e) => callback(e.detail));
    },
    publishMessage(data) {
        const {eventName} = data
        console.log("publishMessage", eventName, data);
      document.dispatchEvent(new CustomEvent(eventName, {detail:data}));
    },
    removeEventSubscription(eventName, callback) {
      document.removeEventListener(eventName, callback);
    },
  };
export default eventBus;
