import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Farmer
 *
 */
export type FarmerModel = runtime.Types.Result.DefaultSelection<Prisma.$FarmerPayload>;
export type AggregateFarmer = {
    _count: FarmerCountAggregateOutputType | null;
    _min: FarmerMinAggregateOutputType | null;
    _max: FarmerMaxAggregateOutputType | null;
};
export type FarmerMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    farmName: string | null;
    farmLocation: string | null;
    farmDescription: string | null;
    approved: boolean | null;
    createdAt: Date | null;
};
export type FarmerMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    farmName: string | null;
    farmLocation: string | null;
    farmDescription: string | null;
    approved: boolean | null;
    createdAt: Date | null;
};
export type FarmerCountAggregateOutputType = {
    id: number;
    userId: number;
    farmName: number;
    farmLocation: number;
    farmDescription: number;
    approved: number;
    createdAt: number;
    _all: number;
};
export type FarmerMinAggregateInputType = {
    id?: true;
    userId?: true;
    farmName?: true;
    farmLocation?: true;
    farmDescription?: true;
    approved?: true;
    createdAt?: true;
};
export type FarmerMaxAggregateInputType = {
    id?: true;
    userId?: true;
    farmName?: true;
    farmLocation?: true;
    farmDescription?: true;
    approved?: true;
    createdAt?: true;
};
export type FarmerCountAggregateInputType = {
    id?: true;
    userId?: true;
    farmName?: true;
    farmLocation?: true;
    farmDescription?: true;
    approved?: true;
    createdAt?: true;
    _all?: true;
};
export type FarmerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Farmer to aggregate.
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Farmers to fetch.
     */
    orderBy?: Prisma.FarmerOrderByWithRelationInput | Prisma.FarmerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FarmerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Farmers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Farmers
    **/
    _count?: true | FarmerCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FarmerMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FarmerMaxAggregateInputType;
};
export type GetFarmerAggregateType<T extends FarmerAggregateArgs> = {
    [P in keyof T & keyof AggregateFarmer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFarmer[P]> : Prisma.GetScalarType<T[P], AggregateFarmer[P]>;
};
export type FarmerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FarmerWhereInput;
    orderBy?: Prisma.FarmerOrderByWithAggregationInput | Prisma.FarmerOrderByWithAggregationInput[];
    by: Prisma.FarmerScalarFieldEnum[] | Prisma.FarmerScalarFieldEnum;
    having?: Prisma.FarmerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FarmerCountAggregateInputType | true;
    _min?: FarmerMinAggregateInputType;
    _max?: FarmerMaxAggregateInputType;
};
export type FarmerGroupByOutputType = {
    id: string;
    userId: string;
    farmName: string;
    farmLocation: string;
    farmDescription: string | null;
    approved: boolean;
    createdAt: Date;
    _count: FarmerCountAggregateOutputType | null;
    _min: FarmerMinAggregateOutputType | null;
    _max: FarmerMaxAggregateOutputType | null;
};
type GetFarmerGroupByPayload<T extends FarmerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FarmerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FarmerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FarmerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FarmerGroupByOutputType[P]>;
}>>;
export type FarmerWhereInput = {
    AND?: Prisma.FarmerWhereInput | Prisma.FarmerWhereInput[];
    OR?: Prisma.FarmerWhereInput[];
    NOT?: Prisma.FarmerWhereInput | Prisma.FarmerWhereInput[];
    id?: Prisma.StringFilter<"Farmer"> | string;
    userId?: Prisma.StringFilter<"Farmer"> | string;
    farmName?: Prisma.StringFilter<"Farmer"> | string;
    farmLocation?: Prisma.StringFilter<"Farmer"> | string;
    farmDescription?: Prisma.StringNullableFilter<"Farmer"> | string | null;
    approved?: Prisma.BoolFilter<"Farmer"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Farmer"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    products?: Prisma.ProductListRelationFilter;
    harvests?: Prisma.HarvestListRelationFilter;
};
export type FarmerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    farmDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    approved?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    products?: Prisma.ProductOrderByRelationAggregateInput;
    harvests?: Prisma.HarvestOrderByRelationAggregateInput;
};
export type FarmerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.FarmerWhereInput | Prisma.FarmerWhereInput[];
    OR?: Prisma.FarmerWhereInput[];
    NOT?: Prisma.FarmerWhereInput | Prisma.FarmerWhereInput[];
    farmName?: Prisma.StringFilter<"Farmer"> | string;
    farmLocation?: Prisma.StringFilter<"Farmer"> | string;
    farmDescription?: Prisma.StringNullableFilter<"Farmer"> | string | null;
    approved?: Prisma.BoolFilter<"Farmer"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Farmer"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    products?: Prisma.ProductListRelationFilter;
    harvests?: Prisma.HarvestListRelationFilter;
}, "id" | "userId">;
export type FarmerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    farmDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    approved?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FarmerCountOrderByAggregateInput;
    _max?: Prisma.FarmerMaxOrderByAggregateInput;
    _min?: Prisma.FarmerMinOrderByAggregateInput;
};
export type FarmerScalarWhereWithAggregatesInput = {
    AND?: Prisma.FarmerScalarWhereWithAggregatesInput | Prisma.FarmerScalarWhereWithAggregatesInput[];
    OR?: Prisma.FarmerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FarmerScalarWhereWithAggregatesInput | Prisma.FarmerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Farmer"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Farmer"> | string;
    farmName?: Prisma.StringWithAggregatesFilter<"Farmer"> | string;
    farmLocation?: Prisma.StringWithAggregatesFilter<"Farmer"> | string;
    farmDescription?: Prisma.StringNullableWithAggregatesFilter<"Farmer"> | string | null;
    approved?: Prisma.BoolWithAggregatesFilter<"Farmer"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Farmer"> | Date | string;
};
export type FarmerCreateInput = {
    id?: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFarmerInput;
    products?: Prisma.ProductCreateNestedManyWithoutFarmerInput;
    harvests?: Prisma.HarvestCreateNestedManyWithoutFarmerInput;
};
export type FarmerUncheckedCreateInput = {
    id?: string;
    userId: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutFarmerInput;
    harvests?: Prisma.HarvestUncheckedCreateNestedManyWithoutFarmerInput;
};
export type FarmerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFarmerNestedInput;
    products?: Prisma.ProductUpdateManyWithoutFarmerNestedInput;
    harvests?: Prisma.HarvestUpdateManyWithoutFarmerNestedInput;
};
export type FarmerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutFarmerNestedInput;
    harvests?: Prisma.HarvestUncheckedUpdateManyWithoutFarmerNestedInput;
};
export type FarmerCreateManyInput = {
    id?: string;
    userId: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
};
export type FarmerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FarmerNullableScalarRelationFilter = {
    is?: Prisma.FarmerWhereInput | null;
    isNot?: Prisma.FarmerWhereInput | null;
};
export type FarmerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    farmDescription?: Prisma.SortOrder;
    approved?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FarmerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    farmDescription?: Prisma.SortOrder;
    approved?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FarmerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    farmName?: Prisma.SortOrder;
    farmLocation?: Prisma.SortOrder;
    farmDescription?: Prisma.SortOrder;
    approved?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FarmerScalarRelationFilter = {
    is?: Prisma.FarmerWhereInput;
    isNot?: Prisma.FarmerWhereInput;
};
export type FarmerCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutUserInput;
    connect?: Prisma.FarmerWhereUniqueInput;
};
export type FarmerUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutUserInput;
    connect?: Prisma.FarmerWhereUniqueInput;
};
export type FarmerUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FarmerUpsertWithoutUserInput;
    disconnect?: Prisma.FarmerWhereInput | boolean;
    delete?: Prisma.FarmerWhereInput | boolean;
    connect?: Prisma.FarmerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerUpdateToOneWithWhereWithoutUserInput, Prisma.FarmerUpdateWithoutUserInput>, Prisma.FarmerUncheckedUpdateWithoutUserInput>;
};
export type FarmerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FarmerUpsertWithoutUserInput;
    disconnect?: Prisma.FarmerWhereInput | boolean;
    delete?: Prisma.FarmerWhereInput | boolean;
    connect?: Prisma.FarmerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerUpdateToOneWithWhereWithoutUserInput, Prisma.FarmerUpdateWithoutUserInput>, Prisma.FarmerUncheckedUpdateWithoutUserInput>;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type FarmerCreateNestedOneWithoutProductsInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutProductsInput, Prisma.FarmerUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutProductsInput;
    connect?: Prisma.FarmerWhereUniqueInput;
};
export type FarmerUpdateOneRequiredWithoutProductsNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutProductsInput, Prisma.FarmerUncheckedCreateWithoutProductsInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutProductsInput;
    upsert?: Prisma.FarmerUpsertWithoutProductsInput;
    connect?: Prisma.FarmerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerUpdateToOneWithWhereWithoutProductsInput, Prisma.FarmerUpdateWithoutProductsInput>, Prisma.FarmerUncheckedUpdateWithoutProductsInput>;
};
export type FarmerCreateNestedOneWithoutHarvestsInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutHarvestsInput, Prisma.FarmerUncheckedCreateWithoutHarvestsInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutHarvestsInput;
    connect?: Prisma.FarmerWhereUniqueInput;
};
export type FarmerUpdateOneRequiredWithoutHarvestsNestedInput = {
    create?: Prisma.XOR<Prisma.FarmerCreateWithoutHarvestsInput, Prisma.FarmerUncheckedCreateWithoutHarvestsInput>;
    connectOrCreate?: Prisma.FarmerCreateOrConnectWithoutHarvestsInput;
    upsert?: Prisma.FarmerUpsertWithoutHarvestsInput;
    connect?: Prisma.FarmerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FarmerUpdateToOneWithWhereWithoutHarvestsInput, Prisma.FarmerUpdateWithoutHarvestsInput>, Prisma.FarmerUncheckedUpdateWithoutHarvestsInput>;
};
export type FarmerCreateWithoutUserInput = {
    id?: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    products?: Prisma.ProductCreateNestedManyWithoutFarmerInput;
    harvests?: Prisma.HarvestCreateNestedManyWithoutFarmerInput;
};
export type FarmerUncheckedCreateWithoutUserInput = {
    id?: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutFarmerInput;
    harvests?: Prisma.HarvestUncheckedCreateNestedManyWithoutFarmerInput;
};
export type FarmerCreateOrConnectWithoutUserInput = {
    where: Prisma.FarmerWhereUniqueInput;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
};
export type FarmerUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FarmerUpdateWithoutUserInput, Prisma.FarmerUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutUserInput, Prisma.FarmerUncheckedCreateWithoutUserInput>;
    where?: Prisma.FarmerWhereInput;
};
export type FarmerUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FarmerWhereInput;
    data: Prisma.XOR<Prisma.FarmerUpdateWithoutUserInput, Prisma.FarmerUncheckedUpdateWithoutUserInput>;
};
export type FarmerUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUpdateManyWithoutFarmerNestedInput;
    harvests?: Prisma.HarvestUpdateManyWithoutFarmerNestedInput;
};
export type FarmerUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutFarmerNestedInput;
    harvests?: Prisma.HarvestUncheckedUpdateManyWithoutFarmerNestedInput;
};
export type FarmerCreateWithoutProductsInput = {
    id?: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFarmerInput;
    harvests?: Prisma.HarvestCreateNestedManyWithoutFarmerInput;
};
export type FarmerUncheckedCreateWithoutProductsInput = {
    id?: string;
    userId: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    harvests?: Prisma.HarvestUncheckedCreateNestedManyWithoutFarmerInput;
};
export type FarmerCreateOrConnectWithoutProductsInput = {
    where: Prisma.FarmerWhereUniqueInput;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutProductsInput, Prisma.FarmerUncheckedCreateWithoutProductsInput>;
};
export type FarmerUpsertWithoutProductsInput = {
    update: Prisma.XOR<Prisma.FarmerUpdateWithoutProductsInput, Prisma.FarmerUncheckedUpdateWithoutProductsInput>;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutProductsInput, Prisma.FarmerUncheckedCreateWithoutProductsInput>;
    where?: Prisma.FarmerWhereInput;
};
export type FarmerUpdateToOneWithWhereWithoutProductsInput = {
    where?: Prisma.FarmerWhereInput;
    data: Prisma.XOR<Prisma.FarmerUpdateWithoutProductsInput, Prisma.FarmerUncheckedUpdateWithoutProductsInput>;
};
export type FarmerUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFarmerNestedInput;
    harvests?: Prisma.HarvestUpdateManyWithoutFarmerNestedInput;
};
export type FarmerUncheckedUpdateWithoutProductsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    harvests?: Prisma.HarvestUncheckedUpdateManyWithoutFarmerNestedInput;
};
export type FarmerCreateWithoutHarvestsInput = {
    id?: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFarmerInput;
    products?: Prisma.ProductCreateNestedManyWithoutFarmerInput;
};
export type FarmerUncheckedCreateWithoutHarvestsInput = {
    id?: string;
    userId: string;
    farmName: string;
    farmLocation: string;
    farmDescription?: string | null;
    approved?: boolean;
    createdAt?: Date | string;
    products?: Prisma.ProductUncheckedCreateNestedManyWithoutFarmerInput;
};
export type FarmerCreateOrConnectWithoutHarvestsInput = {
    where: Prisma.FarmerWhereUniqueInput;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutHarvestsInput, Prisma.FarmerUncheckedCreateWithoutHarvestsInput>;
};
export type FarmerUpsertWithoutHarvestsInput = {
    update: Prisma.XOR<Prisma.FarmerUpdateWithoutHarvestsInput, Prisma.FarmerUncheckedUpdateWithoutHarvestsInput>;
    create: Prisma.XOR<Prisma.FarmerCreateWithoutHarvestsInput, Prisma.FarmerUncheckedCreateWithoutHarvestsInput>;
    where?: Prisma.FarmerWhereInput;
};
export type FarmerUpdateToOneWithWhereWithoutHarvestsInput = {
    where?: Prisma.FarmerWhereInput;
    data: Prisma.XOR<Prisma.FarmerUpdateWithoutHarvestsInput, Prisma.FarmerUncheckedUpdateWithoutHarvestsInput>;
};
export type FarmerUpdateWithoutHarvestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFarmerNestedInput;
    products?: Prisma.ProductUpdateManyWithoutFarmerNestedInput;
};
export type FarmerUncheckedUpdateWithoutHarvestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    farmName?: Prisma.StringFieldUpdateOperationsInput | string;
    farmLocation?: Prisma.StringFieldUpdateOperationsInput | string;
    farmDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approved?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    products?: Prisma.ProductUncheckedUpdateManyWithoutFarmerNestedInput;
};
/**
 * Count Type FarmerCountOutputType
 */
export type FarmerCountOutputType = {
    products: number;
    harvests: number;
};
export type FarmerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    products?: boolean | FarmerCountOutputTypeCountProductsArgs;
    harvests?: boolean | FarmerCountOutputTypeCountHarvestsArgs;
};
/**
 * FarmerCountOutputType without action
 */
export type FarmerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerCountOutputType
     */
    select?: Prisma.FarmerCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FarmerCountOutputType without action
 */
export type FarmerCountOutputTypeCountProductsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductWhereInput;
};
/**
 * FarmerCountOutputType without action
 */
export type FarmerCountOutputTypeCountHarvestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HarvestWhereInput;
};
export type FarmerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    farmDescription?: boolean;
    approved?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Farmer$productsArgs<ExtArgs>;
    harvests?: boolean | Prisma.Farmer$harvestsArgs<ExtArgs>;
    _count?: boolean | Prisma.FarmerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmer"]>;
export type FarmerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    farmDescription?: boolean;
    approved?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmer"]>;
export type FarmerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    farmDescription?: boolean;
    approved?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["farmer"]>;
export type FarmerSelectScalar = {
    id?: boolean;
    userId?: boolean;
    farmName?: boolean;
    farmLocation?: boolean;
    farmDescription?: boolean;
    approved?: boolean;
    createdAt?: boolean;
};
export type FarmerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "farmName" | "farmLocation" | "farmDescription" | "approved" | "createdAt", ExtArgs["result"]["farmer"]>;
export type FarmerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    products?: boolean | Prisma.Farmer$productsArgs<ExtArgs>;
    harvests?: boolean | Prisma.Farmer$harvestsArgs<ExtArgs>;
    _count?: boolean | Prisma.FarmerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FarmerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FarmerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FarmerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Farmer";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        products: Prisma.$ProductPayload<ExtArgs>[];
        harvests: Prisma.$HarvestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        farmName: string;
        farmLocation: string;
        farmDescription: string | null;
        approved: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["farmer"]>;
    composites: {};
};
export type FarmerGetPayload<S extends boolean | null | undefined | FarmerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FarmerPayload, S>;
export type FarmerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FarmerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FarmerCountAggregateInputType | true;
};
export interface FarmerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Farmer'];
        meta: {
            name: 'Farmer';
        };
    };
    /**
     * Find zero or one Farmer that matches the filter.
     * @param {FarmerFindUniqueArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmerFindUniqueArgs>(args: Prisma.SelectSubset<T, FarmerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Farmer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmerFindUniqueOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FarmerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Farmer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmerFindFirstArgs>(args?: Prisma.SelectSubset<T, FarmerFindFirstArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Farmer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindFirstOrThrowArgs} args - Arguments to find a Farmer
     * @example
     * // Get one Farmer
     * const farmer = await prisma.farmer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FarmerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Farmers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Farmers
     * const farmers = await prisma.farmer.findMany()
     *
     * // Get first 10 Farmers
     * const farmers = await prisma.farmer.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const farmerWithIdOnly = await prisma.farmer.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FarmerFindManyArgs>(args?: Prisma.SelectSubset<T, FarmerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Farmer.
     * @param {FarmerCreateArgs} args - Arguments to create a Farmer.
     * @example
     * // Create one Farmer
     * const Farmer = await prisma.farmer.create({
     *   data: {
     *     // ... data to create a Farmer
     *   }
     * })
     *
     */
    create<T extends FarmerCreateArgs>(args: Prisma.SelectSubset<T, FarmerCreateArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Farmers.
     * @param {FarmerCreateManyArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FarmerCreateManyArgs>(args?: Prisma.SelectSubset<T, FarmerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Farmers and returns the data saved in the database.
     * @param {FarmerCreateManyAndReturnArgs} args - Arguments to create many Farmers.
     * @example
     * // Create many Farmers
     * const farmer = await prisma.farmer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Farmers and only return the `id`
     * const farmerWithIdOnly = await prisma.farmer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FarmerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FarmerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Farmer.
     * @param {FarmerDeleteArgs} args - Arguments to delete one Farmer.
     * @example
     * // Delete one Farmer
     * const Farmer = await prisma.farmer.delete({
     *   where: {
     *     // ... filter to delete one Farmer
     *   }
     * })
     *
     */
    delete<T extends FarmerDeleteArgs>(args: Prisma.SelectSubset<T, FarmerDeleteArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Farmer.
     * @param {FarmerUpdateArgs} args - Arguments to update one Farmer.
     * @example
     * // Update one Farmer
     * const farmer = await prisma.farmer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FarmerUpdateArgs>(args: Prisma.SelectSubset<T, FarmerUpdateArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Farmers.
     * @param {FarmerDeleteManyArgs} args - Arguments to filter Farmers to delete.
     * @example
     * // Delete a few Farmers
     * const { count } = await prisma.farmer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FarmerDeleteManyArgs>(args?: Prisma.SelectSubset<T, FarmerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Farmers
     * const farmer = await prisma.farmer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FarmerUpdateManyArgs>(args: Prisma.SelectSubset<T, FarmerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Farmers and returns the data updated in the database.
     * @param {FarmerUpdateManyAndReturnArgs} args - Arguments to update many Farmers.
     * @example
     * // Update many Farmers
     * const farmer = await prisma.farmer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Farmers and only return the `id`
     * const farmerWithIdOnly = await prisma.farmer.updateManyAndReturn({
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
    updateManyAndReturn<T extends FarmerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FarmerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Farmer.
     * @param {FarmerUpsertArgs} args - Arguments to update or create a Farmer.
     * @example
     * // Update or create a Farmer
     * const farmer = await prisma.farmer.upsert({
     *   create: {
     *     // ... data to create a Farmer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Farmer we want to update
     *   }
     * })
     */
    upsert<T extends FarmerUpsertArgs>(args: Prisma.SelectSubset<T, FarmerUpsertArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Farmers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerCountArgs} args - Arguments to filter Farmers to count.
     * @example
     * // Count the number of Farmers
     * const count = await prisma.farmer.count({
     *   where: {
     *     // ... the filter for the Farmers we want to count
     *   }
     * })
    **/
    count<T extends FarmerCountArgs>(args?: Prisma.Subset<T, FarmerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FarmerCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FarmerAggregateArgs>(args: Prisma.Subset<T, FarmerAggregateArgs>): Prisma.PrismaPromise<GetFarmerAggregateType<T>>;
    /**
     * Group by Farmer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FarmerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FarmerGroupByArgs['orderBy'];
    } : {
        orderBy?: FarmerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FarmerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Farmer model
     */
    readonly fields: FarmerFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Farmer.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FarmerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    products<T extends Prisma.Farmer$productsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Farmer$productsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    harvests<T extends Prisma.Farmer$harvestsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Farmer$harvestsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Farmer model
 */
export interface FarmerFieldRefs {
    readonly id: Prisma.FieldRef<"Farmer", 'String'>;
    readonly userId: Prisma.FieldRef<"Farmer", 'String'>;
    readonly farmName: Prisma.FieldRef<"Farmer", 'String'>;
    readonly farmLocation: Prisma.FieldRef<"Farmer", 'String'>;
    readonly farmDescription: Prisma.FieldRef<"Farmer", 'String'>;
    readonly approved: Prisma.FieldRef<"Farmer", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Farmer", 'DateTime'>;
}
/**
 * Farmer findUnique
 */
export type FarmerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter, which Farmer to fetch.
     */
    where: Prisma.FarmerWhereUniqueInput;
};
/**
 * Farmer findUniqueOrThrow
 */
export type FarmerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter, which Farmer to fetch.
     */
    where: Prisma.FarmerWhereUniqueInput;
};
/**
 * Farmer findFirst
 */
export type FarmerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter, which Farmer to fetch.
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Farmers to fetch.
     */
    orderBy?: Prisma.FarmerOrderByWithRelationInput | Prisma.FarmerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Farmers.
     */
    cursor?: Prisma.FarmerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Farmers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Farmers.
     */
    distinct?: Prisma.FarmerScalarFieldEnum | Prisma.FarmerScalarFieldEnum[];
};
/**
 * Farmer findFirstOrThrow
 */
export type FarmerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter, which Farmer to fetch.
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Farmers to fetch.
     */
    orderBy?: Prisma.FarmerOrderByWithRelationInput | Prisma.FarmerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Farmers.
     */
    cursor?: Prisma.FarmerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Farmers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Farmers.
     */
    distinct?: Prisma.FarmerScalarFieldEnum | Prisma.FarmerScalarFieldEnum[];
};
/**
 * Farmer findMany
 */
export type FarmerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter, which Farmers to fetch.
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Farmers to fetch.
     */
    orderBy?: Prisma.FarmerOrderByWithRelationInput | Prisma.FarmerOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Farmers.
     */
    cursor?: Prisma.FarmerWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Farmers from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Farmers.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Farmers.
     */
    distinct?: Prisma.FarmerScalarFieldEnum | Prisma.FarmerScalarFieldEnum[];
};
/**
 * Farmer create
 */
export type FarmerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * The data needed to create a Farmer.
     */
    data: Prisma.XOR<Prisma.FarmerCreateInput, Prisma.FarmerUncheckedCreateInput>;
};
/**
 * Farmer createMany
 */
export type FarmerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Farmers.
     */
    data: Prisma.FarmerCreateManyInput | Prisma.FarmerCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Farmer createManyAndReturn
 */
export type FarmerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * The data used to create many Farmers.
     */
    data: Prisma.FarmerCreateManyInput | Prisma.FarmerCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Farmer update
 */
export type FarmerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * The data needed to update a Farmer.
     */
    data: Prisma.XOR<Prisma.FarmerUpdateInput, Prisma.FarmerUncheckedUpdateInput>;
    /**
     * Choose, which Farmer to update.
     */
    where: Prisma.FarmerWhereUniqueInput;
};
/**
 * Farmer updateMany
 */
export type FarmerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Farmers.
     */
    data: Prisma.XOR<Prisma.FarmerUpdateManyMutationInput, Prisma.FarmerUncheckedUpdateManyInput>;
    /**
     * Filter which Farmers to update
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * Limit how many Farmers to update.
     */
    limit?: number;
};
/**
 * Farmer updateManyAndReturn
 */
export type FarmerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * The data used to update Farmers.
     */
    data: Prisma.XOR<Prisma.FarmerUpdateManyMutationInput, Prisma.FarmerUncheckedUpdateManyInput>;
    /**
     * Filter which Farmers to update
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * Limit how many Farmers to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Farmer upsert
 */
export type FarmerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * The filter to search for the Farmer to update in case it exists.
     */
    where: Prisma.FarmerWhereUniqueInput;
    /**
     * In case the Farmer found by the `where` argument doesn't exist, create a new Farmer with this data.
     */
    create: Prisma.XOR<Prisma.FarmerCreateInput, Prisma.FarmerUncheckedCreateInput>;
    /**
     * In case the Farmer was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FarmerUpdateInput, Prisma.FarmerUncheckedUpdateInput>;
};
/**
 * Farmer delete
 */
export type FarmerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
    /**
     * Filter which Farmer to delete.
     */
    where: Prisma.FarmerWhereUniqueInput;
};
/**
 * Farmer deleteMany
 */
export type FarmerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Farmers to delete
     */
    where?: Prisma.FarmerWhereInput;
    /**
     * Limit how many Farmers to delete.
     */
    limit?: number;
};
/**
 * Farmer.products
 */
export type Farmer$productsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: Prisma.ProductSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Product
     */
    omit?: Prisma.ProductOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductInclude<ExtArgs> | null;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput | Prisma.ProductOrderByWithRelationInput[];
    cursor?: Prisma.ProductWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProductScalarFieldEnum | Prisma.ProductScalarFieldEnum[];
};
/**
 * Farmer.harvests
 */
export type Farmer$harvestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Harvest
     */
    select?: Prisma.HarvestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Harvest
     */
    omit?: Prisma.HarvestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HarvestInclude<ExtArgs> | null;
    where?: Prisma.HarvestWhereInput;
    orderBy?: Prisma.HarvestOrderByWithRelationInput | Prisma.HarvestOrderByWithRelationInput[];
    cursor?: Prisma.HarvestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HarvestScalarFieldEnum | Prisma.HarvestScalarFieldEnum[];
};
/**
 * Farmer without action
 */
export type FarmerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Farmer
     */
    select?: Prisma.FarmerSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Farmer
     */
    omit?: Prisma.FarmerOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FarmerInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Farmer.d.ts.map