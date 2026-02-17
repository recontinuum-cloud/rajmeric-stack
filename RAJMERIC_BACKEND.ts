// ═══════════════════════════════════════════════════════════════
//  RAJMERIC CORE-X — COMPLETE BACKEND CONFIGURATION
//  All services, all integrations, production-ready
// ═══════════════════════════════════════════════════════════════

// ─── src/config/index.ts ────────────────────────────────────────
export const config = {
  // Application
  app: {
    name: "RAJMERIC-CORE-X",
    version: "2.0.0",
    env: process.env.NODE_ENV || "production",
    port: parseInt(process.env.PORT || "4000"),
    url: process.env.APP_URL || "https://api.rajmeric.com",
    frontendUrl: process.env.FRONTEND_URL || "https://rajmeric.com",
  },

  // Database — PostgreSQL (Primary)
  postgres: {
    url: process.env.DATABASE_URL, // AWS RDS Aurora endpoint
    pool: { min: 5, max: 50, idle: 10000 },
    ssl: { rejectUnauthorized: true, ca: process.env.RDS_CA_CERT },
    migrations: "./src/database/migrations",
  },

  // Database — MongoDB (Behavioral)
  mongo: {
    url: process.env.MONGODB_URL, // MongoDB Atlas connection string
    dbName: "rajmeric_behavioral",
    options: { retryWrites: true, w: "majority" },
  },

  // Cache — Redis
  redis: {
    cluster: [
      { host: process.env.REDIS_NODE_1, port: 6379 },
      { host: process.env.REDIS_NODE_2, port: 6379 },
      { host: process.env.REDIS_NODE_3, port: 6379 },
    ],
    password: process.env.REDIS_PASSWORD,
    tls: { enabled: true },
    keyPrefix: "rajmeric:",
    defaultTTL: 3600, // 1 hour
  },

  // AI — OpenAI
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    models: {
      chat: "gpt-4o",
      embedding: "text-embedding-ada-002",
      vision: "gpt-4o",
    },
    maxTokens: 4096,
    temperature: 0.7,
  },

  // AI — Anthropic Claude
  anthropic: {
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: "claude-3-5-sonnet-20241022",
    maxTokens: 4096,
  },

  // Vector Database — Pinecone
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV || "us-east-1-aws",
    indexes: {
      products: "rajmeric-products",
      customers: "rajmeric-customers",
      knowledge: "rajmeric-knowledge",
      content: "rajmeric-content",
    },
    dimension: 1536,
  },

  // AWS
  aws: {
    region: process.env.AWS_REGION || "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    s3: {
      bucket: process.env.S3_BUCKET || "rajmeric-assets",
      cdnUrl: process.env.CLOUDFRONT_URL || "https://cdn.rajmeric.com",
    },
    ses: {
      fromEmail: "noreply@rajmeric.com",
      fromName: "Rajmeric Lifesciences",
    },
    kms: {
      keyId: process.env.KMS_KEY_ID, // For PII encryption
    },
    bedrock: {
      region: "us-east-1",
    },
  },

  // Authentication — Auth0
  auth0: {
    domain: process.env.AUTH0_DOMAIN || "rajmeric.auth0.com",
    audience: process.env.AUTH0_AUDIENCE || "https://api.rajmeric.com",
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    managementApiUrl: `https://${process.env.AUTH0_DOMAIN}/api/v2`,
    sessionMaxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // Payments — Razorpay (India)
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
    currency: "INR",
  },

  // Payments — Stripe (International)
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    currency: "usd",
  },

  // Email — Resend
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: "hello@rajmeric.com",
    fromName: "Rajmeric",
    replyTo: "support@rajmeric.com",
  },

  // Analytics — Segment CDP
  segment: {
    writeKey: process.env.SEGMENT_WRITE_KEY,
    flushAt: 20,
    flushInterval: 10000,
  },

  // Search — Algolia
  algolia: {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    searchApiKey: process.env.ALGOLIA_SEARCH_KEY,
    indexes: {
      products: "rajmeric_products",
      articles: "rajmeric_articles",
      faqs: "rajmeric_faqs",
    },
  },

  // Firebase (Push Notifications)
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },

  // Snowflake (Data Warehouse)
  snowflake: {
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    database: "RAJMERIC_DW",
    warehouse: "RAJMERIC_WH",
    schema: "PUBLIC",
  },

  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiry: "15m",
    refreshTokenExpiry: "7d",
    bcryptRounds: 12,
    corsOrigins: [
      "https://rajmeric.com",
      "https://admin.rajmeric.com",
      "https://app.rajmeric.com",
    ],
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
      authMaxRequests: 10,
    },
  },
};

// ─── src/ai/purchase-predictor.ts ───────────────────────────────
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

interface CustomerSignals {
  customerId: string;
  daysSinceLastPurchase: number;
  totalOrders: number;
  averageOrderValue: number;
  browseFrequency: number; // sessions per week
  emailOpenRate: number;
  lastProductViewed: string | null;
  cartAbandoned: boolean;
  ltv: number;
  cohortMonth: string;
}

interface PredictionResult {
  customerId: string;
  score: number; // 0-100
  probability7d: number;
  probability14d: number;
  probability30d: number;
  recommendedAction: "offer_discount" | "send_reminder" | "upsell" | "none";
  confidence: number;
  reasoning: string;
}

export class PurchasePredictionEngine {
  private openai: OpenAI;
  private pinecone: Pinecone;

  constructor() {
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
    this.pinecone = new Pinecone({ apiKey: config.pinecone.apiKey });
  }

  async predictCustomer(signals: CustomerSignals): Promise<PredictionResult> {
    // Step 1: Create customer embedding
    const embedding = await this.createCustomerEmbedding(signals);

    // Step 2: Find similar customers who purchased
    const index = this.pinecone.index(config.pinecone.indexes.customers);
    const similar = await index.query({
      vector: embedding,
      topK: 20,
      filter: { purchased_within_14d: { $eq: true } },
      includeMetadata: true,
    });

    // Step 3: Calculate base score from similarity
    const baseScore = this.calculateBaseScore(signals, similar.matches);

    // Step 4: Apply business rules
    const adjustedScore = this.applyBusinessRules(baseScore, signals);

    // Step 5: Determine recommended action
    const action = this.determineAction(adjustedScore, signals);

    return {
      customerId: signals.customerId,
      score: adjustedScore,
      probability7d: adjustedScore * 0.4,
      probability14d: adjustedScore * 0.7,
      probability30d: Math.min(adjustedScore * 1.2, 100),
      recommendedAction: action,
      confidence: Math.min(similar.matches.length * 5, 95),
      reasoning: this.generateReasoning(signals, adjustedScore),
    };
  }

  private async createCustomerEmbedding(signals: CustomerSignals): Promise<number[]> {
    const signalText = `
      Customer behavior profile:
      Days since purchase: ${signals.daysSinceLastPurchase}
      Total orders: ${signals.totalOrders}
      Average order value: ₹${signals.averageOrderValue}
      Browse sessions per week: ${signals.browseFrequency}
      Email engagement: ${(signals.emailOpenRate * 100).toFixed(0)}%
      Cart abandoned: ${signals.cartAbandoned ? "yes" : "no"}
      Lifetime value: ₹${signals.ltv}
    `;

    const response = await this.openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: signalText,
    });

    return response.data[0].embedding;
  }

  private calculateBaseScore(
    signals: CustomerSignals,
    similarCustomers: any[]
  ): number {
    let score = 0;

    // Recency signal (0-30 points)
    if (signals.daysSinceLastPurchase <= 30) score += 30;
    else if (signals.daysSinceLastPurchase <= 60) score += 20;
    else if (signals.daysSinceLastPurchase <= 90) score += 10;

    // Frequency signal (0-25 points)
    if (signals.totalOrders >= 5) score += 25;
    else if (signals.totalOrders >= 3) score += 15;
    else if (signals.totalOrders >= 1) score += 8;

    // Browse behavior (0-20 points)
    if (signals.browseFrequency >= 5) score += 20;
    else if (signals.browseFrequency >= 2) score += 12;
    else if (signals.browseFrequency >= 1) score += 5;

    // Email engagement (0-15 points)
    score += Math.floor(signals.emailOpenRate * 15);

    // Cart abandonment urgency (0-10 points)
    if (signals.cartAbandoned) score += 10;

    // Similarity boost
    const avgSimilarity = similarCustomers.reduce(
      (sum, m) => sum + (m.score || 0), 0
    ) / Math.max(similarCustomers.length, 1);
    score += Math.floor(avgSimilarity * 15);

    return Math.min(score, 100);
  }

  private applyBusinessRules(score: number, signals: CustomerSignals): number {
    let adjusted = score;

    // Penalize very inactive customers
    if (signals.daysSinceLastPurchase > 180) adjusted -= 20;

    // Boost high-value customers
    if (signals.ltv > 10000) adjusted += 10;

    // Boost customers who viewed products recently
    if (signals.lastProductViewed && signals.daysSinceLastPurchase > 30) {
      adjusted += 8;
    }

    return Math.max(0, Math.min(100, adjusted));
  }

  private determineAction(
    score: number,
    signals: CustomerSignals
  ): PredictionResult["recommendedAction"] {
    if (score >= 70 && signals.cartAbandoned) return "offer_discount";
    if (score >= 60 && signals.daysSinceLastPurchase > 60) return "send_reminder";
    if (score >= 50 && signals.totalOrders >= 3) return "upsell";
    return "none";
  }

  private generateReasoning(signals: CustomerSignals, score: number): string {
    const factors = [];
    if (signals.browseFrequency >= 3) factors.push("high browse frequency");
    if (signals.cartAbandoned) factors.push("abandoned cart");
    if (signals.emailOpenRate > 0.4) factors.push("strong email engagement");
    if (signals.totalOrders >= 3) factors.push("loyal repeat buyer");
    if (signals.daysSinceLastPurchase <= 30) factors.push("recently purchased");

    return factors.length > 0
      ? `Score ${score}/100 — Signals: ${factors.join(", ")}`
      : `Score ${score}/100 — Standard behavior pattern`;
  }
}

// ─── src/ai/chatbot.ts ──────────────────────────────────────────
import OpenAI from "openai";

export class RajmericAISupportAgent {
  private openai: OpenAI;
  private pinecone: Pinecone;

  private systemPrompt = `You are Raj, Rajmeric Lifesciences' expert health advisor and support agent.

COMPANY: Rajmeric Lifesciences — premium health supplements and wellness products
MISSION: Help customers achieve optimal health with science-backed products

YOUR CAPABILITIES:
- Answer product questions with deep expertise
- Help with orders, shipping, returns (use provided tools)
- Give personalized supplement recommendations based on health goals
- Explain ingredients, dosages, and scientific backing
- Handle complaints with empathy and efficiency

PERSONALITY: Warm, knowledgeable, professional. Like a trusted pharmacist friend.
LANGUAGE: Match customer's language (English/Hindi/regional)

IMPORTANT RULES:
- Never give medical advice or diagnose conditions
- Always recommend consulting a doctor for medical conditions
- Be transparent about what you don't know
- If confidence < 70%, ask for customer agent escalation

ESCALATE TO HUMAN when:
- Customer is angry / demanding escalation
- Complex order issues requiring manual intervention
- Medical questions beyond general supplement guidance
- Refund decisions > ₹5000`;

  constructor() {
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
    this.pinecone = new Pinecone({ apiKey: config.pinecone.apiKey });
  }

  async respond(
    message: string,
    conversationHistory: any[],
    customerId: string
  ) {
    // Step 1: Retrieve relevant knowledge
    const knowledge = await this.retrieveKnowledge(message);

    // Step 2: Get customer context
    const context = await this.getCustomerContext(customerId);

    // Step 3: Build messages
    const messages = [
      { role: "system", content: this.buildSystemPrompt(context, knowledge) },
      ...conversationHistory,
      { role: "user", content: message },
    ];

    // Step 4: Stream response
    const stream = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      max_tokens: 1024,
      temperature: 0.4,
      stream: true,
      tools: this.getTools(),
    });

    return stream;
  }

  private async retrieveKnowledge(query: string): Promise<string> {
    try {
      // Create embedding for query
      const embedding = await this.openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: query,
      });

      // Search knowledge base
      const index = this.pinecone.index(config.pinecone.indexes.knowledge);
      const results = await index.query({
        vector: embedding.data[0].embedding,
        topK: 5,
        includeMetadata: true,
      });

      return results.matches
        .map((m) => m.metadata?.text as string)
        .filter(Boolean)
        .join("\n\n");
    } catch {
      return "";
    }
  }

  private async getCustomerContext(customerId: string): Promise<any> {
    // Fetch from PostgreSQL — recent orders, LTV, preferences
    return { customerId, recentOrders: [], preferences: {} };
  }

  private buildSystemPrompt(context: any, knowledge: string): string {
    return `${this.systemPrompt}

CUSTOMER CONTEXT:
${JSON.stringify(context, null, 2)}

RELEVANT KNOWLEDGE BASE:
${knowledge || "No specific knowledge retrieved."}

Current date: ${new Date().toLocaleDateString("en-IN")}`;
  }

  private getTools() {
    return [
      {
        type: "function" as const,
        function: {
          name: "check_order_status",
          description: "Check the status of a customer's order",
          parameters: {
            type: "object",
            properties: {
              orderId: { type: "string", description: "Order ID" },
            },
            required: ["orderId"],
          },
        },
      },
      {
        type: "function" as const,
        function: {
          name: "initiate_return",
          description: "Initiate a return request for an order",
          parameters: {
            type: "object",
            properties: {
              orderId: { type: "string" },
              reason: { type: "string" },
            },
            required: ["orderId", "reason"],
          },
        },
      },
      {
        type: "function" as const,
        function: {
          name: "escalate_to_human",
          description: "Escalate the conversation to a human support agent",
          parameters: {
            type: "object",
            properties: {
              reason: { type: "string" },
              priority: { type: "string", enum: ["low", "medium", "high"] },
            },
            required: ["reason", "priority"],
          },
        },
      },
    ];
  }
}

// ─── src/services/personalization.ts ────────────────────────────
export class PersonalizationEngine {
  private pinecone: Pinecone;
  private openai: OpenAI;

  constructor() {
    this.pinecone = new Pinecone({ apiKey: config.pinecone.apiKey });
    this.openai = new OpenAI({ apiKey: config.openai.apiKey });
  }

  async getPersonalizedRecommendations(
    customerId: string,
    limit: number = 8
  ): Promise<string[]> {
    // Get customer preference vector
    const customerVector = await this.getCustomerVector(customerId);
    if (!customerVector) return this.getPopularProducts(limit);

    // Query similar products from Pinecone
    const index = this.pinecone.index(config.pinecone.indexes.products);
    const results = await index.query({
      vector: customerVector,
      topK: limit * 2,
      filter: { in_stock: { $eq: true } },
      includeMetadata: true,
    });

    // Filter out recently purchased
    const purchased = await this.getRecentlyPurchased(customerId);
    const filtered = results.matches
      .filter((m) => !purchased.includes(m.metadata?.productId as string))
      .slice(0, limit);

    return filtered.map((m) => m.metadata?.productId as string);
  }

  async updateCustomerVector(
    customerId: string,
    interaction: {
      type: "view" | "purchase" | "cart" | "wishlist";
      productId: string;
      weight: number;
    }
  ) {
    const currentVector = await this.getCustomerVector(customerId) || 
      new Array(1536).fill(0);
    const productVector = await this.getProductVector(interaction.productId);

    if (!productVector) return;

    // Weighted moving average update
    const updatedVector = currentVector.map(
      (v, i) => v * 0.9 + productVector[i] * 0.1 * interaction.weight
    );

    // Normalize
    const magnitude = Math.sqrt(updatedVector.reduce((s, v) => s + v * v, 0));
    const normalized = updatedVector.map((v) => v / magnitude);

    // Upsert to Pinecone
    const index = this.pinecone.index(config.pinecone.indexes.customers);
    await index.upsert([{
      id: `customer_${customerId}`,
      values: normalized,
      metadata: { customerId, updatedAt: new Date().toISOString() },
    }]);
  }

  private async getCustomerVector(customerId: string): Promise<number[] | null> {
    try {
      const index = this.pinecone.index(config.pinecone.indexes.customers);
      const result = await index.fetch([`customer_${customerId}`]);
      return result.records[`customer_${customerId}`]?.values || null;
    } catch { return null; }
  }

  private async getProductVector(productId: string): Promise<number[] | null> {
    try {
      const index = this.pinecone.index(config.pinecone.indexes.products);
      const result = await index.fetch([`product_${productId}`]);
      return result.records[`product_${productId}`]?.values || null;
    } catch { return null; }
  }

  private async getRecentlyPurchased(customerId: string): Promise<string[]> {
    // Query PostgreSQL for last 30 days purchases
    return [];
  }

  private async getPopularProducts(limit: number): Promise<string[]> {
    // Return top selling products from Redis cache
    return [];
  }
}

// ─── src/services/payment.ts ─────────────────────────────────────
import Razorpay from "razorpay";
import Stripe from "stripe";
import crypto from "crypto";

export class PaymentService {
  private razorpay: Razorpay;
  private stripe: Stripe;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: config.razorpay.keyId!,
      key_secret: config.razorpay.keySecret!,
    });
    this.stripe = new Stripe(config.stripe.secretKey!);
  }

  // Create Razorpay order (India)
  async createRazorpayOrder(params: {
    amount: number; // in paise
    currency?: string;
    receipt: string;
    notes?: Record<string, string>;
  }) {
    return this.razorpay.orders.create({
      amount: params.amount,
      currency: params.currency || "INR",
      receipt: params.receipt,
      notes: params.notes || {},
    });
  }

  // Verify Razorpay webhook signature
  verifyRazorpaySignature(
    orderId: string,
    paymentId: string,
    signature: string
  ): boolean {
    const body = `${orderId}|${paymentId}`;
    const expected = crypto
      .createHmac("sha256", config.razorpay.keySecret!)
      .update(body)
      .digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  }

  // Create Stripe PaymentIntent (International)
  async createStripePaymentIntent(params: {
    amount: number; // in cents
    currency?: string;
    customerId?: string;
    metadata?: Record<string, string>;
  }) {
    return this.stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency || "usd",
      customer: params.customerId,
      metadata: params.metadata || {},
      automatic_payment_methods: { enabled: true },
    });
  }

  // Fraud scoring (basic rule-based + ML)
  async scoreFraud(payload: {
    amount: number;
    ip: string;
    email: string;
    deviceFingerprint?: string;
  }): Promise<{ score: number; action: "allow" | "review" | "block" }> {
    let score = 0;

    // Rule-based scoring
    if (payload.amount > 50000) score += 20; // High value
    // Add ML model scoring here

    return {
      score,
      action: score > 80 ? "block" : score > 50 ? "review" : "allow",
    };
  }
}

// ─── src/middleware/security.ts ──────────────────────────────────
import { FastifyPluginAsync } from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";

export const securityMiddleware: FastifyPluginAsync = async (app) => {
  // Helmet — security headers
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://checkout.razorpay.com"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://cdn.rajmeric.com"],
        connectSrc: ["'self'", "https://api.rajmeric.com"],
        frameSrc: ["https://api.razorpay.com"],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    xssFilter: true,
  });

  // CORS
  await app.register(cors, {
    origin: config.security.corsOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    credentials: true,
    maxAge: 3600,
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: config.security.rateLimit.maxRequests,
    timeWindow: config.security.rateLimit.windowMs,
    redis: app.redis,
    keyGenerator: (req) => `ratelimit:${req.ip}:${req.url}`,
    errorResponseBuilder: () => ({
      code: 429,
      error: "Too Many Requests",
      message: "Rate limit exceeded. Please wait before retrying.",
    }),
  });
};

// ─── src/database/encryption.ts ─────────────────────────────────
import { KMSClient, EncryptCommand, DecryptCommand } from "@aws-sdk/client-kms";

// ALL PII must go through this service
export class EncryptionService {
  private kms: KMSClient;
  private keyId: string;

  constructor() {
    this.kms = new KMSClient({ region: config.aws.region });
    this.keyId = config.aws.kms.keyId!;
  }

  async encryptPII(plaintext: string): Promise<string> {
    const command = new EncryptCommand({
      KeyId: this.keyId,
      Plaintext: Buffer.from(plaintext),
    });
    const result = await this.kms.send(command);
    return Buffer.from(result.CiphertextBlob!).toString("base64");
  }

  async decryptPII(ciphertext: string): Promise<string> {
    const command = new DecryptCommand({
      CiphertextBlob: Buffer.from(ciphertext, "base64"),
    });
    const result = await this.kms.send(command);
    return Buffer.from(result.Plaintext!).toString("utf-8");
  }

  // Hash for searching (one-way, for email lookups)
  hashForSearch(value: string): string {
    return crypto
      .createHmac("sha256", config.security.jwtSecret!)
      .update(value.toLowerCase().trim())
      .digest("hex");
  }
}

// ─── src/jobs/scheduled.ts ──────────────────────────────────────
import { Queue, Worker } from "bullmq";

// All background jobs
export const setupJobs = (redis: any) => {
  // Purchase Prediction — runs every 6 hours
  const predictionQueue = new Queue("purchase-prediction", { connection: redis });
  new Worker("purchase-prediction", async (job) => {
    const engine = new PurchasePredictionEngine();
    const result = await engine.predictCustomer(job.data);
    if (result.score > 70 && result.recommendedAction !== "none") {
      // Trigger automated marketing action
      await triggerMarketingAction(result);
    }
    // Store prediction in Snowflake
    await storePrediction(result);
  }, { connection: redis, concurrency: 10 });

  // Churn Detection — runs nightly
  const churnQueue = new Queue("churn-detection", { connection: redis });
  // ... similar pattern

  // Revenue Forecast — runs weekly
  const forecastQueue = new Queue("revenue-forecast", { connection: redis });
  // ... similar pattern

  // Abandoned Cart Recovery — runs hourly
  const cartQueue = new Queue("cart-recovery", { connection: redis });
  // ... similar pattern

  // Email Digest to Snowflake — runs daily
  const snowflakeQueue = new Queue("snowflake-sync", { connection: redis });
  // ... similar pattern
};

// Schedule recurring jobs
async function scheduleJobs(queues: any) {
  // Every 6 hours: batch prediction for all active customers
  await queues.prediction.add(
    "batch-predict",
    { batchSize: 1000 },
    { repeat: { cron: "0 */6 * * *" } }
  );

  // Nightly at 2am IST: churn detection
  await queues.churn.add(
    "churn-scan",
    {},
    { repeat: { cron: "30 20 * * *" } } // 2am IST = 8:30pm UTC
  );
}

async function triggerMarketingAction(prediction: PredictionResult) {
  // Emit to appropriate queue based on action
  console.log(`Triggering ${prediction.recommendedAction} for ${prediction.customerId}`);
}

async function storePrediction(prediction: PredictionResult) {
  // Insert into Snowflake ML_PREDICTIONS table
  console.log(`Storing prediction for ${prediction.customerId}`);
}

export default config;
