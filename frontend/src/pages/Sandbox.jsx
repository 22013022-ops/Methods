import React, { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const Sandbox = () => {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    // 1. Trigger GET Method on Component Mount
    const fetchTasks = async () => {
        try {
            const response = await API.get('/sandbox/tasks');
            setTasks(response.data);
        } catch (err) {
            alert("GET Failed");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 2. Trigger POST Method
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            await API.post('/sandbox/tasks', { title: newTitle });
            setNewTitle('');
            fetchTasks(); // Refresh list
        } catch (err) {
            alert("POST Failed");
        }
    };

    // 3. Trigger PUT Method
    const handleUpdate = async (id) => {
        try {
            await API.put(`/sandbox/tasks/${id}`, { title: editTitle });
            setEditingId(null);
            fetchTasks(); // Refresh list
        } catch (err) {
            alert("PUT Failed");
        }
    };

    // 4. Trigger DELETE Method
    const handleDelete = async (id) => {
        try {
            await API.delete(`/sandbox/tasks/${id}`);
            fetchTasks(); // Refresh list
        } catch (err) {
            alert("DELETE Failed");
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <h2>🧪 HTTP Methods Sandbox Playground</h2>
            <p>Open your browser console and backend terminal to see the handshakes live!</p>

            {/* CREATE FORM (POST) */}
            <form onSubmit={handleCreate} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Type new task title (POST)" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#22c55e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    POST (Create)
                </button>
            </form>

            {/* READ LIST (GET) */}
            <h3>Active Task Array (GET):</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map(task => (
                    <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--border)' }}>
                        {editingId === task.id ? (
                            <input 
                                type="text" 
                                value={editTitle} 
                                onChange={(e) => setEditTitle(e.target.value)}
                                style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--border)' }}
                            />
                        ) : (
                            <span><strong>[{task.id}]</strong> {task.title}</span>
                        )}

                        <div style={{ display: 'flex', gap: '8px' }}>
                            {editingId === task.id ? (
                                <button onClick={() => handleUpdate(task.id)} style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Save PUT
                                </button>
                            ) : (
                                <button onClick={() => { setEditingId(task.id); setEditTitle(task.title); }} style={{ padding: '6px 12px', backgroundColor: 'var(--border)', color: 'var(--text-h)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    PUT (Edit)
                                </button>
                            )}
                            <button onClick={() => handleDelete(task.id)} style={{ padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                DELETE
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sandbox;