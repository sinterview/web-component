"use strict";

(function(global) {
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
        //this.modal.style.maxWidth = this.options.maxWidth + "px";

        // Cloase Button on Modal Dialog
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
        document.body.appendChild(docFragment);
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
                className: "fade-and-drop",
                closeButton: true,
                content: "Hello-Modal",
                minWidth: 280,
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

            window.getComputedStyle(this.modal).height;

            this.modal.className = this.modal.className + " modal-open";
            this.overlay.className = this.overlay.className + " overlay-open";
            this.modalOpen = true;
        },

        close: function closeFn() {
            this.modal.className = this.modal.className.replace(" modal-open", "");
            this.overlay.className = this.overlay.className.replace(" overlay-open", "");
            this.modalOpen = false;
        }
    };


    global.modalDialogBox = (function setupModalDialog() {
        var modalDialogBox = Object.create(ModalDialogBox);
        modalDialogBox.init();

        return modalDialogBox;
    })();
})(window);
