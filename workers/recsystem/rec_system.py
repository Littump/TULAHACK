from base_worker import Worker

class RecSystemWorker(Worker):
    def __init__(self):
        super(RecSystemWorker, self).__init__()
        ...

    def get_something(self, something) -> float:
        ...

    def _process(self):
        ...
