import type { SortingState } from '@tanstack/react-table'
import { createColumnHelper, flexRender, useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'
import { formatPrice } from "helpers"
import { useAppContext, useCoins } from 'context/AppContext'
import { useEffect, useState } from 'react'
import { StyledTable, TableContainer } from './style'

type CoinColumns = {
    Rank: number,
    Name: string,
    Price: string,
    MarketCap: string,
    Change: string
}

const Table = () => {
    const { coins } = useAppContext()
    const [data, setData] = useState<CoinColumns[]>([])
    const [sorting, setSorting] = useState<SortingState>([{id: 'firstName', desc: false}])
    const columnHelper = createColumnHelper<CoinColumns>()

    const columns = [
        columnHelper.accessor("Rank", {
            header: "Rank",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("Name", {
            header: "Name",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("Price", {
            header: "Price",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("MarketCap", {
            header: "Market Cap",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("Change", {
            header: "Change",
            cell: (info) => info.getValue(),
        }),
    ];

    useEffect(() => {
        if(coins) {
            const data = coins?.map(coin => ({
                "Rank": coin.rank,
                "Name": coin.name,
                "Price": formatPrice(coin.price),
                "MarketCap": formatPrice(coin.marketCap),
                "Change": coin.change
            }))
            setData(data)
        }
    }, [coins])


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <TableContainer>
            <StyledTable>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </StyledTable>
        </TableContainer>
    )
}
export default Table
