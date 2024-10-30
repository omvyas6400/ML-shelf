import React, { useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Button, Form, Alert } from 'react-bootstrap';
import api from './api';

const ModelCreate = ({ darkMode, onModelCreated }) => {  
  const { t } = useTranslation();
  const [modelName, setModelName] = useState('');
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [message, setMessage] = useState('');

// layerOptions in ModelCreate component
const layerOptions = [
    { value: 'TEXT_CLASSIFIER', label: t('text_classifier') },
    { value: 'VISUAL_CLASSIFIER', label: t('visual_classifier') },
    { value: 'OPTICAL_RECOGNIZER', label: t('optical_recognizer') }
];


const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate model name before proceeding
  if (!modelName.trim()) {
    setMessage(t('model_name_cannot_be_empty'));
    return;
  }

  const newModel = {
    modelName: modelName,
    layers: selectedLayers.map(layer => layer.value),
    status: 'Not Trained',
  };

  try {
    console.log(t('sending_model_data'), newModel);
    const response = await api.post('/models', newModel);
    console.log(t('api_response'), response);
    setMessage(t('model_created_successfully'));
    setModelName('');
    setSelectedLayers([]);

    if (onModelCreated) {
      onModelCreated(response.data.id); // Pass the new model ID
    }
  } catch (error) {
    console.error(t('error_creating_model'), error);
    setMessage(t('failed_to_create_model'));
  }
};


  return (
    <Form onSubmit={handleSubmit} className="p-3">
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group controlId="formModelName">
        <Form.Label>{t('model_name')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('enter_model_name')}
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          className="form-control"
          required
        />
      </Form.Group>

      <Form.Group controlId="formModelLayers" className="mt-3">
        <Form.Label>{t('model_layers')}</Form.Label>
        <Select
          isMulti
          options={layerOptions}
          value={selectedLayers}
          onChange={setSelectedLayers}
          placeholder={t('select_model_layers')}
          classNamePrefix={darkMode ? 'dark-mode-select' : 'light-mode-select'}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        {t('create_model')}
      </Button>
    </Form>
  );
};

export default ModelCreate;
