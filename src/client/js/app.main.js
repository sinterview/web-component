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
        document.getElementById(this.options.modalDialogParentId)
                .appendChild(docFragment);
        //document.body.appendChild(docFragment);
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


(function ImagePreviewIIFE(global) {
    var webComponentAPI = global.webComponentAPI || {};


    var ImagePreviewComponent = {
        init: function initFn(configObj) {
            if (!window.File || !window.FileList || !window.FileReader) {
                throw new Error("File Drag and Drop not Supported"
                        + " in this browser.");
            }

            var defaultConfig = {
                fileDragDropId: "filedragdrop",
                imageHolderId: "preview-image"
            };

            if (configObj && (typeof configObj === "object")) {
                for (var property in configObj) {
                    if (configObj.hasOwnProperty(property)) {
                        defaultConfig[property] = configObj[property];
                    }
                }
            }

            this.options = defaultConfig;
            this.configureDragDropElement();
        },

        configureDragDropElement: function configureDragDropElementFn() {
            var dragDropElement = document.getElementById(
                    this.options.fileDragDropId);

            dragDropElement.addEventListener("dragover",
                    function dragOverventHandler(event) {
                        this.fileDragHandler(event);
                    }.bind(this),
                    false);

            dragDropElement.addEventListener("dragleave",
                    function dragLeaveEventHandler(event) {
                        this.fileDragHandler(event);
                    }.bind(this),
                    false);

            dragDropElement.addEventListener("drop",
                    function dropEventHander(event) {
                        this.fileSelectHandler(event);
                    }.bind(this),
                    false);
            dragDropElement.style.display = "block";
        },

        fileDragHandler: function fileDragHandlerFn(event) {
            event.stopPropagation();
            event.preventDefault();
            event.target.className = "";

            if (event.type === "dragover") {
                event.target.className = "hover";
            }
        },

        fileSelectHandler: function fileSelectHandlerFn(event) {
            this.fileDragHandler(event);

            var uploadedFiles = event.target.files
                    || event.dataTransfer.files;

            for (var filesIndex = 0;
                    filesIndex < uploadedFiles.length;
                    filesIndex++) {
                this.parseFiles(uploadedFiles[filesIndex]);
            }
        },

        parseFiles: function parseFilesFn(file) {
            var imageType = /^image\//;

            if (imageType.test(file.type)) {
                this.renderImageFile(file);
                return;
            }

            console.log("Only Image Files are previewed.");
        },

        renderImageFile: function renderImageFileFn(fileObj) {
            if (fileObj) {
                var reader = new FileReader();

                reader.onload = function readerOnLoadFn(event) {
                    var imageHolder = document.createElement("div");
                    imageHolder.className = "image-previewer";
                    var imageContent = document.createElement("img");
                    imageContent.setAttribute("alt", "uploaded image");
                    imageContent.setAttribute("src", event.target.result);

                    imageHolder.appendChild(imageContent);
                    document.getElementById(this.options.imageHolderId)
                            .appendChild(imageHolder);
                }.bind(this);

                reader.readAsDataURL(fileObj);
            }
        }
    };


    webComponentAPI.createImagePreviewComponent
            = function createImagePreviewComponentFn(configObj) {
        var imagePreviewComponent = Object.create(ImagePreviewComponent);
        imagePreviewComponent.init(configObj);

        return imagePreviewComponent;
    };

    global.webComponentAPI = webComponentAPI;
})(window);
