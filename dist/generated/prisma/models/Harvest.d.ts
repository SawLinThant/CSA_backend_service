import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Harvest
 *
 */
export type HarvestModel = runtime.Types.Result.DefaultSelection<Prisma.$HarvestPayload>;
export type AggregateHarvest = {
    _count: HarvestCountAggregateOutputType | null;
    _avg: HarvestAvgAggregateOutputType | null;
    _sum: HarvestSumAggregateOutputType | null;
    _min: HarvestMinAggregateOutputType | null;
    _max: HarvestMaxAggregateOutputType | null;
};
export type HarvestAvgAggregateOutputType = {
    quantityAvailable: number | null;
    unitPrice: runtime.Decimal | null;
};
export type HarvestSumAggregateOutputType = {
    quantityAvailable: number | null;
    unitPrice: runtime.Decimal | null;
};
export type HarvestMinAggregateOutputType = {
    id: string | null;
    farmerId: string | null;
    productId: string | null;
    quantityAvailable: number | null;
    unitPrice: runtime.Decimal | null;
    harvestDate: Date | null;
    availableUntil: Date | null;
    status: $Enums.HarvestStatus | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date | null;
};
export type HarvestMaxAggregateOutputType = {
    id: string | null;
    farmerId: string | null;
    productId: string | null;
    quantityAvailable: number | null;
    unitPrice: runtime.Decimal | null;
    harvestDate: Date | null;
    availableUntil: Date | null;
    status: $Enums.HarvestStatus | null;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date | null;
};
export type HarvestCountAggregateOutputType = {
    id: number;
    farmerId: number;
    productId: number;
    quantityAvailable: number;
    unitPrice: number;
    harvestDate: number;
    availableUntil: number;
    status: number;
    approvedBy: number;
    approvedAt: number;
    createdAt: number;
    _all: number;
};
export type HarvestAvgAggregateInputType = {
    quantityAvailable?: true;
    unitPrice?: true;
};
export type HarvestSumAggregateInputType = {
    quantityAvailable?: true;
    unitPrice?: true;
};
export type HarvestMinAggregateInputType = {
    id?: true;
    farmerId?: true;
    productId?: true;
    quantityAvailable?: true;
    unitPrice?: true;
    harvestDate?: true;
    availableUntil?: true;
    status?: true;
    approvedBy?: true;
    approvedAt?: true;
    createdAt?: true;
};
export type HarvestMaxAggregateInputType = {
    id?: true;
    farmerId?: true;
    productId?: true;
    quantityAvailable?: true;
    unitPrice?: true;
    harvestDate?: true;
    availableUntil?: true;
    status?: true;
    approvedBy?: true;
    approvedAt?: true;
    createdAt?: true;
};
export type HarvestCountAggregateInputType = {
    id?: true;
    farmerId?: true;
    productId?: true;
    quantityAvailable?: true;
    unitPrice?: true;
    harvestDate?: true;
    availableUntil?: true;
    status?: true;
    approvedBy?: true;
    approvedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type HarvestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Harvest to aggregate.
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Harvests to fetch.
     */
    orderBy?: Prisma.HarvestOrderByWithRelationInput | Prisma.HarvestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.HarvestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Harvests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Harvests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Harvests
    **/
    _count?: true | HarvestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: HarvestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: HarvestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: HarvestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: HarvestMaxAggregateInputType;
};
export type GetHarvestAggregateType<T extends HarvestAggregateArgs> = {
    [P in keyof T & keyof AggregateHarvest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHarvest[P]> : Prisma.GetScalarType<T[P], AggregateHarvest[P]>;
};
export type HarvestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HarvestWhereInput;
    orderBy?: Prisma.HarvestOrderByWithAggregationInput | Prisma.HarvestOrderByWithAggregationInput[];
    by: Prisma.HarvestScalarFieldEnum[] | Prisma.HarvestScalarFieldEnum;
    having?: Prisma.HarvestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HarvestCountAggregateInputType | true;
    _avg?: HarvestAvgAggregateInputType;
    _sum?: HarvestSumAggregateInputType;
    _min?: HarvestMinAggregateInputType;
    _max?: HarvestMaxAggregateInputType;
};
export type HarvestGroupByOutputType = {
    id: string;
    farmerId: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal;
    harvestDate: Date;
    availableUntil: Date;
    status: $Enums.HarvestStatus;
    approvedBy: string | null;
    approvedAt: Date | null;
    createdAt: Date;
    _count: HarvestCountAggregateOutputType | null;
    _avg: HarvestAvgAggregateOutputType | null;
    _sum: HarvestSumAggregateOutputType | null;
    _min: HarvestMinAggregateOutputType | null;
    _max: HarvestMaxAggregateOutputType | null;
};
type GetHarvestGroupByPayload<T extends HarvestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HarvestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HarvestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HarvestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HarvestGroupByOutputType[P]>;
}>>;
export type HarvestWhereInput = {
    AND?: Prisma.HarvestWhereInput | Prisma.HarvestWhereInput[];
    OR?: Prisma.HarvestWhereInput[];
    NOT?: Prisma.HarvestWhereInput | Prisma.HarvestWhereInput[];
    id?: Prisma.StringFilter<"Harvest"> | string;
    farmerId?: Prisma.StringFilter<"Harvest"> | string;
    productId?: Prisma.StringFilter<"Harvest"> | string;
    quantityAvailable?: Prisma.IntFilter<"Harvest"> | number;
    unitPrice?: Prisma.DecimalFilter<"Harvest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    availableUntil?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    status?: Prisma.EnumHarvestStatusFilter<"Harvest"> | $Enums.HarvestStatus;
    approvedBy?: Prisma.StringNullableFilter<"Harvest"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Harvest"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    farmer?: Prisma.XOR<Prisma.FarmerScalarRelationFilter, Prisma.FarmerWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    approver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type HarvestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    harvestDate?: Prisma.SortOrder;
    availableUntil?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    approvedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    farmer?: Prisma.FarmerOrderByWithRelationInput;
    product?: Prisma.ProductOrderByWithRelationInput;
    approver?: Prisma.UserOrderByWithRelationInput;
};
export type HarvestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.HarvestWhereInput | Prisma.HarvestWhereInput[];
    OR?: Prisma.HarvestWhereInput[];
    NOT?: Prisma.HarvestWhereInput | Prisma.HarvestWhereInput[];
    farmerId?: Prisma.StringFilter<"Harvest"> | string;
    productId?: Prisma.StringFilter<"Harvest"> | string;
    quantityAvailable?: Prisma.IntFilter<"Harvest"> | number;
    unitPrice?: Prisma.DecimalFilter<"Harvest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    availableUntil?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    status?: Prisma.EnumHarvestStatusFilter<"Harvest"> | $Enums.HarvestStatus;
    approvedBy?: Prisma.StringNullableFilter<"Harvest"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Harvest"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    farmer?: Prisma.XOR<Prisma.FarmerScalarRelationFilter, Prisma.FarmerWhereInput>;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    approver?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type HarvestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    harvestDate?: Prisma.SortOrder;
    availableUntil?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    approvedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.HarvestCountOrderByAggregateInput;
    _avg?: Prisma.HarvestAvgOrderByAggregateInput;
    _max?: Prisma.HarvestMaxOrderByAggregateInput;
    _min?: Prisma.HarvestMinOrderByAggregateInput;
    _sum?: Prisma.HarvestSumOrderByAggregateInput;
};
export type HarvestScalarWhereWithAggregatesInput = {
    AND?: Prisma.HarvestScalarWhereWithAggregatesInput | Prisma.HarvestScalarWhereWithAggregatesInput[];
    OR?: Prisma.HarvestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HarvestScalarWhereWithAggregatesInput | Prisma.HarvestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Harvest"> | string;
    farmerId?: Prisma.StringWithAggregatesFilter<"Harvest"> | string;
    productId?: Prisma.StringWithAggregatesFilter<"Harvest"> | string;
    quantityAvailable?: Prisma.IntWithAggregatesFilter<"Harvest"> | number;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"Harvest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeWithAggregatesFilter<"Harvest"> | Date | string;
    availableUntil?: Prisma.DateTimeWithAggregatesFilter<"Harvest"> | Date | string;
    status?: Prisma.EnumHarvestStatusWithAggregatesFilter<"Harvest"> | $Enums.HarvestStatus;
    approvedBy?: Prisma.StringNullableWithAggregatesFilter<"Harvest"> | string | null;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Harvest"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Harvest"> | Date | string;
};
export type HarvestCreateInput = {
    id?: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
    farmer: Prisma.FarmerCreateNestedOneWithoutHarvestsInput;
    product: Prisma.ProductCreateNestedOneWithoutHarvestsInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovedHarvestsInput;
};
export type HarvestUncheckedCreateInput = {
    id?: string;
    farmerId: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    farmer?: Prisma.FarmerUpdateOneRequiredWithoutHarvestsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutHarvestsNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovedHarvestsNestedInput;
};
export type HarvestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestCreateManyInput = {
    id?: string;
    farmerId: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestListRelationFilter = {
    every?: Prisma.HarvestWhereInput;
    some?: Prisma.HarvestWhereInput;
    none?: Prisma.HarvestWhereInput;
};
export type HarvestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HarvestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    harvestDate?: Prisma.SortOrder;
    availableUntil?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    approvedBy?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HarvestAvgOrderByAggregateInput = {
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type HarvestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    harvestDate?: Prisma.SortOrder;
    availableUntil?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    approvedBy?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HarvestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    farmerId?: Prisma.SortOrder;
    productId?: Prisma.SortOrder;
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    harvestDate?: Prisma.SortOrder;
    availableUntil?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    approvedBy?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type HarvestSumOrderByAggregateInput = {
    quantityAvailable?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
};
export type HarvestCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput> | Prisma.HarvestCreateWithoutApproverInput[] | Prisma.HarvestUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutApproverInput | Prisma.HarvestCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.HarvestCreateManyApproverInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUncheckedCreateNestedManyWithoutApproverInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput> | Prisma.HarvestCreateWithoutApproverInput[] | Prisma.HarvestUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutApproverInput | Prisma.HarvestCreateOrConnectWithoutApproverInput[];
    createMany?: Prisma.HarvestCreateManyApproverInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput> | Prisma.HarvestCreateWithoutApproverInput[] | Prisma.HarvestUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutApproverInput | Prisma.HarvestCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutApproverInput | Prisma.HarvestUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.HarvestCreateManyApproverInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutApproverInput | Prisma.HarvestUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutApproverInput | Prisma.HarvestUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type HarvestUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput> | Prisma.HarvestCreateWithoutApproverInput[] | Prisma.HarvestUncheckedCreateWithoutApproverInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutApproverInput | Prisma.HarvestCreateOrConnectWithoutApproverInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutApproverInput | Prisma.HarvestUpsertWithWhereUniqueWithoutApproverInput[];
    createMany?: Prisma.HarvestCreateManyApproverInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutApproverInput | Prisma.HarvestUpdateWithWhereUniqueWithoutApproverInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutApproverInput | Prisma.HarvestUpdateManyWithWhereWithoutApproverInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type HarvestCreateNestedManyWithoutFarmerInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput> | Prisma.HarvestCreateWithoutFarmerInput[] | Prisma.HarvestUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutFarmerInput | Prisma.HarvestCreateOrConnectWithoutFarmerInput[];
    createMany?: Prisma.HarvestCreateManyFarmerInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUncheckedCreateNestedManyWithoutFarmerInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput> | Prisma.HarvestCreateWithoutFarmerInput[] | Prisma.HarvestUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutFarmerInput | Prisma.HarvestCreateOrConnectWithoutFarmerInput[];
    createMany?: Prisma.HarvestCreateManyFarmerInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUpdateManyWithoutFarmerNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput> | Prisma.HarvestCreateWithoutFarmerInput[] | Prisma.HarvestUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutFarmerInput | Prisma.HarvestCreateOrConnectWithoutFarmerInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutFarmerInput | Prisma.HarvestUpsertWithWhereUniqueWithoutFarmerInput[];
    createMany?: Prisma.HarvestCreateManyFarmerInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutFarmerInput | Prisma.HarvestUpdateWithWhereUniqueWithoutFarmerInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutFarmerInput | Prisma.HarvestUpdateManyWithWhereWithoutFarmerInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type HarvestUncheckedUpdateManyWithoutFarmerNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput> | Prisma.HarvestCreateWithoutFarmerInput[] | Prisma.HarvestUncheckedCreateWithoutFarmerInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutFarmerInput | Prisma.HarvestCreateOrConnectWithoutFarmerInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutFarmerInput | Prisma.HarvestUpsertWithWhereUniqueWithoutFarmerInput[];
    createMany?: Prisma.HarvestCreateManyFarmerInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutFarmerInput | Prisma.HarvestUpdateWithWhereUniqueWithoutFarmerInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutFarmerInput | Prisma.HarvestUpdateManyWithWhereWithoutFarmerInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type HarvestCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput> | Prisma.HarvestCreateWithoutProductInput[] | Prisma.HarvestUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutProductInput | Prisma.HarvestCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.HarvestCreateManyProductInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput> | Prisma.HarvestCreateWithoutProductInput[] | Prisma.HarvestUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutProductInput | Prisma.HarvestCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.HarvestCreateManyProductInputEnvelope;
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
};
export type HarvestUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput> | Prisma.HarvestCreateWithoutProductInput[] | Prisma.HarvestUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutProductInput | Prisma.HarvestCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutProductInput | Prisma.HarvestUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.HarvestCreateManyProductInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutProductInput | Prisma.HarvestUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutProductInput | Prisma.HarvestUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type HarvestUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput> | Prisma.HarvestCreateWithoutProductInput[] | Prisma.HarvestUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.HarvestCreateOrConnectWithoutProductInput | Prisma.HarvestCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.HarvestUpsertWithWhereUniqueWithoutProductInput | Prisma.HarvestUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.HarvestCreateManyProductInputEnvelope;
    set?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    disconnect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    delete?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    connect?: Prisma.HarvestWhereUniqueInput | Prisma.HarvestWhereUniqueInput[];
    update?: Prisma.HarvestUpdateWithWhereUniqueWithoutProductInput | Prisma.HarvestUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.HarvestUpdateManyWithWhereWithoutProductInput | Prisma.HarvestUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
};
export type EnumHarvestStatusFieldUpdateOperationsInput = {
    set?: $Enums.HarvestStatus;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type HarvestCreateWithoutApproverInput = {
    id?: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
    farmer: Prisma.FarmerCreateNestedOneWithoutHarvestsInput;
    product: Prisma.ProductCreateNestedOneWithoutHarvestsInput;
};
export type HarvestUncheckedCreateWithoutApproverInput = {
    id?: string;
    farmerId: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestCreateOrConnectWithoutApproverInput = {
    where: Prisma.HarvestWhereUniqueInput;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput>;
};
export type HarvestCreateManyApproverInputEnvelope = {
    data: Prisma.HarvestCreateManyApproverInput | Prisma.HarvestCreateManyApproverInput[];
    skipDuplicates?: boolean;
};
export type HarvestUpsertWithWhereUniqueWithoutApproverInput = {
    where: Prisma.HarvestWhereUniqueInput;
    update: Prisma.XOR<Prisma.HarvestUpdateWithoutApproverInput, Prisma.HarvestUncheckedUpdateWithoutApproverInput>;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutApproverInput, Prisma.HarvestUncheckedCreateWithoutApproverInput>;
};
export type HarvestUpdateWithWhereUniqueWithoutApproverInput = {
    where: Prisma.HarvestWhereUniqueInput;
    data: Prisma.XOR<Prisma.HarvestUpdateWithoutApproverInput, Prisma.HarvestUncheckedUpdateWithoutApproverInput>;
};
export type HarvestUpdateManyWithWhereWithoutApproverInput = {
    where: Prisma.HarvestScalarWhereInput;
    data: Prisma.XOR<Prisma.HarvestUpdateManyMutationInput, Prisma.HarvestUncheckedUpdateManyWithoutApproverInput>;
};
export type HarvestScalarWhereInput = {
    AND?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
    OR?: Prisma.HarvestScalarWhereInput[];
    NOT?: Prisma.HarvestScalarWhereInput | Prisma.HarvestScalarWhereInput[];
    id?: Prisma.StringFilter<"Harvest"> | string;
    farmerId?: Prisma.StringFilter<"Harvest"> | string;
    productId?: Prisma.StringFilter<"Harvest"> | string;
    quantityAvailable?: Prisma.IntFilter<"Harvest"> | number;
    unitPrice?: Prisma.DecimalFilter<"Harvest"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    availableUntil?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
    status?: Prisma.EnumHarvestStatusFilter<"Harvest"> | $Enums.HarvestStatus;
    approvedBy?: Prisma.StringNullableFilter<"Harvest"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"Harvest"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Harvest"> | Date | string;
};
export type HarvestCreateWithoutFarmerInput = {
    id?: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
    product: Prisma.ProductCreateNestedOneWithoutHarvestsInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovedHarvestsInput;
};
export type HarvestUncheckedCreateWithoutFarmerInput = {
    id?: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestCreateOrConnectWithoutFarmerInput = {
    where: Prisma.HarvestWhereUniqueInput;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput>;
};
export type HarvestCreateManyFarmerInputEnvelope = {
    data: Prisma.HarvestCreateManyFarmerInput | Prisma.HarvestCreateManyFarmerInput[];
    skipDuplicates?: boolean;
};
export type HarvestUpsertWithWhereUniqueWithoutFarmerInput = {
    where: Prisma.HarvestWhereUniqueInput;
    update: Prisma.XOR<Prisma.HarvestUpdateWithoutFarmerInput, Prisma.HarvestUncheckedUpdateWithoutFarmerInput>;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutFarmerInput, Prisma.HarvestUncheckedCreateWithoutFarmerInput>;
};
export type HarvestUpdateWithWhereUniqueWithoutFarmerInput = {
    where: Prisma.HarvestWhereUniqueInput;
    data: Prisma.XOR<Prisma.HarvestUpdateWithoutFarmerInput, Prisma.HarvestUncheckedUpdateWithoutFarmerInput>;
};
export type HarvestUpdateManyWithWhereWithoutFarmerInput = {
    where: Prisma.HarvestScalarWhereInput;
    data: Prisma.XOR<Prisma.HarvestUpdateManyMutationInput, Prisma.HarvestUncheckedUpdateManyWithoutFarmerInput>;
};
export type HarvestCreateWithoutProductInput = {
    id?: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
    farmer: Prisma.FarmerCreateNestedOneWithoutHarvestsInput;
    approver?: Prisma.UserCreateNestedOneWithoutApprovedHarvestsInput;
};
export type HarvestUncheckedCreateWithoutProductInput = {
    id?: string;
    farmerId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestCreateOrConnectWithoutProductInput = {
    where: Prisma.HarvestWhereUniqueInput;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput>;
};
export type HarvestCreateManyProductInputEnvelope = {
    data: Prisma.HarvestCreateManyProductInput | Prisma.HarvestCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type HarvestUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.HarvestWhereUniqueInput;
    update: Prisma.XOR<Prisma.HarvestUpdateWithoutProductInput, Prisma.HarvestUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.HarvestCreateWithoutProductInput, Prisma.HarvestUncheckedCreateWithoutProductInput>;
};
export type HarvestUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.HarvestWhereUniqueInput;
    data: Prisma.XOR<Prisma.HarvestUpdateWithoutProductInput, Prisma.HarvestUncheckedUpdateWithoutProductInput>;
};
export type HarvestUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.HarvestScalarWhereInput;
    data: Prisma.XOR<Prisma.HarvestUpdateManyMutationInput, Prisma.HarvestUncheckedUpdateManyWithoutProductInput>;
};
export type HarvestCreateManyApproverInput = {
    id?: string;
    farmerId: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    farmer?: Prisma.FarmerUpdateOneRequiredWithoutHarvestsNestedInput;
    product?: Prisma.ProductUpdateOneRequiredWithoutHarvestsNestedInput;
};
export type HarvestUncheckedUpdateWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestUncheckedUpdateManyWithoutApproverInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestCreateManyFarmerInput = {
    id?: string;
    productId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestUpdateWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    product?: Prisma.ProductUpdateOneRequiredWithoutHarvestsNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovedHarvestsNestedInput;
};
export type HarvestUncheckedUpdateWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestUncheckedUpdateManyWithoutFarmerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestCreateManyProductInput = {
    id?: string;
    farmerId: string;
    quantityAvailable: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate: Date | string;
    availableUntil: Date | string;
    status?: $Enums.HarvestStatus;
    approvedBy?: string | null;
    approvedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type HarvestUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    farmer?: Prisma.FarmerUpdateOneRequiredWithoutHarvestsNestedInput;
    approver?: Prisma.UserUpdateOneWithoutApprovedHarvestsNestedInput;
};
export type HarvestUncheckedUpdateWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestUncheckedUpdateManyWithoutProductInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    farmerId?: Prisma.StringFieldUpdateOperationsInput | string;
    quantityAvailable?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    harvestDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    availableUntil?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumHarvestStatusFieldUpdateOperationsInput | $Enums.HarvestStatus;
    approvedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HarvestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    quantityAvailable?: boolean;
    unitPrice?: boolean;
    harvestDate?: boolean;
    availableUntil?: boolean;
    status?: boolean;
    approvedBy?: boolean;
    approvedAt?: boolean;
    createdAt?: boolean;
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
}, ExtArgs["result"]["harvest"]>;
export type HarvestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    quantityAvailable?: boolean;
    unitPrice?: boolean;
    harvestDate?: boolean;
    availableUntil?: boolean;
    status?: boolean;
    approvedBy?: boolean;
    approvedAt?: boolean;
    createdAt?: boolean;
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
}, ExtArgs["result"]["harvest"]>;
export type HarvestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    quantityAvailable?: boolean;
    unitPrice?: boolean;
    harvestDate?: boolean;
    availableUntil?: boolean;
    status?: boolean;
    approvedBy?: boolean;
    approvedAt?: boolean;
    createdAt?: boolean;
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
}, ExtArgs["result"]["harvest"]>;
export type HarvestSelectScalar = {
    id?: boolean;
    farmerId?: boolean;
    productId?: boolean;
    quantityAvailable?: boolean;
    unitPrice?: boolean;
    harvestDate?: boolean;
    availableUntil?: boolean;
    status?: boolean;
    approvedBy?: boolean;
    approvedAt?: boolean;
    createdAt?: boolean;
};
export type HarvestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "farmerId" | "productId" | "quantityAvailable" | "unitPrice" | "harvestDate" | "availableUntil" | "status" | "approvedBy" | "approvedAt" | "createdAt", ExtArgs["result"]["harvest"]>;
export type HarvestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
};
export type HarvestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
};
export type HarvestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    farmer?: boolean | Prisma.FarmerDefaultArgs<ExtArgs>;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    approver?: boolean | Prisma.Harvest$approverArgs<ExtArgs>;
};
export type $HarvestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Harvest";
    objects: {
        farmer: Prisma.$FarmerPayload<ExtArgs>;
        product: Prisma.$ProductPayload<ExtArgs>;
        approver: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        farmerId: string;
        productId: string;
        quantityAvailable: number;
        unitPrice: runtime.Decimal;
        harvestDate: Date;
        availableUntil: Date;
        status: $Enums.HarvestStatus;
        approvedBy: string | null;
        approvedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["harvest"]>;
    composites: {};
};
export type HarvestGetPayload<S extends boolean | null | undefined | HarvestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HarvestPayload, S>;
export type HarvestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HarvestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HarvestCountAggregateInputType | true;
};
export interface HarvestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Harvest'];
        meta: {
            name: 'Harvest';
        };
    };
    /**
     * Find zero or one Harvest that matches the filter.
     * @param {HarvestFindUniqueArgs} args - Arguments to find a Harvest
     * @example
     * // Get one Harvest
     * const harvest = await prisma.harvest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HarvestFindUniqueArgs>(args: Prisma.SelectSubset<T, HarvestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Harvest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HarvestFindUniqueOrThrowArgs} args - Arguments to find a Harvest
     * @example
     * // Get one Harvest
     * const harvest = await prisma.harvest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HarvestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HarvestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Harvest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestFindFirstArgs} args - Arguments to find a Harvest
     * @example
     * // Get one Harvest
     * const harvest = await prisma.harvest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HarvestFindFirstArgs>(args?: Prisma.SelectSubset<T, HarvestFindFirstArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Harvest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestFindFirstOrThrowArgs} args - Arguments to find a Harvest
     * @example
     * // Get one Harvest
     * const harvest = await prisma.harvest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HarvestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HarvestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Harvests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Harvests
     * const harvests = await prisma.harvest.findMany()
     *
     * // Get first 10 Harvests
     * const harvests = await prisma.harvest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const harvestWithIdOnly = await prisma.harvest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HarvestFindManyArgs>(args?: Prisma.SelectSubset<T, HarvestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Harvest.
     * @param {HarvestCreateArgs} args - Arguments to create a Harvest.
     * @example
     * // Create one Harvest
     * const Harvest = await prisma.harvest.create({
     *   data: {
     *     // ... data to create a Harvest
     *   }
     * })
     *
     */
    create<T extends HarvestCreateArgs>(args: Prisma.SelectSubset<T, HarvestCreateArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Harvests.
     * @param {HarvestCreateManyArgs} args - Arguments to create many Harvests.
     * @example
     * // Create many Harvests
     * const harvest = await prisma.harvest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HarvestCreateManyArgs>(args?: Prisma.SelectSubset<T, HarvestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Harvests and returns the data saved in the database.
     * @param {HarvestCreateManyAndReturnArgs} args - Arguments to create many Harvests.
     * @example
     * // Create many Harvests
     * const harvest = await prisma.harvest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Harvests and only return the `id`
     * const harvestWithIdOnly = await prisma.harvest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HarvestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HarvestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Harvest.
     * @param {HarvestDeleteArgs} args - Arguments to delete one Harvest.
     * @example
     * // Delete one Harvest
     * const Harvest = await prisma.harvest.delete({
     *   where: {
     *     // ... filter to delete one Harvest
     *   }
     * })
     *
     */
    delete<T extends HarvestDeleteArgs>(args: Prisma.SelectSubset<T, HarvestDeleteArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Harvest.
     * @param {HarvestUpdateArgs} args - Arguments to update one Harvest.
     * @example
     * // Update one Harvest
     * const harvest = await prisma.harvest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HarvestUpdateArgs>(args: Prisma.SelectSubset<T, HarvestUpdateArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Harvests.
     * @param {HarvestDeleteManyArgs} args - Arguments to filter Harvests to delete.
     * @example
     * // Delete a few Harvests
     * const { count } = await prisma.harvest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HarvestDeleteManyArgs>(args?: Prisma.SelectSubset<T, HarvestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Harvests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Harvests
     * const harvest = await prisma.harvest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HarvestUpdateManyArgs>(args: Prisma.SelectSubset<T, HarvestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Harvests and returns the data updated in the database.
     * @param {HarvestUpdateManyAndReturnArgs} args - Arguments to update many Harvests.
     * @example
     * // Update many Harvests
     * const harvest = await prisma.harvest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Harvests and only return the `id`
     * const harvestWithIdOnly = await prisma.harvest.updateManyAndReturn({
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
    updateManyAndReturn<T extends HarvestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HarvestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Harvest.
     * @param {HarvestUpsertArgs} args - Arguments to update or create a Harvest.
     * @example
     * // Update or create a Harvest
     * const harvest = await prisma.harvest.upsert({
     *   create: {
     *     // ... data to create a Harvest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Harvest we want to update
     *   }
     * })
     */
    upsert<T extends HarvestUpsertArgs>(args: Prisma.SelectSubset<T, HarvestUpsertArgs<ExtArgs>>): Prisma.Prisma__HarvestClient<runtime.Types.Result.GetResult<Prisma.$HarvestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Harvests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestCountArgs} args - Arguments to filter Harvests to count.
     * @example
     * // Count the number of Harvests
     * const count = await prisma.harvest.count({
     *   where: {
     *     // ... the filter for the Harvests we want to count
     *   }
     * })
    **/
    count<T extends HarvestCountArgs>(args?: Prisma.Subset<T, HarvestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HarvestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Harvest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HarvestAggregateArgs>(args: Prisma.Subset<T, HarvestAggregateArgs>): Prisma.PrismaPromise<GetHarvestAggregateType<T>>;
    /**
     * Group by Harvest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HarvestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends HarvestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HarvestGroupByArgs['orderBy'];
    } : {
        orderBy?: HarvestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HarvestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHarvestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Harvest model
     */
    readonly fields: HarvestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Harvest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__HarvestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    farmer<T extends Prisma.FarmerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FarmerDefaultArgs<ExtArgs>>): Prisma.Prisma__FarmerClient<runtime.Types.Result.GetResult<Prisma.$FarmerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    approver<T extends Prisma.Harvest$approverArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Harvest$approverArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Harvest model
 */
export interface HarvestFieldRefs {
    readonly id: Prisma.FieldRef<"Harvest", 'String'>;
    readonly farmerId: Prisma.FieldRef<"Harvest", 'String'>;
    readonly productId: Prisma.FieldRef<"Harvest", 'String'>;
    readonly quantityAvailable: Prisma.FieldRef<"Harvest", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"Harvest", 'Decimal'>;
    readonly harvestDate: Prisma.FieldRef<"Harvest", 'DateTime'>;
    readonly availableUntil: Prisma.FieldRef<"Harvest", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Harvest", 'HarvestStatus'>;
    readonly approvedBy: Prisma.FieldRef<"Harvest", 'String'>;
    readonly approvedAt: Prisma.FieldRef<"Harvest", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Harvest", 'DateTime'>;
}
/**
 * Harvest findUnique
 */
export type HarvestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Harvest to fetch.
     */
    where: Prisma.HarvestWhereUniqueInput;
};
/**
 * Harvest findUniqueOrThrow
 */
export type HarvestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Harvest to fetch.
     */
    where: Prisma.HarvestWhereUniqueInput;
};
/**
 * Harvest findFirst
 */
export type HarvestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Harvest to fetch.
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Harvests to fetch.
     */
    orderBy?: Prisma.HarvestOrderByWithRelationInput | Prisma.HarvestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Harvests.
     */
    cursor?: Prisma.HarvestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Harvests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Harvests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Harvests.
     */
    distinct?: Prisma.HarvestScalarFieldEnum | Prisma.HarvestScalarFieldEnum[];
};
/**
 * Harvest findFirstOrThrow
 */
export type HarvestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Harvest to fetch.
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Harvests to fetch.
     */
    orderBy?: Prisma.HarvestOrderByWithRelationInput | Prisma.HarvestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Harvests.
     */
    cursor?: Prisma.HarvestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Harvests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Harvests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Harvests.
     */
    distinct?: Prisma.HarvestScalarFieldEnum | Prisma.HarvestScalarFieldEnum[];
};
/**
 * Harvest findMany
 */
export type HarvestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Harvests to fetch.
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Harvests to fetch.
     */
    orderBy?: Prisma.HarvestOrderByWithRelationInput | Prisma.HarvestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Harvests.
     */
    cursor?: Prisma.HarvestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Harvests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Harvests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Harvests.
     */
    distinct?: Prisma.HarvestScalarFieldEnum | Prisma.HarvestScalarFieldEnum[];
};
/**
 * Harvest create
 */
export type HarvestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Harvest.
     */
    data: Prisma.XOR<Prisma.HarvestCreateInput, Prisma.HarvestUncheckedCreateInput>;
};
/**
 * Harvest createMany
 */
export type HarvestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Harvests.
     */
    data: Prisma.HarvestCreateManyInput | Prisma.HarvestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Harvest createManyAndReturn
 */
export type HarvestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Harvest
     */
    select?: Prisma.HarvestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Harvest
     */
    omit?: Prisma.HarvestOmit<ExtArgs> | null;
    /**
     * The data used to create many Harvests.
     */
    data: Prisma.HarvestCreateManyInput | Prisma.HarvestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HarvestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Harvest update
 */
export type HarvestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Harvest.
     */
    data: Prisma.XOR<Prisma.HarvestUpdateInput, Prisma.HarvestUncheckedUpdateInput>;
    /**
     * Choose, which Harvest to update.
     */
    where: Prisma.HarvestWhereUniqueInput;
};
/**
 * Harvest updateMany
 */
export type HarvestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Harvests.
     */
    data: Prisma.XOR<Prisma.HarvestUpdateManyMutationInput, Prisma.HarvestUncheckedUpdateManyInput>;
    /**
     * Filter which Harvests to update
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * Limit how many Harvests to update.
     */
    limit?: number;
};
/**
 * Harvest updateManyAndReturn
 */
export type HarvestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Harvest
     */
    select?: Prisma.HarvestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Harvest
     */
    omit?: Prisma.HarvestOmit<ExtArgs> | null;
    /**
     * The data used to update Harvests.
     */
    data: Prisma.XOR<Prisma.HarvestUpdateManyMutationInput, Prisma.HarvestUncheckedUpdateManyInput>;
    /**
     * Filter which Harvests to update
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * Limit how many Harvests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.HarvestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Harvest upsert
 */
export type HarvestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Harvest to update in case it exists.
     */
    where: Prisma.HarvestWhereUniqueInput;
    /**
     * In case the Harvest found by the `where` argument doesn't exist, create a new Harvest with this data.
     */
    create: Prisma.XOR<Prisma.HarvestCreateInput, Prisma.HarvestUncheckedCreateInput>;
    /**
     * In case the Harvest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.HarvestUpdateInput, Prisma.HarvestUncheckedUpdateInput>;
};
/**
 * Harvest delete
 */
export type HarvestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Harvest to delete.
     */
    where: Prisma.HarvestWhereUniqueInput;
};
/**
 * Harvest deleteMany
 */
export type HarvestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Harvests to delete
     */
    where?: Prisma.HarvestWhereInput;
    /**
     * Limit how many Harvests to delete.
     */
    limit?: number;
};
/**
 * Harvest.approver
 */
export type Harvest$approverArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * Harvest without action
 */
export type HarvestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Harvest.d.ts.map