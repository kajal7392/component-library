# Frontend Assignment - InputField Component

This project is a **Storybook-based frontend assignment** that
demonstrates the implementation of an **InputField UI component** using
React, TypeScript, and TailwindCSS.

![alt text](image-1.png)


![alt text](image-2.png)


![alt text](image-3.png)


![alt text](image-4.png)


![alt text](image-5.png)


![alt text](image-6.png)


![alt text](image-7.png)



## 🚀 Tech Stack

-   **React** (UI framework)
-   **TypeScript** (type safety)
-   **TailwindCSS** (utility-first styling)
-   **Storybook** (UI development & documentation)

## 📂 Project Structure

    ├── src/
    │   ├── components/
    │   │   └── InputField/
    │   │       ├── InputField.tsx       # InputField component
    │   │       ├── InputField.stories.tsx # Storybook stories
    │   │       └── InputField.test.tsx  # Unit tests (if included)
    │   ├── styles/                       # Global styles & Tailwind config
    │   └── App.tsx                       # Root application file
    ├── .storybook/                       # Storybook configuration
    ├── package.json                      # Dependencies & scripts
    └── tailwind.config.js                # Tailwind configuration

## ⚡ Features

-   Clean **InputField component**
-   Responsive design with TailwindCSS
-   **Dark mode support**
-   Accessible scrollbar with styled UI
-   Footer text: `"Built with React, TypeScript, and TailwindCSS"`

## 🛠️ Installation & Setup

Clone the repository and install dependencies:

``` bash
git clone <repo-url>
cd <repo-folder>
npm install
```

Run Storybook:

``` bash
npm run storybook
```

Run the React App:

``` bash
npm start
```
# React Component Library - Live Demos

- **Storybook Demo:** [Vercel Link](https://component-library-4t48utanh-kajals-projects-8880dd31.vercel.app/)  
  _Use this to explore and test individual components with props and controls._

- **App Live Demo:** [Netlify Link](https://react-component-library-typescript.netlify.app/)  
  _Use this to see how components behave when integrated into a full application._

---

## 🎨 UI Enhancements

-   Custom **scrollbar styling** with hover effect
-   Adjusted **text size & line-height** for better readability
-   **Footer properly aligned** and always accessible across devices

## 📌 Notes

-   If the scrollbar does not reach the footer, ensure `min-h-screen`
    and `flex flex-col` layouts are applied to the root container.
-   This ensures content pushes the footer down correctly on all
    devices.

------------------------------------------------------------------------

✅ **Final Footer Text:**\
`Built with React, TypeScript, and TailwindCSS`
