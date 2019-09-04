import pymysql.cursors

# connect to the database

connection = pymysql.connect(
    host='34.80.103.224',
    usert='icode',
    password='icode2019',
    db='icode',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

# try:
# with connection.cursor() as cursor:
# Create a new record
