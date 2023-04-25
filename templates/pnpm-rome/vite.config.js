import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		open: true,
		host: true,
		port: 2077,
	},
	build: {
		assetsDir: ".",
	},
});
