from django.core.management.base import BaseCommand

from apps.dashboard.consts import AccountTypeChoices, TagChoices, ReminderTypeChoices, ReminderTimeTypeChoices
from apps.dashboard.services import AccountService, ReminderService
from apps.share.consts import FEMALE
from apps.share.services import UserService

import faker
from tqdm import tqdm


class Command(BaseCommand):
    help = 'create bank'
    faker = faker.Faker('fa-ir')

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='clearing all data',
        )

    def handle(self, *args, **options):
        if options['clear']:
            UserService.all().delete()
            AccountService.all().delete()
            ReminderService.all().delete()
            self.stdout.write(self.style.SUCCESS(f"SUCCESSFULLY CLEARED ;)"))

        user = UserService.create_user(
            username='hoori',
            password='1234',
            first_name='Hoori',
            last_name='Jamadi',
            national_code='4610565544',
            birthday='1996-09-15',
            sex=FEMALE,
            is_superuser=True,
            is_active=True
        )

        print('adding 100 income for hoori')
        for i in tqdm(range(100)):
            AccountService.create(
                user=user,
                title=self.faker.name(),
                description=self.faker.text(),
                amount=self.faker.random.randint(100, 9999999),
                typ=AccountTypeChoices.INPUT,
                tag=self.faker.random.choice(TagChoices.choices),
                is_checked=self.faker.boolean()
            )
        self.stdout.write(self.style.SUCCESS(f"SUCCESSFULLY ADDED ;)"))

        print('adding 100 output for hoori')
        for i in tqdm(range(100)):
            AccountService.create(
                user=user,
                title=self.faker.name(),
                description=self.faker.text(),
                amount=self.faker.random.randint(100, 9999999),
                typ=AccountTypeChoices.OUTPUT,
                tag=self.faker.random.choice(TagChoices.choices),
                is_checked=self.faker.boolean()
            )
        self.stdout.write(self.style.SUCCESS(f"SUCCESSFULLY ADDED ;)"))

        print('adding 100 reminder for hoori')
        for i in tqdm(range(100)):
            ReminderService.create(
                user=user,
                title=self.faker.name(),
                description=self.faker.text(),
                amount=self.faker.random.randint(100, 9999999),
                account_type=self.faker.random.choice(AccountTypeChoices.choices),
                reminder_type=self.faker.random.choice(ReminderTypeChoices.choices),
                time_choice=self.faker.random.choice(ReminderTimeTypeChoices.choices),
                reminding_time=self.faker.date(),
            )
        self.stdout.write(self.style.SUCCESS(f"SUCCESSFULLY ADDED ;)"))
