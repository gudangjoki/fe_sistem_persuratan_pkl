import React, { useEffect, useRef, useState } from 'react';
import 'dropzone/dist/dropzone.css';
import { useLetter } from '../hooks/useLetter';

/* eslint-disable react/prop-types */
const FileDownload = (props) => {
  const { letterPath } = props;
  const dropzoneRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { letterData } = useLetter();

  const previewTemplate = `
    <div class="p-3 bg-white border border-gray-300 border-solid rounded-xl">
      <div class="flex items-center justify-between mb-1">
        <div class="flex items-center gap-x-3">
          <span class="flex items-center justify-center text-gray-500 border border-gray-200 rounded-lg size-10">
            <img class="hidden rounded-lg" data-dz-thumbnail="" />
          </span>
          <div>
            <p class="text-sm font-medium text-gray-800">
              <span class="truncate inline-block max-w-[300px] align-bottom" data-dz-name>${letterData?.file_name || 'No file available'}</span>
            </p>
            <p class="text-xs text-gray-500" data-dz-size></p>
          </div>
        </div>
        <div class="flex items-center gap-x-2">
          <a href="${`http://localhost:8000${letterPath}`}" download class="flex items-center gap-x-2 text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 whitespace-nowrap dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
            <span class="ml-1">Download</span>
          </a>
        </div>
      </div>
    </div>
  `;

  useEffect(() => {
    if (dropzoneRef.current) {
      // Display the file download template
      dropzoneRef.current.innerHTML = previewTemplate;
    }
  }, [previewTemplate]);

  return (
    <div>
      <div ref={dropzoneRef} id="my-dropzone" className="hs-file-upload">
        <div className="flex justify-center p-12 bg-white border border-gray-300 border-dashed rounded-xl">
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
                File available for download
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              You can download the available file.
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

export default FileDownload;
