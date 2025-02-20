Dynamic Form Builder
A dynamic and flexible form builder built with React, leveraging local storage for state persistence. This project supports dynamic field configurations, real-time validations, and automatic saving, providing a smooth and interactive user experience.

🚀 Features
Dynamic Form Rendering: Create, update, and remove form fields on the fly.
Real-Time Validation: Instant feedback with custom validation rules.
Auto Save Functionality: Automatically saves form data and validation errors in local storage.
Local Storage Persistence: Retains form state even after page refreshes.
Loading States: Full-screen and auto-save loading indicators for better UX.
Error Handling: Detailed field-level error messages for improved user input.

🛠️ Tech Stack
Frontend: React, Vite, JavaScript
State Management: React Hooks (useState, useEffect)
Validation: Custom validation logic using schemas
Local Storage Management: Utility functions for getting and setting data
Deployment: Vercel

project-root
│   README.md
│
└── frontend
    ├── public
    └── src
        ├── components
        │   ├── DynamicForm
        │   │   └── useDynamicForm.js
        │   └── common
        ├── constants
        ├── schemas
        ├── apiServices
        └── hooks


⚙️ Installation
1. Clone the repository

```
git clone https://github.com/Zuvo007/Dynamic-Form.git
cd firstwork-dynamic-form
```
2. Setup Frontend

```
cd frontend
npm install
```
3. Run the Application

```
npm run dev
```



