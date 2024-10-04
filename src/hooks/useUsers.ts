import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {api} from "@/api";

export const useGetUsers = (page: number, limit: number, keyword: string = "") => {
    return useQuery({
        queryKey: [queryKeys.GET_USERS],
        queryFn: async () => {
            return await api.get("/user/list", {
                params: {
                    page,
                    limit,
                    keyword
                }
            })
        }
    })
}