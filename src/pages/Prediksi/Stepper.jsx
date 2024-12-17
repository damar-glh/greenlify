import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import PredictionSection from "./PredictionSection";
import ComingSoon from "@/assets/images/coming-soon.png";

import { Typography } from "@/components/ui/Typography";
import { gsap } from "gsap";
import KategoriSection from "./KategoriSection";

const Stepper = () => {
  const heroSectionRef = React.useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]); // Menyimpan langkah yang sudah selesai
  const totalSteps = 3;
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const [detailInformasi, setDetailInformasi] = useState(null);
  const [infoPengolahan, setInfoPengolahan] = useState(null);

  // Fungsi untuk menangani hasil prediksi dari PredictionSection
  const handlePredictionComplete = useCallback(
    (predictionResult, dataTabel, CaraPengolahan) => {
      // console.log(
      //   "Prediction Complete:",
      //   predictionResult,
      //   dataTabel,
      //   CaraPengolahan
      // );
      setHasilPrediksi(predictionResult);
      setDetailInformasi(dataTabel);
      setInfoPengolahan(CaraPengolahan);
    },
    []
  );

  // Memantau perubahan hasil prediksi
  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none none",
        },
      })
      .fromTo(
        ".hero-title",
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(
        ".hero-description",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

    // if (hasilPrediksi || detailInformasi || infoPengolahan) {
    //   console.log("Hasil Prediksi Terbaru:", hasilPrediksi);
    //   console.log(infoPengolahan[hasilPrediksi.prediction]);
    // }
  }, [hasilPrediksi, detailInformasi, infoPengolahan]);

  // Navigasi ke langkah berikutnya
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps([...completedSteps, currentStep]); // Tandai langkah sebagai selesai
      setCurrentStep(currentStep + 1);
    }
  };

  // Navigasi ke langkah sebelumnya
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      const newCompletedSteps = completedSteps.filter(
        (step) => step !== currentStep - 1
      );
      setCompletedSteps(newCompletedSteps);
    }
  };

  // Definisikan setiap tahap dari Stepper
  const tahapan = {
    1: (
      <div>
        <Typography variant="h2" className="text-center">
          <strong className="text-emerald-700">Ayo Prediksi</strong> Sampahmu
          dulu!
        </Typography>
        <PredictionSection onPredictionComplete={handlePredictionComplete} />
      </div>
    ),
    2: (
      <div>
        <Typography variant="h2" className="text-center">
          <strong className="text-emerald-700">Coba Selesaikan</strong>{" "}
          Tantangan Berikut Yuk!
        </Typography>
        <div>
          {hasilPrediksi && hasilPrediksi.prediction ? (
            <>
              <div className="flex flex-col gap-8 mx-auto px-8 md:px-12 lg:px-16 mt-8 ">
                {/* Penjelasan Deskripsi */}
                <div className="flex flex-col gap-4 bg-[#EAF0E4] border border-emerald-500 rounded-md p-4 md:p-6 lg:p-10">
                  <Typography
                    variant="h4"
                    className="w-full rounded-full bg-emerald-600 text-white text-center py-2 uppercase"
                  >
                    {hasilPrediksi.prediction}
                  </Typography>
                  <div>
                    <ul className="list-decimal pl-6 text-justify leading-loose">
                      {infoPengolahan[hasilPrediksi.prediction].map(
                        (method, index) => (
                          <li key={index} className="text-emerald-600">
                            {method}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Typography variant="p" className="text-center mt-2">
                Belum ada tantangan nih, coba prediksi dulu ya
              </Typography>
            </>
          )}
        </div>
      </div>
    ),
    3: (
      <div>
        <Typography variant="h2" className="text-center">
          <strong className="text-emerald-700">Coba Dapatkan</strong> Apresiasi
          Berikut!
        </Typography>
        <div>
          {hasilPrediksi && hasilPrediksi.prediction ? (
            <>
              <div className="flex flex-col gap-8 mx-auto px-8 md:px-12 lg:px-16 mt-8 ">
                {/* Penjelasan Deskripsi */}
                <div className="bg-[#EAF0E4] border border-emerald-500 rounded-md p-4 md:p-6 lg:p-10">
                  <div className="flex flex-col items-center gap-2">
                    <Typography variant="h3" className="text-center mt-2 text-emerald-600 uppercase">
                        <span className="font-bold">Selamat Anda Berhasil!</span>
                    </Typography>
                    <img src={ComingSoon} alt="" className=" w-1/3"/>
                    <Typography variant="p" className="text-center">
                        Terima kasih sudah berpartisipasi dalam pengelolaan sampah <span className="italic text-emerald-600 font-bold">{hasilPrediksi.prediction}</span> <br/>
                        Apresiasi anda akan kami berikan segera, jadi dipantau terus ya informasi dari kami
                    </Typography>
                    <Button variant="outline">Apresiasi Akan Segera Hadir!</Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Typography variant="p" className="text-center mt-2">
                Anda belum prediksi, voba prediksi dulu ya
              </Typography>
            </>
          )}
        </div>
      </div>
    ),
  };

  return (
    <main>
      {/* Title */}
      <div
        ref={heroSectionRef}
        className="w-full mt-[99px] h-auto flex flex-col items-center gap-[33px]"
      >
        <div className="max-w-3x1 text-center lg:text-center">
          <Typography variant="title" className="hero-title">
            <strong className="text-emerald-700">Prediksi</strong> Sampah
          </Typography>
        </div>
        <div className="max-w-4xl text-center lg:text-center">
          <Typography variant="p" className="hero-description">
            Sistem canggih kami akan menganalisis gambar dan memberikan saran
            pengelolaan sampah yang tepat, mulai dari pemilahan hingga metode
            daur ulang yang ramah lingkungan. Dengan teknologi ini, mengelola
            sampah menjadi lebih mudah dan efisien, membantu Anda berperan aktif
            dalam menjaga kebersihan dan kelestarian bumi.
          </Typography>
        </div>
      </div>
      <div className="p-4 mt-12 max-w-[1512px] w-full mx-auto">
        {/* Linimasa */}
        <div className="mb-6 w-full">
          <div className="flex justify-between items-center">
            {/* Titik Poin */}
            {[...Array(totalSteps)].map((_, index) => (
              <div
                key={index}
                className={`relative ${
                  index === totalSteps - 1 ? "flex-0" : "flex-1"
                }`}
              >
                {/* Titik */}
                <div
                  className={`flex items-center justify-center p-4 w-4 h-4 rounded-full relative z-10 transition-all duration-300 ease-in-out
                  ${
                    currentStep === index + 1 ||
                    completedSteps.includes(index + 1)
                      ? "bg-emerald-600 text-white scale-125"
                      : "bg-gray-200"
                  }`}
                >
                  <div>{index + 1}</div>
                </div>
                {/* Garis antar Titik */}
                {index < totalSteps - 1 && (
                  <div
                    className={`w-4/5 absolute top-4 left-1/2 transform -translate-x-1/2 h-1 rounded-full transition-all duration-100 ease-in-out
                    ${
                      currentStep > index + 1 ||
                      completedSteps.includes(index + 1)
                        ? "bg-emerald-600"
                        : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Konten Stepper */}
        <div className="mb-4 transition-all duration-100 ease-in-out">
          {tahapan[currentStep]}
        </div>

        {/* Tombol Navigasi */}
        <div
          className={`max-w-[1512px] flex px-8 md:px-12 lg:px-16  ${
            currentStep === 1 ? "justify-end" : "justify-between"
          }`}
        >
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Sebelumnya
            </Button>
          )}
          {currentStep === 1 && (
            <Button variant="outline" onClick={nextStep}>
              Coba Tantangan
            </Button>
          )}
          {currentStep > 1 && currentStep < totalSteps && (
            <Button onClick={nextStep}>Selanjutnya</Button>
          )}
        </div>
      </div>
      <div>
        <KategoriSection />
      </div>
    </main>
  );
};

export default Stepper;
