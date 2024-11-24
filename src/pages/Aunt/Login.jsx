import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/Typography";
import Logo from "@/assets/images/logo.svg";
import LoginImg from "@/assets/images/img-login.svg";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Login() {
	const [showPassword, setShowPassword] = React.useState(false);
	return (
		<div className="w-full h-screen">
			<div className="flex items-stretch w-full h-full">
				<div className="hidden relative lg:flex lg:w-1/2 p-12">
					<img
						src={LoginImg}
						alt="GreenLify Logo"
						className="absolute inset-0 w-full h-full object-cover"
					/>
					{/*<div className="absolute inset-0 bg-black opacity-50" />*/}
				</div>
				<div className="flex items-center justify-center w-full lg:w-1/2 p-6">
					<Card className="w-full max-w-xl">
						<CardContent className="space-y-8 p-8">
							<div className="space-y-8">
								<img src={Logo} alt="GreenLify Logo" className="w-34 mx-auto" />
								<Typography
									variant="h1"
									className=" text-center text-emerald-600"
								>
									Admin Login
								</Typography>
								<Typography variant="p" className="text-center text-gray-700">
									pengelolaan sampah dengan deteksi menggunakan teknologi AI dan
									promosi produk ramah lingkungan
								</Typography>
							</div>
							<div className="space-y-8">
								<div className="space-y-4">
									<Label
										htmlFor="email"
										className="text-[18px] font-bold text-emerald-600"
									>
										Email
									</Label>
									<Input
										id="email"
										type="email"
										placeholder="admin@gmail.com"
										className="h-12 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
									/>
								</div>

								<div className="space-y-4">
									<Label
										htmlFor="password"
										className="text-[18px] font-bold text-emerald-600"
									>
										Password
									</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											className="h-12 text-slate-900 border-2 border-emerald-500 focus:border-emerald-600"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
										>
											{showPassword ? (
												<EyeOffIcon className="text-emerald-600" />
											) : (
												<EyeIcon className="text-emerald-600" />
											)}
										</button>
									</div>
								</div>
							</div>

							<div className="flex items-center space-x-4">
								<Checkbox id="remember" className="bg-emerald-600" />
								<Typography variant="small" className="text-gray-500">
									<label htmlFor="remember" className="text-[14px] font-bold">
										Biarkan saya tetap masuk
									</label>
								</Typography>
							</div>

							<Button className="w-full bg-emerald-600 hover:bg-emerald-700">
								Masuk
							</Button>

							<Typography variant="p" className="text-center text-slate-500">
								Kesulitan, Perlu bantuan?{" "}
								<a
									href="/tentangkami"
									className="text-emerald-600 hover:underline"
								>
									Hubungi kami
								</a>
							</Typography>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}