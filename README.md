# FinSight App

Created by Atharva Jaywant, Landan Farmer, and Shafil Alam

FinSight acts like a personal assistant for transforming unorganized, raw spending data into meaningful insights and visible trends. It automatically categorizes transactions, highlights major spending patterns, and uses AI to generate personalized advice.

Demo link: [https://finsight-ai-app.vercel.app](https://finsight-ai-app.vercel.app)

Frontend GitHub URL: [https://github.com/alamshafil/uga-hackathon](https://github.com/alamshafil/uga-hackathon)

# Tools utilized
- IntelliJ IDEA (for Java coding)
- Git
- GitHub
- VSCode (for JS/TS coding)
- REST APIs, JSON, Environmnet Variables, CORS Configuration

# Technologies Used
## Frontend:
- Next.js for the frontend
- React for building the user interface
- Tailwind CSS for styling
- Framer Motion for animations
- HeroUI for pre-built UI components
- TypeScript for type safety

## Backend:
- PostgreSQL for database management
- Java Spring Boot for the backend API
- Maven for Java Project
- OkHttp, OpenCSV for Java
- OpenRouter API for LLM/AI capabilities (OpenAI GPT-4o Mini)

# Problems that our team ran into and how we overcame them
One of our biggest challenges was connecting the backend to the frontend, as this was our first full-stack project. We encountered issues with data formatting, API communication, and prompt diversity while handling edge cases. Like refining a magic trick, integrating the AI service and managing inconsistent inputs required repeated testing and adjustment. Through debugging and teamwork, we learned how to turn these obstacles into a stable and reliable system. In detail, we used print statement to debug each part of code.

# How to Run the App
1. Clone the repository:
   ```bash
   git clone https://github.com/arjaywant-creates/FinSight
    ```

2. Navigate to the project directory:
   ```bash
   cd FinSight
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Install dependencies for the backend:
   ```bash
   cd ../backend
   mvn install
   ```

5. Start the backend server:
   ```bash
   mvn spring-boot:run
   ```

6. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the app.
