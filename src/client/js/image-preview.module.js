"use strict";

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
            alert("Only Image Files are previewed."); // jshint ignore:line
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
