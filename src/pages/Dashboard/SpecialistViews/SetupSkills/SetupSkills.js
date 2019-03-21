import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  Message,
  Button,
} from 'semantic-ui-react';
import fetch from 'isomorphic-fetch';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import {
  API_UPDATE_USER,
  CAPTURE_USER,
} from '../../../../constants';
import UploadDoc from './UploadDoc';

const formatSkillsets = docs => docs.map(doc => ({
  key: doc._id,
  value: doc._id,
  text: `${doc.title}`,
}));

const SetupSkills = ({
  user,
  cognitoUser,
  skillsets,
  captureUser,
}) => {
  const [jwtToken] = useState(cognitoUser.signInUserSession.accessToken.jwtToken);

  const [skill, setSkill] = useState(null);
  const [saving, setSaving] = useState(null);
  const [uploadedDocsForSkillset, setUploadedDocsForSkillset] = useState(false);

  const save = async () => {
    setSaving(true);
    const { _id, title, payrate } = skill;
    
    try {
      // console.log(user);
      const patch = await fetch(API_UPDATE_USER(user._id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'jwt-token': jwtToken,
        },
        body: JSON.stringify({
          user: {
            skillsets: [
              {
                skillsetId: _id,
                title,
                payrate,
              },
            ],
          },
        }),
      });

      const updatedUser = await patch.json();
      captureUser(updatedUser);
      setSaving(false);
      toast.success('Successfully updated skillset');
    } catch (error) {
      console.log(error); // eslint-disable-line
      setSaving(false);
    }
  };

  const handleSelectSkill = (value) => {
    const SKILL = find(propEq('_id', value))(skillsets.docs);
    setSkill(SKILL);
    if (SKILL.requiresDocuments) {
      setUploadedDocsForSkillset(false);
    } else {
      setUploadedDocsForSkillset(true);
    }
  };

  return (
    <>
      <Message
        header="Designate your skillset"
        content="Choose from a list of skills"
      />
      <Dropdown
        search
        selection
        fluid
        onChange={(event, { value }) => handleSelectSkill(value)}
        options={formatSkillsets(skillsets.docs)}
        placeholder="Specialty"
      />
      <br />
      {
        skill
        && skill.requiresDocuments
          ? (
            <UploadDoc
              skill={skill}
              user={user}
              token={jwtToken}
              onSuccess={setUploadedDocsForSkillset}
            />
          )
          : null
      }
      <Button
        primary
        onClick={save}
        loading={saving}
        disabled={!uploadedDocsForSkillset}
      >
        Submit
      </Button>
    </>
  );
};

SetupSkills.propTypes = {
  user: PropTypes.shape().isRequired,
  cognitoUser: PropTypes.shape().isRequired,
  skillsets: PropTypes.shape().isRequired,
  captureUser: PropTypes.func.isRequired,
};

export default connect(
  ({
    userReducer,
    skillsets,
  }) => ({
    user: userReducer.user,
    cognitoUser: userReducer.cognitoUser,
    skillsets,
  }),
  dispatch => ({
    captureUser: payload => dispatch({
      type: CAPTURE_USER,
      payload,
    }),
  }),
)(SetupSkills);
