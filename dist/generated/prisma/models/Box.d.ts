import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Box
 *
 */
export type BoxModel = runtime.Types.Result.DefaultSelection<Prisma.$BoxPayload>;
export type AggregateBox = {
    _count: BoxCountAggregateOutputType | null;
    _min: BoxMinAggregateOutputType | null;
    _max: BoxMaxAggregateOutputType | null;
};
export type BoxMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type BoxMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type BoxCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    imageUrl: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type BoxMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    isActive?: true;
    createdAt?: true;
};
export type BoxMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    isActive?: true;
    createdAt?: true;
};
export type BoxCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    imageUrl?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type BoxAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Box to aggregate.
     */
    where?: Prisma.BoxWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boxes to fetch.
     */
    orderBy?: Prisma.BoxOrderByWithRelationInput | Prisma.BoxOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BoxWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boxes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Boxes
    **/
    _count?: true | BoxCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BoxMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BoxMaxAggregateInputType;
};
export type GetBoxAggregateType<T extends BoxAggregateArgs> = {
    [P in keyof T & keyof AggregateBox]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBox[P]> : Prisma.GetScalarType<T[P], AggregateBox[P]>;
};
export type BoxGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BoxWhereInput;
    orderBy?: Prisma.BoxOrderByWithAggregationInput | Prisma.BoxOrderByWithAggregationInput[];
    by: Prisma.BoxScalarFieldEnum[] | Prisma.BoxScalarFieldEnum;
    having?: Prisma.BoxScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BoxCountAggregateInputType | true;
    _min?: BoxMinAggregateInputType;
    _max?: BoxMaxAggregateInputType;
};
export type BoxGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    isActive: boolean;
    createdAt: Date;
    _count: BoxCountAggregateOutputType | null;
    _min: BoxMinAggregateOutputType | null;
    _max: BoxMaxAggregateOutputType | null;
};
type GetBoxGroupByPayload<T extends BoxGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BoxGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BoxGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BoxGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BoxGroupByOutputType[P]>;
}>>;
export type BoxWhereInput = {
    AND?: Prisma.BoxWhereInput | Prisma.BoxWhereInput[];
    OR?: Prisma.BoxWhereInput[];
    NOT?: Prisma.BoxWhereInput | Prisma.BoxWhereInput[];
    id?: Prisma.StringFilter<"Box"> | string;
    name?: Prisma.StringFilter<"Box"> | string;
    description?: Prisma.StringNullableFilter<"Box"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Box"> | string | null;
    isActive?: Prisma.BoolFilter<"Box"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Box"> | Date | string;
    versions?: Prisma.BoxVersionListRelationFilter;
    plans?: Prisma.SubscriptionPlanListRelationFilter;
};
export type BoxOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    versions?: Prisma.BoxVersionOrderByRelationAggregateInput;
    plans?: Prisma.SubscriptionPlanOrderByRelationAggregateInput;
};
export type BoxWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BoxWhereInput | Prisma.BoxWhereInput[];
    OR?: Prisma.BoxWhereInput[];
    NOT?: Prisma.BoxWhereInput | Prisma.BoxWhereInput[];
    name?: Prisma.StringFilter<"Box"> | string;
    description?: Prisma.StringNullableFilter<"Box"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Box"> | string | null;
    isActive?: Prisma.BoolFilter<"Box"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Box"> | Date | string;
    versions?: Prisma.BoxVersionListRelationFilter;
    plans?: Prisma.SubscriptionPlanListRelationFilter;
}, "id">;
export type BoxOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BoxCountOrderByAggregateInput;
    _max?: Prisma.BoxMaxOrderByAggregateInput;
    _min?: Prisma.BoxMinOrderByAggregateInput;
};
export type BoxScalarWhereWithAggregatesInput = {
    AND?: Prisma.BoxScalarWhereWithAggregatesInput | Prisma.BoxScalarWhereWithAggregatesInput[];
    OR?: Prisma.BoxScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BoxScalarWhereWithAggregatesInput | Prisma.BoxScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Box"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Box"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Box"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Box"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Box"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Box"> | Date | string;
};
export type BoxCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    versions?: Prisma.BoxVersionCreateNestedManyWithoutBoxInput;
    plans?: Prisma.SubscriptionPlanCreateNestedManyWithoutBoxInput;
};
export type BoxUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    versions?: Prisma.BoxVersionUncheckedCreateNestedManyWithoutBoxInput;
    plans?: Prisma.SubscriptionPlanUncheckedCreateNestedManyWithoutBoxInput;
};
export type BoxUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.BoxVersionUpdateManyWithoutBoxNestedInput;
    plans?: Prisma.SubscriptionPlanUpdateManyWithoutBoxNestedInput;
};
export type BoxUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.BoxVersionUncheckedUpdateManyWithoutBoxNestedInput;
    plans?: Prisma.SubscriptionPlanUncheckedUpdateManyWithoutBoxNestedInput;
};
export type BoxCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type BoxUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BoxUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BoxCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxScalarRelationFilter = {
    is?: Prisma.BoxWhereInput;
    isNot?: Prisma.BoxWhereInput;
};
export type BoxCreateNestedOneWithoutVersionsInput = {
    create?: Prisma.XOR<Prisma.BoxCreateWithoutVersionsInput, Prisma.BoxUncheckedCreateWithoutVersionsInput>;
    connectOrCreate?: Prisma.BoxCreateOrConnectWithoutVersionsInput;
    connect?: Prisma.BoxWhereUniqueInput;
};
export type BoxUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: Prisma.XOR<Prisma.BoxCreateWithoutVersionsInput, Prisma.BoxUncheckedCreateWithoutVersionsInput>;
    connectOrCreate?: Prisma.BoxCreateOrConnectWithoutVersionsInput;
    upsert?: Prisma.BoxUpsertWithoutVersionsInput;
    connect?: Prisma.BoxWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxUpdateToOneWithWhereWithoutVersionsInput, Prisma.BoxUpdateWithoutVersionsInput>, Prisma.BoxUncheckedUpdateWithoutVersionsInput>;
};
export type BoxCreateNestedOneWithoutPlansInput = {
    create?: Prisma.XOR<Prisma.BoxCreateWithoutPlansInput, Prisma.BoxUncheckedCreateWithoutPlansInput>;
    connectOrCreate?: Prisma.BoxCreateOrConnectWithoutPlansInput;
    connect?: Prisma.BoxWhereUniqueInput;
};
export type BoxUpdateOneRequiredWithoutPlansNestedInput = {
    create?: Prisma.XOR<Prisma.BoxCreateWithoutPlansInput, Prisma.BoxUncheckedCreateWithoutPlansInput>;
    connectOrCreate?: Prisma.BoxCreateOrConnectWithoutPlansInput;
    upsert?: Prisma.BoxUpsertWithoutPlansInput;
    connect?: Prisma.BoxWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxUpdateToOneWithWhereWithoutPlansInput, Prisma.BoxUpdateWithoutPlansInput>, Prisma.BoxUncheckedUpdateWithoutPlansInput>;
};
export type BoxCreateWithoutVersionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    plans?: Prisma.SubscriptionPlanCreateNestedManyWithoutBoxInput;
};
export type BoxUncheckedCreateWithoutVersionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    plans?: Prisma.SubscriptionPlanUncheckedCreateNestedManyWithoutBoxInput;
};
export type BoxCreateOrConnectWithoutVersionsInput = {
    where: Prisma.BoxWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxCreateWithoutVersionsInput, Prisma.BoxUncheckedCreateWithoutVersionsInput>;
};
export type BoxUpsertWithoutVersionsInput = {
    update: Prisma.XOR<Prisma.BoxUpdateWithoutVersionsInput, Prisma.BoxUncheckedUpdateWithoutVersionsInput>;
    create: Prisma.XOR<Prisma.BoxCreateWithoutVersionsInput, Prisma.BoxUncheckedCreateWithoutVersionsInput>;
    where?: Prisma.BoxWhereInput;
};
export type BoxUpdateToOneWithWhereWithoutVersionsInput = {
    where?: Prisma.BoxWhereInput;
    data: Prisma.XOR<Prisma.BoxUpdateWithoutVersionsInput, Prisma.BoxUncheckedUpdateWithoutVersionsInput>;
};
export type BoxUpdateWithoutVersionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plans?: Prisma.SubscriptionPlanUpdateManyWithoutBoxNestedInput;
};
export type BoxUncheckedUpdateWithoutVersionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plans?: Prisma.SubscriptionPlanUncheckedUpdateManyWithoutBoxNestedInput;
};
export type BoxCreateWithoutPlansInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    versions?: Prisma.BoxVersionCreateNestedManyWithoutBoxInput;
};
export type BoxUncheckedCreateWithoutPlansInput = {
    id?: string;
    name: string;
    description?: string | null;
    imageUrl?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    versions?: Prisma.BoxVersionUncheckedCreateNestedManyWithoutBoxInput;
};
export type BoxCreateOrConnectWithoutPlansInput = {
    where: Prisma.BoxWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxCreateWithoutPlansInput, Prisma.BoxUncheckedCreateWithoutPlansInput>;
};
export type BoxUpsertWithoutPlansInput = {
    update: Prisma.XOR<Prisma.BoxUpdateWithoutPlansInput, Prisma.BoxUncheckedUpdateWithoutPlansInput>;
    create: Prisma.XOR<Prisma.BoxCreateWithoutPlansInput, Prisma.BoxUncheckedCreateWithoutPlansInput>;
    where?: Prisma.BoxWhereInput;
};
export type BoxUpdateToOneWithWhereWithoutPlansInput = {
    where?: Prisma.BoxWhereInput;
    data: Prisma.XOR<Prisma.BoxUpdateWithoutPlansInput, Prisma.BoxUncheckedUpdateWithoutPlansInput>;
};
export type BoxUpdateWithoutPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.BoxVersionUpdateManyWithoutBoxNestedInput;
};
export type BoxUncheckedUpdateWithoutPlansInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.BoxVersionUncheckedUpdateManyWithoutBoxNestedInput;
};
/**
 * Count Type BoxCountOutputType
 */
export type BoxCountOutputType = {
    versions: number;
    plans: number;
};
export type BoxCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    versions?: boolean | BoxCountOutputTypeCountVersionsArgs;
    plans?: boolean | BoxCountOutputTypeCountPlansArgs;
};
/**
 * BoxCountOutputType without action
 */
export type BoxCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxCountOutputType
     */
    select?: Prisma.BoxCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * BoxCountOutputType without action
 */
export type BoxCountOutputTypeCountVersionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BoxVersionWhereInput;
};
/**
 * BoxCountOutputType without action
 */
export type BoxCountOutputTypeCountPlansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscriptionPlanWhereInput;
};
export type BoxSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    versions?: boolean | Prisma.Box$versionsArgs<ExtArgs>;
    plans?: boolean | Prisma.Box$plansArgs<ExtArgs>;
    _count?: boolean | Prisma.BoxCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["box"]>;
export type BoxSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["box"]>;
export type BoxSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["box"]>;
export type BoxSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    imageUrl?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type BoxOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "imageUrl" | "isActive" | "createdAt", ExtArgs["result"]["box"]>;
export type BoxInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    versions?: boolean | Prisma.Box$versionsArgs<ExtArgs>;
    plans?: boolean | Prisma.Box$plansArgs<ExtArgs>;
    _count?: boolean | Prisma.BoxCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BoxIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type BoxIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $BoxPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Box";
    objects: {
        versions: Prisma.$BoxVersionPayload<ExtArgs>[];
        plans: Prisma.$SubscriptionPlanPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        imageUrl: string | null;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["box"]>;
    composites: {};
};
export type BoxGetPayload<S extends boolean | null | undefined | BoxDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BoxPayload, S>;
export type BoxCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BoxFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BoxCountAggregateInputType | true;
};
export interface BoxDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Box'];
        meta: {
            name: 'Box';
        };
    };
    /**
     * Find zero or one Box that matches the filter.
     * @param {BoxFindUniqueArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoxFindUniqueArgs>(args: Prisma.SelectSubset<T, BoxFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Box that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoxFindUniqueOrThrowArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoxFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BoxFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Box that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindFirstArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoxFindFirstArgs>(args?: Prisma.SelectSubset<T, BoxFindFirstArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Box that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindFirstOrThrowArgs} args - Arguments to find a Box
     * @example
     * // Get one Box
     * const box = await prisma.box.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoxFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BoxFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Boxes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Boxes
     * const boxes = await prisma.box.findMany()
     *
     * // Get first 10 Boxes
     * const boxes = await prisma.box.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const boxWithIdOnly = await prisma.box.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BoxFindManyArgs>(args?: Prisma.SelectSubset<T, BoxFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Box.
     * @param {BoxCreateArgs} args - Arguments to create a Box.
     * @example
     * // Create one Box
     * const Box = await prisma.box.create({
     *   data: {
     *     // ... data to create a Box
     *   }
     * })
     *
     */
    create<T extends BoxCreateArgs>(args: Prisma.SelectSubset<T, BoxCreateArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Boxes.
     * @param {BoxCreateManyArgs} args - Arguments to create many Boxes.
     * @example
     * // Create many Boxes
     * const box = await prisma.box.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BoxCreateManyArgs>(args?: Prisma.SelectSubset<T, BoxCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Boxes and returns the data saved in the database.
     * @param {BoxCreateManyAndReturnArgs} args - Arguments to create many Boxes.
     * @example
     * // Create many Boxes
     * const box = await prisma.box.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Boxes and only return the `id`
     * const boxWithIdOnly = await prisma.box.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BoxCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BoxCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Box.
     * @param {BoxDeleteArgs} args - Arguments to delete one Box.
     * @example
     * // Delete one Box
     * const Box = await prisma.box.delete({
     *   where: {
     *     // ... filter to delete one Box
     *   }
     * })
     *
     */
    delete<T extends BoxDeleteArgs>(args: Prisma.SelectSubset<T, BoxDeleteArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Box.
     * @param {BoxUpdateArgs} args - Arguments to update one Box.
     * @example
     * // Update one Box
     * const box = await prisma.box.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BoxUpdateArgs>(args: Prisma.SelectSubset<T, BoxUpdateArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Boxes.
     * @param {BoxDeleteManyArgs} args - Arguments to filter Boxes to delete.
     * @example
     * // Delete a few Boxes
     * const { count } = await prisma.box.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BoxDeleteManyArgs>(args?: Prisma.SelectSubset<T, BoxDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Boxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Boxes
     * const box = await prisma.box.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BoxUpdateManyArgs>(args: Prisma.SelectSubset<T, BoxUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Boxes and returns the data updated in the database.
     * @param {BoxUpdateManyAndReturnArgs} args - Arguments to update many Boxes.
     * @example
     * // Update many Boxes
     * const box = await prisma.box.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Boxes and only return the `id`
     * const boxWithIdOnly = await prisma.box.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends BoxUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BoxUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Box.
     * @param {BoxUpsertArgs} args - Arguments to update or create a Box.
     * @example
     * // Update or create a Box
     * const box = await prisma.box.upsert({
     *   create: {
     *     // ... data to create a Box
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Box we want to update
     *   }
     * })
     */
    upsert<T extends BoxUpsertArgs>(args: Prisma.SelectSubset<T, BoxUpsertArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Boxes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxCountArgs} args - Arguments to filter Boxes to count.
     * @example
     * // Count the number of Boxes
     * const count = await prisma.box.count({
     *   where: {
     *     // ... the filter for the Boxes we want to count
     *   }
     * })
    **/
    count<T extends BoxCountArgs>(args?: Prisma.Subset<T, BoxCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BoxCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Box.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoxAggregateArgs>(args: Prisma.Subset<T, BoxAggregateArgs>): Prisma.PrismaPromise<GetBoxAggregateType<T>>;
    /**
     * Group by Box.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends BoxGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BoxGroupByArgs['orderBy'];
    } : {
        orderBy?: BoxGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BoxGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoxGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Box model
     */
    readonly fields: BoxFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Box.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BoxClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    versions<T extends Prisma.Box$versionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Box$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    plans<T extends Prisma.Box$plansArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Box$plansArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscriptionPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Box model
 */
export interface BoxFieldRefs {
    readonly id: Prisma.FieldRef<"Box", 'String'>;
    readonly name: Prisma.FieldRef<"Box", 'String'>;
    readonly description: Prisma.FieldRef<"Box", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Box", 'String'>;
    readonly isActive: Prisma.FieldRef<"Box", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Box", 'DateTime'>;
}
/**
 * Box findUnique
 */
export type BoxFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter, which Box to fetch.
     */
    where: Prisma.BoxWhereUniqueInput;
};
/**
 * Box findUniqueOrThrow
 */
export type BoxFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter, which Box to fetch.
     */
    where: Prisma.BoxWhereUniqueInput;
};
/**
 * Box findFirst
 */
export type BoxFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter, which Box to fetch.
     */
    where?: Prisma.BoxWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boxes to fetch.
     */
    orderBy?: Prisma.BoxOrderByWithRelationInput | Prisma.BoxOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Boxes.
     */
    cursor?: Prisma.BoxWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boxes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boxes.
     */
    distinct?: Prisma.BoxScalarFieldEnum | Prisma.BoxScalarFieldEnum[];
};
/**
 * Box findFirstOrThrow
 */
export type BoxFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter, which Box to fetch.
     */
    where?: Prisma.BoxWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boxes to fetch.
     */
    orderBy?: Prisma.BoxOrderByWithRelationInput | Prisma.BoxOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Boxes.
     */
    cursor?: Prisma.BoxWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boxes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boxes.
     */
    distinct?: Prisma.BoxScalarFieldEnum | Prisma.BoxScalarFieldEnum[];
};
/**
 * Box findMany
 */
export type BoxFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter, which Boxes to fetch.
     */
    where?: Prisma.BoxWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Boxes to fetch.
     */
    orderBy?: Prisma.BoxOrderByWithRelationInput | Prisma.BoxOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Boxes.
     */
    cursor?: Prisma.BoxWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Boxes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Boxes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Boxes.
     */
    distinct?: Prisma.BoxScalarFieldEnum | Prisma.BoxScalarFieldEnum[];
};
/**
 * Box create
 */
export type BoxCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * The data needed to create a Box.
     */
    data: Prisma.XOR<Prisma.BoxCreateInput, Prisma.BoxUncheckedCreateInput>;
};
/**
 * Box createMany
 */
export type BoxCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Boxes.
     */
    data: Prisma.BoxCreateManyInput | Prisma.BoxCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Box createManyAndReturn
 */
export type BoxCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * The data used to create many Boxes.
     */
    data: Prisma.BoxCreateManyInput | Prisma.BoxCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Box update
 */
export type BoxUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * The data needed to update a Box.
     */
    data: Prisma.XOR<Prisma.BoxUpdateInput, Prisma.BoxUncheckedUpdateInput>;
    /**
     * Choose, which Box to update.
     */
    where: Prisma.BoxWhereUniqueInput;
};
/**
 * Box updateMany
 */
export type BoxUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Boxes.
     */
    data: Prisma.XOR<Prisma.BoxUpdateManyMutationInput, Prisma.BoxUncheckedUpdateManyInput>;
    /**
     * Filter which Boxes to update
     */
    where?: Prisma.BoxWhereInput;
    /**
     * Limit how many Boxes to update.
     */
    limit?: number;
};
/**
 * Box updateManyAndReturn
 */
export type BoxUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * The data used to update Boxes.
     */
    data: Prisma.XOR<Prisma.BoxUpdateManyMutationInput, Prisma.BoxUncheckedUpdateManyInput>;
    /**
     * Filter which Boxes to update
     */
    where?: Prisma.BoxWhereInput;
    /**
     * Limit how many Boxes to update.
     */
    limit?: number;
};
/**
 * Box upsert
 */
export type BoxUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * The filter to search for the Box to update in case it exists.
     */
    where: Prisma.BoxWhereUniqueInput;
    /**
     * In case the Box found by the `where` argument doesn't exist, create a new Box with this data.
     */
    create: Prisma.XOR<Prisma.BoxCreateInput, Prisma.BoxUncheckedCreateInput>;
    /**
     * In case the Box was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BoxUpdateInput, Prisma.BoxUncheckedUpdateInput>;
};
/**
 * Box delete
 */
export type BoxDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
    /**
     * Filter which Box to delete.
     */
    where: Prisma.BoxWhereUniqueInput;
};
/**
 * Box deleteMany
 */
export type BoxDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Boxes to delete
     */
    where?: Prisma.BoxWhereInput;
    /**
     * Limit how many Boxes to delete.
     */
    limit?: number;
};
/**
 * Box.versions
 */
export type Box$versionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxVersion
     */
    select?: Prisma.BoxVersionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoxVersion
     */
    omit?: Prisma.BoxVersionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxVersionInclude<ExtArgs> | null;
    where?: Prisma.BoxVersionWhereInput;
    orderBy?: Prisma.BoxVersionOrderByWithRelationInput | Prisma.BoxVersionOrderByWithRelationInput[];
    cursor?: Prisma.BoxVersionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BoxVersionScalarFieldEnum | Prisma.BoxVersionScalarFieldEnum[];
};
/**
 * Box.plans
 */
export type Box$plansArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionPlan
     */
    select?: Prisma.SubscriptionPlanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SubscriptionPlan
     */
    omit?: Prisma.SubscriptionPlanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SubscriptionPlanInclude<ExtArgs> | null;
    where?: Prisma.SubscriptionPlanWhereInput;
    orderBy?: Prisma.SubscriptionPlanOrderByWithRelationInput | Prisma.SubscriptionPlanOrderByWithRelationInput[];
    cursor?: Prisma.SubscriptionPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscriptionPlanScalarFieldEnum | Prisma.SubscriptionPlanScalarFieldEnum[];
};
/**
 * Box without action
 */
export type BoxDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Box
     */
    select?: Prisma.BoxSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Box
     */
    omit?: Prisma.BoxOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Box.d.ts.map