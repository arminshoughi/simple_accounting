from accounting.celery import app


@app.task()
def check_reminder():
    # TODO
    pass
