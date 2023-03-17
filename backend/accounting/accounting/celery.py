from __future__ import absolute_import, unicode_literals

import os

from celery import Celery

# set the default Django settings module for the 'celery' program.
from celery.schedules import crontab

from accounting.settings.base import INSTALLED_APPS

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'accounting.settings')

app = Celery('accounting')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(lambda: INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))


app.conf.beat_schedule = {
    # Execute the Speed Test every 10 minutes
    'network-speedtest-10min': {
        'task': 'check_network_speed',
        'schedule': crontab(minute='*/10'),
    },
}