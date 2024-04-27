from project import config
import requests
from utils.singltone import Singletone
from django.http import Http404


class DadataClient(metaclass=Singletone):
    def __init__(self):
        self.key = config.KEY_DADATA
        self.secret_key = config.SECRET_KEY_DADATA
        self.url = config.URL_DADATA

    def get_adress(self, lat, lot):
        headers = {
            'Authorization': f'Token {self.key}',
            'X-Secret': self.secret_key,
        }

        body = {'lat': lat, 'lon': lot}

        response = requests.post(self.url, headers=headers, json=body)

        if response.status_code != 200:
            raise Http404('Geocoder error')

        data = response.json()
        if data['suggestions']:
            return data['suggestions'][0]['value']

        return ''
