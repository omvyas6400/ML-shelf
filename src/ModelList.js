import React, { useEffect, useState } from 'react';
import api from './api';
import { ListGroup, Card, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModelList = ({ onSelectModel }) => {
  const { t } = useTranslation();
  const [models, setModels] = useState([]);

  useEffect(() => {
    api.get('/models')
      .then(response => setModels(response.data))
      .catch(error => console.error(t('error_fetching_models'), error));
  }, [t]);

  return (
    <Card className="my-4">
      <Card.Header as="h5">{t('model_list')}</Card.Header>
      <Card.Body>
        <ListGroup>
          {models.length > 0 ? (
            models.map(model => (
              <ListGroup.Item key={model.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <span onClick={() => onSelectModel(model.id)} style={{ cursor: 'pointer' }}>{model.name}</span>
                  <Button variant="outline-primary" onClick={() => onSelectModel(model.id)}>{t('view_details')}</Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>{t('no_models_available')}</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ModelList;
