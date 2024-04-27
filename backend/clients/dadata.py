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
        self.logger.info(message='got response from dadata', data=data)
        for elem in data:
            for city in config.CITIES:
                if city in elem['result'] and elem['qc_geo'] <= 1:
                    return float(elem['geo_lat']), float(elem['geo_lon']), elem['result']

        return None, None, None
