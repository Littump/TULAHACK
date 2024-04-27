from clients.dadata import DadataClient
from clients.yandex import YandexClient
from utils.singltone import Singletone


class Clients(metaclass=Singletone):
    def __init__(self):
        self.dadata = DadataClient()
        self.yandex = YandexClient()
