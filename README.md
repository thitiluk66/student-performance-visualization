# Student Performance Analysis: Factors Affecting Academic Achievement

โครงงานนี้จัดทำขึ้นเพื่อวิเคราะห์ปัจจัยที่มีความสัมพันธ์กับผลสัมฤทธิ์
ทางการเรียนของนักเรียน โดยใช้ข้อมูล Student Performance Factors
และนำเสนอผลการวิเคราะห์ในรูปแบบ Interactive Data Visualization

## Objectives

1. ศึกษาปัจจัยที่เกี่ยวข้องกับคะแนนสอบของนักเรียน
2. วิเคราะห์ความสัมพันธ์ระหว่างตัวแปรต่าง ๆ กับผลสัมฤทธิ์ทางการเรียน
3. พัฒนา Interactive Dashboard ด้วย D3.js และ Chart.js

## Dataset

Dataset: Student Performance Factors

ตัวแปรที่นำมาวิเคราะห์ ได้แก่

- Hours_Studied
- Attendance
- Family_Income
- Motivation_Level
- Exam_Score

มีการเตรียมข้อมูลก่อนนำไปวิเคราะห์ ได้แก่
การตรวจสอบ Missing Values, Duplicate Data และ Outliers

## Data Analysis

โครงการแบ่งการวิเคราะห์ออกเป็น 4 ส่วน

1. Correlation Analysis
   - วิเคราะห์ Hours_Studied กับ Exam_Score

2. Attendance Analysis
   - วิเคราะห์ Attendance กับ Exam_Score

3. Family Income Analysis
   - เปรียบเทียบคะแนนสอบเฉลี่ยตามระดับ Family_Income

4. Motivation Analysis
   - เปรียบเทียบคะแนนสอบเฉลี่ยตาม Motivation_Level

## Technologies Used

- HTML
- CSS
- JavaScript
- D3.js
- Chart.js
- Papa Parse

## Project Structure

group5/
├── data/
│   ├── raw/
│   └── cleaned/
├── web/
│   ├── d3/
│   └── chartjs/
├── docs/
├── README.md
└── CONTRIBUTION.md

## How to Run

1. Clone หรือ Download Repository
2. เปิดโครงการด้วย Visual Studio Code
3. เปิดเว็บไซต์ผ่าน Live Server
4. สามารถเลือกดูเว็บไซต์เวอร์ชัน D3.js หรือ Chart.js ได้

## Live Demo

D3.js:
[ใส่ลิงก์ GitHub Pages หลังจาก Deploy]

Chart.js:
[ใส่ลิงก์ GitHub Pages หลังจาก Deploy]

## Members

- นางสาวธิติลักษณ์ ธงงาม
- นางสาวงามศิริ ลุงพัด
- นายธีรัช ลำธาร