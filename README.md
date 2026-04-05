# Attio Onboard

An interactive onboarding assistant that generates tailored Attio CRM configurations based on your business model, team structure, and go-to-market motion.

[Live Demo](https://attio-onboard.vercel.app/)

## The Problem

Attio is a powerful, flexible CRM. But flexibility comes with a cost: new users face a blank canvas and have to figure out what to build.

For a platform that prides itself on being intuitive, the most consistent complaint across user reviews is that getting started is hard. Users report spending hours on trial and error, struggling with workflow setup, and finding the help center too generic to guide them through initial configuration.

The paradox: the more flexible the tool, the harder it is to know where to start.

## Evidence

- "Setting up workflows can be tricky the first time you do it. There is lots of information available to help, but it still just doesn't feel simple." (G2 review)
- "It took us some time to completely integrate with each team member since all of them had to be competent in the right application of Attio tools." (G2 review)
- "Building complex automations requires some learning curve. We spent about 2 hours understanding conditional triggers." (Hackceleration)
- Competitor reviews consistently cite onboarding complexity as a reason to consider alternatives

## The Solution

Attio Onboard is a guided setup assistant that asks questions about your business and generates a recommended Attio workspace configuration. Instead of dropping users into a blank CRM, it produces a tailored setup guide with:

- **Which objects to create** and how to structure them (standard and custom)
- **Pipeline stages** designed for your specific workflow
- **Automations** that match your go-to-market motion
- **Lists and views** organized for how your team works
- **Integrations** prioritized for your current tool stack

Every recommendation includes reasoning ("We recommend this because...") and actionable setup steps ("Go to Workspace Settings > Objects > ...").

## Who It Supports

The tool generates distinct configurations for three business models that represent Attio's core customer base:

- **SaaS / Software companies**: Sales pipelines, subscription tracking, PLG product usage monitoring
- **VC / PE firms**: Deal flow pipelines, portfolio management, LP tracking, fund operations
- **Agencies / Services firms**: Client management, project tracking, new business pipelines, retainer monitoring

## How It Works

1. Answer 7-8 questions about your business model, team, and current setup
2. The tool generates a tailored Attio configuration using AI
3. Review your personalized setup guide with recommendations, reasoning, and step-by-step instructions

## Built With

- SvelteKit
- Tailwind CSS
- Claude API (Anthropic)
- Deployed on Vercel

## About

Built by Victor Nwoseh as a proof-of-concept addressing the onboarding gap in Attio's user experience. This is not an official Attio product.
