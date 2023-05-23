# Code ursprünglich von Maximilian Ilzhöfer für DMUN e.V., geschrieben in R, 2023
# Übersetzung in Python von Tade Strehk, 2023
# Versenden von Slack-Nachrichten aus einem standartisierten Masterplan

import os
import slack
import logging
from flask import Flask, request, Response, jsonify, render_template, redirect

# logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s:%(levelname)s:%(name)s:%(message)s')
file_handler = logging.FileHandler('app.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

try:
    # Informationen zur Google-Auth
    googleauth_email = os.getenv("GOOGLEAUTH_EMAIL")
    googleauth_secret = os.getenv("GOOGLEAUTH_SECRET")

    # Alles pro ws
    # Token zum anmelden
    env_token_munbw = os.getenv("SLACK_TOKEN_MUNBW")
    env_token_munbb = os.getenv("SLACK_TOKEN_MUNBB")
    env_token_munsh = os.getenv("SLACK_TOKEN_MUNSH")
    env_token_dmun = os.getenv("SLACK_TOKEN_DMUN")

    # Channel ID fürs testen
    test_channel_munbw = os.getenv("TEST_CHANNEL_MUNBW")
    test_channel_munbb = os.getenv("TEST_CHANNEL_MUNBB")
    test_channel_munsh = os.getenv("TEST_CHANNEL_MUNSH")
    test_channel_dmun = os.getenv("TEST_CHANNEL_DMUN")

    # Default Google Sheet
    default_sheet_munbw = os.getenv("DEFAULT_SHEET_MUNBW")
    default_sheet_munbb = os.getenv("DEFAULT_SHEET_MUNBB")
    default_sheet_munsh = os.getenv("DEFAULT_SHEET_MUNSH")
    default_sheet_dmun = os.getenv("DEFAULT_SHEET_DMUN")

except:
    logger.error("Fehler beim laden der Umgebungsvariablen")
    exit()


# Flask App (Webserver)
app = Flask(__name__) 

