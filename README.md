# Simple Quiz Application

This project is a simple quiz application with a Django backend and React frontend. Users can take a quiz with multiple questions, each with a 3-minute time limit.

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+

## Backend Setup (Django)

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/quiz-application.git
   cd quiz-application
   ```

2. Create a virtual environment:

   ```
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:

   ```
   pip install -r requirements.txt
   ```

5. Navigate to the Django project directory:

   ```
   cd backend
   ```

6. Run migrations:

   ```
   python manage.py migrate
   ```

7. Create a superuser (for admin access):

   ```
   python manage.py createsuperuser
   ```

8. Load sample quiz data:

   ```
   python manage.py loaddata sample_quiz_data.json
   ```

9. Start the Django development server:
   ```
   python manage.py runserver
   ```

The backend should now be running at `http://localhost:8000`.

## Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:

   ```
   cd frontend
   ```

2. Install the required npm packages:

   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

The frontend should now be running at `http://localhost:3000`.

## Using the Application

1. Open your web browser and go to `http://localhost:3000`.
2. You should see the quiz application. Click "Start Quiz" to begin.
3. Answer each question within the 3-minute time limit.
4. Click "Next" or wait for the timer to expire to move to the next question.
5. After answering all questions, your responses will be automatically submitted.

## Admin Access

To access the Django admin interface:

1. Go to `http://localhost:8000/admin`
2. Log in with the superuser credentials you created earlier.
3. Here you can manage quizzes, questions, and view submitted responses.

## API Endpoints

- GET `/api/quizzes/`: List all quizzes
- GET `/api/quizzes/<id>/`: Retrieve a specific quiz with its questions
- POST `/api/responses/`: Submit quiz responses
