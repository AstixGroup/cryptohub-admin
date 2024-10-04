import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SingleUserType} from "@/types/user";
import {dateFormatter, numberSpacer} from "@/lib/utils.tsx";

type ClinicTableProps = {
    data: SingleUserType[],
}

const UsersTable = ({data}: ClinicTableProps) => {
    return (
        <div
            className={"bg-white shadow rounded-sm border"}>
            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead className={"min-w-32"}>ID</TableHead>
                        <TableHead className={"min-w-40"}>Ism-familiya</TableHead>
                        <TableHead className={"min-w-32"}>Username</TableHead>
                        <TableHead className={"min-w-20"}>Balance</TableHead>
                        <TableHead className={"min-w-20"}>Referallar</TableHead>
                        <TableHead className={"min-w-20"}>Vazifalar</TableHead>
                        <TableHead className={"min-w-32"}>CreatedAt</TableHead>
                        <TableHead className={"min-w-32"}>UpdatedAt</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{`${user.name.slice(0, 200) || ""} ${user.surname || ""}`}</TableCell>
                                <TableCell>{user.username || "--"}</TableCell>
                                <TableCell>{numberSpacer(user.balance || 0)}</TableCell>
                                <TableCell>{user._count?.referrals || 0}</TableCell>
                                <TableCell>{user._count?.tasks || 0}</TableCell>
                                <TableCell>{dateFormatter(user.createdAt)}</TableCell>
                                <TableCell>{dateFormatter(user.updatedAt)}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default UsersTable;