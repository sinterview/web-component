"use strict";

(function ModalDialogIIFE(global) {
    var webComponentAPI = global.webComponentAPI || {};


    var buildModal = function buildModalFn() {
        var content, contentHolder,
        docFragment = document.createDocumentFragment();

        if (typeof this.options.content === "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // Modal Element
        this.modal = document.createElement("div");
        this.modal.className = "modal-dialog " + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + "px";

        // Close Button on Modal Dialog
        if (this.options.closeButton) {
            this.closeButton = document.createElement("button");
            this.closeButton.className = "modal-close close-button";
            this.closeButton.innerHTML = "x";
            this.modal.appendChild(this.closeButton);
        }

        contentHolder = document.createElement("div");
        contentHolder.className = "modal-content";
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);


        // Display Overlay
        if (this.options.overlay) {
            this.overlay = document.createElement("div");
            this.overlay.className = "modal-overlay " + this.options.className;
            docFragment.appendChild(this.overlay);
        }

        docFragment.appendChild(this.modal);
        var modalDialogParent = document.getElementById(
                this.options.modalDialogParentId);
        modalDialogParent.appendChild(docFragment);
        modalDialogParent.dispatchEvent(webComponentAPI
                .ModalDialogEvents.ModalOpenEvent);
    };

    var registerEvents = function registerEventsFn() {
        if (this.closeButton) {
            this.closeButton.addEventListener("click", this.close.bind(this));
        }

        if (this.overlay) {
            this.overlay.addEventListener("click", this.close.bind(this));
        }
    };

    var ModalDialogBox = {
        init: function initFn(configObj) {
            var defaultConfig = {
                modalDialogParentId: "modal-dialog",
                className: "simple-modal",
                closeButton: true,
                content: "Hello-Modal",
                minWidth: 300,
                overlay: true
            };

            if (configObj && (typeof configObj === "object")) {
                for (var property in configObj) {
                    if (configObj.hasOwnProperty(property)) {
                        defaultConfig[property] = configObj[property];
                    }
                }
            }

            this.options = defaultConfig;
            this.modal = null;
            this.overlay = null;
            this.closeButton = null;
            this.modalOpen = false;
        },

        open: function openFn() {
            if (this.modalOpen) {
                return;
            }

            buildModal.call(this);
            registerEvents.call(this);

            window.getComputedStyle(this.modal).height; // jshint ignore:line

            this.modal.className = this.modal.className + " modal-open";
            this.overlay.className = this.overlay.className + " overlay-open";
            this.modalOpen = true;
        },

        close: function closeFn() {
            this.modal.className = this.modal.className
                    .replace(" modal-open", "");
            this.overlay.className = this.overlay.className
                    .replace(" overlay-open", "");

            var modalHolder = document.getElementById(
                    this.options.modalDialogParentId);
            modalHolder.innerHTML = "";
            modalHolder.dispatchEvent(webComponentAPI
                    .ModalDialogEvents.ModalCloseEvent);

            this.modalOpen = false;
        }
    };


    webComponentAPI
            .createModalDialogBox = function createModalDialogBox(configObj) {
        var modalDialogBox = Object.create(ModalDialogBox);
        modalDialogBox.init(configObj);

        return modalDialogBox;
    };

    global.webComponentAPI = webComponentAPI;
})(window);
