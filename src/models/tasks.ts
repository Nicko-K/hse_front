export interface ITaskRaw {
    id: number
    name: string
    description: string
    is_done: boolean
    priority: number
}

export interface ITask {
    id: string          // why string and not number?
    name: string
    description: string
    isDone: boolean
    priority: number    // 3 - high, 2 - medium, 1 - low
}

export const tasksModel = {
    // Task array
    fromApi: (dataRaw: ITaskRaw[]): ITask[] => {
        return dataRaw.map((item) => ({
            id: String(item.id),
            name: item.name,
            description: item.description,
            isDone: item.is_done,
            priority: item.priority,
        }));
    },
    // Single Task
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
