# NEXUS | Conversational Analytics Platform

&gt; **"Not a dashboard. A conversation that creates itself."**

NEXUS is an AI-powered data intelligence platform built for [The UI Strikes Back](https://www.wemakedevs.org/hackathons/tambo) hackathon powered by Tambo. It transforms complex data analysis into natural conversations, allowing users to visualize trends, compare metrics, and gain insights through simple chat interactions.

## 🚀 Features

- **Natural Language Queries** - Ask questions about your data in plain English
- **Dynamic Visualization** - AI generates charts (Line, Bar, Pie) and insight cards automatically
- **Interactive Dashboard** - Pin charts to build personalized dashboards
- **Real-time Analysis** - Streaming UI with animated component rendering
- **Multi-modal Input** - Support for CSV/Excel uploads and sample datasets

## 🛠️ Tech Stack

- **Framework**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **AI Integration**: Tambo AI SDK
- **Visualization**: Recharts
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/lohith261/nexus-ai.git
cd nexus-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your Tambo API key to .env.local

# Run development server
npm run dev
