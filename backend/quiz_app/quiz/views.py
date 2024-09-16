# quiz/views.py

from rest_framework import viewsets, status
from rest_framework.response import Response as DRFResponse
from .models import Quiz, Question, Response as QuizResponse
from .serializers import QuizSerializer, QuestionSerializer, ResponseSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = QuizResponse.objects.all()
    serializer_class = ResponseSerializer

    def create(self, request, *args, **kwargs):
        responses_data = request.data
        created_responses = []

        if isinstance(responses_data, list):
            for response_data in responses_data:
                serializer = self.get_serializer(data=response_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                created_responses.append(serializer.data)
            return DRFResponse(created_responses, status=status.HTTP_201_CREATED)
        else:
            return super().create(request, *args, **kwargs)