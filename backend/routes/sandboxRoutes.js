const express = require('express');
const router = express.Router();

// Temporary in-memory array data (resets when server restarts)
let tasks = [
    { id: 1, title: "Learn MERN Stack Connection" },
    { id: 2, title: "Master HTTP Methods" }
];

// 1. GET Method - Read all items
router.get('/tasks', (req, res) => {
    console.log("📥 GET Request Received - Fetching all tasks");
    res.json(tasks);
});

// 2. POST Method - Create a new item
router.post('/tasks', (req, res) => {
    console.log("📤 POST Request Received - Creating task:", req.body);
    // ✅ Safe, production-ready ID assignment:
        const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const newTask = {
            id: nextId,
            title: req.body.title
        };
    tasks.push(newTask);
    res.status(201).json({ message: "Task created successfully!", data: newTask });
});

// 3. PUT Method - Update an existing item fully
router.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    console.log(`🔄 PUT Request Received - Updating task ID: ${taskId}, New Data:`, req.body);
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].title = req.body.title;
        res.json({ message: "Task updated successfully!", data: tasks[taskIndex] });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// 4. DELETE Method - Delete an item
router.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    console.log(`🗑️ DELETE Request Received - Removing task ID: ${taskId}`);
    
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    
    if (tasks.length < initialLength) {
        res.json({ message: "Task deleted successfully!" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

module.exports = router;