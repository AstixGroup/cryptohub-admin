import {TaskSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select"

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {SingleTaskType} from "@/types/task";
import {useEffect} from "react";
import {socialMediaPlatforms} from "@/constants";
import {useCreateTask, useUpdateTask} from "@/hooks/useTasks.ts";
import {customToast} from "@/lib/utils.tsx";

type TaskFormProps = {
    action: "CREATE" | "EDIT";
    data?: SingleTaskType,
}

const TaskForm = ({action, data}: TaskFormProps) => {
    const form = useForm<z.infer<typeof TaskSchema>>({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            name: data?.name,
            url: data?.url,
            channelId: data?.channelId,
            bonus: data?.bonus,
            socialBadge: data?.socialBadge,
            type: data?.type,
        }
    });

    const createTaskMutation = useCreateTask()
    const updateTaskMutation = useUpdateTask()

    function onSubmit(values: z.infer<typeof TaskSchema>) {
        if (values.type === "SELF" && !values.socialBadge) {
            return customToast("ERROR", "Iltimos, ijtimoiy-tarmoqni tanlang!")
        }

        if (action === "CREATE") {
            createTaskMutation.mutate(values)
        } else {
            updateTaskMutation.mutate({
                id: data?.id!,
                data: values
            })
        }
    }

    useEffect(() => {
        form.watch()
    }, [form.getValues("type")]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">
                    {action === "CREATE" ? "Vazifa yaratish" : "Tahrirlash"}
                </h1>

                <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nomi:</FormLabel>
                                <FormControl>
                                    <Input placeholder="nomini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Sponsor */}
                    <FormField
                        control={form.control}
                        name="channelId"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sponsor:</FormLabel>
                                <FormControl>
                                    <Input placeholder="id yoki username kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* URL */}
                    <FormField
                        control={form.control}
                        name="url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>URL:</FormLabel>
                                <FormControl>
                                    <Input placeholder="url kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Bonus */}
                    <FormField
                        control={form.control}
                        name="bonus"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Bonus</FormLabel>
                                <FormControl>
                                    <Input type={"number"} placeholder="bonus kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Turi */}
                    <div className={"flex flex-col gap-2 my-1"}>
                        <span className={"font-medium text-sm"}>Turi:</span>
                        <Select
                            defaultValue={data?.type ? {
                                value: data.type, label: data.type
                            } : undefined}
                            options={[
                                {value: "SPONSOR", label: "SPONSOR"},
                                {value: "SELF", label: "SELF"}
                            ]}
                            placeholder={"Tanlang"}
                            className={"text-sm"}
                            onChange={(item) => form.setValue("type", item?.value!)}
                        />
                    </div>

                    {/* Social Media */}
                    {
                        form.getValues("type") === "SELF" &&
                        <div className={"flex flex-col gap-2 my-1"}>
                            <span className={"font-medium text-sm"}>Ijtimoiy-tarmoq:</span>
                            <Select
                                defaultValue={data?.socialBadge ? {
                                    value: data.socialBadge, label: data.socialBadge
                                } : undefined}
                                options={socialMediaPlatforms.map((platform) => {
                                    return {
                                        value: platform,
                                        label: platform,
                                    }
                                })}
                                placeholder={"Tanlang"}
                                className={"text-sm"}
                                onChange={(item) => form.setValue("socialBadge", item?.value!)}
                            />
                        </div>
                    }
                </div>

                <Button isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}>
                    {action === "CREATE" ? "Yaratish" : "O'zgarishlarni saqlash"}
                </Button>
            </form>
        </Form>
    );
};

export default TaskForm;
