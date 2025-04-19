import React, { useState, useRef, useCallback, useEffect } from "react";
import UploadIcon from "../../assets/images/upload-cloud.svg";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Sesuaikan dengan library UI yang Anda gunakan
import { uploadImage } from "@/services/uploadService"; // Mengimpor service upload
import Loading from "../../components/loading";

import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);

const CaraPengolahan = {
  organic: [
    "Buat Kompos dari Sisa Makanan - Alihkan sisa makanan seperti kulit buah dan sayuran menjadi kompos. Ini adalah cara cerdas untuk mengubah sampah menjadi pupuk alami yang kaya nutrisi, sempurna untuk kebun Anda!",
    "Donasi Makanan yang Masih Layak Konsumsi: Punya makanan berlebih yang masih segar? Donasikan ke lembaga sosial agar orang lain bisa menikmatinya. Dengan begitu, Anda juga membantu mengurangi pemborosan makanan",
    "Perencanaan Porsi dan Pembelian: Kurangi sisa makanan dengan merencanakan belanjaan dan porsi dengan bijak. Ini tidak hanya menghemat uang, tapi juga mengurangi sampah yang Anda hasilkan.",
    "Pisahkan Sampah untuk Daur Ulang: Memisahkan sampah organik dari yang non-organik adalah langkah pertama untuk membuat proses daur ulang menjadi lebih mudah dan efektif. Pastikan sisa makanan tidak tercampur dengan plastik!",
  ],
  paper: [
    "Upcycling - Kertas bekas tidak harus langsung dibuang. Coba buat kertas baru dari pulp atau gunakan untuk kerajinan tangan seperti dekorasi atau bingkai foto. Seru, kan?",
    "Kerajinan Tangan - Gunakan kertas bekas untuk membuat karya seni atau dekorasi kreatif. Misalnya, gunakan teknik quilling untuk membuat bunga atau bingkai gambar unik!",
    "Pengomposan - Kertas tidak hanya bisa didaur ulang, tapi juga bisa menjadi bagian dari kompos. Campurkan dengan sampah organik lain untuk membuat pupuk alami yang bermanfaat.",
    "Pengurangan - Hemat kertas dengan melakukan verifikasi dokumen sebelum mencetak, menggunakan kedua sisi kertas, atau mencetak hanya yang diperlukan. ",
    "Menjual kembali - Sama seperti kardus, kertas bekas dapat dijual kembali kepada para pengepul atau pengrajin yang membutuhkan bahan baku kertas.",
  ],
  metal: [
    "Sumbangkan Peralatan Logam Lama – Daripada membuang panci atau wajan logam yang sudah tidak terpakai, coba sumbangkan ke teman, keluarga, atau toko amal. Barang-barang logam lama bisa sangat berguna bagi mereka yang membutuhkan!.",
    "Gunakan Kaleng Bekas untuk Tanaman – Kaleng bekas, seperti kaleng makanan atau minuman, bisa diubah menjadi pot tanaman yang cantik. Cukup bersihkan kaleng, beri lubang di bagian bawah untuk drainase, dan Anda siap menanam tanaman hias atau sayuran!",
    "Ciptakan Karya Seni dengan Logam Bekas – Alihkan kaleng, tutup botol, atau benda logam bekas lainnya menjadi karya seni yang unik! Anda bisa membuat patung kecil, dekorasi dinding, atau bahkan lampu hias dari bahan logam yang tidak terpakai.",
    "Reparasi – Jika Anda memiliki keterampilan, logam bekas bisa digunakan untuk membuat alat atau peralatan baru. Misalnya, Anda bisa membuat rak dari pipa logam bekas atau alat-alat kecil seperti sekop atau penggaruk dari kaleng bekas.",
  ],
  cardboard: [
    "Daur ulang - Pisahkan kardus dari bahan pembungkus lain, seperti plastik, busa, atau tali. Kemudian, lipat dan ikat kardus bekas dengan kardus lain. Simpan di tempat bersih dan kering, lalu berikan kepada pemulung.",
    "Pengomposan - Campur kardus dengan limbah organik lain, seperti daun, ranting, dan sisa makanan. Proses pengomposan membutuhkan waktu beberapa minggu hingga bulan. ",
    "Mengemas dan menyimpan barang - Kardus bekas dapat digunakan untuk mengemas dan menyimpan barang-barang selama kondisinya masih bagus dan tidak basah.  ",
    "Menjual kembali - Kardus bekas dapat dijual kembali kepada para pengepul atau pengrajin yang membutuhkan bahan baku kardus.  ",
  ],
  glass: [
    "Daur Ulang Botol Kaca - Bawa ke Tempat Pengumpulan Daur Ulang: Banyak daerah yang menyediakan fasilitas untuk menerima botol kaca yang sudah dipilah. Anda bisa membawa botol kaca ke pusat daur ulang atau bank sampah setempat.",
    "Upcycling - Gunakan botol kaca bekas untuk membuat kerajinan tangan, seperti pot tanaman, lampu hias, vas bunga, atau tempat lilin atau untuk menyimpan air, jus, atau minuman lain di rumah, sehingga mengurangi kebutuhan akan kemasan plastik sekali pakai.",
    "Dekorasi Rumah -  Botol kaca bisa dihias atau dicat untuk dijadikan dekorasi rumah, misalnya sebagai vas bunga atau lampu hias. Botol kaca juga bisa digunakan sebagai elemen dekoratif di taman atau halaman atau bisa juga dijadikan lampu gantung atau lampu meja dengan sedikit kreativitas. Ini bisa menjadi tambahan estetika di rumah.",
    "Mengurangi Pembelian Produk dalam Kemasan Kaca - Cobalah untuk mengurangi pembelian produk yang kemasannya hanya sekali pakai, meski dalam botol kaca, dengan memilih produk dalam kemasan besar atau menggunakan wadah sendiri untuk mengurangi limbah.",
  ],
  plastic: [
    "Daur Ulang Plastik - Daur ulang adalah cara terbaik untuk mengurangi jumlah sampah plastik yang masuk ke tempat pembuangan akhir (TPA). Plastik yang sudah digunakan bisa diproses untuk menjadi produk baru.",
    "Upcycling - Alihkan plastik bekas untuk upcycling, yaitu mengubahnya menjadi barang yang lebih berguna, seperti tempat penyimpanan, rak, atau karya seni. ",
    "Plastik Biodegradable - Pilih produk dengan kemasan plastik biodegradable atau yang ramah lingkungan jika memungkinkan, untuk mengurangi dampak sampah plastik yang sulit terurai. ",
    "Recycle Crafting - Selain upcycling, kerajinan plastik juga bisa menjadi cara kreatif untuk memanfaatkan sampah plastik, seperti membuat gelang, hiasan dinding, atau tas dari kantong plastik bekas. ",
  ],
};

const InformasiLengkap = {
  paper: {
    contohSampah: "Buku tulis bekas, Koran, Kertas kemasan",
    masaLama: "2-6 Minggu",
    tingkatBahaya: "Rendah",
    dampakLingkungan: "Deforestasi, pencemaran udara jika dibakar",
    tingkatRecycleability: "70-80% bisa didaur ulang",
  },
  cardboard: {
    contohSampah: "Kemasan kardus, kotak kemasan",
    masaLama: "2-6 Minggu",
    tingkatBahaya: "Rendah",
    dampakLingkungan:
      "Deforestasi, penggunaan energi untuk memproduksi kardus baru",
    tingkatRecycleability: "80-90% dapat didaur ulang",
  },
  glass: {
    contohSampah: "Kaca, Botol Kaca, Pecahan kaca, gelas",
    masaLama: "1 juta tahun",
    tingkatBahaya: "Sedang (selama tidak pecah)",
    dampakLingkungan: "Sulit bahkan tidak dapat teruarai di alam",
    tingkatRecycleability: "100% bisa didaur ulang",
  },
  plastic: {
    contohSampah: "Kantong plastik, botol, kemasan, sendok, tas kresek",
    masaLama: "500-1000 tahun",
    tingkatBahaya: "Sedang hingga tinggi",
    dampakLingkungan:
      "Polusi plastik di laut, pencemaran tanah, karsinogenik jika dibakar",
    tingkatRecycleability: "30-50% dapat didaur ulang",
  },
  metal: {
    contohSampah: "Kaleng, botol aluminium, produk logam lainnya",
    masaLama: "1000 tahun",
    tingkatBahaya: "Tinggi",
    dampakLingkungan: "Polusi logam berat jika dibuang sembarangan",
    tingkatRecycleability: "90-100% dapat didaur ulang",
  },
  organic: {
    contohSampah: "Sisa makanan, daun, kulit buah atau sayuran",
    masaLama: "1-3 minggu",
    tingkatBahaya: "Rendah",
    dampakLingkungan: "Pembusukan di tempat terbuka, pencemaran bau",
    tingkatRecycleability: "100% dapat terurai dan digunakan kembali",
  },
};

const PredictionSection = ({ onPredictionComplete }) => {
  //   const heroSectionRef = useRef(null);
  //   const classtificationRef = useRef([]);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNullImg, setIsNullImg] = useState(false);
  const [isPrediction, setIsPrediction] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isFileInput, setIsFileInput] = useState(false);
  const webcamRef = useRef(null);

  // Fungsi untuk menangani perubahan file gambar
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // Maksimal ukuran file 2MB
        setIsError(true);
        setImgPreview(null);
        setIsPrediction(false);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsFileInput(true);
      setIsNullImg(false);
      setIsError(false);
    }
  };

  // Fungsi untuk menangani pengambilan gambar dari kamera
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (typeof imageSrc === "string") {
      setImgSrc(imageSrc);
      setIsFileInput(false);
    }
  }, []);

  // Menentukan kategori berdasarkan hasil prediksi
  const getCategory = (prediction) => {
    const anorganikCategories = [
      "glass",
      "plastic",
      "paper",
      "metal",
      "cardboard",
    ];
    const category = anorganikCategories.includes(prediction)
      ? "Anorganik"
      : "Organik";
    return category;
  };

  // Fungsi untuk mengirim gambar (baik dari file atau kamera)
  const handleSubmit = async (event) => {
    event.preventDefault();

    let imageData;
    if (isFileInput && imgPreview) {
      imageData = imgPreview;
      setIsNullImg(false);
      setIsError(false);
    } else if (imgSrc) {
      imageData = imgSrc;
      setIsNullImg(false);
      setIsError(false);
    } else {
      setIsNullImg(true);
      return;
    }
    setImagePreview(imageData);
    setIsLoading(true);
    try {
      const response = await uploadImage(imageData);
      setPredictionResult(response); // Update state
      setIsPrediction(true); // Tampilkan hasil prediksi
    } catch (error) {
      console.error("Error during image upload:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const dataTabel = [
    {
      label: "Kategori",
      value: predictionResult?.prediction
        ? getCategory(predictionResult.prediction)
        : "Belum ada data",
    },
    {
      label: "Masa Lama",
      value: predictionResult?.prediction
        ? InformasiLengkap[predictionResult.prediction]?.masaLama
        : "Belum ada data",
    },
    {
      label: "Contoh Sampah",
      value: predictionResult?.prediction
        ? InformasiLengkap[predictionResult.prediction]?.contohSampah
        : "Belum ada data",
    },
    {
      label: "Tingkat Bahaya",
      value: predictionResult?.prediction
        ? InformasiLengkap[predictionResult.prediction]?.tingkatBahaya
        : "Belum ada data",
    },
    {
      label: "Risiko Dampak",
      value: predictionResult?.prediction
        ? InformasiLengkap[predictionResult.prediction]?.dampakLingkungan
        : "Belum ada data",
    },
    {
      label: "Peluang Recycle",
      value: predictionResult?.prediction
        ? InformasiLengkap[predictionResult.prediction]?.tingkatRecycleability
        : "Belum ada data",
    },
  ];
  // Mengirim hasil ke Parent setelah predictionResult terupdate
  useEffect(() => {
    if (predictionResult) {
      // Pastikan bahwa predictionResult sudah ada
      onPredictionComplete(predictionResult, dataTabel, CaraPengolahan);
    }
  }, [predictionResult, onPredictionComplete]); // Dependency array agar hanya dipanggil saat predictionResult berubah

  return (
    <section>
      {/* Section input gambar */}
      <div className="w-full mt-[31px] mx-auto px-16 ">
        {/* Form handle gambar */}
        <form
          className="flex flex-col items-center space-y-5"
          onSubmit={handleSubmit}
        >
          {isError && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Ukuran file gambar anda melebihi batas maksimal 2MB
              </AlertDescription>
            </Alert>
          )}
          {isNullImg && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Tidak ada Gambar Yang Diupload
              </AlertDescription>
            </Alert>
          )}
          <Tabs
            defaultValue="upload-file"
            className="w-full flex flex-col items-center"
          >
            <TabsList>
              <TabsTrigger value="upload-file">Unggah File Gambar</TabsTrigger>
              <TabsTrigger value="camera">Scan Menggunakan Kamera</TabsTrigger>
            </TabsList>

            <TabsContent value="upload-file">
              <div className="relative border-2 border-dashed border-emerald-500 rounded-lg p-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-[#EAF0E4] transition hover:bg-[rgb(221,230,212)] w-full md:w-[1312px] min-h-[412px]">
                {imgPreview && (
                  <div className="mt-4">
                    <img
                      src={imgPreview}
                      alt="Preview"
                      className="max-w-32 md:max-w-40 rounded-lg"
                    />
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  <div className="text-emerald-500 text-xl">
                    <img src={UploadIcon} alt="Upload Icon" />
                  </div>
                  <p className="text-center text-emerald-600 mt-4">
                    Klik untuk <span className="font-semibold">upload</span>{" "}
                    atau drag and drop
                  </p>
                  <p className="text-center text-sm text-emerald-600 mt-1">
                    .jpg, .png MAX(100px x 100px)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={handleFileChange}
                    className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="camera">
              <div className="relative border-2 border-dashed border-emerald-500 rounded-lg p-8 flex flex-col md:flex-row items-center justify-center gap-4 bg-[#EAF0E4] transition hover:bg-[rgb(221,230,212)] w-5xl w-full md:w-[1312px]">
                <div className="h-full">
                  {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                  ) : (
                    <>
                      <Webcam
                        ref={webcamRef}
                        className="h-full rounded-md"
                        screenshotFormat="image/jpeg"
                        screenshotQuality={0.8}
                        videoConstraints={{
                          facingMode: "environment",
                        }}
                      />
                      <div className="flex justify-center mt-2">
                        <Button
                          variant="outline"
                          onClick={capture}
                          type="button"
                        >
                          Capture Photo
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Button size="md" className="max-w-fit px-8 " type="submit">
            Prediksi
          </Button>
        </form>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        isPrediction &&
        predictionResult && (
          <div className="max-w-[1512px] flex flex-col gap-8 mx-auto px-8 md:px-12 lg:px-16 mt-10 md:mt-14 lg:mt-16">
            {/* title prediksi */}
            <div className="text-center">
              <div>
                <Typography variant="h1">
                  <strong className="text-emerald-600">Hasil Prediksi</strong>{" "}
                </Typography>
              </div>
              <div>
                <Typography variant="p">
                  Dari file yang anda unggah, berikut adalah hasil prediksi yang
                  sistem kami lakukan
                </Typography>
              </div>
            </div>
            {/* Deskripsi hasil prediksi */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#EAF0E4] border border-emerald-500 rounded-md p-4 md:p-6 lg:p-10 gap-4 md:gap-6 lg:gap-8">
              {/* Gambar kiri */}
              <div>
                <img
                  src={imagePreview}
                  alt="sampah"
                  className="w-full rounded-md"
                />
              </div>
              {/* Penjelasan Deskripsi */}
              <div className="flex flex-col gap-4">
                <Typography
                  variant="h4"
                  className="w-full rounded-full bg-emerald-600 text-white text-center py-2 uppercase"
                >
                  {predictionResult.prediction}{" "}
                  <span>{(predictionResult.confidence * 100).toFixed(2)}%</span>
                </Typography>
                <div>
                  <div className="w-full text-emerald-600">
                    {dataTabel.map((row, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row border-b border-gray-200 py-2"
                        >
                          <div className="font-bold md:w-1/4">{row.label}</div>
                          <div className="hidden md:block mx-2">:</div>
                          <div className="md:w-3/4">{row.value}</div>
                        </div>
                    ))}
                    <div className="flex flex-col md:flex-row py-2">
                      <div className="font-bold md:w-1/4">
                        <Typography
                            variant="large"
                            className="text-emerald-600 font-bold"
                        >
                          Cara Pengolahan
                        </Typography>
                      </div>
                      <div className="hidden md:block mx-2">:</div>
                      <div className="md:w-3/4 mt-2 md:mt-0">
                        <ul className="list-decimal pl-4 text-justify leading-loose">
                          {CaraPengolahan[predictionResult.prediction]
                              .slice(0, 2)
                              .map((method, index) => (
                                  <li key={index} className="text-emerald-600">
                                    <Typography
                                        variant="p-regular"
                                        className="text-emerald-600"
                                    >
                                      {method}
                                    </Typography>
                                  </li>
                              ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default PredictionSection;
