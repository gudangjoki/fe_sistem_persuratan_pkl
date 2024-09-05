import React, { useEffect, useRef, useState } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

const FileUpload = () => {
  const dropzoneRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const previewTemplate = `
    <div class="p-3 bg-white border border-gray-300 border-solid rounded-xl">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-x-3">
          <span class="flex items-center justify-center text-gray-500 border border-gray-200 rounded-lg size-10" data-hs-file-upload-file-icon="">
            <img class="hidden rounded-lg" data-dz-thumbnail="" />
          </span>
          <div>
            <p class="text-sm font-medium text-gray-800">
              <span class="truncate inline-block max-w-[300px] align-bottom" data-dz-name></span>
            </p>
            <p class="text-xs text-gray-500" data-dz-size></p>
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <button type="button" class="text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800" data-dz-remove>
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center gap-x-3 whitespace-nowrap">
        <div class="flex w-full h-2 overflow-hidden bg-gray-200 rounded-full" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar="">
          <div class="flex flex-col justify-center overflow-hidden text-xs text-center text-white transition-all duration-500 bg-blue-600 rounded-full whitespace-nowrap hs-file-upload-complete:bg-green-500" style="width: 0;" data-hs-file-upload-progress-bar-pane=""></div>
        </div>
        <div class="w-10 text-end">
          <span class="text-sm text-gray-800">
            <span data-hs-file-upload-progress-bar-value="">0</span>%
          </span>
        </div>
      </div>
    </div>
  `;

  useEffect(() => {
    if (!Dropzone.instances.length && dropzoneRef.current) {
      const dropzone = new Dropzone(dropzoneRef.current, {
        url: "/upload",
        acceptedFiles: ".pdf",  // Allowed file type
        maxFilesize: 10,  // Max file size in MB
        previewsContainer: "[data-hs-file-upload-previews]",
        clickable: "[data-hs-file-upload-trigger]",
        previewTemplate: previewTemplate,
        init: function () {
          this.on("uploadprogress", function (file, progress) {
            const progressBar = file.previewElement.querySelector("[data-hs-file-upload-progress-bar-pane]");
            const progressValue = file.previewElement.querySelector("[data-hs-file-upload-progress-bar-value]");
            progressBar.style.width = `${progress}%`;
            progressValue.textContent = Math.round(progress);
          });

          this.on("error", function (file, errorMessage) {
            if (file.size > this.options.maxFilesize * 1024 * 1024) {
              setErrorMessage(`Error: File ${file.name} exceeds the size limit of 10MB.`);
              this.removeFile(file);
            }
          });
        },
      });
    }

    return () => {
      Dropzone.instances.forEach((dz) => dz.destroy());
    };
  }, [previewTemplate]);

  return (
    <div>
      <div ref={dropzoneRef} id="my-dropzone" className="hs-file-upload">
        <div className="flex justify-center p-12 bg-white border border-gray-300 border-dashed cursor-pointer rounded-xl" data-hs-file-upload-trigger="">
          <div className="text-center">
            <span className="inline-flex items-center justify-center text-gray-800 bg-gray-100 rounded-full size-16">
              <svg className="shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" x2="12" y1="3" y2="15"></line>
              </svg>
            </span>

            <div className="flex flex-wrap justify-center mt-4 text-sm leading-6 text-gray-600">
              <span className="font-medium text-gray-800 pe-1">
                Drop your file here or
              </span>
              <span className="font-semibold text-blue-600 bg-white rounded-lg hover:text-blue-700 decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">browse</span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Pick a file up to 10MB.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2 empty:mt-0" data-hs-file-upload-previews=""></div>
        {errorMessage && (
          <div className="mt-2 text-red-500">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
