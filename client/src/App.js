// Frontend - React App
// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EntityManager from './components/EntityManager';
import api from './services/api';

const App = () => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState({ id: '', role: '', topics: [] });
  const [topicInput, setTopicInput] = useState('');
  const [editingTopics, setEditingTopics] = useState(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await api.getEntities();
        setEntities(data);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };
    fetchEntities();
  }, []);

  const handleAddEntity = async () => {
    if (!newEntity.id) {
      alert("ID is required");
      return;
    }
    if (!newEntity.role) {
      alert("Role is required");
      return;
    }
    try {
      const created = await api.createEntity(newEntity);
      setEntities([...entities, created]);
      setNewEntity({ id: '', role: '', topics: [] });
    } catch (error) {
      alert(`Error creating entity: ${error.response?.data?.message || error.message}`);
      console.error('Error details:', error);
    }
  };

  const handleEditTopics = (index) => {
    setEditingTopics(index);
    setTopicInput('');
  };

  const handleAddTopic = async () => {
    if (!topicInput) {
      alert("Topic is required");
      return;
    }
    try {
      const updatedEntities = [...entities];
      const entity = updatedEntities[editingTopics];
      const newTopics = [...entity.topics, topicInput];
      await api.updateEntityTopics(entity.id, newTopics);
      entity.topics = newTopics;
      setEntities(updatedEntities);
      setTopicInput('');
    } catch (error) {
      alert('Error updating topics');
    }
  };

  const handleDeleteTopic = async (topicIndex) => {
    try {
      const updatedEntities = [...entities];
      const entity = updatedEntities[editingTopics];
      const newTopics = entity.topics.filter((_, i) => i !== topicIndex);
      await api.updateEntityTopics(entity.id, newTopics);
      entity.topics = newTopics;
      setEntities(updatedEntities);
    } catch (error) {
      alert('Error deleting topic');
    }
  };

  const handleDeleteEntity = async (index) => {
    if (window.confirm("Are you sure you want to delete this entity?")) {
      try {
        await api.deleteEntity(entities[index].id);
        const updatedEntities = entities.filter((_, i) => i !== index);
        setEntities(updatedEntities);
      } catch (error) {
        alert('Error deleting entity');
      }
    }
  };

  const handleConvertToJSON = () => {
    const json = JSON.stringify(entities, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("JSON copied to clipboard");
    });
  };

  return (
    <EntityManager
      entities={entities}
      newEntity={newEntity}
      topicInput={topicInput}
      editingTopics={editingTopics}
      setNewEntity={setNewEntity}
      setTopicInput={setTopicInput}
      handleAddEntity={handleAddEntity}
      handleEditTopics={handleEditTopics}
      handleAddTopic={handleAddTopic}
      handleDeleteTopic={handleDeleteTopic}
      handleDeleteEntity={handleDeleteEntity}
      handleConvertToJSON={handleConvertToJSON}
    />
  );
};

export default App;
