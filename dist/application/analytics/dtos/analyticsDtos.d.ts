import { z } from 'zod';
export declare const visitorsRangeQuerySchema: z.ZodObject<{
    range: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        "7d": "7d";
        "30d": "30d";
        "90d": "90d";
        "6m": "6m";
    }>>>;
}, z.core.$strip>;
export type VisitorsRangeQueryInput = z.infer<typeof visitorsRangeQuerySchema>;
//# sourceMappingURL=analyticsDtos.d.ts.map