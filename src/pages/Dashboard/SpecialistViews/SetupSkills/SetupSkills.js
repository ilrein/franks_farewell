import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dropdown,
  Message,
  Button,
} from 'semantic-ui-react';
import find from 'ramda/src/find';
import propEq from 'ramda/src/propEq';

const formatSkillsets = docs => docs.map(doc => ({
  key: doc._id,
  value: doc._id,
  text: `${doc.title}`,
}));

const SetupSkills = ({ skillsets }) => {
  const [skill, setSkill] = useState(null);
  const [saving, setSaving] = useState(null);
  const [uploadedDocsForSkillset, setUploadedDocsForSkillset] = useState(false);

  const save = () => {
    console.log('save');
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

export default connect(
  ({ skillsets }) => ({ skillsets }),
)(SetupSkills);
