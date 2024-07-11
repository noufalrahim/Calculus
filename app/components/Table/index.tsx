import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef,
} from '@tanstack/react-table';

import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import Footer from '../Footer';

interface TableProps {
    data: any[];
    columns: ColumnDef<any, any>[];
    columnFilters: any;
    isClickable: boolean;
    link: string;
    index: number;
    setRenderComponent: any;
    handleDeleteRow?: any;
    handleEditRow?: any;
    handleViewBarcode?: any;
    setComponentId?: any;
    setPayOpsId?: any;
}

export default function Table({
    data,
    columns,
    columnFilters,
    isClickable,
    link,
    setRenderComponent,
    index,
    handleDeleteRow,
    handleEditRow,
    handleViewBarcode,
    setComponentId,
    setPayOpsId,
}: TableProps) {
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 22,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination,
        },
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const handlePreviousPage = () => {
        table.previousPage();
    };

    const handleNextPage = () => {
        table.nextPage();
    };

    return (
        <>
            <table className="table-striped text-[14px]" width={table.getTotalSize()}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                    className={`w-[${header.getSize()}] border-r-2 font-bold border border-gray-200 ${header.column.getIsResizing() ? 'bg-gray-200' : ''}`}
                                >
                                    <div className="flex flex-row justify-between">
                                        {String(header.column.columnDef.header)}
                                        {header.column.getCanSort() && (
                                            <div
                                                className="flex flex-row justify-between items-center"
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {!header.column.getIsSorted() && (
                                                    <span className="icon icon-arrow-combo"></span>
                                                )}
                                                <div className="ml-1 justify-self-end items-center flex">
                                                    {header.column.getIsSorted() === 'asc' && (
                                                        <span className="icon icon-up-open"></span>
                                                    )}
                                                    {header.column.getIsSorted() === 'desc' && (
                                                        <span className="icon icon-down-open"></span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row: any) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell: any) => (
                                <td
                                    key={cell.id}
                                    width={cell.column.getSize()}
                                    className={`border-r-2 border-gray-200 ${isClickable ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                        if (isClickable && link) {
                                            setPayOpsId(cell.row.original);
                                            setComponentId(link);
                                        }
                                    }}
                                >
                                    {cell.column.columnDef.accessorKey === 'EDIT' ? (
                                        <div className="flex flex-row justify-between">
                                            <span
                                                className="text-blue-500 cursor-pointer"
                                                onClick={() => handleEditRow(cell.row.original)}
                                            >
                                                EDIT
                                            </span>
                                        </div>
                                    ) : cell.column.columnDef.accessorKey === 'DELETE' ? (
                                        <div className="flex flex-row justify-between">
                                            <button
                                                className="text-red-500 cursor-pointer btn w-24"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDeleteRow(cell.row.original.ID);
                                                }}
                                            >
                                                DELETE
                                            </button>
                                        </div>
                                    ) : cell.column.columnDef.accessorKey === 'VIEW' ? (
                                        <div className="flex flex-row justify-between">
                                            <span
                                                className="text-blue-500 cursor-pointer"
                                                onClick={() => handleViewBarcode(cell.row.original)}
                                            >
                                                VIEW
                                            </span>
                                        </div>
                                    ) : (
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer
                onClickLeft={handlePreviousPage}
                onClickRight={handleNextPage}
                leftDisabled={!table.getCanPreviousPage()}
                rightDisabled={!table.getCanNextPage()}
            />
        </>
    );
}
