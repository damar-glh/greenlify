import React, { useEffect, useRef } from "react";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import homeImg from "@/assets/images/img-home.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ImagePlus, Upload, ScanLine, MessageSquareMore } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
    { id: 1, title: "Pilih Foto Sampah", description: "Pilih foto sampah Anda yang ingin digunakan untuk diunggah dan diklasifikasi.", icon: <ImagePlus size={34} className="text-white" /> },
    { id: 2, title: "Unggah Foto Sampah", description: "Unggah foto sampah Anda untuk mendapatkan informasi lebih lanjut dan klasifikasi yang tepat.", icon: <Upload size={34} className="text-white" /> },
    { id: 3, title: "Deteksi Sampah", description: "Setelah diunggah, sistem akan langsung menganalisis dan memberikan hasil klasifikasi dengan cepat.", icon: <ScanLine size={34} className="text-white" /> },
    { id: 4, title: "Saran Pengelolaan", description: "Setelah jenis sampah terdeteksi, Anda akan menerima saran pengelolaan yang sesuai, seperti cara mendaur ulang atau mengolah sampah.", icon: <MessageSquareMore size={34} className="text-white" /> },
];

const benefits = [
    { id: 1, title: "Mendukung pengelolaan sampah yang berkelanjutan", description: "Dengan klasifikasi sampah yang tepat, kita dapat mengurangi dampak negatif sampah terhadap lingkungan, mengoptimalkan daur ulang, dan memastikan sampah dikelola dengan cara yang lebih ramah lingkungan", badge: "Keuntungan #1", image: "https://img.freepik.com/free-photo/couple-collects-garbage-garbage-bags-park_1157-27406.jpg?t=st=1732365623~exp=1732369223~hmac=005a0557a7abec95f2b7bbafe44652636470a3c476437dfb70dce845acb22d12&w=1380" },
    { id: 2, title: "Inovasi dalam pengelolaan sampah modern", description: "Kami berkomitmen untuk menciptakan solusi inovatif yang ramah lingkungan, efisien, dan didukung teknologi terkini, untuk memastikan pengelolaan sampah yang lebih baik dan berkelanjutan demi masa depan yang lebih hijau.", badge: "Keuntungan #2", image: "https://img.freepik.com/free-photo/group-asian-diverse-people-volunteer-teamwork-environment-conservationvolunteer-help-picking-plastic-foam-garbage-park-areavolunteering-world-environment-day_640221-307.jpg?t=st=1732365722~exp=1732369322~hmac=5efd3b061905cda330f4f872b39af44fe2784c9d6d87ca82819068f00ce9f92b&w=1380" },
    { id: 3, title: "Pengelolaan sampah yang lebih efektif", description: "Dengan sistem klasifikasi sampah yang otomatis, kita dapat mengelola sampah dengan lebih efektif, meminimalkan risiko kesalahan, dan memastikan setiap jenis sampah dikelola dengan cara yang tepat.", badge: "Keuntungan #3", image: "https://images.pexels.com/photos/6193131/pexels-photo-6193131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
];

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroSectionRef = useRef(null);
    const stepsRef = useRef([]);
    const benefitsRef = useRef([]);
    const ctaSectionRef = useRef(null);

    useEffect(() => {
        gsap.timeline({ scrollTrigger: { trigger: heroSectionRef.current, start: "top 80%", end: "bottom top", toggleActions: "play none none none" } })
            .fromTo(".hero-title", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" })
            .fromTo(".hero-description", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

        stepsRef.current.forEach((step, index) => {
            gsap.fromTo(step, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, delay: index * 0.5, ease: "power2.out", scrollTrigger: { trigger: step, start: "top 80%", toggleActions: "play none none none" } });
        });

        benefitsRef.current.forEach((benefit, index) => {
            gsap.fromTo(benefit, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, delay: index * 0.3, ease: "power2.out", scrollTrigger: { trigger: benefit, start: "top 80%", toggleActions: "play none none none" } });
        });

        gsap.fromTo(ctaSectionRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%", toggleActions: "play none none none" } });
    }, []);

    return (
        <main className="scroll-smooth">
            <div ref={heroSectionRef} className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]">
                <div className="w-full flex flex-col lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
                    <div className="max-w-3xl text-center lg:text-left">
                        <Typography variant="title" className="text-5xl md:text-7xl hero-title">
                            Transformasi <strong className="text-emerald-600">Sampah</strong>, Ciptakan <strong className="text-emerald-600">Manfaat</strong>
                        </Typography>
                    </div>
                    <div className="max-w-md text-center lg:text-left hero-description">
                        <Typography variant="p" type="description">
                            Sistem Cerdas AI untuk Mengklasifikasi Sampah Organik dan Anorganik Secara Otomatis
                        </Typography>
                        <div className="mt-4">
                            <Button variant="outline" size="lg" className="shadow-lg">
                                <Link to="/prediksi">Lihat lebih banyak</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <LazyLoadImage src={homeImg} alt="Home" className="hidden md:block w-full mt-4 px-4 md:px-12 lg:px-24 xl:px-52" effect="blur" width="100%" height="auto" />
                <div className="w-full flex flex-col-reverse lg:flex-row justify-around items-center px-4 sm:px-8 md:px-[65px] gap-8 lg:gap-0">
                    <div className="max-w-3xl text-center lg:text-left">
                        <Typography variant="p" type="quote">
                            “ Platform kami dirancang untuk membantu masyarakat memahami berbagai jenis sampah dan memberikan rekomendasi pengelolaan yang tepat menggunakan implementasi dari machine learning. Dengan begitu, sampah dapat dikelola secara efektif, memberi manfaat, dan mendukung keberlanjutan lingkungan “
                        </Typography>
                    </div>
                    <div className="max-w-md text-center lg:text-right">
                        <Typography variant="h1">
                            Sekilas <strong className="text-emerald-600">Pengolahan Sampah</strong> Modern
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="w-full mt-[66px] h-auto flex flex-col items-center">
                <div className="text-center max-w-4xl px-4">
                    <Typography variant="h1">Pengunggahan Gambar <br /> Yang Cepat & Mudah</Typography>
                    <Typography variant="p" className="mt-7" type="description">
                        Dengan fitur unggah gambar, pengguna bisa dengan mudah mengirimkan foto sampah untuk diklasifikasikan. Prosesnya cepat, mudah, dan intuitif, sehingga siapa saja dapat melakukannya tanpa kesulitan.
                    </Typography>
                </div>
                <div className="mt-12 flex flex-wrap items-center justify-around gap-y-12 px-4 sm:px-8 md:px-[65px]">
                    {steps.map((step) => (
                        <div key={step.id} ref={el => stepsRef.current[step.id] = el} className="flex flex-col items-center text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4">
                            <Card className="w-full">
                                <CardHeader className="flex flex-col items-center gap-[23px]">
                                    <Button variant="outline" className="w-20 h-20 bg-emerald-500 text-white shadow-lg">{step.icon}</Button>
                                    <Typography variant="h3" className="text-emerald-600">{step.title}</Typography>
                                </CardHeader>
                                <CardContent>
                                    <Typography variant="p" type="description">{step.description}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-[66px] h-auto flex flex-col items-center">
                <div className="text-center max-w-5xl px-4">
                    <Typography variant="h1">Deteksi Sampah <br /> Dengan Teknologi AI</Typography>
                    <Typography variant="p" className="mt-7" type="description">
                        Dengan teknologi canggih AI, sistem kami mampu mengidentifikasi jenis sampah secara otomatis. Ini memudahkan pengguna dalam mengelola sampah mereka dengan lebih efisien dan efektif.
                    </Typography>
                </div>
                <div className="mt-[33px] flex flex-col md:flex-row justify-center items-center gap-10 max-w-7xl px-4 md:px-8">
                    {benefits.map((benefit) => (
                        <Card key={benefit.id} ref={el => benefitsRef.current[benefit.id] = el} className="w-full sm:w-[535px] h-[420px] bg-cover bg-center rounded-xl shadow-md relative" style={{ backgroundImage: `url(${benefit.image})` }}>
                            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-xl" />
                            <CardContent className="relative z-10 p-6 flex flex-col gap-10">
                                <Typography className="bg-emerald-500 text-white text-center rounded-[52px] px-4 py-2 text-sm font-semibold inline-block">{benefit.badge}</Typography>
                                <Typography variant="h2" className="text-white text-left">{benefit.title}</Typography>
                                <Typography variant="p" type="description" className="text-white text-justify">{benefit.description}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div ref={ctaSectionRef} className="w-full h-[298px] sm:h-[200px] md:h-[250px] lg:h-[298px] mt-[66px] sm:mt-[40px] md:mt-[50px] mb-[66px] sm:mb-[40px] md:mb-[50px] relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/5029862/pexels-photo-5029862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
                <div className="w-full h-full absolute bg-black opacity-60" />
                <div className="w-full max-w-5xl absolute text-center px-4 sm:px-6 md:px-8 lg:px-6 top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <Typography variant="h3" className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        Setiap sampah yang kita hasilkan adalah keputusan yang diambil dalam ketidaktahuan kita terhadap dampaknya. Mari beralih menjadi lebih bijaksana, agar bumi tetap bisa menyambut kita dengan keindahan yang tak ternilai.
                    </Typography>
                </div>
            </div>
        </main>
    );
};

export default Home;