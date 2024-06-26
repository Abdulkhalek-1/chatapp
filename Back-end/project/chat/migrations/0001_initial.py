# Generated by Django 4.2.6 on 2023-11-18 14:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("accounts", "0018_alter_friendship_id_alter_userprofile_id"),
    ]

    operations = [
        migrations.CreateModel(
            name="ChatChannel",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("is_dm", models.BooleanField(default=False)),
                ("title", models.CharField(default="channel", max_length=75)),
                ("members", models.ManyToManyField(to="accounts.userprofile")),
            ],
        ),
        migrations.CreateModel(
            name="Message",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("sent_at", models.DateTimeField(auto_now_add=True)),
                ("changed_at", models.DateTimeField(blank=True, null=True)),
                ("content", models.CharField(blank=True, max_length=4000, null=True)),
                (
                    "chat_channel",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="chat.chatchannel",
                    ),
                ),
                (
                    "sender",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="accounts.userprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Reaction",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("emoji", models.CharField(max_length=255)),
                ("message", models.ManyToManyField(to="chat.message")),
            ],
        ),
        migrations.CreateModel(
            name="Attachment",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("file", models.FileField(upload_to="messages/%d-%m-%Y")),
                (
                    "message",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="chat.message"
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="MessageRead",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "message",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, to="chat.message"
                    ),
                ),
                ("users", models.ManyToManyField(to="accounts.userprofile")),
            ],
            options={
                "indexes": [
                    models.Index(
                        fields=["message"], name="chat_messag_message_0e3d7e_idx"
                    )
                ],
            },
        ),
    ]
