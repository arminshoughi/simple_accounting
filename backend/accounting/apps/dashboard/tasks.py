import datetime

from accounting.celery import app
from apps.dashboard.consts import ReminderTimeTypeChoices
from apps.dashboard.services import ReminderService


@app.task()
def check_reminders():
    now = datetime.datetime.now().date()

    def update_reminder_visibility(reminder):
        reminder.is_visible = True
        reminder.save(update_fields=['is_visible'])

    for reminder in ReminderService.filter(is_visible=False):
        if reminder.time_choice == ReminderTimeTypeChoices.ONE_DAY_BEFORE.value:
            one_day_before = reminder.reminding_time - datetime.timedelta(days=1)
            if one_day_before == now: update_reminder_visibility(reminder)

        elif reminder.time_choice == ReminderTimeTypeChoices.ONE_DAY_BEFORE.value:
            tow_day_before = reminder.reminding_time - datetime.timedelta(days=2)
            if tow_day_before == now: update_reminder_visibility(reminder)

        elif reminder.time_choice == ReminderTimeTypeChoices.ONE_DAY_BEFORE.value:
            three_day_before = reminder.reminding_time - datetime.timedelta(days=3)
            if three_day_before == now: update_reminder_visibility(reminder)

        elif reminder.time_choice == ReminderTimeTypeChoices.ONE_DAY_BEFORE.value:
            week_before = reminder.reminding_time - datetime.timedelta(days=7)
            if week_before == now: update_reminder_visibility(reminder)

        elif reminder.time_choice == ReminderTimeTypeChoices.ONE_DAY_BEFORE.value:
            month_before = reminder.reminding_time - datetime.timedelta(days=30)
            if month_before == now: update_reminder_visibility(reminder)
