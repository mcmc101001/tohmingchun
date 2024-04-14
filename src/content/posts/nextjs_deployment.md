---
title: "Next.js Deployment"
date: 2024-04-14
tags: ["next.js", "tech"]
---

# Next.js Deployment

_Published on: 14/4/2024_

Next.js has always been my go-to framework for building React applications. It is easy to use, has great performance, and has a lot of built-in features that make development easier. I have always used Vercel (who created Next.js) for deployment, and it has been a great experience which I have taken for granted, being able to deploy with one button click and enjoy automated continuous deployment. However, I wanted to deploy a SaaS app which could not be hosted with the Vercel free tier, and I had to explore other deployment options (Vercel was expensive).

However, Next.js is pretty complicated under the hood, with the added server-side functionality that is not present in a traditional client-side React application. This makes deployment a bit more complicated, especially when you want to deploy it on a platform that is not Vercel. With Vercel, you can just push your code to a git repository and it will automatically build and deploy it for you. However, with other platforms, you would have to set up a CI/CD pipeline yourself.

## Cloudflare Pages

I first tried deploying a Next.js application with `next-on-pages`, a CLI tool to help deploy Next.js applications to run on Cloudlfare Pages. I had another Vue app deployed on Cloudflare Pages, and it was a breeze to set up (similar experience to Vercel). However, when trying to deploy the Next.js app, I realised it only supported the edge runtime and not Node.js runtime, which meant that a few of the libraries I used were not supported (next-auth). I don't think there is any workaround for this, and I had to look for other deployment options (or modify my app to be edge-compatible).

## AWS with SST

I came across this interesting project called SST, which uses OpenNext to build Next.js projects into packages that can be deployed across a variety of environments (in this case AWS). It converts (presumably) the server-side functionalities (API routes, Server Actions, Server-side rendering, etc.) into Lambda functions, static assets into S3, and the frontend into CloudFront. It was pretty interesting to see how a simple Next.js app has to be provisioned across so many services to work. However, there were a few quirks that I had to work out.

- Environment variables: I had to set up a `.env` file (or some varaint) with my AWS credentials to link up SST with my AWS account. SST is supposed to be used to help provision other AWS resources easier. However, I was already using other AWS services prior, and I used the same credentials for those services and for SST. During deployment, SST somehow overwrote my existing credentials during the build process, causing my own provisioned AWS services to fail (and this only happened during production, making it hard to debug). Furthermore, SST and Next.js both have their own environment variables loading order, which made it tricky to properly configure the env files to load the correct variables.

- Lambda timeout: Not sure about Vercel, but this was my first time utilising a long running serverless function and it timed out during production (as I was using some OpenAI API that took a while to respond). I had to increase the timeout limit to get it to work.

- Next/image: I am not sure if this is an issue with deploying on AWS, but I could not use the built-in image optimisation feature of the Next Image component (even though there was a Image Optimisation Lambda function created). I thought that only the images fetched from S3 would not work, but even the images served statically did not work. I had to disable the image optimisation feature to get the images to show on the frontend.

- CORS: I don't think this is an issue with using AWS to host a Next.js app, but I was using S3 to host images for my app, and it was a pain to get the CORS settings right in Cloudfront to allow my Next.js app to access the images (did not seem to have such a problem previously with another Next.js app deployed on Vercel and also accessing S3 resources, but I could be wrong).

## Docker

In future, I could consider using Docker to containerise my Next.js app and deploy it on a VPS. This would give me more control over the deployment process (I could potentially deploy multiple apps with some docker-compose), and I would also avoid potential costs with AWS in case of any DDOS attacks (at the cost of the website being down).
