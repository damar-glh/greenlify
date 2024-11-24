import React from "react";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import dataProduct from "@/data/product.json";

const data = [
	{ value: 400 },
	{ value: 300 },
	{ value: 500 },
	{ value: 450 },
	{ value: 470 },
	{ value: 480 },
	{ value: 600 },
];

export default function DashboardHome() {
	const limitedProducts = dataProduct.slice(0, 5);
	return (
		<>
			<header className="flex h-16 shrink-0 items-center gap-2">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink
									href="/"
									className="text-[16px] font-normal leading-[28px]"
								>
									Beranda
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbLink
									href="/Dashboard"
									className="text-[16px] font-normal leading-[28px]"
								>
									Dashboard
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
									Produk
								</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 mr-0 md:mr-6">
					<div>
						<Typography variant="h1" className="text-4xl lg:text-5xl">
							Manajemen Produk
						</Typography>
						<Typography variant="p" className="text-slate-700 mt-4">
							Manajemen produk memungkinkan Anda untuk mengelola produk yang
							akan ditampilkan di halaman produk.
						</Typography>
					</div>
					<Button variant="primary" className="text-white">
						<Plus className="w-6 h-6 mr-2" />
						Tambah Produk
					</Button>
				</div>
				<div className="grid gap-4 grid-cols-1">
					<Card>
						<CardContent className="p-0 md:p-6">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="text-xl">Gambar</TableHead>
										<TableHead className="text-xl">Nama Produk</TableHead>
										<TableHead className="text-xl">Harga</TableHead>
										<TableHead className="text-xl">Kategori</TableHead>
										<TableHead className="text-xl">Rating</TableHead>
										<TableHead className="text-xl text-right">Aksi</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{limitedProducts.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<img
													src={product.image}
													alt={product.title}
													className="w-16 h-16 object-cover rounded-lg"
												/>
											</TableCell>
											<TableCell>{product.title}</TableCell>
											<TableCell>
												Rp {product.price.toLocaleString("id-ID")}
											</TableCell>
											<TableCell>{product.category}</TableCell>
											<TableCell>
												<Badge variant="outline">⭐ {product.rating}</Badge>
											</TableCell>
											<TableCell className="text-right">
												<TooltipProvider>
													<div className="flex justify-end gap-2">
														<Tooltip>
															<TooltipTrigger asChild>
																<Button variant="outline" size="icon">
																	<Eye className="w-4 h-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Lihat Detail</p>
															</TooltipContent>
														</Tooltip>

														<Tooltip>
															<TooltipTrigger asChild>
																<Button variant="outline" size="icon">
																	<Pencil className="w-4 h-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Edit Produk</p>
															</TooltipContent>
														</Tooltip>

														<Tooltip>
															<TooltipTrigger asChild>
																<Button
																	variant="outline"
																	size="icon"
																	className="text-red-500 hover:text-red-600"
																>
																	<Trash2 className="w-4 h-4" />
																</Button>
															</TooltipTrigger>
															<TooltipContent>
																<p>Hapus Produk</p>
															</TooltipContent>
														</Tooltip>
													</div>
												</TooltipProvider>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</>
	);
}