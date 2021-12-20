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


    print("--------------")
    
    course_id_ = event["course_id"]
    email_ = event["email"]

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    try:
        conn = pymysql.connect(host=rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        return json.dumps("db connection failed") 
        sys.exit()
    
    logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")
    

    with conn.cursor() as cur:
        cur.execute('INSERT INTO POOLTABLE (user_email, course_id) values("{}", "{}")'.format(email_, course_id_))
        conn.commit()
        for row in cur:
            print(row)

    return json.dumps("success")