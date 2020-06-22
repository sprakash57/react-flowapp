import React, { useState } from 'react';
import Input from '../common/Input';
import { connect } from 'react-redux';
import TaskCard from '../common/TaskCard';
import { createTask, deleteTask, shuffleTask, modifyFlow } from '../../actions/workflow';
import { Link } from 'react-router-dom';

const Task = ({ match, state, createTask, deleteTask, shuffleTask, modifyFlow }) => {
    const { id } = match.params;
    let currentWorkflow = state.workflows.find(workflow => workflow.id === id);
    const { name, tasks } = currentWorkflow
    const [flowName, setflowName] = useState(name);

    const handleChange = e => {
        setflowName(e.target.value);
        if (e.target.value !== name) {
            currentWorkflow.name = e.target.value;
            modifyFlow(currentWorkflow)
        }
    }

    const handleAdd = () => {
        createTask(id);
    }

    const handleDelete = () => {
        deleteTask(id);
    }

    const handleShuffle = () => {
        shuffleTask(id);
        window.location.reload();
    }

    return (
        <main className="container-fluid mt-3">
            <section className="row">
                <section className="col-4">
                    <Input
                        type='text'
                        value={flowName}
                        onChange={handleChange}
                    />
                </section>
                <section className="col-6 offset-2">
                    <button className='btn btn-info' onClick={handleShuffle}>Shuffle</button>
                    <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                    <button className='btn btn-success' onClick={handleAdd}>Add</button>
                    <Link className='btn btn-primary' to='/workflow'>Save</Link>
                </section>
            </section>
            <section className="row mt-5">
                {tasks.length ? tasks.map((task, i) => <TaskCard key={i} task={task} flowId={id} />) : null}
            </section>
        </main>
    )
}

const mapStates = state => ({ state: state.workflow });

export default connect(mapStates, { createTask, deleteTask, shuffleTask, modifyFlow })(Task);