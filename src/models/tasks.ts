export interface ITaskRaw {
    id: number
    name: string
    description: string
    is_done: boolean
    priority: number
}

export interface ITask {
    id: string
    name: string
    description: string
    isDone: boolean
    priority: number
}

export const tasksModel = {
    fromApi: (dataRaw: ITaskRaw[]): ITask[] => {
        return dataRaw.map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            isDone: item.is_done,
            priority: item.priority,
        }));
    },
    fromApiDetail: (dataRaw: ITaskRaw): ITask => {
        return {
            id: String(dataRaw.id),
            name: dataRaw.name,
            description: dataRaw.description,
            isDone: dataRaw.is_done,
            priority: dataRaw.priority,
        };
    },
};
