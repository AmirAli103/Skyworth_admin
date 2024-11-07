import { Box } from "@mui/material";
import "../styles/global.css";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh', // Make the Box take at least full height of the viewport
        }}
      >
        <Box sx={{ flex: 1 }}> {/* This Box takes up remaining space */}
          <Component {...pageProps} />
        </Box>
      </Box>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
