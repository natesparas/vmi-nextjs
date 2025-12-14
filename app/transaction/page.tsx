"use client";

import { useState, useEffect } from "react";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function getData(): Promise<Payment[]> {
	return [
		// { id: "1", amount: 100, status: "pending", email: "m@example.com" },
		// { id: "2", amount: 100, status: "success", email: "1@example.com" },
		// { id: "3", amount: 100, status: "failed", email: "3@example.com" },
		// { id: "4", amount: 100, status: "pending", email: "m@example.com" },
		// { id: "5", amount: 100, status: "success", email: "1@example.com" },
		// { id: "6", amount: 100, status: "failed", email: "3@example.com" },
		// { id: "7", amount: 100, status: "pending", email: "m@example.com" },
		// { id: "8", amount: 100, status: "success", email: "1@example.com" },
		// { id: "9", amount: 100, status: "failed", email: "3@example.com" },
		// { id: "10", amount: 100, status: "pending", email: "m@example.com" },
		// { id: "11", amount: 100, status: "success", email: "1@example.com" },
		// { id: "12", amount: 100, status: "failed", email: "3@example.com" },
    { id: "1", transaction_no: 1, transaction_date: "2025-12-12", total_amount: 100, status: "pending" },
		{ id: "2", transaction_no: 2, transaction_date: "2025-12-12", total_amount: 100, status: "success" },
		{ id: "3", transaction_no: 3, transaction_date: "2025-12-12", total_amount: 100, status: "failed" },
		{ id: "4", transaction_no: 4, transaction_date: "2025-12-12", total_amount: 100, status: "pending" },
		{ id: "5", transaction_no: 5, transaction_date: "2025-12-12", total_amount: 100, status: "success" },
		{ id: "6", transaction_no: 6, transaction_date: "2025-12-12", total_amount: 100, status: "failed" },
		{ id: "7", transaction_no: 7, transaction_date: "2025-12-12", total_amount: 100, status: "pending" },
		{ id: "8", transaction_no: 8, transaction_date: "2025-12-12", total_amount: 100, status: "success" },
		{ id: "9", transaction_no: 9, transaction_date: "2025-12-12", total_amount: 100, status: "failed" },
		{ id: "10", transaction_no: 10, transaction_date: "2025-12-12", total_amount: 100, status: "pending" },
		{ id: "11", transaction_no: 11, transaction_date: "2025-12-12", total_amount: 100, status: "success" },
		{ id: "12", transaction_no: 12, transaction_date: "2025-12-12", total_amount: 100, status: "failed" },
	];
}

export default function TransactionPage() {
	const [data, setData] = useState<Payment[]>([]);

	useEffect(() => {
		getData().then(setData);
	}, []);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Transaction List</CardTitle>
				<CardDescription>
					Filter and browse through your recent transactions
				</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={data} />
			</CardContent>
		</Card>
	);
}
