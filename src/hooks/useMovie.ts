import axios from "axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {useCreateMovieModal, useUpdateMovieModal} from "@/hooks/useZustand.ts";
import {queryClient} from "@/main.tsx";
import {customToast} from "@/lib/utils.tsx";

const movieApi = axios.create({
    baseURL: import.meta.env.VITE_MOVIE_API_URL!,
});

export const useGetMovies = (page: number, limit: number, keyword: string = "") => {
    return useQuery({
        queryKey: [queryKeys.GET_MOVIES],
        queryFn: async () => {
            return await movieApi.get("/movie", {
                params: {
                    page,
                    limit,
                    keyword
                }
            })
        }
    })
}

export const useCreateMovie = () => {
    const createMovieModal = useCreateMovieModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_MOVIE],
        mutationFn: async (data: any) => {
            return await movieApi.post("/movie", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_MOVIES],
            });
            customToast("SUCCESS", "Kino muvaffaqiyatli qo'shildi!");
            createMovieModal.onClose()
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

export const useUpdateMovie = () => {
    const updateMovieModal = useUpdateMovieModal()

    return useMutation({
        mutationKey: [queryKeys.UPDATE_MOVIE],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await movieApi.put(`/movie/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_MOVIES],
            });
            customToast("SUCCESS", "Kino muvaffaqiyatli tahrirlandi!");
            updateMovieModal.onClose()
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

export const useDeleteMovie = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_MOVIE],
        mutationFn: async (id: number) => {
            return await movieApi.delete(`/movie/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_MOVIES],
            });
            customToast("SUCCESS", "Kino muvaffaqiyatli o'chirildi!");
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