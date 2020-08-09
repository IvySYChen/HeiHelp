import pandas as pd
import numpy as np
import sqlite3

connection=sqlite3.connect("./Listing.db")
#statement = '''SELECT school, COUNT(*) FROM listinginfo GROUP BY school;'''
statement= '''SELECT start_date,end_date,uploaddate FROM listinginfo ;'''

df = pd.read_sql_query(statement,connection)
print(df)
