import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {api} from "@/api";
import {queryClient} from "@/main.tsx";
import {customToast} from "@/lib/utils.tsx";
import {useCreateGameModal, useUpdateGameModal} from "@/hooks/useZustand.ts";

export const useGetGames = (page: number, limit: number, keyword: string = "") => {
    return useQuery({
        queryKey: [queryKeys.GET_GAMES],
        queryFn: async () => {
            return await api.get("/mini-games", {
                params: {
                    page,
                    limit,
                    keyword
                }
            })
        }
    })
}

export const useCreateGame = () => {
    const createGameModal = useCreateGameModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_GAME],
        mutationFn: async (data: any) => {
            return await api.post("/mini-games", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_GAMES],
            });
            customToast("SUCCESS", "O'yin muvaffaqiyatli yaratildi!");
            createGameModal.onClose()
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

export const useUpdateGame = () => {
    const updateGameModal = useUpdateGameModal()

    return useMutation({
        mutationKey: [queryKeys.UPDATE_GAME],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/mini-games/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_GAMES],
            });
            customToast("SUCCESS", "O'yin muvaffaqiyatli tahrirlandi!");
            updateGameModal.onClose()
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

export const useDeleteGame = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_GAME],
        mutationFn: async (id: number) => {
            return await api.delete(`/mini-games/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_GAMES],
            });
            customToast("SUCCESS", "O'yin muvaffaqiyatli o'chirildi!");
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