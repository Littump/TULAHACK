from utils.singltone import Singletone
from clients.dadata import DadataClient


class Clients(metaclass=Singletone):
    def __init__(self):
        self.dadata = DadataClient()
