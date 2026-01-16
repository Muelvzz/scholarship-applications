import logging
import logging.handlers
from pathlib import Path

Path('logs').mkdir(exist_ok=True)

logger = logging.getLogger('scholar_ph')
logger.setLevel(logging.DEBUG)

file_handler = logging.handlers.RotatingFileHandler(
    'logs/app.log',
    maxBytes=19485760,
    backupCount=10
)

file_handler.setLevel(logging.DEBUG)

console_handler = logging.StreamHandler()
console_handler.setLevel(logging.ERROR)

formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)