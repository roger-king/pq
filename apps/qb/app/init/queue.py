import pika

from app.config import QUEUE_HOST

queue_connection = pika.BlockingConnection(pika.ConnectionParameters(QUEUE_HOST))