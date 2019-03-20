import React from 'react';

import DropZone from '../../../../components/DropZone';

const UploadDoc = ({ skill }) => {
  const { documentsRequired } = skill;

  const uploadRequiredDocuments = () => {
    console.log('uplaoding..'); // eslint-disable-line
  };

  return (
    <>
      {
        documentsRequired.map(doc => (
          <div key={doc.name}>
            <DropZone
              handleDrop={files => console.log(files)}
            />
          </div>
        ))
      }
    </>
  );
};

export default UploadDoc;
