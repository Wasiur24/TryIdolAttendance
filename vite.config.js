import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This allows the server to be accessible on your local network
    port: 5173, // Ensure this matches your desired port
  },
})


// import { defineConfig } from 'vite';

// export default defineConfig({
 
// });
