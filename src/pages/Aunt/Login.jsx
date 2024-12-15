import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/Typography";
import Logo from "@/assets/logo/logo.svg";
import LoginImg from "@/assets/images/img-login.svg";
import { ArrowLeft, EyeIcon, EyeOffIcon } from "lucide-react";
import authServices from "@/services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        try {
            await authServices.login(email, password, rememberMe);
            navigate("/dashboard");
        } catch {
            setErrorMessage("Login gagal. Periksa email dan password Anda.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.getElementById('email').focus();
        const token = localStorage.getItem("access_token");
        if (token) navigate("/dashboard");
    }, [navigate]);

    return (
        <div className="w-full h-screen flex items-stretch">
            <div className="hidden lg:flex lg:w-10/12 p-12 relative">
                <img src={LoginImg} alt="GreenLify Logo" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex items-center justify-center w-full lg:w-1/2 p-6">
                <Card className="w-full max-w-xl">
                    <div className="w-full flex gap-3 items-center mb-[66px]">
                        <Button variant='icon' className="bg-emerald-500 hover:bg-emerald-600 shadow-lg" onClick={() => navigate('/')}>
                            <ArrowLeft className="h-4 w-4 text-background" />
                        </Button>
                    </div>
                    <CardContent className="space-y-8 p-8">
                        <div className="space-y-8">
                            <img src={Logo} alt="GreenLify Logo" className="w-34 mx-auto" />
                            <Typography variant="h1" className="text-center text-emerald-600">Admin Login</Typography>
                            <Typography variant="p" className="text-center">pengelolaan sampah dengan deteksi menggunakan teknologi AI dan promosi produk ramah lingkungan</Typography>
                        </div>
                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <Label htmlFor="email" className="text-[18px] font-bold text-emerald-600">Email</Label>
                                <Input id="email" type="email" placeholder="admin@gmail.com" className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-4 mt-4">
                                <Label htmlFor="password" className="text-[18px] font-bold text-emerald-600">Password</Label>
                                <div className="relative">
                                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-12 text-slate-900 border border-slate-50 focus:border-slate-100" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        {showPassword ? <EyeOffIcon className="text-emerald-500" /> : <EyeIcon className="text-emerald-500" />}
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <Typography variant="small" className="text-center text-red-500 mt-2">{errorMessage}</Typography>}
                            <div className="flex items-center space-x-4 my-4">
                                <Checkbox id="remember" className="bg-emerald-500" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(Boolean(checked))} />
                                <Typography variant="small" className="text-gray-500">
                                    <label htmlFor="remember" className="text-[14px] font-bold">Biarkan saya tetap masuk</label>
                                </Typography>
                            </div>
                            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600" disabled={loading || !email || !password}>
                                {loading ? <>Memuat...<span className="loader inline-block ml-2"></span></> : "Masuk"}
                            </Button>
                        </form>
                        <Typography variant="p" className="text-center">Kesulitan, Perlu bantuan? <a href="/tentangkami" className="text-emerald-600 hover:underline">Hubungi kami</a></Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}