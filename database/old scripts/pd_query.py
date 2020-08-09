import pandas as pd
import numpy as np
import sqlite3

connection=sqlite3.connect("./ListingDatabase.db")
#statement = '''SELECT school, COUNT(*) FROM listinginfo GROUP BY school;'''
statement= '''SELECT start_date,uploaddate FROM listinginfo WHERE distance < 5 AND school = 'RU';'''

df = pd.read_sql_query(statement,connection)
print(df)
