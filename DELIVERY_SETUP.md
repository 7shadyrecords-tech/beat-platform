# Beat Delivery System - Setup Guide

## Overview

The Beat Platform now automatically delivers purchased beats and licenses to customers via email after successful Stripe payment.

## Architecture

### 1. Storage Structure
```
/storage/
├── beats/          # Beat MP3 files (not public)
├── licenses/       # License PDF files (not public)
└── temp/          # Temporary token storage
```

### 2. Secure Download Flow
1. Customer completes payment on Stripe
2. Stripe webhook triggers `/api/stripe/webhook`
3. Webhook generates secure download tokens (24-hour expiry)
4. Email sent via Resend with download links
5. Customer clicks link to `/api/download/[token]`
6. File delivered with proper headers
7. Token consumed (one-time use per file type)

### 3. Security Features
- ✅ Stripe signature verification
- ✅ 24-hour token expiration
- ✅ One-time use tokens per file type
- ✅ No public file access
- ✅ Duplicate payment prevention
- ✅ Secure download headers

## Environment Variables

Add these to your `.env.local`:

```env
# Stripe Secret Key (already configured)
STRIPE_SECRET_KEY=sk_test_...

# Stripe Webhook Secret (get from Stripe Dashboard > Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...

# Public Site URL (for download links in emails)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend Email API Key (get from https://resend.com)
RESEND_API_KEY=re_...
```

## Setup Instructions

### 1. Get Stripe Webhook Secret

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`
5. Copy the "Signing secret" and add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

For local testing with Stripe CLI:
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copy the signing secret output
```

### 2. Set Up Resend Email

1. Create account at https://resend.com
2. Go to API Keys
3. Create new API key
4. Add to `.env.local` as `RESEND_API_KEY`

**Note:** Using "onboarding@resend.dev" domain. For production, use your own domain.

### 3. Add Beat and License Files

Place files in the storage directories:

```
storage/beats/
├── 1.mp3          # Beat file for beat ID "1"
├── 2.mp3
└── ...

storage/licenses/
├── 1.pdf          # License PDF for beat ID "1"
├── 2.pdf
└── ...
```

Files are named by beat ID (matching `Beat.id` from `/app/data/beats.ts`)

### 4. Deploy

When deploying to production:

1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Add Stripe webhook with production endpoint
3. Use production Resend API key (if different)
4. Ensure storage directories are persistent (not cleared on deploy)

**Note:** For serverless environments (Vercel, Netlify), you may need to use a separate storage service (S3, etc.) instead of local file storage.

## Testing Locally

### Option 1: Using Stripe CLI

```bash
# Terminal 1: Start the Stripe listener
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 2: Start Next.js dev server
npm run dev

# Terminal 3: Trigger a test event
stripe trigger payment_intent.succeeded
```

### Option 2: Using ngrok

```bash
# Start ngrok tunnel
ngrok http 3000

# Update Stripe webhook endpoint to: https://your-ngrok-url.ngrok.io/api/stripe/webhook
```

## API Endpoints

### POST /api/stripe/webhook
- Listens for Stripe webhook events
- Validates signature
- Creates download tokens
- Sends delivery email
- Prevents duplicate processing

### GET /api/download/[token]
- Verifies token (not expired, valid beat ID)
- Streams file (beat or license)
- Consumes token (one-time use)
- Returns with proper download headers

## Email Template

The delivery email includes:
- Professional branding
- Beat title and license type
- Download buttons for beat and license
- 24-hour expiration warning
- Support contact info

Customizable in `/app/lib/resend.ts`

## File Structure

```
app/
├── api/
│   ├── download/
│   │   └── [token]/route.ts        # Secure download endpoint
│   └── stripe/
│       └── webhook/route.ts         # Stripe webhook handler
├── checkout/
│   └── success/page.tsx             # Updated success page
└── lib/
    ├── delivery.ts                  # Token management & file handling
    ├── resend.ts                    # Email delivery
    └── stripe.ts                    # Stripe utilities
```

## Error Handling

- Invalid tokens return 404
- Expired tokens return 404
- Missing files return 404
- Webhook signature failures return 400
- Duplicate payments are skipped (idempotent)

## Monitoring

Check logs for:
- Email delivery results
- Webhook processing
- Token generation/verification
- File access attempts

## Maintenance

### Token Cleanup

Expired tokens are automatically deleted when accessed. For manual cleanup:

```typescript
import { cleanupExpiredTokens } from '@/app/lib/delivery';

const cleaned = await cleanupExpiredTokens();
console.log(`Cleaned up ${cleaned} expired tokens`);
```

Run periodically to maintain storage efficiency.

## Troubleshooting

### "STRIPE_WEBHOOK_SECRET is not configured"
→ Add `STRIPE_WEBHOOK_SECRET` to `.env.local`

### "RESEND_API_KEY not set, skipping email send"
→ Add `RESEND_API_KEY` to `.env.local`
→ Note: Emails still work without this in dev (warning logged)

### "Invalid or expired download link"
→ Token may have expired (24-hour window)
→ Customer needs to request new purchase/email

### Email not received
→ Check `RESEND_API_KEY` is valid
→ Check email domain (onboarding@resend.dev for test)
→ Check spam folder
→ Review server logs for errors

### Files not found
→ Verify files exist in storage directories
→ Check file naming matches beat IDs
→ Ensure readable permissions

## Future Enhancements

- [ ] S3/Cloud storage integration
- [ ] Resend domain configuration
- [ ] Email templates UI
- [ ] Download analytics
- [ ] Custom license PDFs
- [ ] Automatic file generation
- [ ] Email retry mechanism
