import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import Logo from "@/assets/logo/logo.svg";
import {X, Menu, User, LogOut} from "lucide-react";
import {gsap} from "gsap";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Typography} from "@/components/ui/Typography";
import {getAdmin} from "@/services/admin.js";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [name, setName] = useState("");

    const logoRef = useRef(null);
    const navItemsRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const authButtonRef = useRef(null);

    const menuItems = [
        {label: "Beranda", path: "beranda"},
        {label: "Statistik", path: "statistik"},
        {label: "Prediksi", path: "prediksi"},
        {label: "Produk", path: "produk"},
        {label: "Blog", path: "blog"},
        {label: "Partisipasi", path: "anggotakami"},
        {label: "Tentang Kami", path: "tentangkami"},
    ];

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const fetchAdmin = async () => {
            try {
                const admin = await getAdmin();
                setUserEmail(admin.email);
                setName(admin.name);
            } catch (error) {
                console.log(error.message);
                if (error.message.includes("Gagal mengambil data admin. Silakan coba lagi")) {
                    setIsLoggedIn(false);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login";
                }
            }
        };

        if (accessToken) {
            setIsLoggedIn(true);
            fetchAdmin();
        }

        gsap.fromTo(logoRef.current, {opacity: 0, x: -50}, {opacity: 1, x: 0, duration: 0.5, ease: "power2.out"});
        gsap.fromTo(navItemsRef.current, {opacity: 0, y: 20}, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
        gsap.fromTo(authButtonRef.current, {opacity: 0, scale: 0.8}, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen && mobileMenuRef.current) {
            gsap.fromTo(mobileMenuRef.current, {opacity: 0}, {opacity: 1, duration: 0.8, ease: "power2.out"});
        }
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        setUserEmail("");
        setName("");
        window.location.href = "/login";
    };

    const renderMobileAuthOptions = () => (
        isLoggedIn ? (
            <>
                <Button size="md" className="w-full text-lg"
                        onClick={() => window.location.href = "/dashboard"}>Dashboard</Button>
                <Button variant="destructive" size="md" className="w-full mt-4 text-lg"
                        onClick={handleLogout}>Logout</Button>
            </>
        ) : (
            <Button variant="outline" size="md" asChild className="w-full shadow-md text-lg">
                <Link to="/login">Login</Link>
            </Button>
        )
    );

    const renderDesktopAuthButton = () => (
        isLoggedIn ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer bg-emerald-500 text-white shadow-md">
                        <AvatarImage src="" alt="User avatar"/>
                        <AvatarFallback>{userEmail ? userEmail.charAt(0).toUpperCase() : <User/>}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end" sideOffset={8} className="bg-emerald-500 text-white">
                    <DropdownMenuLabel
                        className="py-0 text-center text-[16px] font-semibold leading-[28px]">{name}</DropdownMenuLabel>
                    <DropdownMenuLabel
                        className="py-0 text-[16px] font-semibold leading-[28px]">{userEmail}</DropdownMenuLabel>
                    <DropdownMenuSeparator className="border"/>
                    <DropdownMenuLabel className="text-[16px] font-semibold leading-[28px]">Menu</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = "/dashboard"}>
                        <User className="mr-2 h-6 w-6"/>
                        <Typography variant="p-semibold" className="text-white">Dashboard</Typography>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="mr-2 h-6 w-6"/>
                        <Typography variant="p-semibold" className="text-white">Logout</Typography>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : (
            <Button variant="outline" size="md" asChild className="shadow-md">
                <Link to="/login">Login</Link>
            </Button>
        )
    );

    return (
        <div className="relative">
            <div
                className="fixed top-0 z-50 w-full h-[75px] px-4 md:px-[65px] flex justify-between items-center bg-background">
                <Link to="/" ref={logoRef}>
                    <img src={Logo} alt="Logo" className="h-11"/>
                </Link>
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="justify-between gap-10">
                        {menuItems.map(({label, path}, index) => (
                            <NavigationMenuItem key={label} ref={el => navItemsRef.current[index] = el}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={`/${path}`}>{label}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-4 items-center">
                        <Button size="md" asChild className="shadow-md">
                            <Link to="/prediksi">Klasifikasi</Link>
                        </Button>
                        <div ref={authButtonRef}>
                            {renderDesktopAuthButton()}
                        </div>
                    </div>
                    <Button onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 bg-emerald-500 text-white">
                        <Menu/>
                    </Button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="fixed inset-0 z-50 md:hidden bg-background p-4">
                    <div className="flex flex-col space-y-4">
                        <div className="flex justify-between items-center">
                            <Link to="/">
                                <img src={Logo} alt="Logo" className="h-11"/>
                            </Link>
                            <Button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                                <X/>
                            </Button>
                        </div>
                        <div className="flex flex-col items-center">
                            {menuItems.map(({label, path}) => (
                                <Link key={label} to={`/${path}`} onClick={() => setIsMobileMenuOpen(false)}
                                      className="text-emerald-700 font-semibold text-lg py-2 rounded">
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <Button size="md" asChild className="shadow-md text-lg">
                            <Link to="/klasifikasi">Klasifikasi</Link>
                        </Button>
                        {renderMobileAuthOptions()}
                    </div>
                </div>
            )}
        </div>
    );
}