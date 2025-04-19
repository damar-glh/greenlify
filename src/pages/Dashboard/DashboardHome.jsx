import React, {useEffect, useState} from "react";
import {Typography} from "@/components/ui/Typography";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {Brain, ScanLine, Store, Trash2} from "lucide-react";
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {getHistory, deleteHistory} from "@/services/dashboard";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {useToast} from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useDateStore from "@/store/useDateStore";

export default function DashboardHome() {
    const {formatDate} = useDateStore();
    const [history, setHistory] = useState([]);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalScan, setTotalScan] = useState(0);
    const [pagination, setPagination] = useState({
        start: 1,
        limit: 7,
        totalData: 0,
        next: null,
        previous: null,
    });
    const [currentHistoryId, setCurrentHistoryId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const {toast} = useToast();

    const fetchHistory = async (start = 1, limit = 5) => {
        try {
            const response = await getHistory(start, limit);
            const fetchedHistory = response.results.map((item) => ({
                id: item.id,
                time: formatDate(item.timestamp),
                hours: new Date(item.timestamp).toLocaleTimeString(),
                trashType: item.waste_type.charAt(0).toUpperCase() + item.waste_type.slice(1),
                accuracy: (item.accuracy * 100).toFixed(2),
            }));
            setAvgAccuracy(response.rerata_accuracy);
            setTotalProduct(response.total_product);
            setTotalScan(response.total_scan);
            setHistory(fetchedHistory);
            setPagination({
                start: response.start_index,
                limit: response.per_page,
                totalData: response.total_data,
                next: response.next,
                previous: response.previous,
            });
        } catch (error) {
            toast({
                title: "Gagal Memuat Riwayat",
                description: "Terjadi kesalahan saat memuat riwayat.",
                variant: "destructive",
            });
        }
    };

    const deletedHistory = async (currentHistoryId) => {
        if (!currentHistoryId) return;
        try {
            await deleteHistory(currentHistoryId);
            const newTotalData = pagination.totalData - 1;
            const newTotalPages = Math.ceil(newTotalData / pagination.limit);
            if (Math.ceil(pagination.start / pagination.limit) > newTotalPages && newTotalPages > 0) {
                setPagination(prev => ({
                    ...prev,
                    start: (newTotalPages - 1) * pagination.limit + 1
                }));
            } else {
                await fetchHistory(pagination.start, pagination.limit);
            }
            setIsDeleteModalOpen(false);
            setCurrentHistoryId(null);
            toast({
                title: "Riwayat Berhasil Dihapus",
                description: "Riwayat scan telah berhasil dihapus.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Gagal Menghapus Riwayat",
                description: "Terjadi kesalahan saat menghapus riwayat.",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        fetchHistory(pagination.start, pagination.limit).then(r => r);
    }, [pagination.start]);

    const handlePageChange = (url) => {
        if (url) {
            const params = new URLSearchParams(new URL(url).search);
            const start = parseInt(params.get("start"), 10);
            const limit = parseInt(params.get("limit"), 10);
            setPagination((prev) => ({...prev, start, limit}));
        }
    };

    return (
        <>
            <header className="flex h-16 shrink-0 historys-center gap-2">
                <div className="flex historys-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1"/>
                    <Separator orientation="vertical" className="mr-2 h-4"/>
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
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
                                    Dashboard
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Typography variant="h1" className="text-4xl lg:text-5xl">
                    Dashboard
                </Typography>
                <Typography variant="p" className="text-slate-700">
                    Berikut adalah data tentang penggunaan aplikasi dan performa AI yang
                    dapat membantu Anda dalam mengambil keputusan.
                </Typography>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row historys-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl">Total Scan Hari Ini</CardTitle>
                            <ScanLine className="h-6 w-6"/>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Typography variant="h2">{totalScan}</Typography>
                            <Typography variant="p">
                                Scan hari ini
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row historys-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl">Total Produk</CardTitle>
                            <Store className="h-6 w-6"/>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Typography variant="h2">{totalProduct}</Typography>
                            <Typography variant="p">+{totalProduct} merchant baru</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row historys-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-2xl">Akurasi Model AI</CardTitle>
                            <Brain className="h-6 w-6"/>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <Typography variant="h2">{avgAccuracy}</Typography>
                            <Typography variant="p">
                                Rata-rata akurasi model AI
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 grid-cols-1">
                    <Card>
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-3xl">Riwayat Scan Terakhir</CardTitle>
                            <Typography variant="p" className="text-emerald-700">
                                Riwayat scan terakhir yang dilakukan oleh pengguna beserta
                                rekomendasi dan akurasi AI.
                            </Typography>
                        </CardHeader>
                        <CardContent className="p-0 md:p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xl text-center">Waktu</TableHead>
                                        <TableHead className="text-xl text-center">Tanggal</TableHead>
                                        <TableHead className="text-xl text-center">Jenis Sampah</TableHead>
                                        <TableHead className="text-xl text-center">Akurasi</TableHead>
                                        <TableHead className="text-xl text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {history.length > 0 ? (
                                        history.map((historyItem, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-center">{historyItem.hours}</TableCell>
                                                <TableCell className="text-center">{historyItem.time}</TableCell>
                                                <TableCell className="text-center">{historyItem.trashType}</TableCell>
                                                <TableCell className="text-center">
                                                    <Badge variant="success"
                                                           className="shadow-md">{historyItem.accuracy}%</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="text-red-500 hover:text-red-600"
                                                                onClick={() => {
                                                                    setCurrentHistoryId(historyItem.id);
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                            >
                                                                <Trash2 className="w-4 h-4"/>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-emerald-600">
                                                            <Typography variant="p" className="text-background">Hapus
                                                                Kategori</Typography>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                Tidak ada data yang tersedia.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                {pagination.totalData > pagination.limit && (
                    <div className="mb-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(pagination.previous)}
                                        className={
                                            !pagination.previous
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                                {(() => {
                                    const totalPages = Math.ceil(pagination.totalData / pagination.limit);
                                    const currentPage = Math.ceil(pagination.start / pagination.limit);
                                    const pagesToShow = [];
                                    let start = Math.max(1, currentPage - 2);
                                    const end = Math.min(totalPages, start + 4);

                                    if (end - start < 4) {
                                        start = Math.max(1, end - 4);
                                    }

                                    for (let page = start; page <= end; page++) {
                                        pagesToShow.push(page);
                                    }

                                    return pagesToShow.map((page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    const newStart = (page - 1) * pagination.limit + 1;
                                                    setPagination(prev => ({...prev, start: newStart}));
                                                }}
                                                isActive={page === currentPage}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ));
                                })()}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(pagination.next)}
                                        className={
                                            !pagination.next
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>
            {isDeleteModalOpen && (
                <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus riwayat ini? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="secondary"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    deletedHistory(currentHistoryId).catch(
                                        (error) => console.error(error)
                                    );
                                }}
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
