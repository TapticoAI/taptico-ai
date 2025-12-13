# TapticoAI Deployment Guide

This guide will walk you through deploying TapticoAI to Render with your custom domain (taptico.ai).

## What You'll Need

1. **Render Account** (free to create at render.com)
2. **GitHub Account** (you already have this - nicktapp)
3. **OpenAI API Key** (for strategy generation)
4. **GoDaddy Access** (to point taptico.ai to Render)

## Step-by-Step Deployment

### Part 1: Push Code to GitHub (Already Done!)

✅ Your code is already at: https://github.com/nicktapp/taptico-ai

### Part 2: Create Render Account & Deploy

1. **Go to Render.com**
   - Visit: https://render.com
   - Click "Get Started" (top right)
   - Sign up with your GitHub account (easiest way)

2. **Connect Your GitHub Repository**
   - After signing in, click "New +"
   - Select "Blueprint" (this will use our render.yaml file)
   - Connect your GitHub account if prompted
   - Select the repository: `nicktapp/taptico-ai`
   - Click "Apply"

3. **Render Will Automatically:**
   - Create a web service (your website)
   - Create a MySQL database (your filing cabinet)
   - Connect them together
   - Start building your site

### Part 3: Add Your Secret Keys

After the services are created, you need to add your secret keys (like passwords):

1. **In Render Dashboard:**
   - Click on your "taptico-ai" web service
   - Go to "Environment" tab on the left
   - Add these environment variables:

   ```
   VITE_OAUTH_PORTAL_URL = https://oauth.manus.im
   VITE_APP_ID = taptico-ai-prod
   OAUTH_SERVER_URL = https://oauth.manus.im
   OPENAI_API_KEY = [Your OpenAI API key - get from openai.com]
   ```

2. **Save Changes**
   - Click "Save Changes" at the bottom
   - Render will automatically redeploy with the new settings

### Part 4: Get Your OpenAI API Key

1. **Go to OpenAI:**
   - Visit: https://platform.openai.com
   - Sign up or log in
   - Go to "API Keys" section
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)
   - Paste it into Render as `OPENAI_API_KEY`

**Cost:** OpenAI charges per use. For your app, expect about $0.50-2.00 per strategy generated.

### Part 5: Connect Your Domain (taptico.ai)

Once your site is deployed on Render:

1. **In Render Dashboard:**
   - Click on your "taptico-ai" web service
   - Go to "Settings" tab
   - Scroll to "Custom Domain"
   - Click "Add Custom Domain"
   - Enter: `taptico.ai`
   - Render will give you DNS records to add

2. **In GoDaddy:**
   - Log into GoDaddy
   - Go to "My Products" → "Domains"
   - Click on "taptico.ai"
   - Click "Manage DNS"
   - Add the records Render gave you (usually an A record and CNAME)
   - Save

3. **Wait for DNS:**
   - DNS changes take 10 minutes to 24 hours
   - Render will show a green checkmark when it's ready
   - Your site will be live at https://taptico.ai

## What You'll Pay

**Render Costs:**
- Web Service (Starter): $7/month
- MySQL Database (Starter): $7/month
- **Total: ~$14/month**

**OpenAI Costs:**
- Depends on usage
- Estimate: $0.50-2.00 per strategy generated
- If you generate 100 strategies/month: ~$50-200/month

**Total Estimated Cost: $64-214/month** (depending on usage)

## After Deployment

Your site will be live at:
- **Main URL:** https://taptico.ai
- **Render URL:** https://taptico-ai.onrender.com (backup)

**Automatic Updates:**
- Every time you push code to GitHub, Render automatically updates your live site
- No manual deployment needed!

## Troubleshooting

**Site won't load:**
- Check that all environment variables are set in Render
- Check the "Logs" tab in Render for errors

**Database errors:**
- Make sure DATABASE_URL is automatically set (Render does this)
- Check database is running in Render dashboard

**Need help:**
- Check Render logs (most helpful)
- Contact me (your CTO AI) with the error message

## Next Steps After Deployment

1. **Test the site** - Make sure everything works
2. **Set up monitoring** - Render has built-in monitoring
3. **Configure backups** - Render automatically backs up your database
4. **Add analytics** (optional) - Track visitors and usage

---

**Ready to deploy?** Follow the steps above and let me know if you get stuck on any step!
