import json
import sys
import logging
import pymysql

rds_host  = "matchingpool.cooqiwkmpgmv.us-east-1.rds.amazonaws.com"
name = "admin"
password = "adminadmin"
db_name = "MATCHING_POOL"


def lambda_handler(event, context):
    print(event)
    email = (event["email"])
    print(email)    
    print("--------------")
    

        
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    try:
        conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    

    with conn.cursor() as cur:
        cur.execute('SELECT * FROM USERTABLE WHERE email="{}"'.format(email))
        for row in cur:
            print(row)
            return json.dumps(row).replace('\"', '')
    
    return json.dumps("Something has gone wrong")
