import json
import sys
import logging
import pymysql
import boto3
import numpy as np
import pandas as pd
from hashlib import md5
import io
from io import StringIO
csv_file = io.StringIO()

ses = boto3.client('ses',region_name='us-east-1')
SES_REPLYER = 'test@edzdgx.online'

runtime = boto3.Session().client(service_name='sagemaker-runtime',region_name='us-east-1')
ENDPOINT = 'xgboost-2021-12-20-03-32-21-953'
rds_host  = "matchingpool.cooqiwkmpgmv.us-east-1.rds.amazonaws.com"
name = "admin"
password = "adminadmin"
db_name = "MATCHING_POOL"
logger = logging.getLogger()

language_skills = ['Java', 'C++', 'Python', 'JavaScript', 'Latex']
package_skills = ['FrontEnd', 'BackEnd', 'Database', 'Networks', 'Security', 'Machine Learning', 'NLP', 'Computer Vision']
skills = language_skills + package_skills
skills2idx = dict(zip(skills, [i for i in range(len(skills))]))
cols = skills + skills


def get_db(rds_host, name, password, db_name, user_1_email, user_1_class):

    try:
        conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

    res = []
    emails = []
    unis = []
    firstnames = []
    lastnames = []
    count = 0
    user_index = 0
    with conn.cursor() as cur:
        cur.execute('SELECT SKILL, EMAIL, UNI, FIRSTNAME, LASTNAME FROM USERTABLE')
        for row in cur:
            # `skill` has to be in the format of dict

            skills = json.loads(row[0])
            email = row[1]
            uni = row[2]
            firstname = row[3]
            lastname = row[4]
            res.append(skills)
            emails.append(email)
            unis.append(uni)
            firstnames.append(firstname)
            lastnames.append(lastnames)

            if user_1_email == email:
                user_index = count

            count += 1

    return res, emails, unis, firstnames, lastnames, user_index

def transform_rows(baserow_num, user_skill, dataset):
    row = np.zeros(len(cols))
    skills_1 = user_skill.dropna()
    # print(f'skills_1: {skills_1}')
    # print(f'type(skills_1): {type(skills_1)}')

    # print(f'skills2idx: {skills2idx}')
    for s in skills_1:
        row[skills2idx[s[0]]] = s[1]

    skills_2 = dataset.iloc[baserow_num, :-1].dropna()
    # print(f'skills_2: {skills_2}')
    for s in skills_2:
        row[skills2idx[s[0]] + len(skills)] = s[1]
    # print(baserow_num)
    # print(type(baserow_num))
    # print(f'iloc: {dataset.iloc[baserow_num + 1, -1]}')
    # row[-1] = dataset.iloc[baserow_num + 1, -1]

    return row

def transform_data(user_skill, dataset, func):
    df = []
    for i in range(len(dataset)):
        df.append(func(i, user_skill, dataset))
    df = pd.DataFrame(df).dropna()
    return df.copy()

class EmailInfo:
    def __init__(self, _subject, _sender, _body):
        self.subject = _subject
        self.sender = _sender
        self.body = _body


def send_reply(email_info, reply_message):
    response = ses.send_email(
        Destination={
            'ToAddresses': [
                email_info.sender,
            ],
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': reply_message,
                },
            },
            'Subject': {
                'Charset': 'UTF-8',
                'Data': 'Re: ' + email_info.subject,
            },
        },
        Source=SES_REPLYER,
    )
    # print(response)

def get_top10_info(skills, emails, unis, firstnames, lastnames, user_index, top10):
    res = "Following are the recommended teammates:\n"

    for cnt, i in enumerate(top10):
        info = "Recommended teammate #{}: {}, {}, {}, {}\n".format(cnt, unis[i], firstnames[i], emails[i], skills[i])
        res += info
    return res


def lambda_handler(event, context):
    user_1_email = event['Records'][0].get('messageAttributes').get('email').get('stringValue')
    user_1_class = event['Records'][0].get('messageAttributes').get('email').get('class')


    skills, emails, unis, firstnames, lastnames, user_index = get_db(rds_host, name, password, db_name, user_1_email, user_1_class)

    t_skills = []
    for skill in skills:
        t_skills.append([(k, v) for k, v in skill.items()])

    # skills = pd.DataFrame(skills)
    df = pd.DataFrame(t_skills, columns = ['skill_1', 'skill_2', 'skill_3', 'skill_4', 'skill_5']).fillna(value=np.nan)
    # print(user_index)
    user_skill = df.iloc[user_index]
    data = transform_data(user_skill, df, transform_rows)

    data.to_csv(csv_file, sep=",", header=False, index=False)
    my_payload_as_csv = csv_file.getvalue()

    # csv_buffer = open('input_data.csv')
    # my_payload_as_csv = csv_buffer.read()
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT, ContentType='text/csv', Body=my_payload_as_csv)
    results = json.loads("[" + response['Body'].read().decode("utf-8") + "]")
    argsort = np.argsort(results)
    top10 = argsort[-10:].tolist()
    print(results[top10[9]])
    # top10 = [3193, 1406, 442, 2442, 2844, 2088, 1391, 327, 811, 502]

    info = get_top10_info(skills, emails, unis, firstnames, lastnames, user_index, top10)
    print(info)
    email_info = EmailInfo(None, None, None)
    email_info.subject = "Found Matches for {}".format(user_1_class)
    email_info.sender = user_1_email
    send_reply(email_info, info)
