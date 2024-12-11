import React, {useState, useEffect} from "react";
import {Typography} from "@/components/ui/Typography";
import {Card, CardContent} from "@/components/ui/card";
// @ts-ignore
import Logo from "@/assets/logo/logo.svg";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Pencil, Trash2, Eye, Plus, FilterX, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useToast} from "@/hooks/use-toast";
import {
    getProductsManagement,
    createProductManagement,
    updateProductManagement,
    deleteProductManagement,
    getDetailsProductManagement,
} from "@/services/productManagement.js";
import {getCategoriesManagement} from "@/services/categoryManagement.js";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
    id: number;
    product_name: string;
    price: number;
    img_file: string;
    category_id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
    contact: string;
    description: string;
}

interface Category {
    id: number;
    category_name: string;
}

interface RenderProductsProps {
    products: Product[];
    loading: boolean;
    error: string | null;
    formatDate: (date: string) => string;
    openEditModal: (product: Product) => void;
    setCurrentProduct: (product: Product) => void;
    setIsDeleteModalOpen: (isOpen: boolean) => void;
}

export default function DashboardProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage] = useState(5);
    const [selectedPriceRange, setSelectedPriceRange] = useState(
        "Pilih Rentang Harga"
    );
    const DEFAULT_PRICE_RANGE = "Pilih Rentang Harga";
    const [selectedPriceValue, setSelectedPriceValue] = useState<string>("");

    const [filters, setFilters] = useState({
        category_name: "",
        keyword: "",
        min_price: "",
        max_price: "",
        page: 1,
        limit: 5,
    });

    const [totalData, setTotalData] = useState<number>(0);

    const {toast} = useToast();

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const cleanFilters = Object.fromEntries(
                Object.entries(filters).filter(
                    ([_, value]) => value !== "" && value !== null
                )
            );

            const {products, pagination} = await getProductsManagement(
                cleanFilters
            );

            setProducts(products);
            setTotalData(pagination.total_data);
            setTotalPages(Math.ceil(pagination.total_data / filters.limit));
            setCurrentPage(filters.page);
            setError(null);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Gagal mengambil produk";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key: string, value: any) => {
        setFilters((prev) => {
            const newFilters = {
                ...prev,
                [key]: value || "",
                page: 1,
            };

            Object.keys(newFilters).forEach((k) => {
                if (newFilters[k] === "" || newFilters[k] === null) {
                    delete newFilters[k];
                }
            });

            return newFilters;
        });
    };

    const resetFilters = () => {
        setFilters({
            category_name: "",
            keyword: "",
            min_price: "",
            max_price: "",
            page: 1,
            limit: 5,
        });
        setSelectedPriceRange(DEFAULT_PRICE_RANGE);
        setSelectedPriceValue("");
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setFilters((prev) => ({
            ...prev,
            page: page,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const responseData = await getCategoriesManagement();
            setCategories(responseData);
        } catch (err) {
            toast({
                title: "Gagal Memuat Kategori",
                description: "Terjadi kesalahan saat mengambil daftar kategori.",
                variant: "destructive",
            });
        }
    };

    const handleProductDetails = async (productId: number) => {
        try {
            const response = await getDetailsProductManagement(productId);
            window.location.href = `/produk/${response}`;
        } catch (error) {
            toast({
                title: "Gagal Mengambil Detail Produk",
                description: "Terjadi kesalahan saat mengambil detail produk.",
                variant: "destructive",
            });
        }
    }

    const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (selectedCategoryId) {
            formData.append("category_id", selectedCategoryId.toString());
            formData.delete("category_name");
        }

        try {
            await createProductManagement(formData);
            fetchProducts();
            setIsAddModalOpen(false);
            toast({
                title: "Produk Berhasil Ditambahkan",
                description: "Produk baru telah berhasil ditambahkan.",
            });
        } catch (error) {
            toast({
                title: "Gagal Menambahkan Produk",
                description: "Terjadi kesalahan saat menambahkan produk.",
                variant: "destructive",
            });
        }
    };

    const handleEditProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentProduct) return;
        const formData = new FormData(e.currentTarget);

        if (selectedCategoryId) {
            formData.append("category_id", selectedCategoryId.toString());
            formData.delete("category_name");
        }

        try {
            await updateProductManagement(currentProduct.id, formData);
            fetchProducts();
            setIsEditModalOpen(false);
            toast({
                title: "Produk Berhasil Diperbarui",
                description: "Produk telah berhasil diperbarui.",
            });
        } catch (error) {
            toast({
                title: "Gagal Memperbarui Produk",
                description: "Terjadi kesalahan saat memperbarui produk.",
                variant: "destructive",
            });
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProductManagement(productId);
            setIsDeleteModalOpen(false);
            const newTotalData = totalData - 1;
            const newTotalPages = Math.ceil(newTotalData / filters.limit);

            if (filters.page > newTotalPages && newTotalPages > 0) {
                setFilters(prev => ({
                    ...prev,
                    page: newTotalPages
                }));
            }

            await fetchProducts();

            toast({
                title: "Produk Berhasil Dihapus",
                description: "Produk telah berhasil dihapus.",
            });
        } catch (error) {
            toast({
                title: "Gagal Menghapus Produk",
                description: "Terjadi kesalahan saat menghapus produk.",
                variant: "destructive",
            });
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day}, ${dateNum} ${month} ${year}`;
    };

    const openEditModal = (product: Product) => {
        setCurrentProduct(product);
        setIsEditModalOpen(true);
    };

    const ProductTable: React.FC<RenderProductsProps> = (props) => {
        const {
            products,
            loading,
            error,
            formatDate,
            openEditModal,
            setCurrentProduct,
            setIsDeleteModalOpen,
        } = props;

        if (loading) {
            return (
                <tr>
                    <td colSpan={7} className="text-center py-4">
                        <Typography variant="p-regular">Loading...</Typography>
                    </td>
                </tr>
            );
        }

        if (error) {
            return (
                <tr>
                    <td colSpan={7} className="text-center py-4 text-red-500">
                        <Typography variant="p-regular">{error}</Typography>
                    </td>
                </tr>
            );
        }

        if (products.length === 0) {
            return (
                <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                        <Typography variant="p-regular">
                            Tidak ada produk yang sesuai dengan filter
                        </Typography>
                    </td>
                </tr>
            );
        }
        return (
            <>
                {products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <img
                                src={product.img_file}
                                alt={product.product_name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                        </TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>Rp {product.price.toLocaleString("id-ID")}</TableCell>
                        <TableCell>{product.category_name}</TableCell>
                        <TableCell className="text-center">
                            {formatDate(product.created_at)}
                        </TableCell>
                        <TableCell className="text-center">
                            {formatDate(product.updated_at)}
                        </TableCell>
                        <TableCell className="text-[16px] font-normal leading-[28px]">
                            <TooltipProvider>
                                <div className="flex justify-end gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" onClick={
                                                () => handleProductDetails(product.id)
                                            }>
                                                <Eye className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-emerald-600">
                                            <p className="text-background">Lihat Detail</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => openEditModal(product)}
                                            >
                                                <Pencil className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-emerald-600">
                                            <p className="text-background">Edit Produk</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => {
                                                    setCurrentProduct(product);
                                                    setIsDeleteModalOpen(true);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4"/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-emerald-600">
                                            <p className="text-background">Hapus Produk</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </TooltipProvider>
                        </TableCell>
                    </TableRow>
                ))}
            </>
        );
    };

    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
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
                                <BreadcrumbLink
                                    href="/Dashboard"
                                    className="text-[16px] font-normal leading-[28px]"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-[16px] font-normal leading-[28px]">
                                    Produk
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 pb-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mr-0 md:mr-6">
                    <div>
                        <Typography variant="h1" className="text-4xl lg:text-5xl">
                            Manajemen Produk
                        </Typography>
                        <Typography variant="p-regular" className="text-slate-700 mt-4">
                            Manajemen produk memungkinkan Anda untuk mengelola produk yang
                            akan ditampilkan di halaman produk.
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 my-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                        <div className="flex items-center w-full sm:w-[200px]">
                            <Select
                                value={selectedPriceValue}
                                onValueChange={(value) => {
                                    setSelectedPriceValue(value);
                                    const priceRanges = {
                                        low: {min: "0", max: "10000", label: "Di bawah 10,000"},
                                        medium: {
                                            min: "10000",
                                            max: "50000",
                                            label: "10,000 - 50,000",
                                        },
                                        high: {min: "50000", max: "", label: "Di atas 50,000"},
                                        all: {min: "", max: "", label: "Semua Harga"},
                                    };

                                    const selectedRange = priceRanges[value];
                                    if (selectedRange) {
                                        handleFilterChange("min_price", selectedRange.min);
                                        handleFilterChange("max_price", selectedRange.max);
                                        setSelectedPriceRange(selectedRange.label);
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full h-11 bg-emerald-500 text-white">
                                    <SelectValue placeholder={DEFAULT_PRICE_RANGE}/>
                                </SelectTrigger>
                                <SelectContent className="bg-emerald-500 text-white">
                                    <SelectItem className="text-white" value="all">
                                        Semua Harga
                                    </SelectItem>
                                    <SelectItem className="text-white" value="low">
                                        Di bawah 10000
                                    </SelectItem>
                                    <SelectItem className="text-white" value="medium">
                                        10000 - 50000
                                    </SelectItem>
                                    <SelectItem className="text-white" value="high">
                                        Di atas 50000
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center w-full sm:w-[200px]">
                            <Select
                                value={filters.category_name}
                                onValueChange={(value) => {
                                    handleFilterChange("category_name", value);
                                }}
                            >
                                <SelectTrigger className="w-full h-11 bg-emerald-500 text-white">
                                    <SelectValue placeholder="Pilih Kategori"/>
                                </SelectTrigger>
                                <SelectContent className="bg-emerald-500 text-white">
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.category_name}
                                            className="text-white hover:bg-emerald-700"
                                        >
                                            {category.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            size="icon"
                            onClick={resetFilters}
                            className="w-full sm:w-11 h-11 bg-emerald-500 hover:bg-emerald-600 text-background"
                            aria-label="Reset Filter"
                        >
                            <FilterX/>
                        </Button>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-stretch sm:items-center">
                        <div className="relative w-full sm:w-[300px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <Input
                                placeholder="Cari produk berdasarkan nama"
                                value={filters.keyword}
                                onChange={(e) => handleFilterChange("keyword", e.target.value)}
                                className="h-11 pl-10 text-emerald-600 border-2 border-emerald-500 w-full focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        <Button
                            variant="primary"
                            className="h-11 px-4 text-white shadow-lg flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-colors whitespace-nowrap"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="w-5 h-5"/>
                            Tambah Produk
                        </Button>
                    </div>
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
                                        <TableHead className="text-xl text-center">
                                            Tanggal Dibuat
                                        </TableHead>
                                        <TableHead className="text-xl text-center">
                                            Tanggal Edit
                                        </TableHead>
                                        <TableHead className="text-xl text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <ProductTable
                                        products={products}
                                        loading={loading}
                                        error={error}
                                        formatDate={formatDate}
                                        openEditModal={openEditModal}
                                        setCurrentProduct={setCurrentProduct}
                                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                                    />
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                {totalData > filters.limit && (
                    <div className="mb-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(filters.page - 1)}
                                        className={
                                            filters.page <= 1
                                                ? "pointer-events-none opacity-50"
                                                : "cursor-pointer"
                                        }
                                    />
                                </PaginationItem>

                                {Array.from({length: totalPages}, (_, i) => i + 1).map(
                                    (page) => (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                className="cursor-pointer"
                                                onClick={() => handlePageChange(page)}
                                                isActive={filters.page === page}
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(filters.page + 1)}
                                        className={
                                            filters.page >= totalPages
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
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
                            Tambah Produk Baru
                        </DialogTitle>
                        <Typography
                            variant="p-regular"
                            className="text-left text-slate-500"
                        >
                            Tambahkan produk baru ke dalam daftar produk yang tersedia. Produk
                            akan langsung tampil di halaman produk. Produk yang ditambahkan
                            dapat diubah atau dihapus kembali.
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct}>
                        <div className="flex flex-col gap-6">
                            <div className="items-center justify-center rounded-lg gap-4">
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="product_name"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Nama Produk
                                        </Label>
                                        <Input
                                            id="product_name"
                                            name="product_name"
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Masukkan nama produk"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="price"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Harga
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="Rp. 0"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="img_file"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Gambar
                                        </Label>
                                        <Input
                                            id="img_file"
                                            name="img_file"
                                            type="text"
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Url"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="category"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Kategori
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setSelectedCategoryId(Number(value))
                                            }
                                            required
                                        >
                                            <SelectTrigger
                                                className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100">
                                                <SelectValue placeholder="Pilih Kategori"/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-background text-slate-900">
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="contact"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Hubungi
                                        </Label>
                                        <Input
                                            id="contact"
                                            name="contact"
                                            type="text"
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Masukkan url"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-6">
                                <div className="space-y-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-[16px] font-bold text-emerald-600"
                                    >
                                        Deskripsi Produk
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        className="col-span-3 min-h-[90px] text-justify text-slate-900 border border-slate-50 focus:border-slate-100"
                                        placeholder="Masukkan deskripsi produk"
                                        rows={10}
                                        required
                                    />
                                </div>
                                <DialogFooter className="mt-4">
                                    <DialogClose asChild>
                                        <Button type="button" variant="destructive">
                                            Batal
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" className="mb-3 md:mb-0">
                                        Simpan
                                    </Button>
                                </DialogFooter>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-[30px] font-bold leading-[36px]">
                            Edit Produk
                        </DialogTitle>
                        <Typography
                            variant="p-regular"
                            className="text-center max-w-lg text-slate-500"
                        >
                            Ubah detail produk yang ada di daftar produk yang tersedia.
                        </Typography>
                    </DialogHeader>
                    <form onSubmit={handleEditProduct}>
                        <div className="items-center justify-center rounded-lg gap-4">
                            <div className="items-center justify-center rounded-lg gap-4">
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="product_name"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Nama Produk
                                        </Label>
                                        <Input
                                            id="product_name"
                                            name="product_name"
                                            defaultValue={currentProduct?.product_name}
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Masukkan nama produk"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="price"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Harga
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            defaultValue={currentProduct?.price}
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="Rp. 0"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="img_file"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Gambar
                                        </Label>
                                        <Input
                                            id="img_file"
                                            name="img_file"
                                            type="text"
                                            defaultValue={currentProduct?.img_file}
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Url"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="category"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Kategori
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setSelectedCategoryId(Number(value))
                                            }
                                            value={
                                                selectedCategoryId?.toString() ||
                                                currentProduct?.category_id?.toString()
                                            }
                                            required
                                        >
                                            <SelectTrigger
                                                className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100">
                                                <SelectValue placeholder="Pilih Kategori"/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-background text-slate-900">
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            htmlFor="contact"
                                            className="text-[16px] font-bold text-emerald-600"
                                        >
                                            Hubungi
                                        </Label>
                                        <Input
                                            id="contact"
                                            name="contact"
                                            type="text"
                                            defaultValue={currentProduct?.contact}
                                            className="col-span-3 h-10 text-slate-900 border border-slate-50 focus:border-slate-100"
                                            placeholder="Masukkan url"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="space-y-4">
                                <Label
                                    htmlFor="description"
                                    className="text-[16px] font-bold text-emerald-600"
                                >
                                    Deskripsi Produk
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={currentProduct?.description}
                                    className="col-span-3 min-h-[90px] text-justify text-slate-900 border border-slate-50 focus:border-slate-100"
                                    placeholder="Masukkan deskripsi produk"
                                    rows={10}
                                    required
                                />
                            </div>
                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="destructive">
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button type="submit" className="mb-3 md:mb-0">
                                    Simpan
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent>
                    <DialogHeader className="space-y-4">
                        <DialogTitle className="text-left text-[30px] font-bold leading-[36px]">Hapus
                            Produk</DialogTitle>
                        <Typography variant="p-regular" className="text-left max-w-lg text-slate-500">
                            Apakah Anda yakin ingin menghapus kategori ini? Kategori yang dihapus tidak dapat
                            dikembalikan.
                        </Typography>
                    </DialogHeader>
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                handleDeleteProduct(currentProduct.id);
                            }}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
