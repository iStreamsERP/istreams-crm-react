import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Pencil, Plus, Settings2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { callSoapService } from "@/services/callSoapService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const CustomerListPage = () => {
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const { userData } = useAuth();
  const { toast } = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllClientData();
  }, []);

  const fetchAllClientData = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        DataModelName: "CLIENT_MASTER",
        WhereCondition: "",
        Orderby: "CLIENT_ID DESC",
      };

      const response = await callSoapService(userData.clientURL, "DataModel_GetData", payload);
      setCustomersData(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (customer) => {
    alert("Are you sure you want to delete this customer? This action cannot be undone.");
    // throw new Error("User deletion is not implemented yet.");

    try {
      const payload = {
        UserName: userData.userEmail,
        DataModelName: "CLIENT_MASTER",
        WhereCondition: `CLIENT_ID = ${customer.CLIENT_ID}`,
      };

      const response = await callSoapService(userData.clientURL, "DataModel_DeleteData", payload);

      toast({
        variant: "destructive",
        title: response,
      });

      fetchAllClientData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.message || "Unknown error occurred.",
      });
    }
  };

  const columns = [
    {
      accessorKey: "CLIENT_ID",
      header: () => (
        <p
          className="truncate"
          style={{ width: 60 }}
        >
          Client ID
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 60,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("CLIENT_ID") || "-"}
        >
          {row.getValue("CLIENT_ID") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "CLIENT_NAME",
      header: () => (
        <p
          className="truncate"
          style={{ width: 200 }}
        >
          Client Name
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 200,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("CLIENT_NAME") || "-"}
        >
          {row.getValue("CLIENT_NAME") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "TELEPHONE_NO",
      header: () => (
        <p
          className="truncate"
          style={{ width: 120 }}
        >
          Telephone No
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 120,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("TELEPHONE_NO") || "-"}
        >
          {row.getValue("TELEPHONE_NO") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "EMAIL_ADDRESS",
      header: () => (
        <p
          className="truncate"
          style={{ width: 200 }}
        >
          Email ID
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 200,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("EMAIL_ADDRESS") || "-"}
        >
          {row.getValue("EMAIL_ADDRESS") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "COUNTRY",
      header: () => (
        <p
          className="truncate"
          style={{ width: 100 }}
        >
          Country
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 100,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("COUNTRY") || "-"}
        >
          {row.getValue("COUNTRY") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "GROUP_NAME",
      header: () => (
        <p
          className="truncate"
          style={{ width: 100 }}
        >
          Group Name
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 100,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("GROUP_NAME") || "-"}
        >
          {row.getValue("GROUP_NAME") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "NATURE_OF_BUSINESS",
      header: () => (
        <p
          className="truncate"
          style={{ width: 100 }}
        >
          Nature of Business
        </p>
      ),
      cell: ({ row }) => (
        <div
          className="capitalize"
          style={{
            width: 100,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          title={row.getValue("NATURE_OF_BUSINESS") || "-"}
        >
          {row.getValue("NATURE_OF_BUSINESS") || "-"}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      id: "actions",
      // enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate("/customer-dashboard/1")}
                className="flex items-center gap-1"
              >
                <Eye /> View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate(`/customer/${customer.CLIENT_ID}`)}
                className="flex items-center gap-1"
              >
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-1 text-red-600"
                onClick={() => handleDeleteCustomer(customer)}
              >
                {" "}
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const fuzzyFilter = (row, columnId, filterValue) => {
    return row.getValue(columnId)?.toLowerCase().includes(filterValue.toLowerCase());
  };

  const table = useReactTable({
    data: customersData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: fuzzyFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="title">All Customers</h1>
      <div className="w-full">
        <div className="grid grid-cols-1 items-center gap-2 pb-2 sm:grid-cols-2">
          <Input
            placeholder="Global Search..."
            value={table.getState().globalFilter ?? ""}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto"
                >
                  <Settings2 /> View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={() => navigate("/new-customer")}>
              Create
              <Plus />
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <PacmanLoader color="#6366f1" />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-red-500"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerListPage;
