from accounting.celery import app


@app.task()
def check_reminder(self):
    print('Hi, i checked them :)')
    return 'hi again, im the value that will be return :)'
