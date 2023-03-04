export interface ITaskRaw {
    id: number | null
    name: string
    description: string
    is_done: boolean
    priority: number
}

export interface ITask {
    id: string | null          // why string and not number?
    name: string
    description: string
    isDone: boolean
    priority: number    // 3 - high, 2 - medium, 1 - low
}

export const tasksModel = {
    // Task array
    fromApi: (dataRaw: ITaskRaw[]): ITask[] => {
        return dataRaw.map((item) => tasksModel.fromApiDetail(item));
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
    toApiDetail: (data: ITask): ITaskRaw => {
        return {
            id: data.id ? Number.parseInt(data.id) : null,
            name: data.name,
            description: data.description,
            is_done: data.isDone,
            priority: data.priority,
        };
    },
};
