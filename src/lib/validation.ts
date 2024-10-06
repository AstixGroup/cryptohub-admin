import * as z from "zod";

export const LoginSchema = z.object({
    username: z
        .string({
            required_error: "username is required!",
        })
        .min(1, "username is required!"),
    password: z
        .string({
            required_error: "password is required!",
        })
        .min(1, "password is required!"),
});

export const TaskSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required"),
    channelId: z.string({required_error: "Required!"}).min(1, "Required"),
    url: z.string({required_error: "Required!"}).min(1, "Required"),
    bonus: z.coerce.number({required_error: "Required!"}).min(1, "Required"),
    type: z.string({required_error: "Required!"}).min(1, "Required"),
    socialBadge: z.any().optional(),
});

export const GameSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required"),
    image: z.string({required_error: "Required!"}).min(1, "Required"),
    descr: z.any().optional(),
    isActive: z.boolean({required_error: "Required!"}).optional(),
    video_url: z.any().optional(),
    wallet_address: z.string({required_error: "Required!", invalid_type_error: "Required!"}).min(1, "Required"),
});

export const CryptoSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required"),
    price: z.coerce.number({
        required_error: "Required!",
        invalid_type_error: "Raqamlardan tashkil topishi kerak!"
    }).min(1, "Required"),
    change: z.coerce.number({
        required_error: "Required!",
        invalid_type_error: "Raqamlardan tashkil topishi kerak!"
    }).optional(),
    minOrderAmount: z.coerce.number({
        required_error: "Required!",
        invalid_type_error: "Raqamlardan tashkil topishi kerak!"
    }),
    maxOrderAmount: z.coerce.number({
        required_error: "Required!",
        invalid_type_error: "Raqamlardan tashkil topishi kerak!"
    }),
    card_number: z.string({
        required_error: "Required!",
        invalid_type_error: "Raqamlardan tashkil topishi kerak!"
    }).min(1, "Required"),
    card_name: z.string({required_error: "Required!",}).min(1, "Required"),
});


export const MovieSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required"),
    image: z.string({required_error: "Required!"}).min(1, "Required"),
    video_360: z.coerce.number().optional(),
    video_480: z.coerce.number().optional(),
    video_720: z.coerce.number().optional(),
    video_1080: z.coerce.number().optional()
});