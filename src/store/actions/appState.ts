import { createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../models/tasks';
import { tasksService } from '../../service/tasks';
import { addTask, setIsError, setTaskDetail, setTasks, updateTask } from '../slices/appState';

export const fetchCreateTask = createAsyncThunk(
    '@tasks/create',
    async (data: ITask, thunkAPI) => {
        const response = await tasksService.createTask(data);
        if (!response) {
            thunkAPI.dispatch(setIsError(true));
            return;
        }
        thunkAPI.dispatch(addTask(response));
        thunkAPI.dispatch(setTaskDetail(null));
    }
);

export const fetchTasks = createAsyncThunk(
    '@tasks/get',
    async (_, thunkAPI) => {
        const response = await tasksService.getTasks();
        if (!response) {
            thunkAPI.dispatch(setIsError(true));
            return;
        }
        thunkAPI.dispatch(setTasks(response));
    }
);

export const fetchUpdateTask = createAsyncThunk(
    '@tasks/update',
    async (data: ITask, thunkAPI) => {
        const response = await tasksService.updateTask(data);
        if (!response) {
            thunkAPI.dispatch(setIsError(true));
            return;
        }
        thunkAPI.dispatch(updateTask(response));
        thunkAPI.dispatch(setTaskDetail(null));
    }
);

export const fetchDeleteTask = createAsyncThunk(
    '@tasks/delete',
    async (data: ITask, thunkAPI) => {
        const response = await tasksService.deleteTask(data);
        if (!response) {
            thunkAPI.dispatch(setIsError(true));
            return;
        }
        thunkAPI.dispatch(fetchTasks());
        thunkAPI.dispatch(setTaskDetail(null));
    }
);
