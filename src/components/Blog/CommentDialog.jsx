import React from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Typography} from '@/components/ui/Typography';
import {addComment} from '@/services/blog.js';
import {useToast} from "@/hooks/use-toast";

const CommentDialog = ({isOpen, onOpenChange, articleId}) => {
    const {toast} = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const comment = {
            id_article: articleId,
            username: formData.get('username'),
            email: formData.get('email'),
            comment: formData.get('comment')
        };
        try {
            const response = await addComment(articleId, comment);
            if (response && response.status === 'success') {
                toast({
                    title: "Komentar Terkirim",
                    description: "Komentar Anda akan kami review terlebih dahulu sebelum ditampilkan.",
                    variant: "success",
                });
                onOpenChange(false);
            } else {
                throw new Error(response.message || 'Gagal menambahkan komentar.');
            }
        } catch (error) {
            throw new Error(error.message || 'Gagal menambahkan komentar.');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader className="space-y-4">
                    <DialogTitle className="text-center text-3xl font-bold">
                        Komentari Artikel
                    </DialogTitle>
                    <Typography variant="p" className="text-left text-slate-500">
                        Bagikan pendapat Anda tentang artikel ini. Komentar anda akan kami review terlebih dahulu
                        sebelum ditampilkan.
                    </Typography>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="username" className="text-[16px] font-bold text-emerald-600">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            required
                            placeholder="Masukkan username Anda"
                            className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
                            maxLength="25"
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-[16px] font-bold text-emerald-600">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Masukkan email Anda"
                            className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100"
                            maxLength="30"
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="comment" className="text-[16px] font-bold text-emerald-600">
                            Komentar
                        </Label>
                        <Textarea
                            id="comment"
                            name="comment"
                            required
                            placeholder="Tuliskan komentar Anda"
                            className="min-h-96 text-justify text-slate-900 border border-slate-50 focus:border-slate-100"
                        />
                    </div>
                    <Button size="md" type="submit" className="w-full shadow-lg">
                        Kirim Komentar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;