from django.core.management.base import BaseCommand
from quiz.models import Quiz, Question

class Command(BaseCommand):
    help = 'Populates the database with a sample quiz and questions'

    def handle(self, *args, **kwargs):
        quiz = Quiz.objects.create(title="Sample Quiz")
        questions = [
            "What is your favorite color?",
            "Describe your ideal vacation.",
            "What's your favorite book and why?",
            "If you could have dinner with any historical figure, who would it be and why?",
            "What's the most important quality in a friend?"
        ]
        for order, text in enumerate(questions, start=1):
            Question.objects.create(quiz=quiz, text=text, order=order)
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the database with a sample quiz and questions'))