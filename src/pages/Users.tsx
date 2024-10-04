import {Navbar} from "@/components";
import {Input} from "@/components/ui/input.tsx";
import React, {useEffect, useState} from "react";
import UsersTable from "@/components/tables/users.tsx";
import {useGetUsers} from "@/hooks/useUsers.ts";
import {GetUsersType} from "@/types/user";
import {Pagination} from "antd";
import StateShower from "@/components/state-shower.tsx";
import {numberSpacer} from "@/lib/utils.tsx";

const Users = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [keyword, setKeyword] = useState<string>("");

    const getUsersQuery = useGetUsers(page, limit, keyword)
    const usersData: GetUsersType = getUsersQuery?.data?.data

    useEffect(() => {
        getUsersQuery.refetch()
    }, [page, limit, keyword])

    return (
        <>
            <Navbar name={"Users"}/>

            <div className={"grid grid-cols-4 w-full"}>
                <Input placeholder={"Izlash..."} onChange={(e) => setKeyword(e.target.value)}/>
            </div>

            {
                getUsersQuery.isLoading
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : usersData?.users?.length === 0
                        ? <StateShower id={"no_data"} name={"No users found!"}/> :
                        <>
                            <UsersTable data={usersData?.users}/>

                            <div className={"flex justify-between mt-3"}>
                                <div className={"flex gap-1"}>
                                    <span>Jami:</span>
                                    <h1 className={"font-medium"}>{numberSpacer(usersData?.meta?.totalUsers || 0)}</h1>
                                </div>

                                <Pagination
                                    showSizeChanger
                                    defaultCurrent={page}
                                    total={usersData?.meta?.totalUsers}
                                    onChange={(page, pageSize) => {
                                        setPage(page);
                                        setLimit(pageSize);
                                    }}
                                    pageSizeOptions={[5, 10, 20]}
                                    pageSize={limit}
                                />
                            </div>
                        </>
            }
        </>
    );
};

export default Users;