import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Typography} from "@/components/ui/Typography";
import {Button} from "@/components/ui/button";
import {getBlogs} from "@/services/blog";
import BlogCard from "@/components/Blog/BlogCard";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {LatestBlogSkeleton} from "@/components/Blog/LatestBlogSkeleton";
import BlogCardSkeletonList from "@/components/Blog/BlogCardSkeletonList";
import {gsap} from "gsap";

const Blog = () => {
    const articlesContainerRef = useRef(null);
    const noArticlesRef = useRef(null);
    const searchParams = new URLSearchParams(window.location.search);
    const [latestArticle, setLatestArticle] = useState([]);
    const [articles, setArticles] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("keyword") || "");
    const [searchPending, setSearchPending] = useState(searchParams.get("keyword") || "");
    const DEBOUNCE_DELAY = 2000;
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page")) || 1);
    const [pagination, setPagination] = useState({
        next: null,
        previous: null,
        per_page: 6,
        total_data: 0
    });
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getBlogs({
                    keyword: searchQuery,
                    page: currentPage,
                    limit: pagination.per_page
                });
                setLatestArticle(data.latest_article[0]);
                setArticles(data.articles);
                setPagination(data.pagination);
                const calculatedTotalPages = Math.ceil(data.pagination.total_data / data.pagination.per_page);
                setTotalPages(calculatedTotalPages || 1);
                setIsLoading(false);
            } catch (err) {
                if (err.message.includes('Kegagalan dalam mengambil data dari server')) {
                    setError('ERR_CONNECTION_REFUSED');
                } else {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, [searchQuery, currentPage]);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            setSearchQuery(searchPending.trim());
            setCurrentPage(1);
            const newURL = new URL(window.location.href);
            if (searchPending.trim() === "") {
                newURL.searchParams.delete("keyword");
            } else {
                newURL.searchParams.set("keyword", searchPending.trim());
            }
            newURL.searchParams.set("page", 1);
            window.history.pushState(null, "", newURL.toString());
        }, DEBOUNCE_DELAY);
        return () => clearTimeout(debounceTimeout);
    }, [searchPending]);

    useEffect(() => {
        const handlePopState = () => {
            const searchParams = new URLSearchParams(window.location.search);
            setSearchQuery(searchParams.get("keyword") || "");
            setCurrentPage(parseInt(searchParams.get("page")) || 1);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    useEffect(() => {
        if (articlesContainerRef.current) {
            gsap.fromTo(
                articlesContainerRef.current.children,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.5,
                }
            );
        }
        if (noArticlesRef.current) {
            gsap.fromTo(noArticlesRef.current, {
                opacity: 0,
                y: 20,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            });
        }

    }, [articles, error]);

    const handleSearch = () => {
        setError(null);
        setCurrentPage(1);
        setSearchQuery(searchPending);
        const newURL = new URL(window.location.href);
        if (searchPending.trim() === "") {
            newURL.searchParams.delete("keyword");
        } else {
            newURL.searchParams.set("keyword", searchPending.trim());
        }
        newURL.searchParams.set("page", 1);
        window.history.pushState(null, "", newURL.toString());
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
        const newURL = new URL(window.location.href);
        newURL.searchParams.set("page", newPage);
        window.history.pushState(null, "", newURL.toString());
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const day = days[date.getDay()];
        const dateNum = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}, ${dateNum} ${month} ${year}`;
    };

    const renderLatestArticle = () => {
        if (error === 'ERR_CONNECTION_REFUSED') {
            return (
                <LatestBlogSkeleton/>
            );
        }

        return (
            <div className="hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
                <Link to={`/blog/${latestArticle.id}`} className="block">
                    <div className="relative">
                        <img
                            src={latestArticle.img_file}
                            alt={latestArticle.title}
                            className="w-full h-[700px] object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        <div
                            className="absolute bottom-40 md:bottom-36 lg:bottom-24 mx-8 text-white max-w-4xl">
                            <Typography variant="title"
                                        className="text-background text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{latestArticle.title}</Typography>
                            <Typography variant="p"
                                        className="text-background">{latestArticle?.content?.replace(/<[^>]*>/g, '').split('.').slice(0, 1).join('.') + '.'}</Typography>
                        </div>
                        <div className="absolute bottom-10 left-8 text-white w-10/12">
                            <div
                                className="flex flex-col md:flex-row items-start md:items-center mt-4 gap-2 md:gap-5">
                                <Typography variant="p-semibold"
                                            className="text-background">{latestArticle.author}</Typography>
                                <strong className="hidden md:block">●</strong>
                                <Typography variant="p-semibold"
                                            className="text-background">
                                    {formatDate(latestArticle.created_at)}
                                </Typography>
                                <strong className="hidden md:block">●</strong>
                                <Typography variant="p-semibold"
                                            className="text-background">
                                    {latestArticle.views} Dibaca
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    const renderArticleContent = () => {
        if (isLoading) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center w-full p-8" ref={noArticlesRef}>
                    <Typography
                        variant="h2"
                        className="text-emerald-600 text-center mb-4"
                    >
                        Memuat Produk...
                    </Typography>
                </div>
            );
        }

        if (error) {
            if (error === 'ERR_CONNECTION_REFUSED') {
                return <BlogCardSkeletonList count={6}/>;
            } else {
                return (
                    <div className="col-span-full flex flex-col items-center justify-center w-full p-8 mt-[33px]"
                         ref={noArticlesRef}>
                        <Typography
                            variant="h2"
                            className="text-emerald-600 text-center mb-4"
                        >
                            Blog Tidak Ditemukan
                        </Typography>
                        <Typography
                            variant="large"
                            className="text-slate-500 text-center mb-6"
                        >
                            Tidak ada postingan blog yang sesuai dengan pencarian Anda.
                        </Typography>
                    </div>
                );
            }
        }

        return articles.map((article) => (
            <div ref={articlesContainerRef} key={article.id}>
                <Link to={`/blog/${article.id}`}>
                    <BlogCard
                        key={article.id}
                        author={article.author}
                        content={article.content}
                        created_at={article.created_at}
                        img_file={article.img_file}
                        title={article.title}
                        views={article.views}
                    />
                </Link>
            </div>
        ));
    };

    return (
        <main>
            <div className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
                {latestArticle && (
                    <section className="w-10/12 px-0 md:px-4 py-12 ">
                        {renderLatestArticle()}
                    </section>
                )}
                <div className="max-w-sm md:max-w-xl text-center lg:text-left">
                    <Typography variant="title">
                        <strong className="text-emerald-700">Blog</strong> Greenlify
                    </Typography>
                </div>
                <div className="mx-auto md:max-w-5xl lg:max-w-6xl p-4 lg:p-0 text-justify lg:text-center">
                    <Typography variant="p" className="px-4 md:px-0">
                        Blog Greenlify menyajikan informasi terkini seputar isu lingkungan, inovasi teknologi hijau,
                        dan solusi berkelanjutan. Dengan fokus pada edukasi dan inspirasi, article ini bertujuan
                        meningkatkan kesadaran masyarakat terhadap pentingnya menjaga bumi. Beragam artikel menarik
                        dihadirkan untuk memotivasi pembaca mengambil langkah kecil menuju perubahan besar.
                    </Typography>
                </div>
                <div className="w-10/12 max-w-4xl flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Cari postingan blog..."
                        value={searchPending}
                        onChange={(e) => setSearchPending(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow text-slate-900 border-2 border-slate-50 rounded-lg p-2 focus:outline-none focus:border-slate-100"
                    />
                    <Button
                        variant="primary"
                        className="w-auto px-4 py-2 text-sm"
                        onClick={handleSearch}
                    >
                        Cari
                    </Button>
                </div>
                <section className="w-10/12 mx-auto px-4 pt-12">
                    <Typography variant="h2" className="mb-6 text-emerald-600">
                        Postingan Blog
                    </Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[1fr]">
                        {renderArticleContent()}
                    </div>
                </section>
                {pagination.total_data > pagination.per_page && (
                    <div className="w-10/12 mt-8 sm:mt-[33px]">
                        <Pagination className="gap-5 flex flex-wrap justify-center">
                            <PaginationPrevious
                                className="order-1 sm:order-none cursor-pointer"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                <PaginationLink>Previous</PaginationLink>
                            </PaginationPrevious>
                            <PaginationContent className="order-3 sm:order-none hidden sm:flex cursor-pointer">
                                {Array.from({length: totalPages}, (_, index) => (
                                    <PaginationItem key={index} className="sm:mx-1">
                                        <PaginationLink
                                            onClick={() => handlePageChange(index + 1)}
                                            isActive={currentPage === index + 1}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                            <PaginationNext
                                className="order-2 sm:order-none cursor-pointer"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                <PaginationLink>Next</PaginationLink>
                            </PaginationNext>
                        </Pagination>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Blog;