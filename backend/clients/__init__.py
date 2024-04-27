from utils.singltone import Singletone
from clients.dadata import DadataClient
from clients.yandex import YandexClient


class Clients(metaclass=Singletone):
    def __init__(self):
        self.dadata = DadataClient()
        self.yandex = YandexClient()
