import { getApiInstance } from './apiInstance';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import { ITask, ITaskRaw, tasksModel } from '../models/tasks';
import statuses from 'http-status-codes';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setIsError } from '../store/slices/appState';

enum ETasksEndpoints {
    TASKS = '/tasks/',
    TASK = '/tasks/:id/',
}

export const tasksService = {
    getTasks: async () => {
        const apiInstance = getApiInstance();
        // sometimes response doesn't come back so we need to catch that
        // (why the hell doesn't it just return a response with an error status or something?)
        let response: AxiosResponse<ITaskRaw[]>;

        try {
            response = await apiInstance.get(ETasksEndpoints.TASKS);
        } catch (e) {
            return null;
        }

        if (response.status === statuses.OK) {
            return tasksModel.fromApi(response.data);
        }
        return null;
    },
    createTask: async (data: ITask) => {
        const apiInstance = getApiInstance();

        let response: AxiosResponse<ITaskRaw>;

        try {
            response = await apiInstance.post(ETasksEndpoints.TASKS, tasksModel.toApiDetail(data));
        } catch (e) {
            return null;
        }

        if (response.status === statuses.CREATED) {
            return tasksModel.fromApiDetail(response.data);
        }
        return null;
    },
    updateTask: async (data: ITask) => {
        const apiInstance = getApiInstance();
        let response: AxiosResponse<ITaskRaw>;

        try {
            response = await apiInstance.put(
                ETasksEndpoints.TASK.replace(':id', data.id as string),
                tasksModel.toApiDetail(data)
            );
        } catch (e) {
            return null;
        }

        if (response.status === statuses.OK) {
            return tasksModel.fromApiDetail(response.data);
        }
        return null;
    },
    deleteTask: async (data: ITask) => {
        const apiInstance = getApiInstance();
        let response: AxiosResponse<null>;

        try {
            response = await apiInstance.delete(
                ETasksEndpoints.TASK.replace(':id', data.id as string)
            );
        } catch (e) {
            return null;
        }

        if (response.status === statuses.NO_CONTENT) {
            return true;
        }
        return false;
    },
};
