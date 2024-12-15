import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommentDialog from "@/components/Blog/CommentDialog";
import CommentCard from "@/components/Blog/CommentCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useBlogStore } from "@/store/useBlogStore";
import { Plus } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import useDateStore from "@/store/useDateStore";

const BlogDetail = () => {
  const { id } = useParams();
  const { formatDate } = useDateStore();
  const { article, comments, fetchArticle, addComment, next, previous, total_data, per_page, error } = useBlogStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total_data / per_page);

  useEffect(() => {
    fetchArticle(id, currentPage, per_page);
  }, [currentPage, fetchArticle, id, per_page]);

  const handleAddComment = (newComment) => {
    addComment(newComment);
    setIsAddModalOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (error || !article) {
    return (
      <main>
        <section className="w-full mt-[99px] min-h-screen flex flex-col items-center justify-center gap-[33px]">
          <Typography variant="h1" className="text-center text-emerald-600">
            Postingan Blog Tidak Ditemukan
          </Typography>
          <Typography variant="p" className="text-center text-slate-700 px-4 md:px-0">
            Blog yang Anda cari tidak ditemukan. Silakan coba lagi nanti. Terima kasih.
          </Typography>
          <Button variant="primary" size="lg" onClick={() => (window.location.href = "/blog")}>
            Kembali ke Halaman Blog
          </Button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
        <div className="w-full flex flex-col items-center space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Badge className="h-6 bg-emerald-600 text-background text-sm sm:text-base font-semibold px-2 py-1 rounded-md shadow-md">
              {article.created_by}
            </Badge>
            <Typography variant="p-semibold" className="text-emerald-600 text-sm sm:text-base text-center">
              {formatDate(article.created_at)}
            </Typography>
          </div>
          <Typography variant="title" className="text-center w-full max-w-3xl text-3xl md:text-5xl lg:text-6xl px-6 sm:px-0">
            {article.title}
          </Typography>
          <Typography variant="p" className="text-center w-full max-w-4xl text-slate-700 px-4 md:px-0">
            {article.content ? article.content.replace(/<[^>]*>/g, "").split(".")[0] + "." : ""}
          </Typography>
          <img src={article.img_file} alt={article.title} className="w-full max-w-7xl h-48 sm:h-96 md:h-[500px] lg:h-[700px] object-cover rounded-lg p-4 md:p-0" />
          <div className="w-full max-w-7xl px-4 md:px-0">
            <div className="blog-content prose prose-emerald max-w-none ql-editor" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </section>
      <section className="w-full px-4 sm:px-6 lg:px-8 flex flex-col space-y-6 md:space-y-8 mt-[33px]">
        <div className="flex justify-between w-full max-w-7xl mx-auto">
          <Typography variant="h3" className="text-left text-2xl md:text-3xl">
            Komentar ({total_data})
          </Typography>
          <Button variant="primary" className="text-white shadow-lg flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={24} />
            Komentari Artikel
          </Button>
        </div>
        <CommentDialog isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} onAddComment={handleAddComment} articleId={id} />
        <div className="w-full max-w-7xl mx-auto">
          {comments.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {comments.map((comment) => (
                <CommentCard key={comment.id} created_at={comment.created_at} username={comment.username} comment={comment.comment} email={comment.email} />
              ))}
              {total_data > per_page && (
                <Pagination className="gap-5 flex flex-wrap justify-center">
                  <PaginationPrevious className="cursor-pointer" onClick={() => handlePageChange(currentPage - 1)} aria-disabled={!previous}>
                    <PaginationLink>Previous</PaginationLink>
                  </PaginationPrevious>
                  <PaginationContent className="hidden sm:flex cursor-pointer">
                    {[...Array(totalPages)].map((_, index) => (
                      <PaginationItem key={index} className="sm:mx-1">
                        <PaginationLink onClick={() => handlePageChange(index + 1)} isActive={currentPage === index + 1}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                  <PaginationNext className="cursor-pointer" onClick={() => handlePageChange(currentPage + 1)} aria-disabled={!next}>
                    <PaginationLink>Next</PaginationLink>
                  </PaginationNext>
                </Pagination>
              )}
            </div>
          ) : (
            <Typography variant="p" className="text-slate-700 text-center">
              Belum ada komentar untuk artikel ini. Jadilah yang pertama!
            </Typography>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;