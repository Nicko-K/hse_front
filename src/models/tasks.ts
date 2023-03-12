import * as string_decoder from 'string_decoder';

export interface ITaskRaw {
    id: number
    name: string
    description: string
    is_done: boolean
    priority: string
}

export interface ITask {
    id: string
    name: string
    description: string
    isDone: boolean
    priority: string
}

function prioritySerialize(priority_raw: string){
    switch (priority_raw){
        case 'H':
            return 'Высокий приоритет';
        case 'L':
            return 'Низкий приоритет';
        default:
            return 'Средний приоритет';
    }
}

export const tasksModel = {
    fromApi: (dataRaw: ITaskRaw[]): ITask[] => {
        return dataRaw.map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            isDone: item.is_done,
            priority: prioritySerialize(item.priority),
        }));
    },
    fromApiDetail: (dataRaw: ITaskRaw): ITask => {
        return {
            id: String(dataRaw.id),
            name: dataRaw.name,
            description: dataRaw.description,
            isDone: dataRaw.is_done,
            priority: dataRaw.priority
        };
    },
};
