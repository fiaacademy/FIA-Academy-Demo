import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("fiacademy.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    avatar TEXT,
    isPremium INTEGER DEFAULT 0,
    trialRemaining INTEGER DEFAULT 3,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS video_progress (
    userId TEXT,
    courseId TEXT,
    videoIndex INTEGER,
    progress INTEGER,
    milestones TEXT,
    PRIMARY KEY (userId, courseId, videoIndex)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    let user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user) {
      const id = Math.random().toString(36).substring(7);
      const name = email.split("@")[0];
      const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
      db.prepare("INSERT INTO users (id, name, email, avatar) VALUES (?, ?, ?, ?)").run(id, name, email, avatar);
      user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    }

    res.json({
      ...user,
      isPremium: !!user.isPremium
    });
  });

  app.get("/api/user/me", (req, res) => {
    const email = req.query.email as string;
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      ...user,
      isPremium: !!user.isPremium
    });
  });

  app.post("/api/video/play-check", (req, res) => {
    const { email, courseId, videoIndex } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isPremium) {
      return res.json({ allowed: true });
    }

    // Free videos (first 3)
    if (videoIndex < 3) {
      if (user.trialRemaining > 0) {
        return res.json({ allowed: true, trialRemaining: user.trialRemaining });
      } else {
        // Check if already trial-ed this specific video
        const progress = db.prepare("SELECT * FROM video_progress WHERE userId = ? AND courseId = ? AND videoIndex = ?")
          .get(user.id, courseId, videoIndex);
        if (progress) {
          return res.json({ allowed: true });
        }
        return res.json({ allowed: false, reason: "TRIAL_EXHAUSTED" });
      }
    }

    res.json({ allowed: false, reason: "PREMIUM_REQUIRED" });
  });

  app.post("/api/video/consume-trial", (req, res) => {
    const { email, courseId, videoIndex } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;

    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isPremium) return res.json({ success: true, isPremium: true });

    // Check if already consumed for this video
    const progress = db.prepare("SELECT * FROM video_progress WHERE userId = ? AND courseId = ? AND videoIndex = ?")
      .get(user.id, courseId, videoIndex);

    if (progress) {
      return res.json({ success: true, alreadyConsumed: true, trialRemaining: user.trialRemaining });
    }

    if (user.trialRemaining <= 0) {
      return res.status(403).json({ error: "No trials left" });
    }

    db.prepare("UPDATE users SET trialRemaining = trialRemaining - 1 WHERE id = ?").run(user.id);
    
    // Mark as "started" in progress to avoid double consumption
    db.prepare("INSERT OR IGNORE INTO video_progress (userId, courseId, videoIndex, progress, milestones) VALUES (?, ?, ?, 0, '[]')")
      .run(user.id, courseId, videoIndex);

    const updatedUser = db.prepare("SELECT trialRemaining FROM users WHERE id = ?").get(user.id) as any;

    res.json({ 
      success: true, 
      trialRemaining: updatedUser.trialRemaining,
      message: `1 Trial digunakan. Sisa ${updatedUser.trialRemaining} trial.`
    });
  });

  app.post("/api/user/upgrade", (req, res) => {
    const { email } = req.body;
    db.prepare("UPDATE users SET isPremium = 1 WHERE email = ?").run(email);
    res.json({ success: true });
  });

  app.post("/api/video/update-progress", (req, res) => {
    const { email, courseId, videoIndex, progress, milestone } = req.body;
    const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as any;
    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = db.prepare("SELECT * FROM video_progress WHERE userId = ? AND courseId = ? AND videoIndex = ?")
      .get(user.id, courseId, videoIndex) as any;

    if (existing) {
      const milestones = JSON.parse(existing.milestones);
      if (milestone && !milestones.includes(milestone)) {
        milestones.push(milestone);
      }
      db.prepare("UPDATE video_progress SET progress = MAX(progress, ?), milestones = ? WHERE userId = ? AND courseId = ? AND videoIndex = ?")
        .run(progress, JSON.stringify(milestones), user.id, courseId, videoIndex);
    } else {
      const milestones = milestone ? [milestone] : [];
      db.prepare("INSERT INTO video_progress (userId, courseId, videoIndex, progress, milestones) VALUES (?, ?, ?, ?, ?)")
        .run(user.id, courseId, videoIndex, progress, JSON.stringify(milestones));
    }

    res.json({ success: true });
  });

  app.get("/api/video/progress", (req, res) => {
    const { email } = req.query;
    const user = db.prepare("SELECT id FROM users WHERE email = ?").get(email) as any;
    if (!user) return res.status(404).json({ error: "User not found" });

    const progress = db.prepare("SELECT * FROM video_progress WHERE userId = ?").all(user.id);
    res.json(progress.map((p: any) => ({
      ...p,
      milestones: JSON.parse(p.milestones)
    })));
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
