import { Hook, z } from '@hono/zod-openapi';
import { Env } from 'hono';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const ErrorResponseSchema = z.object({
    code: z
        .number()
        .int()
        .openapi({
            description: 'HTTP status code',
            example: 400,
        }),
    errors: z
        .object({
            fieldErrors: z.object(),
            formErrors: z.array(z.any()),
        })
        .openapi({
            description: 'List of validation errors',
            example: {
                fieldErrors: {
                    year: [
                        'Too big: expected number to be <= 2024',
                    ],
                },
                formErrors: [],
            },
        }),
    message: z
        .string()
        .openapi({
            description: 'HTTP status text',
            example: 'Bad Request',
        }),
});

/*
 * Disabling no-explicit-any here to maintain the type signature
 * for the zod-openapi Hook type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultErrorHook: Hook<any, Env, any, any> = (result, ctx) => {
    if (!result.success) {
        return ctx.json(
            {
                code: StatusCodes.BAD_REQUEST,
                errors: z.flattenError(result.error),
                message: ReasonPhrases.BAD_REQUEST,
            },
            StatusCodes.BAD_REQUEST,
        );
    }
};
