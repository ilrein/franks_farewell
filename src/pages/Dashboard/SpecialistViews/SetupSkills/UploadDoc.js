import React, { useState } from 'react';
import {
  Message,
  Segment,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';
import uuidv4 from 'uuid/v4';
import fetch from 'isomorphic-fetch';

import DropZone from '../../../../components/DropZone';
import {
  API_UPDATE_USER,
} from '../../../../constants';

const UploadDoc = ({
  skill,
  user,
  token,
  onSuccess,
}) => {
  const { documentsRequired } = skill;
  const [hasUploaded, setHasUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadRequiredDocuments = (files, type) => {
    // console.log(files[0]);
    setUploading(true);
    
    Storage.put(`${type}-${uuidv4()}`, files[0], { level: 'public' })
      .then(async (res) => {
        const body = JSON.stringify({
          user: {
            ...user,
            documentsUploaded: [{
              ...user.documentsUploaded,
              name: type,
              uri: res.key,
            }],
          },
        });
        
        const updateUser = await fetch(API_UPDATE_USER(user._id), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'jwt-token': token,
          },
          body,
        });

        await updateUser.json();

        setUploading(false);
        setHasUploaded(true);
        onSuccess(true);
      })
      .catch(e => console.log(e)); // eslint-disable-line
  };

  return (
    <>
      {
        documentsRequired.map(doc => (
          <div key={doc.name}>
            <Message info>
              <Message.Header>
                Required:&nbsp;
                {doc.name}
              </Message.Header>
              <Message.Content>
                This position requires you to upload documents.
              </Message.Content>
            </Message>
            <Segment
              basic
              loading={uploading}
              style={{ padding: 0 }}
            >
              {
                !hasUploaded
                  ? (
                    <DropZone
                      handleDrop={files => uploadRequiredDocuments(files, doc.name)}
                    />
                  )
                  : (
                    <Message>
                      Successfully uploaded.
                    </Message>
                  )
              }
            </Segment>
          </div>
        ))
      }
    </>
  );
};

UploadDoc.propTypes = {
  skill: PropTypes.shape().isRequired,
  user: PropTypes.shape().isRequired,
  token: PropTypes.string.isRequired,
};

export default UploadDoc;
