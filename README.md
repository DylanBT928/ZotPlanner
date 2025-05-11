<img src="./src/assets/logo.svg" width="100px" align="left">

### `ZotPlanner` 🗓️

![Size](https://img.shields.io/github/repo-size/DylanBT928/ZotPlanner)
![License](https://img.shields.io/github/license/DylanBT928/ZotPlanner)

**ZotPlanner** is a smart, all-in-one productivity tool designed for UCI students. It helps students organize class schedules, deadlines, and track their coursework in a clean, intuitive interface. Users can upload syllabi, build custom weekly planners, and stay on top of assignments and study sessions. Built with React and powered by AWS, **ZotPlanner** streamlines academic planning for a more productive quarter.

### 🚨 Problem

UCI students juggle multiple classes, deadlines, and campus events across scattered tools (Canvas, emails, syllabi, calendars). This leads to missed deadlines, stress, and disorganization.

### ✅ Solution

**ZotPlanner** is an all-in-one planner designed to simplify student life by consolidating everything in one place.

## ✨ Features

- Upload syllabi and automatically extract class information using Amazon Bedrock
- Build and customize a weekly calendar based on class schedules
- Track assignments and tasks in a clean to-do interface
- View grading breakdowns and calculate estimated course grades
- Stay on top of upcoming deadlines with a unified academic dashboard

## ⚙️ Tech Stack

| Category     | Technologies                                                           |
| ------------ | ---------------------------------------------------------------------- |
| AWS Services | S3, Lambda, API Gateway, DynamoDB, Bedrock, IAM, Amplify (Hosting/CDN) |
| Frontend     | React, TypeScript, Vite, CSS                                           |
| Backend      | Node.js, AWS SDK (v3), Lambda Functions                                |
| Auth & Infra | IAM, CORS Config, API Gateway Proxy Integration                        |

## 🧑‍💻 Authors

- **Dylan Tran** – Frontend Implementation, UI/UX Design, Backend, Amplify, Lambda, DynamoDB, S3, IAM, Bedrock, API Gateway
- **Austin Phan** – Frontend Logic + Architecture, Backend, Amplify, S3, IAM, API Gateway
- **Thomas Phan** - Frontend

## 🚀 Installation

```bash
git clone https://github.com/DylanBT928/ZotPlanner.git
cd ZotPlanner
npm install
npm run dev
```
