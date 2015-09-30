"use strict";

(function iife(global) {
    var webComponentAPI = global.webComponentAPI;


    var modalParentElement = document.getElementById("modal-dialog");
    var openDialogButton = document.getElementById("open-dialog-button");

    modalParentElement.addEventListener("ModalOpen", function() {
        webComponentAPI.createImagePreviewComponent();
    }, false);

    modalParentElement.addEventListener("ModalClose", function() {
        console.log("Modal Dialog Box Closed.");
    }, false);


    var modalDialogBox = webComponentAPI.createModalDialogBox({
        modalDialogParentId: "modal-dialog",
        className: "simple-modal",
        closeButton: true,
        content: "<div id='image-upload'>"
                + "<form id='upload' method='POST'>"
                + "<div><div id='filedragdrop'>Drop Files Here</div>"
                + "</div></form><div id='preview-image'></div></div>",
        minWidth: 500,
        overlay: true
    });

    openDialogButton.addEventListener("click", function() {
        modalDialogBox.open();
    }, false);


    webComponentAPI.modalDialogBox = modalDialogBox;
})(window);
