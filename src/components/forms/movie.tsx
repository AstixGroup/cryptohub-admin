import {MovieSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {SingleMovieType} from "@/types/movie";
import {useCreateMovie, useUpdateMovie} from "@/hooks/useMovie.ts";

type CryptoFormProps = {
    action: "CREATE" | "EDIT";
    data?: SingleMovieType,
}

const MovieForm = ({action, data}: CryptoFormProps) => {
    const form = useForm<z.infer<typeof MovieSchema>>({
        resolver: zodResolver(MovieSchema),
        defaultValues: {
            name: data?.name,
            image: data?.image,
            video_360: data?.video_360,
            video_480: data?.video_480,
            video_720: data?.video_720,
            video_1080: data?.video_1080,
        }
    });

    const createMovieMutation = useCreateMovie()
    const updateMovieMutation = useUpdateMovie()

    function onSubmit(values: z.infer<typeof MovieSchema>) {
        if (action === "CREATE") {
            createMovieMutation.mutate(values)
        } else {
            updateMovieMutation.mutate({
                id: data?.id!,
                data: values
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">
                    {action === "CREATE" ? "Kino qo'shish" : "Tahrirlash"}
                </h1>

                <div className={"grid grid-cols-2 gap-5"}>
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

                    {/*  Image */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Rasm:</FormLabel>
                                <FormControl>
                                    <Input placeholder="rasm havolasini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Quality 360p */}
                    <FormField
                        control={form.control}
                        name="video_360"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sifat 360p (ID):</FormLabel>
                                <FormControl>
                                    <Input placeholder="telegramdagi post id sini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Quality 480p */}
                    <FormField
                        control={form.control}
                        name="video_480"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sifat 480p (ID):</FormLabel>
                                <FormControl>
                                    <Input placeholder="telegramdagi post id sini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Quality 720p */}
                    <FormField
                        control={form.control}
                        name="video_720"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sifat 720p (ID):</FormLabel>
                                <FormControl>
                                    <Input placeholder="telegramdagi post id sini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Quality 1080p */}
                    <FormField
                        control={form.control}
                        name="video_1080"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Sifat 1080p (ID):</FormLabel>
                                <FormControl>
                                    <Input placeholder="telegramdagi post id sini kiriting" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className={"flex justify-center"}>
                    <Button
                        className={"w-1/4"}
                        isLoading={createMovieMutation.isPending || updateMovieMutation.isPending}
                    >
                        {action === "CREATE" ? "Qo'shish" : "O'zgarishlarni saqlash"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default MovieForm;
