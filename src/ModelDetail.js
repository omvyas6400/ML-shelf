import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from './api';
import { Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModelDetail = ({ modelId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [trainingInProgress, setTrainingInProgress] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await api.get(`/models/${modelId}`);
        setModel(response.data);
        if (response.data.status === 'Trained') setTrainingInProgress(null);
      } catch (error) {
        console.error(t("error_fetching_models"), error);
      }
    };

    if (modelId) {
      fetchModel();
      const intervalId = setInterval(fetchModel, 5000);
      return () => clearInterval(intervalId);
    }
  }, [modelId, t, trainingInProgress]);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        await api.post(`/models/${modelId}/upload`, formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
        setMessage(t("file_uploaded_successfully"));
        setSelectedFile(null);
      } catch (error) {
        console.error(t("error_fetching_models"), error);
        setMessage(t("error_fetching_models"));
      }
    } else {
      setMessage(t("select_file"));
    }

    try {
      const response = await api.get(`/models/${modelId}`);
      setModel(response.data);
    } catch (error) {
      console.error(t("error_fetching_models"), error);
    }
  };

  const handleStartTraining = async (dataId) => {
    try {
      setTrainingInProgress(dataId);

      const response = await api.post(`models/${modelId}/train`, null, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 200) {
        setMessage(t("training_started_successfully"));
      }
    } catch (error) {
      console.error(t("error_fetching_models"), error);
      setMessage(t("error_fetching_models"));
      setTrainingInProgress(null);
    }
  };

  const handleDeleteModel = async () => {
    try {
      await api.delete(`/models/${modelId}`);

      setMessage(t("model_deleted_successfully"));
      navigate('/models');
    } catch (error) {
      console.error(t("error_deleting_model"), error);
      setMessage(t("error_deleting_model"));
    }
  };

  const handleDelete = async (dataId) => {
    try {
      await api.delete(`/models/${modelId}/trainingData/${dataId}`);

      setMessage(t("file_deleted_successfully"));
      const response = await api.get(`/models/${modelId}`);
      setModel(response.data);
    } catch (error) {
      console.error(t("error_deleting_file"), error);
      setMessage(t("error_deleting_file"));
    }
  };

  return model ? (
    <Card className="my-4">
      <Card.Header as="h5">
        {t("model_details")}: {model.name}
      </Card.Header>
      <Card.Body>
        {message && <Alert variant="info">{message}</Alert>}
        }
        <p>{t("status")}: <strong>{t(model.status)}</strong></p>

        <Form>
          <Form.Group controlId="formFileUpload" className="mt-4">
            <Form.Label>{t("attach_document")}</Form.Label>
            <Form.Control
              type="file"
              accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp,.pdf,.txt"
              onChange={handleFileChange}
              disabled={model && model.trainingDataList && model.trainingDataList.length > 0}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleUpload}
            className="mt-4"
            disabled={!selectedFile || (model && model.trainingDataList && model.trainingDataList.length > 0)}
          >
            {t("upload_file")}
          </Button>
        </Form>

        <h5 className="mt-4">{t("training_data")}</h5>
        <ListGroup>
          {model.trainingDataList && model.trainingDataList.map((data, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
              <div>
                {data.name} ({(data.size / (1024 * 1024)).toFixed(2)} MB) - {t("uploaded_on")}: {new Date(data.uploadDate).toLocaleDateString()}
              </div>
              <div>
                <Button
                  variant="success"
                  onClick={() => handleStartTraining(data.id)}
                  disabled={trainingInProgress === data.id || model.status === 'Trained' || data.status === 'Being Trained'}
                >
                  {trainingInProgress === data.id ? t("training") : t("train")}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(data.id)}
                  className="ml-2"
                  disabled={model.status === 'Being Trained' || trainingInProgress}
                >
                  {t("delete")}
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>

      {/* Delete Model Button at the Bottom of the Card */}
      <Card.Footer className="text-left">
        <Button
          variant="danger"
          onClick={handleDeleteModel}
          className="mt-3"
          disabled={model.status === 'Being Trained' || trainingInProgress}
        >
          {t("delete_model")}
        </Button>
      </Card.Footer>
    </Card>
  ) : <p>{t("loading")}</p>;
};

export default ModelDetail;
