"use strict";

(function ModalDialogEventsIIFE(global) {
    var webComponentAPI = global.webComponentAPI || {};


    var ModalOpenEvent = new CustomEvent("ModalOpen", {
        detail: {
            message: "Modal Dialog Open",
            time: new Date()
        },
        bubbles: true,
        cancelable: true
    });

    var ModalCloseEvent = new CustomEvent("ModalClose", {
        detail: {
            message: "Modal Dialog Close",
            time: new Date()
        },
        bubbles: true,
        cancelable: true
    });

    var ModalDialogEvents = {
        ModalOpenEvent: ModalOpenEvent,
        ModalCloseEvent: ModalCloseEvent
    };

    webComponentAPI.ModalDialogEvents = ModalDialogEvents;
    global.webComponentAPI = webComponentAPI;
})(window);
