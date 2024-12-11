import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import { Toaster } from "@/components/ui/toaster";

export default function Layout() {
	return (
		<div>
			<main>
				<Header />
				<Outlet />
				<Footer />
				<Toaster />
			</main>
		</div>
	);
}
