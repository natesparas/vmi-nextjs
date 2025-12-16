"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Printer, RefreshCcw, Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	// id: string;
	// amount: number;
	// status: "pending" | "processing" | "success" | "failed";
	// email: string;
	id: string;
	transaction_no: number;
	transaction_date: string;
	total_amount: number;
	status: string;
};

export const columns: ColumnDef<Payment>[] = [
	// {
	//     accessorKey: "id",
	//     header: "ID",
	// },
	// {
	// 	accessorKey: "status",
	// 	header: "Status",
	// },
	// {
	// 	accessorKey: "email",
	// 	header: ({ column }) => {
	// 		return (
	// 			<Button
	// 				variant="ghost"
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
	// 			>
	// 				Email
	// 				<ArrowUpDown className="ml-2 h-4 w-4" />
	// 			</Button>
	// 		);
	// 	},
	// },
	// {
	// 	accessorKey: "amount",
	// 	header: () => <div className="text-right">Amount</div>,
	// 	cell: ({ row }) => {
	// 		const amount = parseFloat(row.getValue("amount"));
	// 		const formatted = new Intl.NumberFormat("en-US", {
	// 			style: "currency",
	// 			currency: "USD",
	// 		}).format(amount);

	// 		return <div className="text-right font-medium">{formatted}</div>;
	// 	},
	// },
	// {
	// 	id: "actions",
	// 	cell: ({ row }) => {
	// 		const payment = row.original;

	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button variant="ghost" className="h-8 w-8 p-0">
	// 						<span className="sr-only">Open menu</span>
	// 						<MoreHorizontal className="h-4 w-4" />
	// 					</Button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent align="end">
	// 					<DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 					<DropdownMenuItem
	// 						onClick={() => navigator.clipboard.writeText(payment.id)}
	// 					>
	// 						Copy payment ID
	// 					</DropdownMenuItem>
	// 					<DropdownMenuSeparator />
	// 					<DropdownMenuItem>View customer</DropdownMenuItem>
	// 					<DropdownMenuItem>View payment details</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		);
	// 	},
	// },
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "transaction_no",
		header: "Transaction No",
	},
	{
		accessorKey: "transaction_date",
		header: "Transaction Date",
	},
	{
		accessorKey: "total_amount",
		header: "Total Amount",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		id: "action",
        header: "Actions",
		cell: ({ row }) => {
			const payment = row.original;

			return (
				<div className="flex items-center justify-center space-x-4 w-full">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Eye className="h-4 w-4 cursor-pointer" />
							</TooltipTrigger>
							<TooltipContent>View</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Pencil className="h-4 w-4 cursor-pointer" />
							</TooltipTrigger>
							<TooltipContent>Edit</TooltipContent>
						</Tooltip>
					</TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Printer className="h-4 w-4 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>Print</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <RefreshCcw className="h-4 w-4 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>Return</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash className="h-4 w-4 cursor-pointer text-red-600" />
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
				</div>
			);
		},
	},
];
