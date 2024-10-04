import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {api} from "@/api";
import {queryClient} from "@/main.tsx";
import {customToast} from "@/lib/utils.tsx";
import {useCreateTaskModal, useUpdateTaskModal} from "@/hooks/useZustand.ts";

export const useGetTasks = (page: number, limit: number, keyword: string = "", type: string) => {
    return useQuery({
        queryKey: [queryKeys.GET_TASKS],
        queryFn: async () => {
            return await api.get("/task/list", {
                params: {
                    page,
                    limit,
                    keyword,
                    type
                }
            })
        }
    })
}

export const useCreateTask = () => {
    const createTaskModal = useCreateTaskModal()
    return useMutation({
        mutationKey: [queryKeys.CREATE_TASK],
        mutationFn: async (data: any) => {
            return await api.post("/task", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_TASKS],
            });
            customToast("SUCCESS", "Vazifa muvaffaqiyatli qo'shildi!");
            createTaskModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Unexpected error occurred, please try again later!"
            );
        },
    })
}

export const useUpdateTask = () => {
    const updateTaskModal = useUpdateTaskModal()
    return useMutation({
        mutationKey: [queryKeys.UPDATE_TASK],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/task/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_TASKS],
            });
            customToast("SUCCESS", "Vazifa muvaffaqiyatli tahrirlandi!");
            updateTaskModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Unexpected error occurred, please try again later!"
            );
        },
    })
}

export const useDeleteTask = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_TASK],
        mutationFn: async (id: number) => {
            return await api.delete(`/task/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_TASKS],
            });
            customToast("SUCCESS", "Vazifa muvaffaqiyatli o'chirildi!");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Unexpected error occurred, please try again later!"
            );
        },
    })
}