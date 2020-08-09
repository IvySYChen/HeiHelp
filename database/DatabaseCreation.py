import sqlite3
import pandas as pd

def main():
    #conn = sqlite3.connect('/Users/keyang/Desktop/SQL/ListingDatabase.db')  # You can create a new database by changing the name within the quotes
    conn = sqlite3.connect('/Users/Princess/Desktop/scrape/heihei/database/Listing.db')
    #csv_path = r'/Users/keyang/Desktop/SQL/dataset_test.csv'
    create_table(conn)
    # write_to_sql(conn,csv_path)
    conn.commit()


def write_to_sql(conn, path):
    c = conn.cursor()
    dataset = pd.read_csv()
    dataset = dataset.rename(columns={"name": "listing_name", "start_date": "avaliable_date"})
    dataset.to_sql('listing', conn, if_exists='append', index=False)


def create_table(conn):
    c = conn.cursor()  # The database will be saved in the location where your 'py' file is saved
    # Create table - CLIENTS

    c.execute('''CREATE TABLE "listinginfo" (
        "id" TEXT NOT NULL,
        "school"	TEXT,
        "email" TEXT,
        "name"	TEXT,
        "address"	TEXT,
        "city"	TEXT,
        "province"	TEXT,
        "postal_code"	TEXT,
        "type_accom"	TEXT,
        "price"	INTEGER,
        "start_date"	INTEGER,
        "lease_type"	INTEGER,
        "ac"	NUMERIC,
        "furnished"	NUMERIC,
        "laundry"	NUMERIC,
        "parking"	NUMERIC,
        "longitude"	NUMERIC,
        "latitude"	NUMERIC,
        "image_url"	NUMERIC,
        "distance"	NUMERIC,
        "uploaddate" INTEGER,
        "end_date" INTEGER,
        PRIMARY KEY("id"))''')

if __name__ == "__main__":
    main()