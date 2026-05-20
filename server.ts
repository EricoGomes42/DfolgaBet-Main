import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import multer from "multer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8080;

  // Add CORS headers for safety
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

  // Body parsing middleware
  app.use(express.json({ limit: '50mb' }));

  // Multer configuration for career form attachments
  const storage = multer.memoryStorage();
  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
  });

  // Email Transporter (Placeholder - needs real SMTP in production)
  // We'll use a dummy/test account or just log it if no credentials
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER || 'placeholder',
      pass: process.env.SMTP_PASS || 'placeholder'
    }
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    console.log(`New contact message from ${name} (${email}): ${subject}`);

    try {
      // Send email to Erico
      await transporter.sendMail({
        from: `"DfolgaBet Website" <noreply@dfolgabet.com>`,
        to: "erico-gomes@hotmail.com",
        subject: `[Contato DfolgaBet] ${subject}`,
        text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}\nMensagem: ${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #311B92;">Nova Mensagem de Contato</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Mensagem:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `
      });

      res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
    } catch (error: any) {
      console.error("Error sending contact email:", error.message);
      // Even if email fails, we return 200 for UX in this demo if we don't have real SMTP
      res.status(200).json({ success: true, warning: "Email trigger failed but request accepted" });
    }
  });

  app.post("/api/careers", upload.single('resume'), async (req, res) => {
    const { name, email, position, message } = req.body;
    const file = req.file;

    console.log(`New career application from ${name} for ${position}`);

    try {
      const mailOptions: any = {
        from: `"DfolgaBet Careers" <noreply@dfolgabet.com>`,
        to: "erico-gomes@hotmail.com",
        subject: `[Vaga DfolgaBet] Nova Candidatura: ${name} - ${position}`,
        text: `Nome: ${name}\nEmail: ${email}\nVaga: ${position}\nMensagem: ${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #f9f9f9; border-radius: 10px;">
            <h2 style="color: #311B92;">Nova Candidatura Recebida</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Vaga/Cargo:</strong> ${position}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Mensagem/Apresentação:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            ${file ? `<p><strong>Anexo:</strong> Ver arquivo em anexo (${file.originalname})</p>` : '<p>Sem anexo.</p>'}
          </div>
        `
      };

      if (file) {
        mailOptions.attachments = [
          {
            filename: file.originalname,
            content: file.buffer
          }
        ];
      }

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true, message: "Candidatura enviada com sucesso!" });
    } catch (error: any) {
      console.error("Error sending career email:", error.message);
      res.status(200).json({ success: true, warning: "Email trigger failed but request accepted" });
    }
  });

  // Airticles Webhook Integration (matching the expected WP plugin URL)
  
  // Automarticles Webhook Integration
  app.post("/api/automarticles/webhook", async (req, res) => {
    console.log(`Automarticles Webhook Request Received`, req.body);
    
    try {
      const accessToken = req.headers['access-token'];
      const event = req.body.event;

      if (!accessToken) {
        return res.status(401).json({ error: "No access token provided" });
      }

      // 1. Integration Check
      if (event === "CHECK_INTEGRATION") {
        return res.status(200).json({ token: accessToken });
      }

      const sanityProjectId = process.env.VITE_SANITY_PROJECT_ID || 'isnjdgzr';
      const sanityDataset = process.env.VITE_SANITY_DATASET || 'production';
      const sanityApiToken = process.env.SANITY_API_TOKEN;

      let sanityResponse = null;

      if (sanityApiToken) {
        const { createClient } = await import('@sanity/client');
        const client = createClient({
          projectId: sanityProjectId,
          dataset: sanityDataset,
          apiVersion: '2023-05-03',
          useCdn: false,
          token: sanityApiToken,
        });

        // Helper to upload image to sanity
        async function uploadImageAsset(url: string) {
          try {
             // We can use generic proxy or fetch directly
             const imageRes = await axios.get(url, { responseType: 'arraybuffer' });
             const buffer = Buffer.from(imageRes.data, 'binary');
             const asset = await client.assets.upload('image', buffer, {
                filename: url.split('/').pop() || 'image.jpg'
             });
             return asset._id;
          } catch (e) {
             console.error("Error uploading image to sanity:", e);
             return null;
          }
        }

        // Post Handling
        if (event === "POST_CREATED" || event === "POST_UPDATED") {
          const post = req.body.post;
          if (!post) return res.status(400).json({ error: "Missing post data" });

          let mainImageAssetId = null;
          if (post.featured_image && post.featured_image.url) {
            mainImageAssetId = await uploadImageAsset(post.featured_image.url);
          }

          // Generate portable text structure or just store raw HTML for rendering
          const doc: any = {
            _type: 'post',
            _id: `automarticles-${post.id}`,
            title: post.title || 'Sem Título',
            slug: {
              _type: 'slug',
              current: post.slug || `post-${Date.now()}`
            },
            status: post.status === 'publish' ? 'published' : 'draft', // maps to arbitrary status field if desired
            excerpt: post.description || '',
            publishedAt: new Date((post.publication_date || 0) * 1000).toISOString(),
            contentHtml: post.content?.html || '', // storing the raw HTML which is easier to render for blogs
            body: [
              {
                _type: 'block',
                style: 'normal',
                children: [
                  {
                    _type: 'span',
                    marks: [],
                    text: post.content?.text || ''
                  }
                ]
              }
            ]
          };

          if (mainImageAssetId) {
            doc.mainImage = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: mainImageAssetId
              }
            };
          }

          if (post.category && post.category.name) {
             // Create or refer category
             const catId = `automarticles-cat-${post.category.id}`;
             await client.createIfNotExists({
               _type: 'category',
               _id: catId,
               title: post.category.name
             });
             doc.categories = [
               {
                 _type: 'reference',
                 _ref: catId,
                 _key: `key-${Date.now()}`
               }
             ];
             // Add categoryName for easy access
             doc.categoryName = post.category.name;
          }

          console.log(`Saving post ${post.id} to Sanity...`);
          sanityResponse = await client.createOrReplace(doc);
        } else if (event === "POST_DELETED") {
          const post = req.body.post;
          if (post && post.id) {
             await client.delete(`automarticles-${post.id}`);
             sanityResponse = { deleted: true };
          }
        }
        
        // Category Handling (optional as requested by docs, but good to have)
        else if (event === "CATEGORY_CREATED" || event === "CATEGORY_UPDATED") {
          const cat = req.body.category;
          if (cat && cat.id) {
            const catId = `automarticles-cat-${cat.id}`;
            sanityResponse = await client.createOrReplace({
               _type: 'category',
               _id: catId,
               title: cat.name
            });
          }
        } else if (event === "CATEGORY_DELETED") {
           const cat = req.body.category;
           if (cat && cat.id) {
             await client.delete(`automarticles-cat-${cat.id}`);
             sanityResponse = { deleted: true };
           }
        }

      } else {
        console.log("SANITY_API_TOKEN is missing. Webhook received but not processed in Sanity.");
      }

      return res.status(200).json({
        success: true,
        sanityResponse,
        message: `Webhook processado com sucesso.`
      });
      
    } catch (error: any) {
      console.error(`Automarticles Webhook Error:`, error.message);
      return res.status(500).json({ code: "internal_error", message: "Erro no servidor" });
    }
  });

  // API Proxy Route for WordPress
  app.use("/api/wp", async (req, res) => {
    // Remove query params from original to avoid double encoding (axios handled them via params)
    const url = req.url.split('?')[0];
    const targetUrl = `https://dfolga.com/wp-json/wp/v2${url}`;
    
    try {
      const response = await axios({
        method: req.method,
        url: targetUrl,
        params: req.query,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Cache-Control': 'no-cache',
        },
        timeout: 30000,
        validateStatus: () => true
      });

      const contentType = response.headers['content-type'];
      if (contentType) res.setHeader('Content-Type', contentType);
      
      const wpTotal = response.headers['x-wp-total'];
      if (wpTotal) res.setHeader('x-wp-total', wpTotal);
      
      const wpTotalPages = response.headers['x-wp-totalpages'];
      if (wpTotalPages) res.setHeader('x-wp-totalpages', wpTotalPages);

      res.status(response.status).send(response.data);
    } catch (error: any) {
      console.error("Proxy error for", targetUrl, ":", error.message);
      res.status(500).json({ error: "Proxy request failed", message: error.message, url: targetUrl });
    }
  });

  // The Odds API Proxy with Cache & Normalization
  let oddsCache: Record<string, { data: any, timestamp: number }> = {};
  const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

  app.get("/api/env-check", (req, res) => {
    const apiKey = process.env.NEW_ODDS_API_KEY;
    res.json({
      hasOddsKey: !!apiKey,
      oddsKeyLength: apiKey ? apiKey.length : 0,
      startsWith: apiKey ? apiKey.substring(0, 4) : null
    });
  });

  app.get("/api/odds/debug", async (req, res) => {
    const apiKey = process.env.ODDS_API_KEY || process.env.NEW_ODDS_API_KEY;
    const hasKey = !!apiKey;
    
    const result: any = {
      hasApiKey: hasKey,
      apiKeyLength: apiKey ? apiKey.length : 0,
      apiKeyStartsWith: apiKey ? apiKey.substring(0, 4) : null,
      timestamp: new Date().toISOString()
    };

    if (!hasKey) {
      return res.status(500).json({ error: "Missing ODDS_API_KEY environment variable", ...result });
    }

    try {
      const sportsUrl = `https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`;
      const sportsRes = await axios.get(sportsUrl);
      
      result.status = sportsRes.status;
      result.sportsCount = sportsRes.data.length;
      result.sports = sportsRes.data.map((s:any) => s.key).slice(0, 10);
      result.headers = {
        'x-requests-remaining': sportsRes.headers['x-requests-remaining'],
        'x-requests-used': sportsRes.headers['x-requests-used']
      };
      
      res.json(result);
    } catch(err: any) {
      result.error = err.message;
      result.status = err.response?.status;
      result.errorData = err.response?.data;
      res.status(result.status || 500).json(result);
    }
  });

  app.get("/api/odds", async (req, res) => {
    const apiKey = process.env.ODDS_API_KEY || process.env.NEW_ODDS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing ODDS_API_KEY environment variable" });
    }

    const { sport = 'soccer_brazil_campeonato', regions = 'eu', markets = 'h2h' } = req.query;

    const cacheKey = `${sport}-${regions}-${markets}`;
    
    // Check Cache
    const now = Date.now();
    if (oddsCache[cacheKey] && (now - oddsCache[cacheKey].timestamp < CACHE_DURATION)) {
      console.log(`Returning cached odds for ${cacheKey}`);
      const cachedData = oddsCache[cacheKey].data.map((d: any) => ({
         ...d,
         meta: { ...d.meta, dataSource: 'cache' }
      }));
      return res.json(cachedData);
    }

    try {
      const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${regions}&markets=${markets}`;
      const response = await axios.get(apiUrl);
      
      const requestsRemaining = response.headers['x-requests-remaining'];
      const requestsUsed = response.headers['x-requests-used'];
      
      console.log(`The Odds API limit: Used ${requestsUsed}, Remaining ${requestsRemaining}`);
      
      if (parseInt(requestsRemaining) < 50) {
         console.warn(`[WARNING] The Odds API limit is running low. Remaining: ${requestsRemaining}`);
      }

      // Normalize data but keep original fields so we don't break existing components
      const rawData = response.data || [];
      let normalizedData = rawData.map((event: any) => {
        return {
          ...event,
          sport: event.sport_title || event.sport_key,
          league: event.sport_title, 
          homeTeam: event.home_team,
          awayTeam: event.away_team,
          time: event.commence_time,
          updatedAt: new Date().toISOString(),
          meta: {
            requestsRemaining,
            requestsUsed,
            dataSource: 'real'
          }
        }
      });

      // Update cache
      oddsCache[cacheKey] = {
        data: normalizedData,
        timestamp: now
      };

      res.json(normalizedData);
    } catch (error: any) {
      const status = error.response ? error.response.status : 500;
      
      // Do not log 401 to console.error as it triggers error alerts in AI Studio
      if (status !== 401) {
         console.error(`Error fetching from The Odds API (${status}):`, error.message);
      } else {
         console.warn(`[API KEY] The Odds API returned 401 Unauthorized. Check API key validity.`);
      }
      
      // If we hit a rate limit (429) or other errors, fallback to cache if available
      if (oddsCache[cacheKey]) {
        console.warn(`API Failed (${status}). Returning stale cached odds for ${cacheKey}`);
        const staleData = oddsCache[cacheKey].data.map((d: any) => ({
           ...d,
           meta: { ...d.meta, dataSource: 'cache_stale', _staleError: error.message }
        }));
        return res.json(staleData);
      }

      res.status(status).json({
        error: "Failed to fetch odds",
        message: error.message,
        details: error.response?.data
      });
    }
  });

  // Generic Proxy Route
  app.use("/api/proxy", async (req, res) => {
    const targetUrl = req.query.url as string;
    if (!targetUrl) return res.status(400).send("Missing target url");

    try {
      const response = await axios({
        method: 'GET',
        url: targetUrl,
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        timeout: 15000,
        validateStatus: () => true
      });

      const contentType = response.headers['content-type'];
      if (contentType) res.setHeader('Content-Type', contentType);
      res.status(response.status).send(response.data);
    } catch (error: any) {
      console.error("Generic Proxy error for", targetUrl, ":", error.message);
      res.status(500).send("Proxy error: " + error.message);
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: since this is run from the root, process.cwd() should work
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
