import React from 'react';

const UploadDoc = ({ skill }) => {
  const { documentsRequired } = skill;

  const uploadRequiredDocuments = () => {
    console.log('uplaoding..'); // eslint-disable-line
  };

  return (
    <div>
      {
        documentsRequired.map(doc => (
          <div key={doc.name}>
            {doc.name}
          </div>
        ))
      }
    </div>
  );
};

export default UploadDoc;
