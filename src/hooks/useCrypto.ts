import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {api} from "@/api";
import {queryClient} from "@/main.tsx";
import {customToast} from "@/lib/utils.tsx";
import {useCreateCryptoModal, useUpdateCryptoModal} from "@/hooks/useZustand.ts";

export const useGetCryptos = (page: number, limit: number, keyword: string = "") => {
    return useQuery({
        queryKey: [queryKeys.GET_CRYPTOS],
        queryFn: async () => {
            return await api.get("/crypto", {
                params: {
                    page,
                    limit,
                    keyword
                }
            })
        }
    })
}

export const useCreateCrypto = () => {
    const createCryptoModal = useCreateCryptoModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_CRYPTO],
        mutationFn: async (data: any) => {
            return await api.post("/crypto", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CRYPTOS],
            });
            customToast("SUCCESS", "Crypto muvaffaqiyatli yaratildi!");
            createCryptoModal.onClose()
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

export const useUpdateCrypto = () => {
    const updateCryptoModal = useUpdateCryptoModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_CRYPTO],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/crypto/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CRYPTOS],
            });
            customToast("SUCCESS", "Crypto muvaffaqiyatli tahrirlandi!");
            updateCryptoModal.onClose()
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

export const useDeleteCrypto = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_CRYPTO],
        mutationFn: async (id: number) => {
            return await api.delete(`/crypto/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CRYPTOS],
            });
            customToast("SUCCESS", "Crypto muvaffaqiyatli o'chirildi!");
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