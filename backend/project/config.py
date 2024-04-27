import os

from dotenv import load_dotenv


load_dotenv()

KEY_YANDEX = os.getenv("KEY_YANDEX")
LOG_GROUP_ID = os.getenv("LOG_GROUP_ID")

KEY_DADATA = os.getenv("KEY_DADATA")
SECRET_KEY_DADATA = os.getenv("SECRET_KEY_DADATA")
URL_DADATA = os.getenv("URL_DADATA")
