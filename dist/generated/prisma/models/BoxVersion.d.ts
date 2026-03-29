import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model BoxVersion
 *
 */
export type BoxVersionModel = runtime.Types.Result.DefaultSelection<Prisma.$BoxVersionPayload>;
export type AggregateBoxVersion = {
    _count: BoxVersionCountAggregateOutputType | null;
    _min: BoxVersionMinAggregateOutputType | null;
    _max: BoxVersionMaxAggregateOutputType | null;
};
export type BoxVersionMinAggregateOutputType = {
    id: string | null;
    boxId: string | null;
    versionName: string | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
};
export type BoxVersionMaxAggregateOutputType = {
    id: string | null;
    boxId: string | null;
    versionName: string | null;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date | null;
};
export type BoxVersionCountAggregateOutputType = {
    id: number;
    boxId: number;
    versionName: number;
    startDate: number;
    endDate: number;
    createdAt: number;
    _all: number;
};
export type BoxVersionMinAggregateInputType = {
    id?: true;
    boxId?: true;
    versionName?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
};
export type BoxVersionMaxAggregateInputType = {
    id?: true;
    boxId?: true;
    versionName?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
};
export type BoxVersionCountAggregateInputType = {
    id?: true;
    boxId?: true;
    versionName?: true;
    startDate?: true;
    endDate?: true;
    createdAt?: true;
    _all?: true;
};
export type BoxVersionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BoxVersion to aggregate.
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoxVersions to fetch.
     */
    orderBy?: Prisma.BoxVersionOrderByWithRelationInput | Prisma.BoxVersionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BoxVersionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoxVersions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoxVersions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned BoxVersions
    **/
    _count?: true | BoxVersionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BoxVersionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BoxVersionMaxAggregateInputType;
};
export type GetBoxVersionAggregateType<T extends BoxVersionAggregateArgs> = {
    [P in keyof T & keyof AggregateBoxVersion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBoxVersion[P]> : Prisma.GetScalarType<T[P], AggregateBoxVersion[P]>;
};
export type BoxVersionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BoxVersionWhereInput;
    orderBy?: Prisma.BoxVersionOrderByWithAggregationInput | Prisma.BoxVersionOrderByWithAggregationInput[];
    by: Prisma.BoxVersionScalarFieldEnum[] | Prisma.BoxVersionScalarFieldEnum;
    having?: Prisma.BoxVersionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BoxVersionCountAggregateInputType | true;
    _min?: BoxVersionMinAggregateInputType;
    _max?: BoxVersionMaxAggregateInputType;
};
export type BoxVersionGroupByOutputType = {
    id: string;
    boxId: string;
    versionName: string;
    startDate: Date;
    endDate: Date | null;
    createdAt: Date;
    _count: BoxVersionCountAggregateOutputType | null;
    _min: BoxVersionMinAggregateOutputType | null;
    _max: BoxVersionMaxAggregateOutputType | null;
};
type GetBoxVersionGroupByPayload<T extends BoxVersionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BoxVersionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BoxVersionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BoxVersionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BoxVersionGroupByOutputType[P]>;
}>>;
export type BoxVersionWhereInput = {
    AND?: Prisma.BoxVersionWhereInput | Prisma.BoxVersionWhereInput[];
    OR?: Prisma.BoxVersionWhereInput[];
    NOT?: Prisma.BoxVersionWhereInput | Prisma.BoxVersionWhereInput[];
    id?: Prisma.StringFilter<"BoxVersion"> | string;
    boxId?: Prisma.StringFilter<"BoxVersion"> | string;
    versionName?: Prisma.StringFilter<"BoxVersion"> | string;
    startDate?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"BoxVersion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
    box?: Prisma.XOR<Prisma.BoxScalarRelationFilter, Prisma.BoxWhereInput>;
    items?: Prisma.BoxItemListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    capacities?: Prisma.CapacitySnapshotListRelationFilter;
    reservations?: Prisma.InventoryReservationListRelationFilter;
};
export type BoxVersionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    boxId?: Prisma.SortOrder;
    versionName?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    box?: Prisma.BoxOrderByWithRelationInput;
    items?: Prisma.BoxItemOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    capacities?: Prisma.CapacitySnapshotOrderByRelationAggregateInput;
    reservations?: Prisma.InventoryReservationOrderByRelationAggregateInput;
};
export type BoxVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BoxVersionWhereInput | Prisma.BoxVersionWhereInput[];
    OR?: Prisma.BoxVersionWhereInput[];
    NOT?: Prisma.BoxVersionWhereInput | Prisma.BoxVersionWhereInput[];
    boxId?: Prisma.StringFilter<"BoxVersion"> | string;
    versionName?: Prisma.StringFilter<"BoxVersion"> | string;
    startDate?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"BoxVersion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
    box?: Prisma.XOR<Prisma.BoxScalarRelationFilter, Prisma.BoxWhereInput>;
    items?: Prisma.BoxItemListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    capacities?: Prisma.CapacitySnapshotListRelationFilter;
    reservations?: Prisma.InventoryReservationListRelationFilter;
}, "id">;
export type BoxVersionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    boxId?: Prisma.SortOrder;
    versionName?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BoxVersionCountOrderByAggregateInput;
    _max?: Prisma.BoxVersionMaxOrderByAggregateInput;
    _min?: Prisma.BoxVersionMinOrderByAggregateInput;
};
export type BoxVersionScalarWhereWithAggregatesInput = {
    AND?: Prisma.BoxVersionScalarWhereWithAggregatesInput | Prisma.BoxVersionScalarWhereWithAggregatesInput[];
    OR?: Prisma.BoxVersionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BoxVersionScalarWhereWithAggregatesInput | Prisma.BoxVersionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BoxVersion"> | string;
    boxId?: Prisma.StringWithAggregatesFilter<"BoxVersion"> | string;
    versionName?: Prisma.StringWithAggregatesFilter<"BoxVersion"> | string;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"BoxVersion"> | Date | string;
    endDate?: Prisma.DateTimeNullableWithAggregatesFilter<"BoxVersion"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BoxVersion"> | Date | string;
};
export type BoxVersionCreateInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    box: Prisma.BoxCreateNestedOneWithoutVersionsInput;
    items?: Prisma.BoxItemCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemUncheckedCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotUncheckedCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    box?: Prisma.BoxUpdateOneRequiredWithoutVersionsNestedInput;
    items?: Prisma.BoxItemUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUncheckedUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUncheckedUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionCreateManyInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
};
export type BoxVersionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BoxVersionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BoxVersionListRelationFilter = {
    every?: Prisma.BoxVersionWhereInput;
    some?: Prisma.BoxVersionWhereInput;
    none?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BoxVersionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    boxId?: Prisma.SortOrder;
    versionName?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxVersionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    boxId?: Prisma.SortOrder;
    versionName?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxVersionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    boxId?: Prisma.SortOrder;
    versionName?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BoxVersionScalarRelationFilter = {
    is?: Prisma.BoxVersionWhereInput;
    isNot?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionCreateNestedManyWithoutBoxInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput> | Prisma.BoxVersionCreateWithoutBoxInput[] | Prisma.BoxVersionUncheckedCreateWithoutBoxInput[];
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutBoxInput | Prisma.BoxVersionCreateOrConnectWithoutBoxInput[];
    createMany?: Prisma.BoxVersionCreateManyBoxInputEnvelope;
    connect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
};
export type BoxVersionUncheckedCreateNestedManyWithoutBoxInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput> | Prisma.BoxVersionCreateWithoutBoxInput[] | Prisma.BoxVersionUncheckedCreateWithoutBoxInput[];
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutBoxInput | Prisma.BoxVersionCreateOrConnectWithoutBoxInput[];
    createMany?: Prisma.BoxVersionCreateManyBoxInputEnvelope;
    connect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
};
export type BoxVersionUpdateManyWithoutBoxNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput> | Prisma.BoxVersionCreateWithoutBoxInput[] | Prisma.BoxVersionUncheckedCreateWithoutBoxInput[];
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutBoxInput | Prisma.BoxVersionCreateOrConnectWithoutBoxInput[];
    upsert?: Prisma.BoxVersionUpsertWithWhereUniqueWithoutBoxInput | Prisma.BoxVersionUpsertWithWhereUniqueWithoutBoxInput[];
    createMany?: Prisma.BoxVersionCreateManyBoxInputEnvelope;
    set?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    disconnect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    delete?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    connect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    update?: Prisma.BoxVersionUpdateWithWhereUniqueWithoutBoxInput | Prisma.BoxVersionUpdateWithWhereUniqueWithoutBoxInput[];
    updateMany?: Prisma.BoxVersionUpdateManyWithWhereWithoutBoxInput | Prisma.BoxVersionUpdateManyWithWhereWithoutBoxInput[];
    deleteMany?: Prisma.BoxVersionScalarWhereInput | Prisma.BoxVersionScalarWhereInput[];
};
export type BoxVersionUncheckedUpdateManyWithoutBoxNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput> | Prisma.BoxVersionCreateWithoutBoxInput[] | Prisma.BoxVersionUncheckedCreateWithoutBoxInput[];
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutBoxInput | Prisma.BoxVersionCreateOrConnectWithoutBoxInput[];
    upsert?: Prisma.BoxVersionUpsertWithWhereUniqueWithoutBoxInput | Prisma.BoxVersionUpsertWithWhereUniqueWithoutBoxInput[];
    createMany?: Prisma.BoxVersionCreateManyBoxInputEnvelope;
    set?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    disconnect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    delete?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    connect?: Prisma.BoxVersionWhereUniqueInput | Prisma.BoxVersionWhereUniqueInput[];
    update?: Prisma.BoxVersionUpdateWithWhereUniqueWithoutBoxInput | Prisma.BoxVersionUpdateWithWhereUniqueWithoutBoxInput[];
    updateMany?: Prisma.BoxVersionUpdateManyWithWhereWithoutBoxInput | Prisma.BoxVersionUpdateManyWithWhereWithoutBoxInput[];
    deleteMany?: Prisma.BoxVersionScalarWhereInput | Prisma.BoxVersionScalarWhereInput[];
};
export type BoxVersionCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutItemsInput, Prisma.BoxVersionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutItemsInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
};
export type BoxVersionUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutItemsInput, Prisma.BoxVersionUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.BoxVersionUpsertWithoutItemsInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxVersionUpdateToOneWithWhereWithoutItemsInput, Prisma.BoxVersionUpdateWithoutItemsInput>, Prisma.BoxVersionUncheckedUpdateWithoutItemsInput>;
};
export type BoxVersionCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutOrdersInput, Prisma.BoxVersionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
};
export type BoxVersionUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutOrdersInput, Prisma.BoxVersionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.BoxVersionUpsertWithoutOrdersInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxVersionUpdateToOneWithWhereWithoutOrdersInput, Prisma.BoxVersionUpdateWithoutOrdersInput>, Prisma.BoxVersionUncheckedUpdateWithoutOrdersInput>;
};
export type BoxVersionCreateNestedOneWithoutCapacitiesInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedCreateWithoutCapacitiesInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutCapacitiesInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
};
export type BoxVersionUpdateOneRequiredWithoutCapacitiesNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedCreateWithoutCapacitiesInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutCapacitiesInput;
    upsert?: Prisma.BoxVersionUpsertWithoutCapacitiesInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxVersionUpdateToOneWithWhereWithoutCapacitiesInput, Prisma.BoxVersionUpdateWithoutCapacitiesInput>, Prisma.BoxVersionUncheckedUpdateWithoutCapacitiesInput>;
};
export type BoxVersionCreateNestedOneWithoutReservationsInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutReservationsInput, Prisma.BoxVersionUncheckedCreateWithoutReservationsInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutReservationsInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
};
export type BoxVersionUpdateOneRequiredWithoutReservationsNestedInput = {
    create?: Prisma.XOR<Prisma.BoxVersionCreateWithoutReservationsInput, Prisma.BoxVersionUncheckedCreateWithoutReservationsInput>;
    connectOrCreate?: Prisma.BoxVersionCreateOrConnectWithoutReservationsInput;
    upsert?: Prisma.BoxVersionUpsertWithoutReservationsInput;
    connect?: Prisma.BoxVersionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BoxVersionUpdateToOneWithWhereWithoutReservationsInput, Prisma.BoxVersionUpdateWithoutReservationsInput>, Prisma.BoxVersionUncheckedUpdateWithoutReservationsInput>;
};
export type BoxVersionCreateWithoutBoxInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateWithoutBoxInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemUncheckedCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotUncheckedCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionCreateOrConnectWithoutBoxInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput>;
};
export type BoxVersionCreateManyBoxInputEnvelope = {
    data: Prisma.BoxVersionCreateManyBoxInput | Prisma.BoxVersionCreateManyBoxInput[];
    skipDuplicates?: boolean;
};
export type BoxVersionUpsertWithWhereUniqueWithoutBoxInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    update: Prisma.XOR<Prisma.BoxVersionUpdateWithoutBoxInput, Prisma.BoxVersionUncheckedUpdateWithoutBoxInput>;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutBoxInput, Prisma.BoxVersionUncheckedCreateWithoutBoxInput>;
};
export type BoxVersionUpdateWithWhereUniqueWithoutBoxInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateWithoutBoxInput, Prisma.BoxVersionUncheckedUpdateWithoutBoxInput>;
};
export type BoxVersionUpdateManyWithWhereWithoutBoxInput = {
    where: Prisma.BoxVersionScalarWhereInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateManyMutationInput, Prisma.BoxVersionUncheckedUpdateManyWithoutBoxInput>;
};
export type BoxVersionScalarWhereInput = {
    AND?: Prisma.BoxVersionScalarWhereInput | Prisma.BoxVersionScalarWhereInput[];
    OR?: Prisma.BoxVersionScalarWhereInput[];
    NOT?: Prisma.BoxVersionScalarWhereInput | Prisma.BoxVersionScalarWhereInput[];
    id?: Prisma.StringFilter<"BoxVersion"> | string;
    boxId?: Prisma.StringFilter<"BoxVersion"> | string;
    versionName?: Prisma.StringFilter<"BoxVersion"> | string;
    startDate?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
    endDate?: Prisma.DateTimeNullableFilter<"BoxVersion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"BoxVersion"> | Date | string;
};
export type BoxVersionCreateWithoutItemsInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    box: Prisma.BoxCreateNestedOneWithoutVersionsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateWithoutItemsInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotUncheckedCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionCreateOrConnectWithoutItemsInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutItemsInput, Prisma.BoxVersionUncheckedCreateWithoutItemsInput>;
};
export type BoxVersionUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.BoxVersionUpdateWithoutItemsInput, Prisma.BoxVersionUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutItemsInput, Prisma.BoxVersionUncheckedCreateWithoutItemsInput>;
    where?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.BoxVersionWhereInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateWithoutItemsInput, Prisma.BoxVersionUncheckedUpdateWithoutItemsInput>;
};
export type BoxVersionUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    box?: Prisma.BoxUpdateOneRequiredWithoutVersionsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUncheckedUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionCreateWithoutOrdersInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    box: Prisma.BoxCreateNestedOneWithoutVersionsInput;
    items?: Prisma.BoxItemCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateWithoutOrdersInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemUncheckedCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotUncheckedCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionCreateOrConnectWithoutOrdersInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutOrdersInput, Prisma.BoxVersionUncheckedCreateWithoutOrdersInput>;
};
export type BoxVersionUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.BoxVersionUpdateWithoutOrdersInput, Prisma.BoxVersionUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutOrdersInput, Prisma.BoxVersionUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.BoxVersionWhereInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateWithoutOrdersInput, Prisma.BoxVersionUncheckedUpdateWithoutOrdersInput>;
};
export type BoxVersionUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    box?: Prisma.BoxUpdateOneRequiredWithoutVersionsNestedInput;
    items?: Prisma.BoxItemUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUncheckedUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUncheckedUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionCreateWithoutCapacitiesInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    box: Prisma.BoxCreateNestedOneWithoutVersionsInput;
    items?: Prisma.BoxItemCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateWithoutCapacitiesInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemUncheckedCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutBoxVersionInput;
    reservations?: Prisma.InventoryReservationUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionCreateOrConnectWithoutCapacitiesInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedCreateWithoutCapacitiesInput>;
};
export type BoxVersionUpsertWithoutCapacitiesInput = {
    update: Prisma.XOR<Prisma.BoxVersionUpdateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedUpdateWithoutCapacitiesInput>;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedCreateWithoutCapacitiesInput>;
    where?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionUpdateToOneWithWhereWithoutCapacitiesInput = {
    where?: Prisma.BoxVersionWhereInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateWithoutCapacitiesInput, Prisma.BoxVersionUncheckedUpdateWithoutCapacitiesInput>;
};
export type BoxVersionUpdateWithoutCapacitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    box?: Prisma.BoxUpdateOneRequiredWithoutVersionsNestedInput;
    items?: Prisma.BoxItemUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateWithoutCapacitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUncheckedUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionCreateWithoutReservationsInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    box: Prisma.BoxCreateNestedOneWithoutVersionsInput;
    items?: Prisma.BoxItemCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionUncheckedCreateWithoutReservationsInput = {
    id?: string;
    boxId: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
    items?: Prisma.BoxItemUncheckedCreateNestedManyWithoutBoxVersionInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutBoxVersionInput;
    capacities?: Prisma.CapacitySnapshotUncheckedCreateNestedManyWithoutBoxVersionInput;
};
export type BoxVersionCreateOrConnectWithoutReservationsInput = {
    where: Prisma.BoxVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutReservationsInput, Prisma.BoxVersionUncheckedCreateWithoutReservationsInput>;
};
export type BoxVersionUpsertWithoutReservationsInput = {
    update: Prisma.XOR<Prisma.BoxVersionUpdateWithoutReservationsInput, Prisma.BoxVersionUncheckedUpdateWithoutReservationsInput>;
    create: Prisma.XOR<Prisma.BoxVersionCreateWithoutReservationsInput, Prisma.BoxVersionUncheckedCreateWithoutReservationsInput>;
    where?: Prisma.BoxVersionWhereInput;
};
export type BoxVersionUpdateToOneWithWhereWithoutReservationsInput = {
    where?: Prisma.BoxVersionWhereInput;
    data: Prisma.XOR<Prisma.BoxVersionUpdateWithoutReservationsInput, Prisma.BoxVersionUncheckedUpdateWithoutReservationsInput>;
};
export type BoxVersionUpdateWithoutReservationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    box?: Prisma.BoxUpdateOneRequiredWithoutVersionsNestedInput;
    items?: Prisma.BoxItemUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateWithoutReservationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    boxId?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUncheckedUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionCreateManyBoxInput = {
    id?: string;
    versionName: string;
    startDate: Date | string;
    endDate?: Date | string | null;
    createdAt?: Date | string;
};
export type BoxVersionUpdateWithoutBoxInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateWithoutBoxInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.BoxItemUncheckedUpdateManyWithoutBoxVersionNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutBoxVersionNestedInput;
    capacities?: Prisma.CapacitySnapshotUncheckedUpdateManyWithoutBoxVersionNestedInput;
    reservations?: Prisma.InventoryReservationUncheckedUpdateManyWithoutBoxVersionNestedInput;
};
export type BoxVersionUncheckedUpdateManyWithoutBoxInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    versionName?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type BoxVersionCountOutputType
 */
export type BoxVersionCountOutputType = {
    items: number;
    orders: number;
    capacities: number;
    reservations: number;
};
export type BoxVersionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | BoxVersionCountOutputTypeCountItemsArgs;
    orders?: boolean | BoxVersionCountOutputTypeCountOrdersArgs;
    capacities?: boolean | BoxVersionCountOutputTypeCountCapacitiesArgs;
    reservations?: boolean | BoxVersionCountOutputTypeCountReservationsArgs;
};
/**
 * BoxVersionCountOutputType without action
 */
export type BoxVersionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxVersionCountOutputType
     */
    select?: Prisma.BoxVersionCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * BoxVersionCountOutputType without action
 */
export type BoxVersionCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BoxItemWhereInput;
};
/**
 * BoxVersionCountOutputType without action
 */
export type BoxVersionCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * BoxVersionCountOutputType without action
 */
export type BoxVersionCountOutputTypeCountCapacitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CapacitySnapshotWhereInput;
};
/**
 * BoxVersionCountOutputType without action
 */
export type BoxVersionCountOutputTypeCountReservationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryReservationWhereInput;
};
export type BoxVersionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    boxId?: boolean;
    versionName?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.BoxVersion$itemsArgs<ExtArgs>;
    orders?: boolean | Prisma.BoxVersion$ordersArgs<ExtArgs>;
    capacities?: boolean | Prisma.BoxVersion$capacitiesArgs<ExtArgs>;
    reservations?: boolean | Prisma.BoxVersion$reservationsArgs<ExtArgs>;
    _count?: boolean | Prisma.BoxVersionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["boxVersion"]>;
export type BoxVersionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    boxId?: boolean;
    versionName?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["boxVersion"]>;
export type BoxVersionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    boxId?: boolean;
    versionName?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["boxVersion"]>;
export type BoxVersionSelectScalar = {
    id?: boolean;
    boxId?: boolean;
    versionName?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    createdAt?: boolean;
};
export type BoxVersionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "boxId" | "versionName" | "startDate" | "endDate" | "createdAt", ExtArgs["result"]["boxVersion"]>;
export type BoxVersionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.BoxVersion$itemsArgs<ExtArgs>;
    orders?: boolean | Prisma.BoxVersion$ordersArgs<ExtArgs>;
    capacities?: boolean | Prisma.BoxVersion$capacitiesArgs<ExtArgs>;
    reservations?: boolean | Prisma.BoxVersion$reservationsArgs<ExtArgs>;
    _count?: boolean | Prisma.BoxVersionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BoxVersionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
};
export type BoxVersionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    box?: boolean | Prisma.BoxDefaultArgs<ExtArgs>;
};
export type $BoxVersionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BoxVersion";
    objects: {
        box: Prisma.$BoxPayload<ExtArgs>;
        items: Prisma.$BoxItemPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        capacities: Prisma.$CapacitySnapshotPayload<ExtArgs>[];
        reservations: Prisma.$InventoryReservationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        boxId: string;
        versionName: string;
        startDate: Date;
        endDate: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["boxVersion"]>;
    composites: {};
};
export type BoxVersionGetPayload<S extends boolean | null | undefined | BoxVersionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload, S>;
export type BoxVersionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BoxVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BoxVersionCountAggregateInputType | true;
};
export interface BoxVersionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BoxVersion'];
        meta: {
            name: 'BoxVersion';
        };
    };
    /**
     * Find zero or one BoxVersion that matches the filter.
     * @param {BoxVersionFindUniqueArgs} args - Arguments to find a BoxVersion
     * @example
     * // Get one BoxVersion
     * const boxVersion = await prisma.boxVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BoxVersionFindUniqueArgs>(args: Prisma.SelectSubset<T, BoxVersionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one BoxVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BoxVersionFindUniqueOrThrowArgs} args - Arguments to find a BoxVersion
     * @example
     * // Get one BoxVersion
     * const boxVersion = await prisma.boxVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BoxVersionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BoxVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BoxVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionFindFirstArgs} args - Arguments to find a BoxVersion
     * @example
     * // Get one BoxVersion
     * const boxVersion = await prisma.boxVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BoxVersionFindFirstArgs>(args?: Prisma.SelectSubset<T, BoxVersionFindFirstArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first BoxVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionFindFirstOrThrowArgs} args - Arguments to find a BoxVersion
     * @example
     * // Get one BoxVersion
     * const boxVersion = await prisma.boxVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BoxVersionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BoxVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more BoxVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoxVersions
     * const boxVersions = await prisma.boxVersion.findMany()
     *
     * // Get first 10 BoxVersions
     * const boxVersions = await prisma.boxVersion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const boxVersionWithIdOnly = await prisma.boxVersion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BoxVersionFindManyArgs>(args?: Prisma.SelectSubset<T, BoxVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a BoxVersion.
     * @param {BoxVersionCreateArgs} args - Arguments to create a BoxVersion.
     * @example
     * // Create one BoxVersion
     * const BoxVersion = await prisma.boxVersion.create({
     *   data: {
     *     // ... data to create a BoxVersion
     *   }
     * })
     *
     */
    create<T extends BoxVersionCreateArgs>(args: Prisma.SelectSubset<T, BoxVersionCreateArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many BoxVersions.
     * @param {BoxVersionCreateManyArgs} args - Arguments to create many BoxVersions.
     * @example
     * // Create many BoxVersions
     * const boxVersion = await prisma.boxVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BoxVersionCreateManyArgs>(args?: Prisma.SelectSubset<T, BoxVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many BoxVersions and returns the data saved in the database.
     * @param {BoxVersionCreateManyAndReturnArgs} args - Arguments to create many BoxVersions.
     * @example
     * // Create many BoxVersions
     * const boxVersion = await prisma.boxVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many BoxVersions and only return the `id`
     * const boxVersionWithIdOnly = await prisma.boxVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BoxVersionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BoxVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a BoxVersion.
     * @param {BoxVersionDeleteArgs} args - Arguments to delete one BoxVersion.
     * @example
     * // Delete one BoxVersion
     * const BoxVersion = await prisma.boxVersion.delete({
     *   where: {
     *     // ... filter to delete one BoxVersion
     *   }
     * })
     *
     */
    delete<T extends BoxVersionDeleteArgs>(args: Prisma.SelectSubset<T, BoxVersionDeleteArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one BoxVersion.
     * @param {BoxVersionUpdateArgs} args - Arguments to update one BoxVersion.
     * @example
     * // Update one BoxVersion
     * const boxVersion = await prisma.boxVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BoxVersionUpdateArgs>(args: Prisma.SelectSubset<T, BoxVersionUpdateArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more BoxVersions.
     * @param {BoxVersionDeleteManyArgs} args - Arguments to filter BoxVersions to delete.
     * @example
     * // Delete a few BoxVersions
     * const { count } = await prisma.boxVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BoxVersionDeleteManyArgs>(args?: Prisma.SelectSubset<T, BoxVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BoxVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoxVersions
     * const boxVersion = await prisma.boxVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BoxVersionUpdateManyArgs>(args: Prisma.SelectSubset<T, BoxVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more BoxVersions and returns the data updated in the database.
     * @param {BoxVersionUpdateManyAndReturnArgs} args - Arguments to update many BoxVersions.
     * @example
     * // Update many BoxVersions
     * const boxVersion = await prisma.boxVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more BoxVersions and only return the `id`
     * const boxVersionWithIdOnly = await prisma.boxVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends BoxVersionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BoxVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one BoxVersion.
     * @param {BoxVersionUpsertArgs} args - Arguments to update or create a BoxVersion.
     * @example
     * // Update or create a BoxVersion
     * const boxVersion = await prisma.boxVersion.upsert({
     *   create: {
     *     // ... data to create a BoxVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoxVersion we want to update
     *   }
     * })
     */
    upsert<T extends BoxVersionUpsertArgs>(args: Prisma.SelectSubset<T, BoxVersionUpsertArgs<ExtArgs>>): Prisma.Prisma__BoxVersionClient<runtime.Types.Result.GetResult<Prisma.$BoxVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of BoxVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionCountArgs} args - Arguments to filter BoxVersions to count.
     * @example
     * // Count the number of BoxVersions
     * const count = await prisma.boxVersion.count({
     *   where: {
     *     // ... the filter for the BoxVersions we want to count
     *   }
     * })
    **/
    count<T extends BoxVersionCountArgs>(args?: Prisma.Subset<T, BoxVersionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BoxVersionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a BoxVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BoxVersionAggregateArgs>(args: Prisma.Subset<T, BoxVersionAggregateArgs>): Prisma.PrismaPromise<GetBoxVersionAggregateType<T>>;
    /**
     * Group by BoxVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoxVersionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends BoxVersionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BoxVersionGroupByArgs['orderBy'];
    } : {
        orderBy?: BoxVersionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BoxVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoxVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the BoxVersion model
     */
    readonly fields: BoxVersionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for BoxVersion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BoxVersionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    box<T extends Prisma.BoxDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BoxDefaultArgs<ExtArgs>>): Prisma.Prisma__BoxClient<runtime.Types.Result.GetResult<Prisma.$BoxPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.BoxVersion$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BoxVersion$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BoxItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.BoxVersion$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BoxVersion$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    capacities<T extends Prisma.BoxVersion$capacitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BoxVersion$capacitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CapacitySnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reservations<T extends Prisma.BoxVersion$reservationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BoxVersion$reservationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryReservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the BoxVersion model
 */
export interface BoxVersionFieldRefs {
    readonly id: Prisma.FieldRef<"BoxVersion", 'String'>;
    readonly boxId: Prisma.FieldRef<"BoxVersion", 'String'>;
    readonly versionName: Prisma.FieldRef<"BoxVersion", 'String'>;
    readonly startDate: Prisma.FieldRef<"BoxVersion", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"BoxVersion", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"BoxVersion", 'DateTime'>;
}
/**
 * BoxVersion findUnique
 */
export type BoxVersionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which BoxVersion to fetch.
     */
    where: Prisma.BoxVersionWhereUniqueInput;
};
/**
 * BoxVersion findUniqueOrThrow
 */
export type BoxVersionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which BoxVersion to fetch.
     */
    where: Prisma.BoxVersionWhereUniqueInput;
};
/**
 * BoxVersion findFirst
 */
export type BoxVersionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which BoxVersion to fetch.
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoxVersions to fetch.
     */
    orderBy?: Prisma.BoxVersionOrderByWithRelationInput | Prisma.BoxVersionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BoxVersions.
     */
    cursor?: Prisma.BoxVersionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoxVersions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoxVersions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoxVersions.
     */
    distinct?: Prisma.BoxVersionScalarFieldEnum | Prisma.BoxVersionScalarFieldEnum[];
};
/**
 * BoxVersion findFirstOrThrow
 */
export type BoxVersionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which BoxVersion to fetch.
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoxVersions to fetch.
     */
    orderBy?: Prisma.BoxVersionOrderByWithRelationInput | Prisma.BoxVersionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for BoxVersions.
     */
    cursor?: Prisma.BoxVersionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoxVersions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoxVersions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoxVersions.
     */
    distinct?: Prisma.BoxVersionScalarFieldEnum | Prisma.BoxVersionScalarFieldEnum[];
};
/**
 * BoxVersion findMany
 */
export type BoxVersionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which BoxVersions to fetch.
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of BoxVersions to fetch.
     */
    orderBy?: Prisma.BoxVersionOrderByWithRelationInput | Prisma.BoxVersionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing BoxVersions.
     */
    cursor?: Prisma.BoxVersionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` BoxVersions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` BoxVersions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of BoxVersions.
     */
    distinct?: Prisma.BoxVersionScalarFieldEnum | Prisma.BoxVersionScalarFieldEnum[];
};
/**
 * BoxVersion create
 */
export type BoxVersionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a BoxVersion.
     */
    data: Prisma.XOR<Prisma.BoxVersionCreateInput, Prisma.BoxVersionUncheckedCreateInput>;
};
/**
 * BoxVersion createMany
 */
export type BoxVersionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many BoxVersions.
     */
    data: Prisma.BoxVersionCreateManyInput | Prisma.BoxVersionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * BoxVersion createManyAndReturn
 */
export type BoxVersionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxVersion
     */
    select?: Prisma.BoxVersionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BoxVersion
     */
    omit?: Prisma.BoxVersionOmit<ExtArgs> | null;
    /**
     * The data used to create many BoxVersions.
     */
    data: Prisma.BoxVersionCreateManyInput | Prisma.BoxVersionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxVersionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * BoxVersion update
 */
export type BoxVersionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a BoxVersion.
     */
    data: Prisma.XOR<Prisma.BoxVersionUpdateInput, Prisma.BoxVersionUncheckedUpdateInput>;
    /**
     * Choose, which BoxVersion to update.
     */
    where: Prisma.BoxVersionWhereUniqueInput;
};
/**
 * BoxVersion updateMany
 */
export type BoxVersionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update BoxVersions.
     */
    data: Prisma.XOR<Prisma.BoxVersionUpdateManyMutationInput, Prisma.BoxVersionUncheckedUpdateManyInput>;
    /**
     * Filter which BoxVersions to update
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * Limit how many BoxVersions to update.
     */
    limit?: number;
};
/**
 * BoxVersion updateManyAndReturn
 */
export type BoxVersionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxVersion
     */
    select?: Prisma.BoxVersionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the BoxVersion
     */
    omit?: Prisma.BoxVersionOmit<ExtArgs> | null;
    /**
     * The data used to update BoxVersions.
     */
    data: Prisma.XOR<Prisma.BoxVersionUpdateManyMutationInput, Prisma.BoxVersionUncheckedUpdateManyInput>;
    /**
     * Filter which BoxVersions to update
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * Limit how many BoxVersions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxVersionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * BoxVersion upsert
 */
export type BoxVersionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the BoxVersion to update in case it exists.
     */
    where: Prisma.BoxVersionWhereUniqueInput;
    /**
     * In case the BoxVersion found by the `where` argument doesn't exist, create a new BoxVersion with this data.
     */
    create: Prisma.XOR<Prisma.BoxVersionCreateInput, Prisma.BoxVersionUncheckedCreateInput>;
    /**
     * In case the BoxVersion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BoxVersionUpdateInput, Prisma.BoxVersionUncheckedUpdateInput>;
};
/**
 * BoxVersion delete
 */
export type BoxVersionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which BoxVersion to delete.
     */
    where: Prisma.BoxVersionWhereUniqueInput;
};
/**
 * BoxVersion deleteMany
 */
export type BoxVersionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which BoxVersions to delete
     */
    where?: Prisma.BoxVersionWhereInput;
    /**
     * Limit how many BoxVersions to delete.
     */
    limit?: number;
};
/**
 * BoxVersion.items
 */
export type BoxVersion$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BoxItem
     */
    select?: Prisma.BoxItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BoxItem
     */
    omit?: Prisma.BoxItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BoxItemInclude<ExtArgs> | null;
    where?: Prisma.BoxItemWhereInput;
    orderBy?: Prisma.BoxItemOrderByWithRelationInput | Prisma.BoxItemOrderByWithRelationInput[];
    cursor?: Prisma.BoxItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BoxItemScalarFieldEnum | Prisma.BoxItemScalarFieldEnum[];
};
/**
 * BoxVersion.orders
 */
export type BoxVersion$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * BoxVersion.capacities
 */
export type BoxVersion$capacitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CapacitySnapshot
     */
    select?: Prisma.CapacitySnapshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CapacitySnapshot
     */
    omit?: Prisma.CapacitySnapshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CapacitySnapshotInclude<ExtArgs> | null;
    where?: Prisma.CapacitySnapshotWhereInput;
    orderBy?: Prisma.CapacitySnapshotOrderByWithRelationInput | Prisma.CapacitySnapshotOrderByWithRelationInput[];
    cursor?: Prisma.CapacitySnapshotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CapacitySnapshotScalarFieldEnum | Prisma.CapacitySnapshotScalarFieldEnum[];
};
/**
 * BoxVersion.reservations
 */
export type BoxVersion$reservationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryReservation
     */
    select?: Prisma.InventoryReservationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryReservation
     */
    omit?: Prisma.InventoryReservationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryReservationInclude<ExtArgs> | null;
    where?: Prisma.InventoryReservationWhereInput;
    orderBy?: Prisma.InventoryReservationOrderByWithRelationInput | Prisma.InventoryReservationOrderByWithRelationInput[];
    cursor?: Prisma.InventoryReservationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryReservationScalarFieldEnum | Prisma.InventoryReservationScalarFieldEnum[];
};
/**
 * BoxVersion without action
 */
export type BoxVersionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=BoxVersion.d.ts.map