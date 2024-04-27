import threading
import time


class Worker(threading.Thread):
    def __init__(self):
        super(Worker, self).__init__()
        self.lock = threading.Lock()
        self.running = True
        self.start()

    def run(self):
        while self.running:
            with self.lock:
                self._process()
            time.sleep(10)

    def _process(self):
        raise NotImplementedError
