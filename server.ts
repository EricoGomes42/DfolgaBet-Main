import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";

dotenv.config();

const oddsCache: { [key: string]: { data: any[], timestamp: number } } = {};
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  const storage = multer.memoryStorage();
  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER || 'placeholder',
      pass: process.env.SMTP_PASS || 'placeholder'
    }
  });

  app.post("/api/contact", async (req, res) => { /* ... existing code ... */ });
  app.post("/api/careers", upload.single('resume'), async (req, res) => { /* ... existing code ... */ });
  app.post("/api/automarticles/webhook", async (req, res) => { /* ... existing code ... */ });
  app.use("/api/wp", async (req, res) => { /* ... existing code ... */ });
  app.get("/api/env-check", (req, res) => { /* ... existing code ... */ });
  app.get("/api/odds/debug", async (req, res) => {
  return res.json({
    ok: true,
    hasNewOddsApiKey: Boolean(process.env.NEW_ODDS_API_KEY),
    hasViteNewOddsApiKey: Boolean(process.env.VITE_NEW_ODDS_API_KEY),
    hasOddsApiKey: Boolean(process.env.ODDS_API_KEY),
    nodeEnv: process.env.NODE_ENV || null,
    port: process.env.PORT || null
  });
});
  
  app.get("/api/odds", async (req, res) => {
    const { sport } = req.query;
    const apiKey = process.env.NEW_ODDS_API_KEY;

    if (!sport || typeof sport !== 'string') {
      return res.status(400).json({ error: "Sport parameter is required and must be a string." });
    }
    if (!apiKey) {
        return res.status(500).json({ error: "API key is not configured on the server." });
    }

    const cacheKey = sport;
    const now = Date.now();

    if (oddsCache[cacheKey] && (now - oddsCache[cacheKey].timestamp < CACHE_DURATION_MS)) {
        const cachedData = oddsCache[cacheKey].data;
        const dataWithMeta = cachedData.map(d => ({ ...d, meta: { dataSource: `server-cache (updated ${new Date(oddsCache[cacheKey].timestamp).toLocaleTimeString()})` } }));
        return res.json(dataWithMeta);
    }

    try {
        const apiResponse = await axios.get(`https://api.the-odds-api.com/v4/sports/${sport}/odds`, {
            params: {
                apiKey,
                regions: 'us,uk,eu',
                markets: 'h2h',
                oddsFormat: 'decimal',
            }
        });

        const data = apiResponse.data;
        oddsCache[cacheKey] = { data: data, timestamp: now };

        const dataWithMeta = data.map((d: any) => ({ ...d, meta: { dataSource: 'real', requestsRemaining: apiResponse.headers['x-requests-remaining'] } }));
        res.json(dataWithMeta);

    } catch (error: any) {
        const status = error.response?.status;
        if (status === 404 || status === 422) {
           console.warn(`Sport not found or out of season (${sport}). Returning empty arrays.`);
           oddsCache[cacheKey] = { data: [], timestamp: now };
           return res.json([]);
        }

        console.error(`Error fetching odds for ${sport}:`, error.message);
        if (error.response) {
            console.error('API Response:', error.response.data);
            res.status(status || 500).json({
                error: `Failed to fetch odds from The Odds API. Status: ${status}`,
                details: error.response.data
            });
        } else {
            res.status(500).json({ error: "An internal server error occurred while fetching odds." });
        }
    }
  });

  app.use("/api/proxy", async (req, res) => { /* ... existing code ... */ });

  let vite: any;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
  }

  app.get("/dfolgabet/post/:slug", async (req, res, next) => {
    const slug = req.params.slug;
    const url = req.originalUrl;
    
    try {
      const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
      const sanityDataset = process.env.VITE_SANITY_DATASET || 'production';
      
      const { createClient } = await import('@sanity/client');
      const client = createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: '2023-05-03',
        useCdn: false,
      });

      const decodedSlug = decodeURIComponent(slug);
      const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
        title, seoTitle, seoDescription, excerpt
      }`;
      const post = await client.fetch(query, { slug: decodedSlug });

      let template = '';
      if (process.env.NODE_ENV !== "production") {
        template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
      } else {
        template = fs.readFileSync(path.resolve(process.cwd(), 'dist/index.html'), 'utf-8');
      }

      if (post) {
        const title = post.seoTitle || post.title || 'DfolgaBet';
        const description = post.seoDescription || post.excerpt || '';
        const canonical = `https://dfolgabet.com.br/dfolgabet/post/${slug}`;

        template = template.replace(/<title>.*?<\/title>/, `<title>${title} | DfolgaBet</title>`);
        template = template.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description.replace(/"/g, '&quot;')}">`);
        
        const seoTags = `
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`;
        template = template.replace('</head>', `${seoTags}\n</head>`);
      } else {
        template = template.replace(/<title>.*?<\/title>/, `<title>Post não encontrado | DfolgaBet</title>`);
        template = template.replace('</head>', `\n    <meta name="robots" content="noindex, follow" />\n</head>`);
      }

      if (process.env.NODE_ENV !== "production" && vite) {
        template = await vite.transformIndexHtml(url, template);
      }

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e: any) {
      console.error("SEO Injection Error:", e.message);
      next();
    }
  });

  if (process.env.NODE_ENV !== "production") {
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
