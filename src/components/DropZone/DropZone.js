/* eslint-disable no-confusing-arrow */
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import {
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Container = styled.div`
  border: 1px dashed grey;
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  border: ${props => props.hover ? '1px solid #2B3A42' : '1px solid #eee'} !important;
  background-color: ${props => props.hover ? '#eee' : 'initial'} !important;
  border-radius: 5px;
`;

const DropZone = ({ handleDrop, ...restProps }) => {
  const onDrop = useCallback((acceptedFiles) => {
    handleDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container
      {...getRootProps()}
      {...restProps}
    >
      <input {...getInputProps()} />
      {
        isDragActive
          ? (
            <Wrapper hover={isDragActive}>
              <Icon
                name="file pdf outline"
                size="massive"
              />
              <p>Drop the files here ...</p>
            </Wrapper>
          )
          : (
            (
              <Wrapper>
                <Icon
                  name="file pdf"
                  size="massive"
                />
                <p>Click or drag to upload</p>
              </Wrapper>
            )
          )
      }
    </Container>
  );
};

DropZone.propTypes = {
  handleDrop: PropTypes.func.isRequired,
};

export default DropZone;
