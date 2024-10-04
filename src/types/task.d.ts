export type SingleTaskType = {
    id: number;
    name: string;
    channelId: string,
    url: string,
    bonus: number
    type: "SPONSOR" | "SELF",
    socialBadge: string
    createdAt: string
    updatedAt: string
}

export type GetTasksType = {
    meta: {
        totalTasks: number,
        currentPage: number,
        limit: number,
        totalPages: number,
    },
    tasks: TaskType[]
}