import requests
from django.http import Http404
from project import config
from utils.singltone import Singletone


class YandexClient(metaclass=Singletone):
    def __init__(self):
        self.key = config.IAM_YANDEX
        self.id = config.ID_YANDEX
        self.url = config.URL_YANDEX

    def gpt(self, prompt, context):
        body = {
            'modelUri': f'gpt://{self.id}/yandexgpt/latest',
            'completionOptions': {
                'stream': False,
                'temperature': 0.3,
                'maxTokens': "1000",
            },
            'messages': [
                {
                    'role': 'system',
                    'text': prompt,
                },
                {
                    'role': 'user',
                    'text': context,
                },
            ]
        }

        headers = {'Authorization': f'Bearer {self.key}'}

        response = requests.post(self.url, headers=headers, json=body)

        if response.status_code != 200:
            raise Http404('Yandex error')

        data = response.json()
        return data['result']['alternatives'][0]['message']['text']
