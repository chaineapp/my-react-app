import {MantineProvider, Table, Text, Box, Group} from '@mantine/core'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import {useEffect, useMemo, useState} from 'react'

const columnHelper = createColumnHelper<any>()

function CategoriesPage() {
  const t = (any: any) => any
  const data: any[] = []
  const [sorting, setSorting] = useState<SortingState>([])
  
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        sortingFn: 'text',
        cell: info => info.getValue(),
        header: () => t('columns.name')
      }),
      columnHelper.accessor('parent', {
        cell: info => {
          return info.getValue()
        },
        header: () => t('columns.parent')
      }),
      columnHelper.accessor('createdAt', {
        cell: info => info.getValue(),
        header: () => t('columns.created-at')
      }),
      columnHelper.accessor('images', {
        enableSorting: false,
        cell: info => {
          return 'image'
        },
        header: () => t('columns.images')
      })
    ],
    []
  )

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    },
    onSortingChange: setSorting
  })

  useEffect(() => {
    console.log('Hello')
  })

  return (
    <Box sx={{width: '100%', overflowX: 'auto'}}>
      <text>Open the console and click a column</text>
      <Table mt="xl" withBorder withColumnBorders highlightOnHover>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Box
                  component="th"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={
                    header.column.getCanSort()
                      ? theme => ({
                          cursor: 'pointer',
                          ':hover': {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
                          }
                        })
                      : undefined
                  }
                >
                  <Group align="center" position="apart">
                    <Text>
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                  </Group>
                </Box>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}

export default function TableProblem() {
  return (
    <MantineProvider>
      <CategoriesPage />
    </MantineProvider>
  )
}
