import React from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, Badge } from 'react-bootstrap';
import './EntityManager.css';

const EntityManager = ({
  entities,
  newEntity,
  topicInput,
  editingTopics,
  setNewEntity,
  setTopicInput,
  handleAddEntity,
  handleEditTopics,
  handleAddTopic,
  handleDeleteTopic,
  handleDeleteEntity,
  handleConvertToJSON,
}) => {
  return (
    <Container className="py-5 px-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h1 className="text-center mb-5">Entity Management</h1>
          
          {/* Add Entity Form */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="ID"
                      value={newEntity.id}
                      onChange={(e) => setNewEntity({ ...newEntity, id: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Role"
                      value={newEntity.role}
                      onChange={(e) => setNewEntity({ ...newEntity, role: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button variant="primary" onClick={handleAddEntity} className="w-100">
                    Add Entity
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Entities List */}
          <div className="mb-4">
            <h2 className="mb-3">Entities</h2>
            {entities.map((entity, index) => (
              <Card key={index} className="mb-3 shadow-sm">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h5 className="mb-2">ID: {entity.id}</h5>
                      <p className="mb-2 text-muted">Role: {entity.role}</p>
                      <div>
                        <strong>Topics: </strong>
                        {entity.topics.length > 0 ? (
                          entity.topics.map((topic, i) => (
                            <Badge bg="info" className="me-1" key={i}>
                              {topic}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted">None</span>
                        )}
                      </div>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditTopics(index)}
                      >
                        Edit Topics
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteEntity(index)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* Edit Topics Modal */}
          {editingTopics !== null && (
            <Card className="shadow mb-4">
              <Card.Header>
                <h3 className="mb-0">Edit Topics for ID - {entities[editingTopics].id}</h3>
              </Card.Header>
              <Card.Body>
                <ListGroup className="mb-3">
                  {entities[editingTopics].topics.map((topic, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {topic}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteTopic(index)}
                      >
                        Delete
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="New Topic"
                      value={topicInput}
                      onChange={(e) => setTopicInput(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Button variant="success" onClick={handleAddTopic} className="me-2">
                      Add Topic
                    </Button>
                    <Button variant="secondary" onClick={() => handleEditTopics(null)}>
                      Close
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}

          {/* JSON Export Button */}
          <div className="text-center">
            <Button variant="primary" size="lg" onClick={handleConvertToJSON}>
              Copy JSON to Clipboard
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EntityManager; 