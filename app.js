const express = require('express');
const sql = require('./db');

const app = express();

app.use(express.json()); 

const getTasks = async () => {
    const tasks = await sql`select * from tasks`
    return tasks;
}

app.get('/tasks', async (req, res, next) => {
    const tasks = await getTasks();
    res.status(200).json({
        tasks: tasks
    });
});

app.post('/task', async (req, res, next) => {
    try {
        if (!req.body.newTask) {
            res.status(400).json({
                message: 'Please give task in newTask'
            });
            return;
        }

        await sql`INSERT INTO tasks (name) VALUES (${req.body.newTask})`;

        res.status(200).json({
            message: 'Task added successfully'
        });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
});

app.delete('/task/:index', (req, res, next) => {const express = require('express');
const sql = require('./db');

const app = express();

app.use(express.json()); 

const getTasks = async () => {
    try {
        const tasks = await sql`select * from tasks`;
        return tasks;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}

app.get('/tasks', async (req, res, next) => {
    try {
        const tasks = await getTasks();
        res.status(200).json({
            tasks: tasks
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
});

app.post('/task', async (req, res, next) => {
    try {
        if (!req.body.newTask) {
            res.status(400).json({
                message: 'Please give task in newTask'
            });
            return;
        }

        
        await sql`INSERT INTO tasks (name) VALUES (${req.body.newTask})`;

        res.status(201).json({
            message: 'Task added successfully'
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
});

app.delete('/task/:index', async (req, res, next) => {
    try {
        const index = parseInt(req.params.index);
        if (isNaN(index)) {
            res.status(400).json({
                message: 'Invalid index'
            });
            return;
        }

        const tasks = await getTasks();
        if (index < 0 || index >= tasks.length) {
            res.status(404).json({
                message: 'Task not found'
            });
            return;
        }

        await sql`DELETE FROM tasks WHERE id = ${tasks[index].id}`;

        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
    
    tasks.splice(req.params.index, 1);
    res.status(200).json({
        message: 'Task deleted successfully'
    });
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});